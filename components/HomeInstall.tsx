"use client";

import { motion } from "motion/react";
import { GithubIcon } from "./icons/GithubIcon";
import { EASE } from "@/lib/motion";

export function HomeInstall() {
  return (
    <section
      id="install"
      className="relative w-full overflow-hidden border-t border-[var(--color-border)] px-4 py-12 text-center sm:px-6 sm:py-14 md:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,255,0,0.06) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[var(--color-ink)]"
      >
        Install on GitHub
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.06 }}
        className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]"
      >
        Free for public repos. No configuration. Runs on your next PR.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="relative mt-8"
      >
        <motion.a
          href="https://github.com/apps/logomesh"
          className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-5 py-3 text-[15px] font-semibold text-black sm:px-6 sm:text-[16px]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GithubIcon size={18} />
          Install on GitHub — it&rsquo;s free
        </motion.a>
      </motion.div>

      <p className="relative mt-5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]">
        Private repos coming soon
      </p>
    </section>
  );
}
