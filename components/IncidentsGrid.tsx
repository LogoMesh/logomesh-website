"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
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
    title: "Transfer debits account before validation — error leaves balance at −$150",
    tag: "state-after-error",
  },
  {
    company: "Stripe",
    title: "UTF-8 merchant name silently corrupted during Latin-1 conversion",
    tag: "encoding · integrity",
  },
  {
    company: "Shopify",
    title: "JPY treated as USD — zero decimal places causes 100× pricing errors",
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
    <section id="problem" className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-10 py-20 md:py-28">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex items-center gap-3.5 mb-7"
      >
        <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Real production incidents
        </span>
        <span className="w-12 h-px bg-[var(--color-border-hi)]" />
      </motion.div>

      {/* Split header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-10 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="font-[family-name:var(--font-display)] text-[clamp(34px,4.2vw,54px)] font-extrabold leading-[0.96] tracking-[-0.04em]"
        >
          The bugs that
          <br />
          code review
          <br />
          <em className="font-[family-name:var(--font-serif)] italic font-normal text-[var(--color-muted)]" style={{ fontStyle: "italic" }}>
            can&rsquo;t see.
          </em>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        >
          <p className="text-[17px] leading-[1.75] text-[var(--color-muted)] mb-5">
            25–35% of production incidents are code bugs catchable before merge.
            These all shipped because reviewers read the diff but couldn&rsquo;t run it.
          </p>
          <span className="block font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-dim)] tracking-[0.04em] mb-5">
            LogoMesh analysis · 20 production postmortems · Apr 2026
          </span>
          <span className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-[var(--color-accent)]">
            <LogoMark size={14} />
            catchable by logomesh
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
            className="relative bg-[var(--color-canvas)] p-6 cursor-default group border-l-2 border-l-transparent hover:border-l-[var(--color-accent)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(196,255,0,0.06)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
            whileHover={{ backgroundColor: "var(--color-canvas-3)" }}
          >
            {/* Catchable dot — pulses on hover */}
            <span
              className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] group-hover:animate-[pulse-dot_2s_ease-in-out_infinite]"
              aria-hidden
            />
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-2.5">
              {inc.company}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[15.5px] font-semibold text-[var(--color-ink)] leading-[1.5] mb-3">
              {inc.title}
            </p>
            {inc.loss && (
              <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold text-[var(--color-danger)] mb-2">
                {inc.loss}
              </p>
            )}
            <span className="inline-block font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-muted)] border border-[var(--color-border-hi)] px-2 py-0.5 mt-1">
              {inc.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
