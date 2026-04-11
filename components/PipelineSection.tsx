"use client";

import type React from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Step = {
  n: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent?: boolean;
};

const STEPS: Step[] = [
  {
    n: "01",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="9" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="9" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "AST extraction",
    desc: "Parse changed .py files. Extract public functions. Skip _ prefix, stubs, and trivial wrappers.",
  },
  {
    n: "02",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
      </svg>
    ),
    title: "Property inference",
    desc: "LLM reasons about what the function should always guarantee — invariants, contracts, postconditions.",
  },
  {
    n: "03",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <path d="M11 2L5 11H9.5L8 18L15 9H10.5L11 2Z" fill="currentColor" fillOpacity={0.9} />
      </svg>
    ),
    title: "Adversarial tests",
    desc: "Generate tests designed to break inferred properties. No try/except. They fail loudly or not at all.",
  },
  {
    n: "04",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <path d="M10 2L17.3 6V14L10 18L2.7 14V6L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 7V13M7 8.5L10 7L13 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sandboxed exec",
    desc: "Run in Docker: airgapped, nobody user, 128 MB RAM, 50 PIDs. No network. No pip install from PR code.",
  },
  {
    n: "05",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="13.5" y1="13.5" x2="17.5" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="7" x2="9" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Crash classifier",
    desc: "Parse pytest output. Distinguish property violations, unhandled crashes, and noise.",
  },
  {
    n: "06",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10L9.5 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "LLM validation",
    desc: "Confirm each crash is caller-reachable, not a test artifact. Deduplicate by (input, error type).",
  },
  {
    n: "07",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden>
        <circle cx="15" cy="15" r="3.5" fill="#c4ff00" style={{ filter: "drop-shadow(0 0 3px rgba(196,255,0,0.9))" }} />
        <line x1="4" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={0.5} />
        <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity={0.5} />
        <line x1="12" y1="4" x2="12" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="4" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="4" cy="4" r="2" fill="currentColor" fillOpacity={0.35} />
        <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity={0.35} />
        <circle cx="4" cy="12" r="2" fill="currentColor" fillOpacity={0.35} />
      </svg>
    ),
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
        className="font-[family-name:var(--font-mono)] text-[15px] text-[var(--color-muted)] mb-8 sm:mb-12"
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
            <span
              className="block mb-3.5"
              style={{ color: s.accent ? "var(--color-accent)" : "var(--color-muted)" }}
            >
              {s.icon}
            </span>
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
