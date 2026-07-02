import Image from "next/image";
import Link from "next/link";
// import Hero3D from "@/components/Hero3D";
import DriverBadge from "@/components/DriverBadge";
import AnimatedCounter from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import SectionDivider from "@/components/SectionDivider";
import TrackMap from "@/components/TrackMap";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-carbon via-rb-navy-dark/40 to-carbon">
        <Image
          src="/images/hero-action.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[80%_40%] opacity-45"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 45%), linear-gradient(to bottom, black 60%, transparent)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 45%), linear-gradient(to bottom, black 60%, transparent)",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-carbon via-carbon/40 to-transparent" />
        {/* <div className="absolute inset-0">
          <Hero3D />
        </div> */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carbon to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24">
          <FadeInSection>
            <DriverBadge label="Full Stack Software Engineer" />
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">
              Never Give Up.
              <br />
              <span className="text-outline">Always At The Limit.</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-silver/80">
              I&apos;m Pavan Krishna Nimmakuri — I push software the way
              Verstappen pushes a car: flat out, no fear of the risk, hungry
              for the win. 3.5 years building production web and AI systems
              with React, Next.js, Node.js and Azure.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-full bg-rb-red px-7 py-3 font-display text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-7 py-3 font-display text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-rb-yellow hover:text-rb-yellow"
              >
                Get In Touch
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <div className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <AnimatedCounter
                  value={3.5}
                  suffix="+"
                  className="font-display text-3xl font-bold text-rb-yellow"
                />
                <p className="mt-1 text-xs uppercase tracking-widest text-silver/60">
                  Years
                </p>
              </div>
              <div>
                <AnimatedCounter
                  value={20}
                  suffix="+"
                  className="font-display text-3xl font-bold text-rb-yellow"
                />
                <p className="mt-1 text-xs uppercase tracking-widest text-silver/60">
                  Projects Shipped
                </p>
              </div>
              <div>
                <AnimatedCounter
                  value={80}
                  suffix="%"
                  className="font-display text-3xl font-bold text-rb-yellow"
                />
                <p className="mt-1 text-xs uppercase tracking-widest text-silver/60">
                  Faster Deploys
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <SectionDivider image="/images/track-bg.jpg" numeral="3">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <FadeInSection>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-rb-yellow">
              The Mentality
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">
              Don&apos;t care what others think. Push the boundaries.
              Lead the team. Take the risk.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-silver/70">
              Every migration, every AI feature, every release cycle I own —
              I treat like a qualifying lap. Full commitment, calculated
              risk, and the hunger to shave off one more tenth.
            </p>
          </FadeInSection>
        </div>
      </SectionDivider>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <FadeInSection>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-rb-yellow">
            The Circuit
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            Full Send, Every Lap.
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.15}>
          <div className="mx-auto mt-10 max-w-2xl">
            <TrackMap />
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
