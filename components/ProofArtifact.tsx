"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { GitHubComment } from "./GitHubComment";

export function ProofArtifact() {
  return (
    <section
      id="proof"
      className="relative w-full overflow-hidden border-t border-[var(--color-border)] py-24 sm:py-32 md:py-40"
    >
      {/* Atmospheric backdrop — cool top fade so the GH comment reads as "shipped evidence" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(56,139,253,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1080px] px-6 sm:px-10">
        {/* Section kicker */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          <span
            aria-hidden
            className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-[var(--color-accent)] align-middle"
            style={{ boxShadow: "0 0 12px rgba(196,255,0,0.55)" }}
          />
          The comment, not the pitch
        </motion.p>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
          className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-[36px] font-[650] leading-[1.02] tracking-[-0.03em] text-[var(--color-ink)] sm:text-[52px] md:text-[64px]"
        >
          This is what LogoMesh posts.{" "}
          <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--color-muted)]">
            Nothing else.
          </span>
        </motion.h2>

        {/* Lede */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
          className="mt-6 max-w-[40rem] text-[16.5px] leading-[1.6] text-[var(--color-muted)] sm:text-[18px]"
        >
          A real finding on{" "}
          <span className="text-[var(--color-ink)] font-medium">aiohttp</span>,
          filed during our public-repo pilot. If LogoMesh can&rsquo;t reproduce
          the crash, it stays silent. No trust score. No &ldquo;maybe.&rdquo;
          Just the bug.
        </motion.p>

        {/* The artifact — framed on mobile with gutter, floats on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
          className="relative mt-14 sm:mt-16"
        >
          {/* Soft halo behind the GH comment */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(196,255,0,0.06) 0%, transparent 70%)",
            }}
          />
          <GitHubComment />
        </motion.div>

        {/* Caption strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-col gap-2 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[var(--color-dim)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Posted to a public pull request · aio-libs/aiohttp</span>
          <span>
            Fix shipped in{" "}
            <span className="text-[var(--color-muted)]">under 20 minutes</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
