"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { AuroraField } from "./AuroraField";

const CARDS = [
  {
    n: "01",
    title: "Silent on clean PRs",
    body: "No praise spam. No nits. No score. If nothing broke, we say nothing.",
  },
  {
    n: "02",
    title: "Every comment comes with a repro",
    body: "The exact input. The line. The values at the moment it broke. No guesses.",
  },
  {
    n: "03",
    title: "Paste-ready fix test",
    body: "A test that passes only when your fix is right. Goes straight in your suite.",
  },
  {
    n: "04",
    title: "Mutation-checked",
    body: "Every fix test is mutation-checked. If it still passes on the buggy code, we don't post it.",
  },
  {
    n: "05",
    title: "Two independent signals",
    body: "Findings must hit at least two independent checks before we comment. Cuts the noise before you see it.",
  },
  {
    n: "06",
    title: "Blast radius",
    body: "We tell you which callers hit the broken path. Know what else to review before merge.",
  },
] as const;

export function ProductOverviewSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="landing-surface-base relative w-full min-w-0 overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <AuroraField className="opacity-70" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 md:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="landing-kicker"
          >
            Why LogoMesh
          </motion.p>
          <motion.h2
            id="why-heading"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Proof, not opinions.
          </motion.h2>
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            className="marketing-lg mx-auto mt-6 max-w-[38rem] text-pretty text-[var(--color-muted)]"
          >
            Other tools leave opinions on every PR. We only post when we can show the exact input that broke your code.
          </motion.p>
        </div>

        <motion.ul
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-16 grid max-w-[1180px] gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {CARDS.map(({ n, title, body }, i) => (
            <motion.li
              key={n}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 * i }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/70 p-7 backdrop-blur-sm transition-colors hover:border-[var(--color-border-hi)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(78 100% 50% / 0.06) 0%, transparent 70%)",
                }}
              />
              <p className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-dim)]">
                {n}
              </p>
              <h3 className="relative mt-4 font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.5rem]">
                {title}
              </h3>
              <p className="relative mt-3 text-[15.5px] leading-relaxed text-[var(--color-muted)] sm:text-[16.5px]">
                {body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
