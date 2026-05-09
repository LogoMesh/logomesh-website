"use client";

import { useRef } from "react";
import { ArtifactShowcase } from "./ArtifactShowcase";
import { AuroraField } from "./AuroraField";
import { useFadeUp } from "@/lib/animations";

const CALLOUTS = [
  {
    label: "The failing test",
    body: "A pytest that reproduces the crash against your current code. Commits straight to a draft GitHub PR.",
  },
  {
    label: "The frame locals",
    body: "The exact arguments captured at the moment of failure. Synthesis is deterministic from those values — PII redacted before anything touches an LLM.",
  },
  {
    label: "The audit artifact",
    body: "A JSON evidence chain mapped to PCI DSS 12.10.5 and SOC2 CC7.3 + CC7.4 — the post-incident response controls your auditor actually asks about.",
  },
] as const;

export function TheCommentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useFadeUp(sectionRef, { y: 24, start: "top 88%" });

  return (
    <section
      ref={sectionRef}
      id="the-comment"
      aria-labelledby="the-comment-heading"
      className="landing-surface-base relative w-full min-w-0 overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <AuroraField className="opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 20%, hsl(78 100% 50% / 0.05) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 85% 85%, hsl(274 72% 55% / 0.045) 0%, transparent 52%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 md:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="landing-kicker">
            What you get back
          </p>
          <h2
            id="the-comment-heading"
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            A failing pytest. The exact arguments. Audit-ready evidence.
          </h2>
          <p className="marketing-lg mx-auto mt-6 max-w-[40rem] text-pretty text-[var(--color-muted)]">
            Your Sentry webhook fires; 60 seconds later you have a test that fails on your current code with the inputs
            your users actually hit, a draft PR against your repo, and a sealed artifact for your compliance reviewer.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1080px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 opacity-80 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(78 100% 50% / 0.14) 0%, transparent 65%)",
              }}
            />
            <div className="relative">
              <ArtifactShowcase />
            </div>
          </div>

          <ol className="order-1 list-none space-y-4 lg:order-2 lg:sticky lg:top-28">
            {CALLOUTS.map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/70 px-5 py-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {item.label}
                </p>
                <p className="mt-2 font-sans text-[16px] leading-relaxed text-[var(--color-ink)] sm:text-[17px]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
