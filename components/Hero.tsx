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
    <section className="max-w-[1280px] mx-auto px-10 pt-36 pb-20">
      {/* Kicker */}
      <FadeUp>
        <div className="inline-flex items-center gap-2.5 border border-[var(--color-accent)]/25 px-3.5 py-1.5 mb-9">
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
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(42px,5.5vw,80px)] font-extrabold leading-[0.93] tracking-[-0.04em] text-[var(--color-ink)] mb-1.5">
          Catch the{" "}
          <span
            style={{
              color: "var(--color-danger)",
              textShadow:
                "0 0 28px rgba(255,59,59,0.5), 0 0 60px rgba(255,59,59,0.25)",
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
      <FadeUp delay={0.14}>
        <p className="font-[family-name:var(--font-serif)] italic text-[clamp(24px,3vw,42px)] leading-[1.2] tracking-[-0.02em] text-[var(--color-muted)] mb-11">
          On every PR. Automatically.
        </p>
      </FadeUp>

      {/* Body */}
      <FadeUp delay={0.2}>
        <p className="max-w-[520px] text-[17px] leading-[1.75] text-[var(--color-muted)] mb-11">
          LogoMesh infers what your code{" "}
          <em className="not-italic font-semibold text-[var(--color-ink)]">
            should
          </em>{" "}
          do, then attacks those properties with adversarial inputs in a
          hardened Docker sandbox. When it finds a real crash, you get the exact
          input, exact output, and file location as a PR comment. When it
          doesn&rsquo;t — silence you can trust.
        </p>
      </FadeUp>

      {/* CTAs */}
      <FadeUp delay={0.26} className="mb-20">
        <div className="flex items-center gap-7 flex-wrap">
        <motion.a
          href="https://github.com/apps/logomesh"
          className="relative flex items-center gap-2.5 bg-[var(--color-accent)] text-black px-8 py-4 font-[family-name:var(--font-mono)] text-[14.5px] font-bold"
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

        <span className="flex items-center gap-2.5 text-[13px] text-[var(--color-muted)]">
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
          {[
            { icon: "⚡", text: "avg. 12s per PR" },
            { icon: "⬡", text: "runs async — never blocks merge" },
            { icon: "↩", text: "uninstall in 2 clicks" },
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]"
            >
              <span className="text-[var(--color-dim)]">{icon}</span>
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
