"use client";

import { motion } from "framer-motion";

export type Project = {
  number: string;
  title: string;
  subtitle: string;
  tech: string[];
  bullets: string[];
  link?: { label: string; href: string };
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-light p-6 md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-8xl font-bold text-white/5 transition-colors group-hover:text-rb-red/10"
      >
        {project.number}
      </div>

      <div className="relative">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-rb-yellow">
          {project.subtitle}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold text-white">
          {project.title}
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-silver/80">
          {project.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rb-red" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-silver/70"
            >
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wide text-rb-yellow hover:text-white transition-colors"
          >
            {project.link.label} →
          </a>
        )}
      </div>
    </motion.div>
  );
}
