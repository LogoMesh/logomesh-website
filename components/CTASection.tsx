"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { GithubIcon } from "./icons/GithubIcon";
import { EASE, EASE_SOFT } from "@/lib/motion";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="landing-surface-raised relative w-full min-w-0 overflow-hidden border-t border-[var(--color-border)] px-4 py-20 text-center sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-14 lg:py-36"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background,opacity] duration-700 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(196,255,0,0.07) 0%, transparent 65%)`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full min-w-0 max-w-[920px] rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-canvas-2)]/45 px-5 py-12 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:rounded-[2.25rem] sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_SOFT }}
          className="relative font-[family-name:var(--font-display)] text-balance text-[clamp(1.6rem,7.2vw,3.85rem)] sm:text-[clamp(32px,4.6vw,64px)] font-extrabold leading-[0.96] sm:leading-[0.93] tracking-[-0.04em] mb-10 sm:mb-12"
        >
          Add it to
          <br />
          <span
            className="text-[var(--color-accent)]"
            style={{
              textShadow:
                "0 0 22px rgba(196,255,0,0.55), 0 0 48px rgba(196,255,0,0.35), 0 0 90px rgba(196,255,0,0.2)",
            }}
          >
            a repo you use
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_SOFT, delay: 0.1 }}
          className="marketing-lg read-max relative mx-auto mb-12 max-w-[30rem] text-[var(--color-muted)] sm:mb-14 md:text-[1.125rem] md:leading-relaxed"
        >
          Free on public repos during beta. Install once, open a Python PR, follow checks and comments on the thread. No
          YAML.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="relative"
        >
          <motion.a
            href="https://github.com/apps/logomesh"
            className="inline-flex min-h-[56px] items-center gap-3.5 bg-[var(--color-accent)] px-8 py-4 text-black font-[family-name:var(--font-mono)] text-[15px] font-bold sm:min-h-[60px] sm:px-14 sm:py-5 sm:text-[16px] w-full sm:w-auto justify-center max-w-md sm:max-w-none mx-auto rounded-xl shadow-[0_12px_40px_-12px_rgba(196,255,0,0.35)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GithubIcon size={20} />
            Install on GitHub, free in beta
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="relative mt-10 font-[family-name:var(--font-mono)] text-[14px] text-[var(--color-dim)] sm:mt-12 sm:text-[15px]"
        >
          Private repos on the roadmap · No YAML
        </motion.p>
      </div>
    </section>
  );
}
