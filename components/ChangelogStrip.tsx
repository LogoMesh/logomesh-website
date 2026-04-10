"use client";

import { motion } from "motion/react";

const CHANGES = [
  { date: "Apr 8, 2026", title: "Sequence tests + setup_code on Property" },
  { date: "Apr 7, 2026", title: "Decimal fuzz + async wrapper + MagicMock fix" },
  { date: "Apr 5, 2026", title: "Attack patterns by param name (qty, path, query)" },
  { date: "Apr 3, 2026", title: "Sandbox streaming exec + 1MB output cap" },
];

export function ChangelogStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[var(--color-border)]"
      style={{ background: "var(--color-canvas-2)" }}
    >
      <div className="max-w-[1280px] mx-auto px-10 py-5 flex items-center gap-8 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <span className="flex-shrink-0 font-[family-name:var(--font-mono)] text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          Changelog
        </span>
        <div className="flex items-center gap-6 flex-shrink-0">
          {CHANGES.map((c, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="font-[family-name:var(--font-mono)] text-[10.5px] text-[var(--color-dim)] whitespace-nowrap">
                {c.date}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--color-muted)] whitespace-nowrap">
                {c.title}
              </span>
              {i < CHANGES.length - 1 && (
                <span className="text-[var(--color-border-hi)] ml-2">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
