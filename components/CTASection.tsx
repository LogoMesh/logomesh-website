"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useFadeUp } from "@/lib/animations";
import { LOGOMESH_GITHUB_REPO } from "@/lib/product-links";

const START_STEPS = [
  "Install logomesh",
  "Connect your Sentry project",
  "Reproduce your first crash",
  "Export audit-ready evidence",
] as const;

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useFadeUp(sectionRef, { targets: "[data-reveal]", stagger: 0.08, y: 22 });

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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background,opacity] duration-700 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(196,255,0,0.07) 0%, transparent 65%)`,
        }}
      />

      <div className="relative mx-auto w-full min-w-0 max-w-[920px] rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-canvas-2)]/45 px-5 py-12 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:rounded-[2.25rem] sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24">
        <p
          data-reveal
          className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]"
        >
          Get started
        </p>

        <h2
          data-reveal
          className="relative mt-5 font-[family-name:var(--font-display)] text-balance text-[clamp(1.6rem,7.2vw,3.85rem)] sm:text-[clamp(32px,4.6vw,64px)] font-extrabold leading-[0.96] sm:leading-[0.93] tracking-[-0.04em] mb-8 sm:mb-10"
        >
          From Sentry alert to
          <br />
          <span
            className="text-[var(--color-accent)]"
            style={{
              textShadow:
                "0 0 22px rgba(196,255,0,0.55), 0 0 48px rgba(196,255,0,0.35), 0 0 90px rgba(196,255,0,0.2)",
            }}
          >
            verified evidence.
          </span>
        </h2>

        <p
          data-reveal
          className="marketing-lg read-max relative mx-auto mb-10 max-w-[34rem] text-[var(--color-muted)] sm:mb-12 md:text-[1.125rem] md:leading-relaxed"
        >
          Install logomesh, point it at a production crash, and receive a failing test plus an audit record your team
          can stand behind.
        </p>

        <ol
          data-reveal
          aria-label="Getting started"
          className="relative mx-auto mb-12 grid w-full max-w-[38rem] list-none gap-2 sm:grid-cols-2"
        >
          {START_STEPS.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/70 px-3.5 py-2.5 text-left"
            >
              <span
                aria-hidden
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] font-[family-name:var(--font-mono)] text-[11px] font-bold text-[var(--color-accent)]"
              >
                0{i + 1}
              </span>
              <span className="font-sans text-[14px] font-medium text-[var(--color-ink)] sm:text-[14.5px]">
                {step}
              </span>
            </li>
          ))}
        </ol>

        <motion.div data-reveal className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <motion.a
            href="/docs/quickstart"
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[var(--color-accent)] px-8 py-4 font-[family-name:var(--font-mono)] text-[15px] font-bold text-black shadow-[0_12px_40px_-12px_rgba(196,255,0,0.35)] sm:min-h-[60px] sm:w-auto sm:px-12 sm:py-5 sm:text-[16px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get started
            <ArrowRight size={18} className="-mr-1 opacity-70" />
          </motion.a>

          <motion.a
            href={LOGOMESH_GITHUB_REPO}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[var(--color-border-hi)] bg-transparent px-6 font-[family-name:var(--font-mono)] text-[13.5px] font-bold uppercase tracking-wide text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/55 hover:text-[var(--color-ink)] sm:min-h-[60px]"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            View on GitHub
          </motion.a>
        </motion.div>

        <p
          data-reveal
          className="relative mt-10 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-dim)] sm:mt-12 sm:text-[14px]"
        >
          Open source · MIT license · Python 3.11+
        </p>
      </div>
    </section>
  );
}
