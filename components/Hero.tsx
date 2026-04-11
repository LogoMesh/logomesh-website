"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { GithubIcon } from "./icons/GithubIcon";
import { EASE } from "@/lib/motion";
import { TerminalWindow } from "./TerminalWindow";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden max-w-[1280px] mx-auto px-4 sm:px-8 md:px-10 pt-28 sm:pt-36 md:pt-40 pb-20 md:pb-20">
      {/* Subtle proof-grid dot pattern — fades from top-left where headline lives */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(196,255,0,0.045) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 18% 4%, rgba(0,0,0,0.75) 0%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 18% 4%, rgba(0,0,0,0.75) 0%, transparent 68%)",
        }}
      />
      {/* Kicker */}
      <FadeUp>
        <div className="inline-flex max-w-full flex-wrap items-center gap-2.5 border border-[var(--color-accent)]/25 px-3.5 py-1.5 mb-7 sm:mb-9">
          <span
            className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)]"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.13em] text-[var(--color-accent)]">
            Beta&nbsp;&nbsp;·&nbsp;&nbsp;Python · Free for public repos
          </span>
        </div>
      </FadeUp>

      {/* Headline */}
      <FadeUp delay={0.07}>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,9.2vw,6rem)] sm:text-[clamp(2.75rem,6.8vw,6rem)] font-extrabold leading-[0.93] sm:leading-[0.91] tracking-[-0.04em] text-[var(--color-ink)] mb-3 sm:mb-2">
          Catch the{" "}
          <span
            style={{
              color: "var(--color-danger)",
              textShadow:
                "0 0 36px rgba(255,59,59,0.55), 0 0 70px rgba(255,59,59,0.25)",
            }}
          >
            bug
          </span>
          <br />
          before it ships
          <br />
          to production.
        </h1>
      </FadeUp>

      {/* Serif italic subline */}
      <FadeUp delay={0.12}>
        <p className="font-[family-name:var(--font-serif)] italic text-[clamp(1.2rem,4.5vw,2.375rem)] leading-[1.25] tracking-[-0.02em] text-[var(--color-muted)] mb-8 sm:mb-10">
          On every PR. Automatically.
        </p>
      </FadeUp>

      {/* Body — 3 punchy lines */}
      <FadeUp delay={0.19}>
        <p className="max-w-[480px] text-[16px] sm:text-[17px] leading-[1.85] text-[var(--color-muted)] mb-8 sm:mb-10">
          Infers what your code should{" "}
          <em className="not-italic font-semibold text-[var(--color-ink)]">guarantee</em>.
          Attacks it with adversarial inputs in a hardened Docker sandbox.
          Only posts a PR comment when the crash is{" "}
          <em className="not-italic font-semibold text-[var(--color-ink)]">confirmed</em>.
        </p>
      </FadeUp>

      {/* CTAs */}
      <FadeUp delay={0.26} className="mb-10 sm:mb-12 md:mb-20">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-7">
        <motion.a
          href="https://github.com/apps/logomesh"
          className="relative flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-2.5 bg-[var(--color-accent)] text-black px-6 sm:px-8 py-3.5 sm:py-4 font-[family-name:var(--font-mono)] text-[14px] sm:text-[14.5px] font-bold"
          whileHover={{ x: -2, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{ transition: "none" }}
        >
          <GithubIcon size={16} />
          Install on GitHub — it&rsquo;s free
          {/* Offset shadow */}
          <span
            className="absolute bottom-[-5px] right-[-5px] w-full h-full border border-[var(--color-accent)]/30 pointer-events-none"
            aria-hidden
          />
        </motion.a>

        <span className="flex flex-wrap items-center gap-2.5 text-[12.5px] sm:text-[13px] leading-snug text-[var(--color-muted)] sm:shrink-0">
          <span className="w-5 h-px bg-[var(--color-dim)]" />
          <Image
            src="/california_golden_bears.png"
            alt="California Golden Bears"
            width={35}
            height={15}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          1st place · UC Berkeley AgentBeats · Software Testing Track
        </span>
        </div>

        {/* Speed + safety reassurances */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4">
          {([
            {
              icon: (
                <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden>
                  <path d="M6.5 1L2.5 6.5H5.5L4.5 11L8.5 5.5H5.5L6.5 1Z" fill="#c4ff00" fillOpacity={0.65} />
                </svg>
              ),
              text: "avg. 12s per PR",
            },
            {
              icon: (
                <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden>
                  <circle cx="6" cy="6" r="4.5" stroke="#656575" strokeWidth="1.2" />
                  <circle cx="6" cy="6" r="1.5" fill="#656575" />
                </svg>
              ),
              text: "runs async — never blocks merge",
            },
            {
              icon: (
                <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden>
                  <path
                    d="M4.5 8.5L2 6L4.5 3.5M2 6h6a2 2 0 000-4"
                    stroke="#656575"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              text: "uninstall in 2 clicks",
            },
          ] as const).map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]"
            >
              {icon}
              {text}
            </span>
          ))}
        </div>
      </FadeUp>

      {/* Terminal */}
      <FadeUp delay={0.33}>
        <TerminalWindow />
      </FadeUp>
    </section>
  );
}
