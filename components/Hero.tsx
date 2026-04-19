"use client";

import { motion } from "motion/react";
import { GithubIcon } from "./icons/GithubIcon";

export function Hero() {
  return (
    <section className="bg-hero-atmosphere relative overflow-hidden">
      {/* Subtle horizon line — anchors the hero without dot-grid noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(250,250,249,0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36 md:pt-36 md:pb-44">
        {/* Kicker */}
        <p className="rise rise-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          <span
            aria-hidden
            className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-[var(--color-accent)] align-middle"
            style={{ boxShadow: "0 0 12px rgba(196,255,0,0.55)" }}
          />
          Free during beta
        </p>

        {/* Headline */}
        <h1 className="rise rise-2 mt-8 max-w-[18ch] font-[family-name:var(--font-display)] text-[44px] font-[650] leading-[0.98] tracking-[-0.035em] text-[var(--color-ink)] sm:text-[64px] md:text-[84px]">
          Code review
          <br />
          you can{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic tracking-[-0.02em]">
              trust
            </span>
            <span
              aria-hidden
              className="accent-draw absolute -bottom-[0.08em] left-0 right-0 h-[6px] rounded-full bg-[var(--color-accent)]"
              style={{ boxShadow: "0 0 22px rgba(196,255,0,0.35)" }}
            />
          </span>
          .
        </h1>

        {/* Subcopy */}
        <p className="rise rise-3 mt-8 max-w-[36rem] text-[17px] leading-[1.55] text-[var(--color-muted)] sm:text-[19px]">
          LogoMesh reads your pull requests, runs them safely, and only comments
          when it finds a real bug.{" "}
          <span className="text-[var(--color-ink)]">
            Zero false positives across 14 open-source projects.
          </span>
        </p>

        {/* CTA row */}
        <div className="rise rise-4 mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
          <motion.a
            href="https://github.com/apps/logomesh"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[var(--color-primary)] px-6 text-[15px] font-[550] text-[#0a0a0b] hover:bg-[var(--color-primary-hi)]"
          >
            <GithubIcon size={17} />
            Install on GitHub
            <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium text-[#0a0a0b]/55">
              — free
            </span>
          </motion.a>

          <a
            href="#proof"
            className="group inline-flex items-center gap-2 text-[14.5px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <span className="border-b border-dotted border-[var(--color-dim)] pb-[2px] group-hover:border-[var(--color-ink)]">
              See a real finding
            </span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Micro-proof line */}
        <p className="rise rise-5 mt-8 font-[family-name:var(--font-mono)] text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-dim)]">
          No config
          <span className="mx-3 text-[var(--color-border-hi)]">/</span>
          60-second install
          <span className="mx-3 text-[var(--color-border-hi)]">/</span>
          Python repos today
        </p>
      </div>
    </section>
  );
}
