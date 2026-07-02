"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import RaceCar from "@/components/RaceCar";

function StaticFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-gradient-to-br from-rb-navy via-rb-red to-rb-yellow opacity-60 blur-2xl" />
    </div>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(hasWebGL());
  }, []);

  if (webglOk === null) return <div className="h-full w-full" />;
  if (!webglOk) return <StaticFallback />;

  return (
    <div className="pointer-events-none h-full w-full">
      <Suspense fallback={<StaticFallback />}>
        <Canvas
          style={{ background: "transparent" }}
          camera={{ position: [0, 0.3, 6.5], fov: 40 }}
          gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={0.85} />
          <pointLight position={[5, 5, 5]} intensity={1.6} color="#ffd400" />
          <pointLight position={[-5, -3, -5]} intensity={1.2} color="#0600ef" />
          <pointLight position={[0, -5, 3]} intensity={0.5} color="#e10600" />
          <directionalLight position={[2, 4, 3]} intensity={1} />
          <RaceCar />
        </Canvas>
      </Suspense>
    </div>
  );
}
