import DriverBadge from "@/components/DriverBadge";
import AnimatedCounter from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";

const ACHIEVEMENTS = [
  {
    metric: 80,
    suffix: "%",
    label: "Lower Deployment Complexity",
    detail:
      "Architected the Angular v9 to React/Next.js migration end-to-end, establishing technical standards and driving all architectural decisions — Lighthouse score climbed from 72 to 90+.",
  },
  {
    metric: 60,
    suffix: "%",
    label: "Better Query Resolution",
    detail:
      "Owned the SmartConX AI chatbot build on Azure AI Foundry and OpenAI — RBAC-aware prompt engineering with sub-2 second streaming responses, cutting support ticket volume by 40%.",
  },
  {
    metric: 50,
    suffix: "%",
    label: "Fewer Deployment Failures",
    detail:
      "Implemented GitLab CI/CD pipelines and monitored Kubernetes clusters via Lens and Grafana, containerising apps with Docker and enforcing environment parity — release cycle time cut by 80%.",
  },
  {
    metric: 35,
    suffix: "%",
    label: "Lower Bug Regression",
    detail:
      "Enforced TypeScript strict-mode standards and defined code review processes, mentoring junior engineers and introducing automated test gates over a 6-month stretch.",
  },
  {
    metric: 45,
    suffix: "%",
    label: "Faster Initial Load",
    detail:
      "Drove performance optimisation across Next.js applications with code-splitting, lazy loading and React Server Components — Core Web Vitals landed in the top tier.",
  },
];

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <FadeInSection>
        <DriverBadge label="Race History" />
        <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-6xl">
          Software Engineer — iTD Tech
        </h1>
        <p className="mt-2 font-display text-sm uppercase tracking-widest text-silver/60">
          Feb 2023 — Present · Hyderabad, India
        </p>
      </FadeInSection>

      <div className="mt-16 space-y-6">
        {ACHIEVEMENTS.map((a, i) => (
          <FadeInSection key={a.label} delay={i * 0.08}>
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-carbon-light p-6 md:flex-row md:items-center md:p-8">
              <div className="shrink-0 md:w-40">
                <AnimatedCounter
                  value={a.metric}
                  suffix={a.suffix}
                  className="font-display text-5xl font-bold text-rb-yellow"
                />
                <p className="mt-1 text-xs uppercase tracking-widest text-silver/50">
                  {a.label}
                </p>
              </div>
              <div className="hidden h-16 w-px bg-white/10 md:block" />
              <p className="text-silver/80">{a.detail}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
