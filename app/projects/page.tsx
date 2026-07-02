import DriverBadge from "@/components/DriverBadge";
import FadeInSection from "@/components/FadeInSection";
import ProjectCard, { Project } from "@/components/ProjectCard";

const PROJECTS: Project[] = [
  {
    number: "01",
    subtitle: "Role-Aware AI Chatbot",
    title: "SmartConX",
    tech: ["React", "Azure AI Foundry", "OpenAI GPT-4o", "Node.js", "RBAC", "Streaming"],
    bullets: [
      "Integrated Azure AI Foundry with RBAC-aware prompt engineering for a B2B platform — 60% improvement in query resolution and 40% reduction in support tickets across 300+ users.",
      "Sub-2 second perceived latency via streaming responses, fallback flows and system prompt versioning — zero hallucination incidents, +25% user satisfaction.",
      "Architected a stateless Node.js backend with session-aware context management to scale concurrent sessions for 300+ users.",
    ],
  },
  {
    number: "02",
    subtitle: "Bandwidth Utilisation Platform",
    title: "Time Tracker",
    tech: ["Azure Functions", "Azure Static Web Apps", "Cosmos DB", "React", "Node.js", "Claude Code"],
    bullets: [
      "Led end-to-end development of a serverless, event-driven backend on Azure Functions for 300+ employees — zero-downtime scalability and a 30% productivity boost.",
      "Designed a Cosmos DB schema with role-based reporting views and real-time dashboards across 10+ departments — 70% less manual reporting effort.",
      "Deployed the frontend on Azure Static Web Apps with environment-specific builds and routing rules for zero-touch releases.",
    ],
  },
  {
    number: "03",
    subtitle: "Migration & Performance",
    title: "Next.js Migration",
    tech: ["Angular v9", "React", "Next.js", "TypeScript", "Docker", "GitLab CI/CD"],
    bullets: [
      "Migrated a 500+ user AngularJS app to Next.js with App Router, RSC and SSR/SSG hybrid rendering — Lighthouse score 72 → 90+, bounce rate down 30%.",
      "Cut deployment complexity 80% with a multi-stage Dockerfile and GitLab CI/CD, dropping release cycle time from 3 hours to 20 minutes.",
      "Enforced TypeScript strict mode and automated test gates via modular restructuring — 40% fewer post-release bug reports.",
    ],
  },
  {
    number: "04",
    subtitle: "Community Platform Migration",
    title: "Khoros → Gainsight CC",
    tech: ["JavaScript", "Shadow DOM", "Gainsight CC", "Khoros", "Claude Code"],
    bullets: [
      "Led end-to-end delivery for SAP — owned client communication, weekly stakeholder updates, zero missed sprint commitments.",
      "Drove requirements gathering directly with clients, identifying 22 custom feature migration needs with approved POCs — 65% less rework.",
      "Re-engineered DOM cloning/override patterns using document.body appending inside Shadow DOM to unblock a Gainsight CC guardrail — saved ~3 weeks of rework.",
    ],
  },
  {
    number: "05",
    subtitle: "Real-Time Video Object Detection",
    title: "YOLOv8 Pipeline",
    tech: ["YOLOv8", "Python", "OpenCV", "Node.js", "React", "WebSockets", "Claude Code"],
    bullets: [
      "Frame-by-frame inference across 10+ object classes at 30+ FPS, streamed live to the browser via WebSockets.",
      "Node.js WebSocket server bridging a Python inference layer to a React frontend — sub-200ms end-to-end detection latency.",
      "Architected as a 4-stage modular pipeline (capture, infer, stream, display) with plans to package as a standalone SaaS product.",
    ],
    link: { label: "View on GitHub", href: "https://github.com/pavan-459/yolo-video-detection" },
  },
  {
    number: "06",
    subtitle: "Enterprise Community Data Migration",
    title: "Mass Extraction Pipeline",
    tech: ["Node.js", "Azure Blob Storage", "ETL", "Data Migration", "Scripting"],
    bullets: [
      "Built Node.js extraction scripts to pull an entire enterprise community's data — 30+ lakh (3M+) rows — across 12+ client platforms including STM, Esri, 1Password, Zoom, SAP, Gainsight, Khoros, Aurora and Higher Logic Vanilla.",
      "Engineered a processing and translation pipeline to normalize wildly different source schemas before landing clean data in Azure Blob Storage.",
      "Delivered the full extract-transform-load cycle end-to-end in under 1 week — a repeatable migration pattern later reused across 20+ client engagements.",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <FadeInSection>
        <DriverBadge label="The Garage" />
        <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-6xl">
          Projects On The Board
        </h1>
        <p className="mt-4 max-w-2xl text-silver/70">
          A handful of flagship builds from 20+ projects across 12+
          enterprise clients — one mentality throughout: ship fast, ship
          right, and never settle for the safe line.
        </p>
      </FadeInSection>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <FadeInSection key={p.title} delay={i * 0.08}>
            <ProjectCard project={p} />
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
