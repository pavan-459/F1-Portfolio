import DriverBadge from "@/components/DriverBadge";
import ThrottleBar from "@/components/ThrottleBar";
import FadeInSection from "@/components/FadeInSection";
import SectionDivider from "@/components/SectionDivider";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    skills: [
      { label: "React & Next.js", level: 95 },
      { label: "TypeScript", level: 92 },
      { label: "Angular (v9-v17)", level: 85 },
      { label: "Tailwind CSS / GraphQL", level: 88 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { label: "Node.js & Express", level: 90 },
      { label: "REST APIs / OAuth2 / JWT", level: 88 },
      { label: "MongoDB / Cosmos DB / SQL", level: 82 },
      { label: "Redis", level: 78 },
    ],
  },
  {
    title: "AI & GenAI",
    skills: [
      { label: "Azure OpenAI / AI Foundry", level: 88 },
      { label: "Embeddings & Prompt Engineering", level: 85 },
      { label: "YOLOv8", level: 75 },
      { label: "Claude Code / Copilot / Codex", level: 90 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { label: "Azure Functions / Container Apps", level: 88 },
      { label: "Docker & Kubernetes", level: 82 },
      { label: "GitLab CI/CD / GitHub Actions", level: 85 },
      { label: "Grafana / Lens Observability", level: 78 },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <SectionDivider image="/images/about-bg.jpg" numeral="1">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 text-center">
          <FadeInSection>
            <DriverBadge label="About" />
            <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-6xl">
              Built For The Limit.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-silver/80">
              I don&apos;t build software to blend in — I build it to win.
              Full Stack Software Engineer with 3.5 years shipping
              production web and AI systems on React, Next.js, Node.js and
              Azure. I don&apos;t care what others think is possible; I care
              about what&apos;s achievable with the machine in front of me.
              Never afraid to take the risk, always pushing engineering
              boundaries, and leading the team through every corner of the
              race.
            </p>
          </FadeInSection>
        </div>
      </SectionDivider>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <FadeInSection>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-rb-yellow">
            Telemetry
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            Skill Throttle
          </h2>
        </FadeInSection>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {SKILL_GROUPS.map((group, gi) => (
            <FadeInSection key={group.title} delay={gi * 0.1}>
              <h3 className="mb-5 font-display text-lg font-semibold text-white">
                {group.title}
              </h3>
              <div className="space-y-5">
                {group.skills.map((s) => (
                  <ThrottleBar key={s.label} label={s.label} level={s.level} />
                ))}
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.2}>
          <div className="mt-16 border-t border-white/10 pt-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Education
            </h3>
            <p className="mt-2 text-silver/70">
              B.Tech, Electronics and Telecommunication Engineering —
              Avanthi Institute of Engineering and Technology, 2022
            </p>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
