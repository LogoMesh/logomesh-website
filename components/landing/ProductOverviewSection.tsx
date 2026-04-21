"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { HARNESS_STATS } from "@/lib/marketing-stats";
import { FrameworkTabs } from "./FrameworkTabs";

const STATS = [
  {
    value: `${HARNESS_STATS.confirmedFindings}+`,
    label: "Issues caught with a repro",
  },
  {
    value: `${HARNESS_STATS.uniquePrs}+`,
    label: "Real PRs in our harness runs",
  },
  {
    value: `${HARNESS_STATS.reposRepresented}+`,
    label: "Repositories represented",
  },
] as const;

export function ProductOverviewSection() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="landing-surface-base w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 md:px-10">
        <div className="mx-auto max-w-[42rem]">
          <div className="min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="landing-kicker"
            >
              Product
            </motion.p>
            <motion.h2
              id="overview-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
              className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
            >
              Checks that execute your Python diff on GitHub.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
              className="mt-6 max-w-[38rem] text-pretty text-[18px] leading-[1.65] text-[var(--color-muted)] sm:text-[20px] sm:leading-[1.58]"
            >
              <p>
                It&apos;s a GitHub App. We read the diff, run checks on what changed, and{" "}
                <span className="font-medium text-[var(--color-ink)]">post only when we have a repro</span>. Passing
                checks? No comment. That&apos;s the deal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
              className="mt-8 flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/80 px-4 py-3.5"
            >
              <span className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] [&_img]:brightness-0 [&_img]:invert">
                <Image
                  src="/branding/stack/github.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain opacity-95"
                />
              </span>
              <p className="text-[16px] leading-relaxed text-[var(--color-muted)] sm:text-[17px]">
                <span className="font-medium text-[var(--color-ink)]">Everything on GitHub</span>
                {": "}
                checks and comments on the PR, not another inbox.
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {STATS.map(({ value, label }, i) => (
                <li
                  key={label}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)] px-4 py-5 text-center sm:text-left"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="landing-stat-num font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.5vw,1.75rem)] font-extrabold tabular-nums"
                  >
                    {value}
                  </motion.p>
                  <p className="mt-2 font-sans text-[14px] leading-snug text-[var(--color-muted)] sm:text-[15px]">
                    {label}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="landing-section-hairline mx-auto mt-14 md:mt-16" aria-hidden />

        <div
          id="scenario-preview"
          className="mx-auto mt-12 max-w-[720px] md:mt-14 scroll-mt-[calc(5rem+env(safe-area-inset-top))]"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center"
          >
            <p className="landing-kicker">Examples</p>
            <p className="mt-3 font-sans text-[19px] font-medium leading-snug text-[var(--color-ink)] sm:text-[21px]">
              Pick a tab. Roughly what a run looks like.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            className="product-frame-shell mt-8 rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/90 p-4 sm:p-5 md:p-6"
          >
            <FrameworkTabs />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
