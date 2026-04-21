"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { HARNESS_STATS } from "@/lib/marketing-stats";
import { LogoMark } from "./LogoMark";

type Incident = {
  company: string;
  title: string;
  loss?: string;
  tag: string;
};

const INCIDENTS: Incident[] = [
  {
    company: "Stripe",
    title: "Timeout + retry without idempotency key charges customers twice",
    tag: "double-apply",
  },
  {
    company: "Uber",
    title: "Surge multiplier < 1.0 plus coupon produces negative fare total",
    loss: "$0.00 fare on $18 ride",
    tag: "boundary · property",
  },
  {
    company: "Auth0",
    title: "Email verification status persists after address change",
    tag: "order-dependence",
  },
  {
    company: "GitHub",
    title: "Repository IDs above 2³¹ bypass auth check via integer overflow",
    tag: "boundary · auth bypass",
  },
  {
    company: "Fintech",
    title: "Transfer debits account before validation. Error leaves balance at -$150",
    tag: "state-after-error",
  },
  {
    company: "Stripe",
    title: "UTF-8 merchant name silently corrupted during Latin-1 conversion",
    tag: "encoding · integrity",
  },
  {
    company: "Shopify",
    title: "JPY treated as USD. Zero decimal places causes 100× pricing errors",
    tag: "precision · boundary",
  },
  {
    company: "Knight Capital",
    title: "Repurposed feature flag activates dead code path",
    loss: "$440,000,000 in 45 min",
    tag: "state consistency",
  },
];

export function IncidentsGrid() {
  return (
    <section
      id="examples"
      className="w-full overflow-x-hidden py-16 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex items-center gap-3.5 mb-6 sm:mb-7"
      >
        <span className="font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-accent)]">
          The cost of &ldquo;looks fine to me&rdquo;
        </span>
        <span className="w-12 h-px bg-[var(--color-border-hi)]" />
      </motion.div>

      {/* Split header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-start mb-8 sm:mb-10 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="font-[family-name:var(--font-display)] text-[clamp(30px,3.85vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em]"
        >
          Regressions do not
          <br />
          arrive with a
          <br />
          <span className="display-subline">warning label.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        >
          <p className="read-max text-[15px] leading-[1.72] text-[var(--color-muted)] sm:text-[16px] sm:leading-[1.75] mb-4 sm:mb-5">
            Your reviewers are human: they miss edge cases, bad state, and off-by-ones
            under time pressure. The stories on the grid are famous public postmortems. The
            kind of damage a single bad merge can still do. LogoMesh is built to surface
            that class of bug before it becomes your weekend.
          </p>
          <div className="mb-5 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] px-4 py-3 sm:px-5 sm:py-4">
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)] mb-2">
              Why you can believe us
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13px] leading-relaxed text-[var(--color-ink)]">
              We have already run {HARNESS_STATS.uniquePrs}+ real OSS pull requests from{" "}
              {HARNESS_STATS.reposRepresented} repos through LogoMesh and recorded{" "}
              {HARNESS_STATS.confirmedFindings}+ confirmed issues before we ask you to bet
              your own repo on it.
            </p>
          </div>
          <p className="mb-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[var(--color-dim)] tracking-[0.03em]">
            The grid is just context: famous incidents, not LogoMesh tickets on those
            companies.
          </p>
          <span className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-[0.1em] text-[var(--color-accent)]">
            <LogoMark size={14} />
            That is what we are trying to catch for you
          </span>
        </motion.div>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: "var(--color-border)" }}
      >
        {INCIDENTS.map((inc, i) => (
          <motion.div
            key={i}
            className="relative bg-[var(--color-canvas)] p-5 sm:p-6 cursor-default group border-l-2 border-l-transparent transition-colors duration-200 md:hover:border-l-[var(--color-accent)] md:hover:bg-[var(--color-canvas-3)] md:hover:shadow-[0_0_24px_rgba(196,255,0,0.06)] active:bg-[var(--color-canvas-3)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.15 }}
            transition={{ duration: 0.4, ease: EASE, delay: Math.min(i, 5) * 0.04 }}
          >
            {/* Catchable dot — pulse only on fine-pointer hover (avoids iOS touch jank) */}
            <span
              className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] md:group-hover:animate-[pulse-dot_2s_ease-in-out_infinite]"
              aria-hidden
            />
            <p className="font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13.5px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-2.5">
              {inc.company}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[14.5px] sm:text-[15.5px] font-semibold text-[var(--color-ink)] leading-[1.55] mb-3 break-words hyphens-auto">
              {inc.title}
            </p>
            {inc.loss && (
              <p className="font-[family-name:var(--font-mono)] text-[12px] sm:text-[13px] font-bold text-[var(--color-danger)] mb-2 break-words">
                {inc.loss}
              </p>
            )}
            <span className="inline-block max-w-full font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)] border border-[var(--color-border-hi)] px-2 py-1 mt-1 break-words">
              {inc.tag}
            </span>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
