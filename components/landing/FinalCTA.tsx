"use client";

import { motion } from "motion/react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { EASE } from "@/lib/motion";
import { inViewOnce } from "@/lib/landing-motion";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--background-image-gradient-hero)" }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,4.5rem)] font-extrabold leading-[0.93] tracking-[-0.04em]">
          Stop shipping bugs.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Install the GitHub App once. LogoMesh runs on the next PR—free for
          public repos, no credit card.
        </p>
        <motion.a
          href="https://github.com/apps/logomesh"
          className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-3 bg-primary px-8 py-4 font-mono text-sm font-bold text-primary-foreground shadow-none transition-shadow duration-200 hover:scale-[1.03] hover:shadow-glow-primary sm:text-[15px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <GithubIcon size={18} />
          Install on GitHub — it&rsquo;s free
        </motion.a>
        <p className="mt-6 font-mono text-xs text-muted-foreground sm:text-sm">
          No credit card · Async · Uninstall anytime
        </p>
      </motion.div>
    </section>
  );
}
