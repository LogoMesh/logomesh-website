"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const BULLETS = [
  "Deterministic repro from your Sentry events",
  "PCI DSS 12.10.5 · SOC2 CC7.3 / CC7.4 evidence path, sealed",
  "Works with your existing Sentry + GitHub setup",
] as const;

export function Step1Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        Pilot v1 — invite-only
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,3.6vw,2.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
        Sealed crash reproduction
        <br />
        <span className="text-[var(--color-accent)]">in 4 minutes.</span>
      </h1>
      <p className="mt-5 text-[16px] leading-[1.7] text-[var(--color-muted)]">
        When Sentry fires, LogoMesh reproduces the crash deterministically in a
        sandbox and posts a sealed PCI/SOC2 evidence artifact back to your
        Sentry issue and a draft GitHub PR. No LLM in the evidence path. The
        kind of audit your compliance reviewer signs off on without questions.
      </p>

      <ul className="mt-8 space-y-3">
        {BULLETS.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-[15px] leading-[1.6] text-[var(--color-ink)]"
          >
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-4">
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-[56px] items-center gap-3 rounded-xl bg-[var(--color-accent)] px-8 py-4 text-black font-[family-name:var(--font-mono)] text-[15px] font-bold shadow-[0_12px_40px_-12px_rgba(196,255,0,0.4)]"
        >
          Get started
          <ArrowRight size={18} className="-mr-1 opacity-70" />
        </motion.button>
        <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]">
          Pilot v1. Currently invite-only.
        </p>
      </div>
    </div>
  );
}
