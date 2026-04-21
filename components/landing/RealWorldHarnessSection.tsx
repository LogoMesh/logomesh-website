"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { EASE } from "@/lib/motion";
import {
  HARNESS_AGGREGATE,
  HARNESS_SHOWCASE,
  type HarnessShowcaseRow,
} from "@/lib/harness-public.generated";
import { AnimatedNumber } from "./AnimatedNumber";

function prUrl(row: HarnessShowcaseRow): string {
  return `https://github.com/${row.repo}/pull/${row.prNumber}`;
}

const SUMMARY_STATS = [
  {
    label: "Bugs caught",
    value: HARNESS_AGGREGATE.confirmedFindingsSum,
    suffix: "",
    hint: "confirmed, reproducible",
  },
  {
    label: "Pull requests",
    value: HARNESS_AGGREGATE.uniquePullRequests,
    suffix: "",
    hint: "across open source Python",
  },
  {
    label: "Repositories",
    value: HARNESS_AGGREGATE.distinctRepos,
    suffix: "",
    hint: "real projects, not toys",
  },
  {
    label: "Comments posted",
    value: HARNESS_AGGREGATE.fileRowsWithPrComment,
    suffix: "",
    hint: "only when we had proof",
  },
] as const;

export function RealWorldHarnessSection() {
  const reducedMotion = useReducedMotion();

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
          <motion.p
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="landing-kicker"
          >
            Proof
          </motion.p>
          <motion.h2
            id="harness-heading"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Real PRs. Real bugs. Real repos.
          </motion.h2>
          <motion.p
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            className="marketing-lg mx-auto mt-6 max-w-[40rem] text-pretty text-[var(--color-muted)]"
          >
            {HARNESS_AGGREGATE.confirmedFindingsSum} confirmed bugs across {HARNESS_AGGREGATE.uniquePullRequests} pull
            requests in {HARNESS_AGGREGATE.distinctRepos} open source Python projects. Click any row to see the PR.
          </motion.p>
        </div>

        <motion.ul
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SUMMARY_STATS.map((s) => (
            <li
              key={s.label}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/90 px-4 py-4 text-left shadow-[var(--shadow-card)]"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-dim)]">
                {s.label}
              </p>
              <p className="landing-stat-num mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold tabular-nums text-[var(--color-ink)]">
                <AnimatedNumber value={s.value} />
                {s.suffix}
              </p>
              <p className="mt-1.5 font-sans text-[13px] leading-snug text-[var(--color-muted)]">{s.hint}</p>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.58, ease: EASE, delay: 0.1 }}
          className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[var(--shadow-card)]"
        >
          <div className="border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/80 px-4 py-3 sm:px-5">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              A sample. One PR per repo.
            </p>
          </div>

          <div className="hidden md:block">
            <table className="w-full border-collapse text-left font-sans text-[14px]">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/40 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-dim)]">
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    Repository
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    PR
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    File
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-5">
                    Confirmed
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                    <span className="sr-only">Open on GitHub</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {HARNESS_SHOWCASE.map((row, i) => (
                  <tr
                    key={`${row.repo}-${row.prNumber}`}
                    title={row.title}
                    className={
                      i % 2 === 0
                        ? "border-b border-[var(--color-border)]/80 bg-[var(--color-canvas-2)]/50"
                        : "border-b border-[var(--color-border)]/80 bg-[var(--color-canvas-2)]/30"
                    }
                  >
                    <td className="max-w-[14rem] px-4 py-3.5 font-mono text-[13px] text-[var(--color-ink)] sm:px-5">
                      {row.repo}
                    </td>
                    <td className="px-4 py-3.5 text-[var(--color-muted)] sm:px-5">#{row.prNumber}</td>
                    <td className="px-4 py-3.5 font-mono text-[13px] text-[hsl(var(--syntax-symbol))] sm:px-5">
                      {row.fileBasename}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-primary sm:px-5">
                      {row.confirmedFindings}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <a
                        href={prUrl(row)}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary hover:underline"
                      >
                        View
                        <ExternalLink size={13} className="opacity-80" aria-hidden />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-[var(--color-border)] md:hidden">
            {HARNESS_SHOWCASE.map((row) => (
              <li key={`${row.repo}-${row.prNumber}`} className="px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[13px] font-semibold text-[var(--color-ink)]">{row.repo}</p>
                    <p className="mt-1 text-[13px] text-[var(--color-muted)]">
                      #{row.prNumber} ·{" "}
                      <span className="font-mono text-[hsl(var(--syntax-symbol))]">{row.fileBasename}</span>
                    </p>
                    <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-[var(--color-muted)]">{row.title}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="rounded-md bg-primary/15 px-2 py-1 font-mono text-[13px] font-bold tabular-nums text-primary">
                      {row.confirmedFindings}
                    </span>
                    <a
                      href={prUrl(row)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary"
                    >
                      PR
                      <ExternalLink size={12} aria-hidden />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
