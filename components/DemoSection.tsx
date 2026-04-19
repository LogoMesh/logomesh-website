"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/** Place `/public/demo.gif` (or change path) to show your screen recording. */
const DEMO_GIF_SRC = "/demo.gif";

function PlaceholderFrame() {
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:gap-4 sm:px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(196, 255, 0, 0.06) 0%, transparent 55%), linear-gradient(180deg, var(--color-canvas-4) 0%, var(--color-canvas) 100%)",
      }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] shadow-[0_0_32px_rgba(196,255,0,0.08)] sm:h-14 sm:w-14 sm:rounded-2xl"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-[var(--color-accent)] sm:h-7 sm:w-7"
        >
          <path
            d="M9 7.5v9l7.5-4.5L9 7.5z"
            fill="currentColor"
            opacity={0.9}
          />
        </svg>
      </div>
      <div>
        <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[var(--color-ink)] sm:text-[13px]">
          Demo GIF placeholder
        </p>
        <p className="mt-1.5 max-w-[20rem] font-[family-name:var(--font-mono)] text-[10px] leading-relaxed text-[var(--color-dim)] sm:text-[11px]">
          Add{" "}
          <code className="rounded bg-[var(--color-canvas-2)] px-1.5 py-0.5 text-[var(--color-accent)]">
            public/demo.gif
          </code>{" "}
          to replace this frame.
        </p>
      </div>
    </div>
  );
}

export function DemoSection() {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [gifFailed, setGifFailed] = useState(false);

  return (
    <section
      id="demo"
      className="w-full scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)] bg-[var(--color-canvas-3)] py-12 sm:py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-6 text-center sm:mb-8 md:mb-10"
        >
          <span className="font-[family-name:var(--font-mono)] text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-accent)]">
            Watch it run
          </span>
          <h2 className="mt-2.5 font-[family-name:var(--font-display)] text-[clamp(1.5rem,6.5vw,2.75rem)] sm:text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--color-ink)] px-1">
            From install to PR comment
          </h2>
          <p className="mx-auto mt-2.5 max-w-[36rem] px-0.5 text-[14px] leading-snug text-[var(--color-muted)] sm:mt-3 sm:text-[16px] sm:leading-relaxed">
            Real sandbox run, real crash, real GitHub thread — in under a minute.
          </p>
        </motion.div>

        {/* Browser-style frame — edge-to-edge on small phones, capped height so it doesn’t dominate the viewport */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="mx-auto w-full min-w-0 max-w-[920px] sm:mx-auto"
        >
          <div
            className="overflow-hidden rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] sm:rounded-xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 12px 40px rgba(0,0,0,0.38)",
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)] px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
              <div className="flex shrink-0 gap-1 sm:gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]/90 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]/90 sm:h-2.5 sm:w-2.5" />
              </div>
              <div className="min-w-0 flex-1 flex justify-center px-1">
                <span className="w-full truncate rounded border border-[var(--color-border)] bg-[var(--color-canvas)] px-2 py-0.5 text-center font-[family-name:var(--font-mono)] text-[9px] leading-tight text-[var(--color-dim)] sm:w-auto sm:px-3 sm:py-1 sm:text-[11px]">
                  <span className="sm:hidden">github.com · PR · LogoMesh</span>
                  <span className="hidden sm:inline">github.com/pulls · LogoMesh</span>
                </span>
              </div>
              <span className="w-8 shrink-0 sm:w-12 md:w-14" aria-hidden />
            </div>

            {/* Viewport — 16:9; max height on narrow viewports */}
            <div className="relative w-full bg-[var(--color-canvas)] aspect-video max-h-[min(52svh,320px)] sm:max-h-none">
              {!gifFailed && (
                <Image
                  src={DEMO_GIF_SRC}
                  alt="LogoMesh demo — install and PR comment flow"
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 920px) 100vw, 920px"
                  className={
                    gifLoaded
                      ? "absolute inset-0 z-[1] object-cover object-top"
                      : "absolute inset-0 z-0 object-cover opacity-0"
                  }
                  onLoad={() => setGifLoaded(true)}
                  onError={() => setGifFailed(true)}
                />
              )}
              {(!gifLoaded || gifFailed) && <PlaceholderFrame />}
            </div>
          </div>

          <p className="mt-3 px-1 text-center font-[family-name:var(--font-mono)] text-[10px] leading-snug text-[var(--color-dim)] sm:mt-4 sm:text-[12px] sm:leading-normal">
            Recording is illustrative — no audio · looped for preview
          </p>
        </motion.div>
      </div>
    </section>
  );
}
