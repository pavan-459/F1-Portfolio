"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

const TRACK_D =
  "M150,40 L250,40 L290,72 L330,40 L490,40 A70,70 0 0 1 560,110 V190 A70,70 0 0 1 490,260 L400,260 L370,230 L340,260 L150,260 A70,70 0 0 1 80,190 L80,160 L110,138 L80,116 L80,110 A70,70 0 0 1 150,40 Z";

const AI_CARS = [
  { color: "#ffd400", duration: 7.6, offset: 0.34 },
  { color: "#e5e7eb", duration: 8.9, offset: 0.68 },
];

// precise turn windows, computed from the path's own segment lengths so
// only the actual corners (not the straights) are marked as braking zones
const CORNER_ZONES: [number, number][] = [
  [0.0737, 0.1491], // top S-flick
  [0.267, 0.348], // corner A (top-right)
  [0.407, 0.488], // corner B (bottom-right)
  [0.5304, 0.6262], // chicane
  [0.7569, 0.8378], // corner C (bottom-left)
  [0.8599, 0.9147], // left-side jog
  [0.9191, 1], // corner D (top-left)
];

const TOTAL_LAPS = 3;
const MAX_SPEED = 0.22;
const CORNER_MAX = 0.095;
const CORNER_TARGET = CORNER_MAX * 0.85;
const ACCEL = 0.55;
const BRAKE_DECEL = 1.3;
const COAST_DECEL = 0.9;
const SPINOUT_MS = 700;

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "--:--.-";
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, "0")}`;
}

function AiCar({
  color,
  duration,
  offset,
  pathRef,
  totalLenRef,
}: {
  color: string;
  duration: number;
  offset: number;
  pathRef: React.RefObject<SVGPathElement | null>;
  totalLenRef: React.MutableRefObject<number>;
}) {
  const dotRef = useRef<SVGCircleElement>(null);

  useAnimationFrame((t) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const total = totalLenRef.current || path.getTotalLength();
    const progress = (((t / 1000 / duration + offset) % 1) + 1) % 1;
    const pt = path.getPointAtLength(progress * total);
    dot.setAttribute("cx", String(pt.x));
    dot.setAttribute("cy", String(pt.y));
  });

  return <circle ref={dotRef} r={4} fill={color} stroke="#0a0a0b" strokeWidth={1} opacity={0.85} />;
}

export default function TrackMap() {
  const pathRef = useRef<SVGPathElement>(null);
  const totalLenRef = useRef(0);

  const playerDotRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef(0);
  const speedRef = useRef(0);
  const throttleRef = useRef(false);
  const brakeRef = useRef(false);
  const spinoutUntilRef = useRef(0);
  const lapStartRef = useRef(0);
  const raceStartRef = useRef(0);
  const lapsRef = useRef(0);

  const [raceState, setRaceState] = useState<"idle" | "countdown" | "racing" | "finished">("idle");
  const [countdown, setCountdown] = useState(3);
  const [lap, setLap] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [bestLap, setBestLap] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [speedPct, setSpeedPct] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    totalLenRef.current = path.getTotalLength();
  }, []);

  const inCornerZone = useCallback(
    (frac: number) => CORNER_ZONES.some(([a, b]) => frac >= a && frac <= b),
    []
  );

  const resetRace = useCallback(() => {
    progressRef.current = 0;
    speedRef.current = 0;
    lapsRef.current = 0;
    spinoutUntilRef.current = 0;
    setLap(0);
    setLapTime(0);
    setBestLap(null);
    setTotalTime(null);
    setFlash(null);
    setSpeedPct(0);
    setRaceState("idle");
  }, []);

  const startCountdown = useCallback(() => {
    setRaceState((prev) => {
      if (prev !== "idle") return prev;
      let n = 3;
      setCountdown(3);
      const iv = setInterval(() => {
        n -= 1;
        if (n <= 0) {
          clearInterval(iv);
          progressRef.current = 0;
          speedRef.current = 0;
          lapsRef.current = 0;
          raceStartRef.current = performance.now();
          lapStartRef.current = performance.now();
          setLap(0);
          setLapTime(0);
          setBestLap(null);
          setTotalTime(null);
          setRaceState("racing");
        } else {
          setCountdown(n);
        }
      }, 700);
      return "countdown";
    });
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        throttleRef.current = true;
        startCountdown();
      } else if (e.code === "ArrowDown" || e.code === "KeyB" || e.code === "ShiftLeft" || e.code === "ShiftRight") {
        e.preventDefault();
        brakeRef.current = true;
        startCountdown();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") throttleRef.current = false;
      else if (e.code === "ArrowDown" || e.code === "KeyB" || e.code === "ShiftLeft" || e.code === "ShiftRight")
        brakeRef.current = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [startCountdown]);

  const onThrottleDown = () => {
    throttleRef.current = true;
    startCountdown();
  };
  const onThrottleUp = () => {
    throttleRef.current = false;
  };
  const onBrakeDown = () => {
    brakeRef.current = true;
    startCountdown();
  };
  const onBrakeUp = () => {
    brakeRef.current = false;
  };

  useAnimationFrame((_, delta) => {
    const path = pathRef.current;
    const dot = playerDotRef.current;
    if (!path || !dot || raceState !== "racing") return;
    const total = totalLenRef.current || path.getTotalLength();
    const dt = Math.min(delta, 50) / 1000;
    const now = performance.now();
    const frac = progressRef.current % 1;
    const inCorner = inCornerZone(frac);
    const spinning = now < spinoutUntilRef.current;

    if (spinning) {
      speedRef.current = Math.max(0, speedRef.current - COAST_DECEL * dt * 1.5);
    } else if (brakeRef.current) {
      // corner control: always trends toward a safe cornering speed,
      // braking down from a fast entry or gently holding pace through the turn
      if (speedRef.current > CORNER_TARGET) {
        speedRef.current = Math.max(CORNER_TARGET, speedRef.current - BRAKE_DECEL * dt);
      } else {
        speedRef.current = Math.min(CORNER_TARGET, speedRef.current + ACCEL * 0.6 * dt);
      }
    } else if (throttleRef.current) {
      speedRef.current = Math.min(MAX_SPEED, speedRef.current + ACCEL * dt);
    } else {
      speedRef.current = Math.max(0, speedRef.current - COAST_DECEL * dt);
    }

    if (inCorner && speedRef.current > CORNER_MAX) {
      spinoutUntilRef.current = now + SPINOUT_MS;
      speedRef.current = 0.02;
      setFlash("SPUN OUT!");
      setTimeout(() => setFlash(null), 900);
    }

    progressRef.current += speedRef.current * dt;
    setSpeedPct(Math.round((speedRef.current / MAX_SPEED) * 100));

    const lapsDone = Math.floor(progressRef.current);
    if (lapsDone > lapsRef.current) {
      lapsRef.current = lapsDone;
      const lt = (now - lapStartRef.current) / 1000;
      lapStartRef.current = now;
      setLap(lapsDone);
      setBestLap((prev) => (prev === null ? lt : Math.min(prev, lt)));
      if (lapsDone >= TOTAL_LAPS) {
        setTotalTime((now - raceStartRef.current) / 1000);
        setRaceState("finished");
      }
    }
    setLapTime((now - lapStartRef.current) / 1000);

    const pt = path.getPointAtLength((progressRef.current % 1) * total);
    dot.setAttribute("cx", String(pt.x));
    dot.setAttribute("cy", String(pt.y));
  });

  return (
    <div className="relative">
      <svg viewBox="0 0 640 320" className="h-auto w-full" role="img" aria-label="Interactive racing circuit game">
        <path d={TRACK_D} fill="none" stroke="#232327" strokeWidth={24} strokeLinejoin="round" />
        <path d={TRACK_D} fill="none" stroke="#e5e7eb" strokeWidth={26} strokeDasharray="2 11" opacity={0.12} />
        <path
          ref={pathRef}
          d={TRACK_D}
          fill="none"
          stroke="#ffd400"
          strokeWidth={1.5}
          strokeDasharray="6 7"
          opacity={0.35}
        />
        {CORNER_ZONES.map(([a, b], i) => (
          <path
            key={i}
            d={TRACK_D}
            fill="none"
            stroke="#e10600"
            strokeWidth={5}
            strokeLinecap="round"
            opacity={0.5}
            pathLength={100}
            strokeDasharray={`0 ${a * 100} ${(b - a) * 100} ${100 - b * 100}`}
          />
        ))}
        {AI_CARS.map((c, i) => (
          <AiCar key={i} {...c} pathRef={pathRef} totalLenRef={totalLenRef} />
        ))}
        <circle ref={playerDotRef} r={5.5} fill="#e10600" stroke="#fff" strokeWidth={1.2} />
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6 font-display text-sm uppercase tracking-widest text-silver/80">
          <span>
            Lap <span className="text-rb-yellow">{Math.min(lap, TOTAL_LAPS)}</span>/{TOTAL_LAPS}
          </span>
          <span>
            Time <span className="text-white">{formatTime(lapTime)}</span>
          </span>
          <span>
            Best <span className="text-white">{bestLap === null ? "--:--.-" : formatTime(bestLap)}</span>
          </span>
        </div>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-carbon-light">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rb-navy to-rb-red"
            style={{ width: `${Math.max(0, Math.min(100, speedPct))}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onPointerDown={onThrottleDown}
          onPointerUp={onThrottleUp}
          onPointerLeave={onThrottleUp}
          className="select-none rounded-xl border border-rb-yellow/40 bg-rb-yellow/10 py-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-rb-yellow transition-colors active:bg-rb-yellow/25"
        >
          Throttle · Space
        </button>
        <button
          onPointerDown={onBrakeDown}
          onPointerUp={onBrakeUp}
          onPointerLeave={onBrakeUp}
          className="select-none rounded-xl border border-rb-red/40 bg-rb-red/10 py-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-rb-red transition-colors active:bg-rb-red/25"
        >
          Brake · ↓
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-silver/50">
        Throttle on the straights, switch to Brake through the red corner
        zones — stay on throttle into a corner and you&apos;ll spin out.
      </p>

      {raceState === "idle" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="rounded-full border border-white/20 bg-carbon/80 px-6 py-2 font-display text-sm uppercase tracking-widest text-white">
            Press Throttle Or Brake To Start
          </p>
        </div>
      )}
      {raceState === "countdown" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-display text-6xl font-bold text-rb-yellow">{countdown}</p>
        </div>
      )}
      {flash && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-display text-3xl font-bold text-rb-red">{flash}</p>
        </div>
      )}
      {raceState === "finished" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-carbon/90">
          <p className="font-display text-2xl font-bold text-white">Race Complete</p>
          <p className="text-silver/70">
            Total {formatTime(totalTime ?? 0)} · Best Lap {formatTime(bestLap ?? 0)}
          </p>
          <button
            onClick={resetRace}
            className="rounded-full bg-rb-red px-6 py-2 font-display text-sm font-semibold uppercase tracking-widest text-white"
          >
            Race Again
          </button>
        </div>
      )}
    </div>
  );
}
