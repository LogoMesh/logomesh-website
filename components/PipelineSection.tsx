"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Infer",
    headline: "Ask what should always be true.",
    body: "LLM reasons about your function's invariants, contracts, and postconditions — not pattern matching, but understanding what the code is meant to guarantee.",
    accent: false,
  },
  {
    n: "02",
    title: "Attack",
    headline: "Actually run the code.",
    body: "Adversarial inputs execute in a hardened Docker sandbox. Airgapped. nobody user. 128 MB RAM. 50 PIDs. No network. No escape from a real crash.",
    accent: false,
  },
  {
    n: "03",
    title: "Prove",
    headline: "Post only when confirmed.",
    body: "LLM validates every crash is caller-reachable before posting. If nothing is confirmed — silence. The absence of a comment is itself a signal.",
    accent: true,
  },
];

export function PipelineSection() {
  return (
    <section
      id="how"
      className="w-full bg-[var(--color-canvas-2)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
      {/* Tag + heading */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-16 md:mb-20"
      >
        <div className="flex items-center gap-3.5 mb-6">
          <span className="font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-accent)]">
            The pipeline
          </span>
          <span className="w-12 h-px bg-[var(--color-border-hi)]" />
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,3.85vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
          Three steps.
          <br />
          <span className="display-subline">One guarantee.</span>
        </h2>
      </motion.div>

      {/* Steps — 3-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-border)" }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            className="relative flex flex-col p-8 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            style={{
              background: s.accent ? "rgba(196,255,0,0.03)" : "var(--color-canvas)",
            }}
          >
            {/* Animated top accent bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] origin-left"
              style={{
                background: s.accent ? "var(--color-accent)" : "var(--color-border-hi)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 + 0.15 }}
            />

            {/* Step number — large, decorative */}
            <span
              className="font-[family-name:var(--font-display)] text-[80px] md:text-[96px] font-extrabold leading-none tracking-[-0.06em] mb-6 select-none"
              style={{
                color: s.accent ? "rgba(196,255,0,0.12)" : "rgba(255,255,255,0.04)",
              }}
              aria-hidden
            >
              {s.n}
            </span>

            {/* Title */}
            <p
              className="font-[family-name:var(--font-mono)] text-[13px] font-extrabold uppercase tracking-[0.14em] mb-4"
              style={{ color: s.accent ? "var(--color-accent)" : "var(--color-muted)" }}
            >
              {s.title}
            </p>

            {/* Headline */}
            <h3 className="font-[family-name:var(--font-display)] text-[21px] md:text-[24px] font-extrabold leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] mb-4">
              {s.headline}
            </h3>

            {/* Body */}
            <p className="text-[14px] leading-[1.72] text-[var(--color-muted)] mt-auto sm:text-[15px] sm:leading-[1.75]">
              {s.body}
            </p>

            {/* Proof node for final step */}
            {s.accent && (
              <div className="mt-8 flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <line x1="6" y1="6" x2="18" y2="6" stroke="#484858" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="6" y2="18" stroke="#484858" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="6" x2="18" y2="18" stroke="#c4ff00" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
                  <line x1="6" y1="18" x2="18" y2="18" stroke="#c4ff00" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
                  <circle cx="6" cy="6" r="2.5" fill="#565668" />
                  <circle cx="18" cy="6" r="2.5" fill="#565668" />
                  <circle cx="6" cy="18" r="2.5" fill="#565668" />
                  <circle cx="18" cy="18" r="3" fill="#c4ff00" style={{ filter: "drop-shadow(0 0 3px rgba(196,255,0,0.9))" }} />
                </svg>
                <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">
                  No comment unless this confirms it
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
