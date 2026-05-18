"use client";

import { useRef } from "react";
import { useSplitText, useFadeUp } from "@/lib/animations";

type SummaryStat = {
  label: string;
  value: string;
  hint: string;
};

const SUMMARY_STATS: SummaryStat[] = [
  {
    label: "Repro time",
    value: "60s",
    hint: "from Sentry URL to a failing pytest",
  },
  {
    label: "Engineer time saved",
    value: "30–40 min",
    hint: "per crash vs. manual state reconstruction",
  },
  {
    label: "AI in evidence path",
    value: "0",
    hint: "audit records are deterministic",
  },
  {
    label: "Quality checks",
    value: "500+",
    hint: "automated tests on every release",
  },
];

const SCOPED_PATHS: { path: string; note: string }[] = [
  { path: "billing/", note: "Subscription totals, proration, invoice math." },
  { path: "checkout/", note: "Cart validation, quantity rules, currency conversion." },
  { path: "pricing/", note: "Tier resolution, coupon stacking, tax calculation." },
  { path: "refund/", note: "Refund amounts, partial refunds, off-by-one on totals." },
  { path: "payments/", note: "Charge intent, idempotency, status reconciliation." },
];

const BUG_PATTERNS: string[] = [
  "Off-by-one on a refund total",
  "Negative quantity slipping past validation",
  "Float rounding on a tax calculation",
  "Wrong tier resolved for a coupon stack",
  "Currency mismatch on a partial charge",
];

const OUT_OF_SCOPE: string[] = [
  "Race conditions across async tasks",
  "Distributed transactions that span services",
  "Bugs requiring a live database row to reproduce",
  "Failures from external API timeouts or rate limits",
];

export function RealWorldHarnessSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useSplitText(headingRef);

  const statsRef = useRef<HTMLDivElement>(null);
  useFadeUp(statsRef, { targets: "[data-stat]", stagger: 0.08 });

  return (
    <section
      id="proof"
      aria-labelledby="harness-heading"
      className="landing-surface-muted relative w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.85]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% -30%, hsl(78 100% 50% / 0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 90% 60%, hsl(274 72% 48% / 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-24 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="landing-kicker">Who it&apos;s for</p>
          <h2
            id="harness-heading"
            ref={headingRef}
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Built for high-impact backend incidents.
          </h2>
          <p className="marketing-lg mx-auto mt-6 max-w-[40rem] text-pretty text-[var(--color-muted)]">
            Ideal for deterministic failures — billing math, validation edge cases, and rounding errors that can be
            replayed from captured runtime state.
          </p>
        </div>

        <div
          ref={statsRef}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SUMMARY_STATS.map((s) => (
            <div
              key={s.label}
              data-stat
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/90 px-4 py-4 text-left shadow-[var(--shadow-card)]"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-dim)]">
                {s.label}
              </p>
              <p className="landing-stat-num mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold tabular-nums text-[var(--color-ink)]">
                {s.value}
              </p>
              <p className="mt-1.5 font-sans text-[13px] leading-snug text-[var(--color-muted)]">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <article className="overflow-hidden rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[var(--shadow-card)]">
            <div className="border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/80 px-4 py-3 sm:px-5">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Common crash paths
              </p>
            </div>
            <div className="px-4 py-4 sm:px-5">
              <p className="text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                Crashes in Python business-logic modules — where the bad input is in frame locals — reproduce reliably.
              </p>
              <ul className="mt-4 list-none divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                {SCOPED_PATHS.map((p) => (
                  <li key={p.path} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="shrink-0 font-mono text-[13.5px] font-semibold text-[hsl(var(--syntax-symbol))] sm:w-[6.5rem]">
                      {p.path}
                    </span>
                    <span className="text-[13.5px] leading-snug text-[var(--color-muted)] sm:text-[14px]">
                      {p.note}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 list-none space-y-2">
                {BUG_PATTERNS.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)]/40 px-3 py-2.5"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    />
                    <span className="text-[14px] leading-snug text-[var(--color-ink)]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[var(--shadow-card)]">
            <div className="border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/80 px-4 py-3 sm:px-5">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Where we draw the line
              </p>
            </div>
            <div className="px-4 py-4 sm:px-5">
              <p className="text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                When the root cause depends on shared state, timing, or external systems, logomesh reports that clearly
                instead of claiming a match.
              </p>
              <ul className="mt-4 list-none space-y-2">
                {OUT_OF_SCOPE.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)]/40 px-3 py-2.5"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-border-hi)]"
                    />
                    <span className="text-[14px] leading-snug text-[var(--color-muted)]">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-dim)]">
                In these cases, logomesh returns a structured explanation so your team can triage with confidence — never
                a false positive.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
