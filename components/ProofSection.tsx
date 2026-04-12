"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

function ScrollIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FINDINGS = [
  {
    key: "Property",
    value: "Order total should always be ≥ 0",
    valueClass: "text-[#e6edf3]",
  },
  {
    key: "I called",
    value: "checkout(item_id=1, qty=-5)",
    valueClass: "text-[#c4ff00]",
    valueBg: "rgba(196,255,0,0.07)",
  },
  {
    key: "Got",
    value: "Order created with total −$49.95",
    valueClass: "text-[#f85149] font-bold",
    valueBg: "rgba(248,81,73,0.1)",
  },
  {
    key: "Location",
    value: "checkout.py, line 42",
    valueClass: "text-[#8b949e]",
  },
];

function GitHubComment() {
  return (
    <div
      className="border border-[var(--color-border-hi)] overflow-hidden text-left"
      style={{ background: "var(--color-canvas-2)", fontFamily: "var(--font-mono)" }}
    >
      {/* PR thread header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-hi)]"
        style={{ background: "var(--color-canvas-3)" }}
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="w-6 h-6 flex items-center justify-center text-black font-bold text-[11px] flex-shrink-0"
            style={{ background: "#c4ff00" }}>
            LM
          </div>
          <span className="text-[#e6edf3] text-[14px] font-semibold">logomesh</span>
          <span
            className="text-[11px] font-bold px-1.5 py-0.5 border border-[#388bfd]/40"
            style={{ color: "#388bfd", background: "rgba(56,139,253,0.08)" }}
          >
            bot
          </span>
          <span className="text-[#8b949e] text-[12px] hidden xs:block">commented 2 min ago</span>
        </div>
        <span className="text-[12px] text-[#8b949e] hidden sm:block">on checkout.py</span>
      </div>

      {/* Comment body */}
      <div className="px-5 py-5">
        {/* Issue count header — badge pops in */}
          <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5 mb-5 pb-4 border-b border-[var(--color-border-hi)]"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span
            className="font-bold text-[12px] px-2 py-0.5"
            style={{ background: "rgba(248,81,73,0.15)", color: "#f85149", border: "1px solid rgba(248,81,73,0.3)" }}
          >
            1 ISSUE FOUND
          </span>
          <span className="text-[#e6edf3] text-[14px] sm:text-[15px] font-semibold min-w-0 break-words">
            Negative quantity bypasses checkout validation
          </span>
        </motion.div>

        {/* Finding rows — staggered reveal */}
        <div className="space-y-2.5 font-[family-name:var(--font-mono)] text-[13px] sm:text-[14px] leading-[1.65]">
          {FINDINGS.map(({ key, value, valueClass, valueBg }, i) => (
            <motion.div
              key={key}
              className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-2 sm:gap-3"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.15 + i * 0.12 }}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#8b949e] pt-px">
                {key}
              </span>
              <span
                className={`${valueClass} px-1.5 rounded break-all min-w-0`}
                style={valueBg ? { background: valueBg } : undefined}
              >
                {value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-5 pt-4 border-t border-[var(--color-border-hi)] flex flex-wrap items-center gap-x-2 gap-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <span className="text-[12px] text-[#8b949e]">
            Confirmed caller-reachable · 23 tests run ·{" "}
          </span>
          <span
            className="text-[12px] font-bold"
            style={{ color: "#c4ff00" }}
          >
            ✓ reproducible
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export function ProofSection() {
  return (
    <section
      id="proof"
      className="w-full bg-[var(--color-canvas-2)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
      {/* Tag */}
      <ScrollIn>
        <div className="flex items-center gap-3.5 mb-7">
          <span className="font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-accent)]">
            What it looks like on your PR
          </span>
          <span className="w-12 h-px bg-[var(--color-border-hi)]" />
        </div>
      </ScrollIn>

      {/* Split header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-10 md:mb-14">
        <ScrollIn delay={0.06}>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(34px,4.2vw,54px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            Two outcomes.
            <br />
            <em className="font-[family-name:var(--font-serif)] italic font-normal text-[var(--color-muted)] not-italic" style={{ fontStyle: "italic" }}>
              Nothing else.
            </em>
          </h2>
        </ScrollIn>
        <ScrollIn delay={0.12}>
          <p className="text-[17px] leading-[1.75] text-[var(--color-muted)]">
            When a PR has no exploitable bugs, LogoMesh posts nothing.
            When it finds one, you get the exact call it made, the property it violated,
            and exactly what came back. Every comment is a reproducible crash —
            not a suggestion, not a warning.
          </p>
        </ScrollIn>
      </div>

      {/* Two-cell grid */}
      <ScrollIn delay={0.18}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "var(--color-border)" }}
        >
          {/* Clean PR */}
          <div className="bg-[var(--color-canvas)] p-5 md:p-10">
            <p className="font-[family-name:var(--font-mono)] text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-7 flex items-center gap-2.5">
              <span className="text-[var(--color-pass)]">●</span>
              Clean PR — nothing posted
            </p>
            <div
              className="flex flex-col items-center justify-center min-h-[200px] gap-5 relative overflow-hidden"
              style={{
                border: "1px solid rgba(0,232,122,0.15)",
                background: "radial-gradient(ellipse at 50% 60%, rgba(0,232,122,0.04) 0%, transparent 70%)",
              }}
            >
              {/* Big checkmark */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
                <circle cx="24" cy="24" r="23" stroke="rgba(0,232,122,0.2)" strokeWidth="1" />
                <path
                  d="M14 24l7 7 13-14"
                  stroke="var(--color-pass)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0,232,122,0.5))" }}
                />
              </svg>
              <div className="text-center">
                <span className="block font-[family-name:var(--font-mono)] text-[15px] font-semibold text-[var(--color-pass)]">
                  No issues found
                </span>
                <span className="block font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-dim)] mt-1.5">
                  4 files · 23 tests run · staying quiet
                </span>
              </div>
            </div>
            <p className="mt-5 text-[16px] text-[var(--color-muted)] leading-[1.75]">
              Silence is load-bearing. When you don&rsquo;t see a comment,
              you can trust it. The absence of a finding is itself a signal.
            </p>
          </div>

          {/* Bug found — GitHub comment mockup */}
          <div className="bg-[var(--color-canvas)] p-5 md:p-10">
            <p className="font-[family-name:var(--font-mono)] text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] mb-7 flex items-center gap-2.5">
              <span className="text-[var(--color-danger)]">●</span>
              Bug found — PR comment posted
            </p>
            <GitHubComment />
            <p className="mt-5 text-[16px] text-[var(--color-muted)] leading-[1.75]">
              Not a guess — a crash we triggered and confirmed is caller-reachable
              before posting anything. This is exactly what appears on your PR.
            </p>
          </div>
        </div>
      </ScrollIn>
      </div>
    </section>
  );
}
