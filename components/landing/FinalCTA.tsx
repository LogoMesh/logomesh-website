"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Command } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { EASE } from "@/lib/motion";

export function FinalCTA() {
  return (
    <section
      id="install"
      className="relative w-full overflow-hidden border-t border-border"
      aria-labelledby="final-cta-heading"
    >
      {/* Giant decorative mesh — bleeds off the canvas, reinforces brand mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 20% 120%, hsl(78 100% 50% / 0.16) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 100% -20%, hsl(0 84% 60% / 0.09) 0%, transparent 55%)",
        }}
      />

      {/* Oversized corner mark — off-canvas bleed */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.95, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute -bottom-24 -right-24 z-0 select-none font-[family-name:var(--font-display)] text-[28rem] font-normal leading-none tracking-[-0.06em] text-primary/[0.06] sm:-bottom-32 sm:-right-16 sm:text-[36rem]"
      >
        ◆
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-28 sm:px-8 sm:py-36 md:px-10 md:py-44">
        <div className="max-w-[60rem]">
          {/* Diagonal kicker */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="h-px w-12 bg-primary/70" aria-hidden />
            Last section · final call
          </motion.p>

          {/* Massive brutalist headline */}
          <motion.h2
            id="final-cta-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
            className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.25rem,11vw,9rem)] font-normal leading-[0.88] tracking-[-0.04em] text-foreground sm:leading-[0.86]"
          >
            Stop shipping
            <br />
            <span
              className="text-destructive"
              style={{
                textShadow:
                  "0 0 44px hsl(0 84% 60% / 0.5), 0 0 90px hsl(0 84% 60% / 0.22)",
              }}
            >
              bugs
            </span>
            .
          </motion.h2>

          {/* Editorial sub — single line with italic accent */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="mt-8 max-w-[44rem] text-[17px] leading-[1.6] text-muted-foreground sm:text-[19px]"
          >
            Install LogoMesh on any GitHub repo. The next pull request you open
            gets reviewed by an AI teammate that{" "}
            <span className="italic text-foreground">only speaks</span> when it
            has proof.
          </motion.p>

          {/* CTA row + signature microcopy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <motion.a
              href="https://github.com/apps/logomesh"
              whileHover={{
                y: -2,
                boxShadow: "var(--shadow-glow-hover)",
              }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="glow-primary animate-glow-pulse group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-xl bg-primary px-7 text-[16px] font-semibold text-primary-foreground"
            >
              <GithubIcon size={18} />
              Install on GitHub
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold uppercase tracking-[0.12em] opacity-60">
                free
              </span>
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            <div className="font-[family-name:var(--font-mono)] text-[11.5px] uppercase leading-[1.8] tracking-[0.14em] text-dim">
              <p>
                <span className="text-primary/80">·</span> no credit card
              </p>
              <p>
                <span className="text-primary/80">·</span> free for public repos
              </p>
              <p>
                <span className="text-primary/80">·</span> uninstall in 2 clicks
              </p>
            </div>
          </motion.div>

          {/* Keyboard-shortcut easter-egg badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.45 }}
            className="mt-16 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-dim"
          >
            <span className="inline-flex items-center gap-1 rounded border border-border-strong bg-card/60 px-2 py-1 text-foreground/70">
              <Command size={11} /> K
            </span>
            to jump back to the top · anywhere on the page
          </motion.p>
        </div>
      </div>
    </section>
  );
}
