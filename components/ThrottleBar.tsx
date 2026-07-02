"use client";

import { motion } from "framer-motion";

export default function ThrottleBar({
  label,
  level,
}: {
  label: string;
  level: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-display text-sm uppercase tracking-wide text-silver">
          {label}
        </span>
        <span className="font-display text-xs text-rb-yellow">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-carbon-light">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-rb-navy to-rb-red"
        />
      </div>
    </div>
  );
}
