"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Set `NEXT_PUBLIC_DEMO_GIF` to a path (e.g. `/demo.gif` after adding `public/demo.gif`)
 * or a full URL. When unset, no GIF is requested — avoids 404 noise in devtools.
 */
const DEMO_GIF_SRC = process.env.NEXT_PUBLIC_DEMO_GIF?.trim() ?? "";

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
        <p className="mt-1.5 max-w-[22rem] font-[family-name:var(--font-mono)] text-[10px] leading-relaxed text-[var(--color-dim)] sm:text-[11px]">
          Add <code className="rounded bg-[var(--color-canvas-2)] px-1.5 py-0.5 text-[var(--color-accent)]">public/demo.gif</code> and set{" "}
          <code className="rounded bg-[var(--color-canvas-2)] px-1.5 py-0.5 text-[var(--color-accent)]">NEXT_PUBLIC_DEMO_GIF=/demo.gif</code>{" "}
          in <code className="rounded bg-[var(--color-canvas-2)] px-1 py-0.5">.env.local</code>.
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
          <span className="inline-block px-3 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-accent)]">
            Watch it run
          </span>
          <h2 className="mt-2.5 px-3 font-[family-name:var(--font-display)] text-[clamp(1.35rem,5.8vw,2.5rem)] sm:text-[clamp(26px,3.6vw,40px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[var(--color-ink)] sm:px-4">
            From install to a GitHub comment
          </h2>
          <p className="read-max mx-auto mt-2.5 px-3 text-center text-balance text-[14px] leading-relaxed text-[var(--color-muted)] sm:mt-3 sm:px-4 sm:text-[15px]">
            A full run in the recording: isolated test, real failure, and the thread
            your team sees — about a minute end to end.
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
              {gifEnabled && !gifFailed && (
                <img
                  src={DEMO_GIF_SRC}
                  alt="LogoMesh demo — install and PR comment flow"
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

          <p className="mt-3 px-1 text-center font-[family-name:var(--font-mono)] text-[10px] leading-snug text-[var(--color-dim)] sm:mt-4 sm:text-[12px] sm:leading-normal">
            Recording is illustrative — no audio · looped for preview
          </p>
        </motion.div>
      </div>
    </section>
  );
}
