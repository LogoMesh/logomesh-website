"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Step = {
  n: string;
  icon: string;
  title: string;
  desc: string;
  accent?: boolean;
};

const STEPS: Step[] = [
  {
    n: "01",
    icon: "⌥",
    title: "AST extraction",
    desc: "Parse changed .py files. Extract public functions. Skip _ prefix, stubs, and trivial wrappers.",
  },
  {
    n: "02",
    icon: "◈",
    title: "Property inference",
    desc: "LLM reasons about what the function should always guarantee — invariants, contracts, postconditions.",
  },
  {
    n: "03",
    icon: "⚡",
    title: "Adversarial tests",
    desc: "Generate tests designed to break inferred properties. No try/except. They fail loudly or not at all.",
  },
  {
    n: "04",
    icon: "⬡",
    title: "Sandboxed exec",
    desc: "Run in Docker: airgapped, nobody user, 128 MB RAM, 50 PIDs. No network. No pip install from PR code.",
  },
  {
    n: "05",
    icon: "◎",
    title: "Crash classifier",
    desc: "Parse pytest output. Distinguish property violations, unhandled crashes, and noise.",
  },
  {
    n: "06",
    icon: "⊛",
    title: "LLM validation",
    desc: "Confirm each crash is caller-reachable, not a test artifact. Deduplicate by (input, error type).",
  },
  {
    n: "07",
    icon: "▲",
    title: "Post if proven",
    desc: "Property + input + output confirmed. PR comment posted with exact steps. Otherwise: silence.",
    accent: true,
  },
];

export function PipelineSection() {
  return (
    <section id="how" className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-10 py-16 md:py-24">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex items-center gap-3.5 mb-7"
      >
        <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          The pipeline
        </span>
        <span className="w-12 h-px bg-[var(--color-border-hi)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
        className="mb-2"
      >
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
          Seven steps.
          <br />
          <em className="font-[family-name:var(--font-serif)] italic font-normal text-[var(--color-muted)]" style={{ fontStyle: "italic" }}>
            One guarantee.
          </em>
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-[family-name:var(--font-mono)] text-[15px] text-[var(--color-muted)] mb-12"
      >
        No comment unless step 7 confirms it.
      </motion.p>

      {/* Steps grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px"
        style={{ background: "var(--color-border)" }}
      >
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            className="p-4 sm:p-6 relative"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            style={{
              background: s.accent
                ? "rgba(196,255,0,0.04)"
                : "var(--color-canvas)",
              borderLeft: s.accent
                ? "1px solid rgba(196,255,0,0.18)"
                : undefined,
            }}
          >
            {/* Connecting accent line at top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{ background: s.accent ? "var(--color-accent)" : "var(--color-border-hi)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 + 0.2 }}
            />
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold text-[var(--color-dim)] tracking-[0.1em] mb-4">
              {s.n}
            </p>
            <span className="block text-[22px] leading-none mb-3">{s.icon}</span>
            <p
              className="font-[family-name:var(--font-mono)] text-[14px] font-bold mb-2.5 leading-[1.3]"
              style={{ color: s.accent ? "var(--color-accent)" : "var(--color-ink)" }}
            >
              {s.title}
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[14px] sm:text-[15px] text-[var(--color-muted)] leading-[1.65]">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
