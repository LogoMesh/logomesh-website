"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * Set `NEXT_PUBLIC_DEMO_GIF` to a path (e.g. `/demo.gif` after adding `public/demo.gif`)
 * or a full URL. When unset, no GIF is requested (avoids 404 noise in devtools).
 */
const DEMO_GIF_SRC = process.env.NEXT_PUBLIC_DEMO_GIF?.trim() ?? "";

function PlaceholderFrame() {
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-4 px-5 py-8 text-center sm:px-8"
      style={{
        background: `
          radial-gradient(ellipse 85% 55% at 50% 0%, rgba(196, 255, 0, 0.07) 0%, transparent 52%),
          linear-gradient(180deg, var(--color-canvas-4) 0%, var(--color-canvas) 100%)`,
      }}
    >
      <div
        className="landing-icon-bright flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-16 sm:w-16"
        aria-hidden
      >
        <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.2} />
      </div>
      <div className="max-w-[26rem] space-y-2">
        <p className="font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--color-dim)]">
          Motion capture
        </p>
        <p className="font-sans text-[17px] font-semibold leading-snug text-[var(--color-ink)] sm:text-[18px]">
          Drop a screen recording here
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]">
          Record install, PR, checks, comment. Export a short GIF or WebM and set{" "}
          <code className="landing-code-line rounded bg-[var(--color-canvas-2)] px-1.5 py-0.5 font-mono text-[13px] sm:text-[14px]">
            NEXT_PUBLIC_DEMO_GIF
          </code>
          .
        </p>
      </div>
    </div>
  );
}

export function DemoSection() {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [gifFailed, setGifFailed] = useState(false);
  const gifEnabled = DEMO_GIF_SRC.length > 0;

  return (
    <section
      id="demo"
      className="landing-surface-base section-y w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-8 text-center sm:mb-10 md:mb-12"
        >
          <div className="landing-section-hairline mb-8 sm:mb-10" aria-hidden />
          <span className="landing-kicker inline-block px-3">Roughly one minute</span>
          <h2 className="mt-4 px-3 font-[family-name:var(--font-display)] text-[clamp(1.5rem,5vw,2.35rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--color-ink)] sm:px-4">
            Install, PR, thread
          </h2>
          <p className="read-max mx-auto mt-4 px-3 text-center text-balance text-[18px] leading-snug text-[var(--color-muted)] sm:px-4 sm:text-[19px]">
            Add LogoMesh to a repo, open or update a Python PR, and watch checks run. If something breaks, it lands on
            the PR, not in another tool.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="mx-auto w-full min-w-0 max-w-[920px] sm:mx-auto"
        >
          <div className="product-frame-shell overflow-hidden rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] sm:rounded-2xl">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)] px-2.5 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
              <div className="flex shrink-0 gap-1 sm:gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]/90 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]/90 sm:h-2.5 sm:w-2.5" />
              </div>
              <div className="min-w-0 flex-1 flex justify-center px-1">
                <span className="w-full truncate rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] px-2 py-1 text-center font-mono text-[11px] leading-tight text-[var(--color-dim)] sm:w-auto sm:px-3 sm:py-1.5 sm:text-[13px]">
                  <span className="sm:hidden">github.com / PR / LogoMesh</span>
                  <span className="hidden sm:inline">github.com/pulls / LogoMesh</span>
                </span>
              </div>
              <span className="w-8 shrink-0 sm:w-12 md:w-14" aria-hidden />
            </div>

            <div className="relative w-full bg-[var(--color-canvas)] aspect-video max-h-[min(52svh,340px)] sm:max-h-none">
              {gifEnabled && !gifFailed && (
                <img
                  src={DEMO_GIF_SRC}
                  alt="LogoMesh demo of install and PR comment flow"
                  className={
                    gifLoaded
                      ? "absolute inset-0 z-[1] h-full w-full object-cover object-top"
                      : "absolute inset-0 z-0 h-full w-full object-cover opacity-0"
                  }
                  onLoad={() => setGifLoaded(true)}
                  onError={() => setGifFailed(true)}
                />
              )}
              {(!gifEnabled || !gifLoaded || gifFailed) && <PlaceholderFrame />}
            </div>
          </div>

          <p className="mt-4 px-1 text-center font-mono text-[12px] leading-snug text-[var(--color-dim)] sm:mt-5 sm:text-[13px] sm:leading-normal">
            Placeholder until you add a real clip. No audio. Looped preview.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
