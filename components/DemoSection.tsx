"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { GitHubComment } from "@/components/GitHubComment";

export function DemoSection() {
  return (
    <section
      id="demo"
      className="w-full scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)] bg-[var(--color-canvas-3)] py-10 sm:py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-5 text-center sm:mb-6 md:mb-8"
        >
          <span className="font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] font-semibold tracking-[0.08em] text-[var(--color-accent)]">
            Watch it run
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.35rem,5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)] px-1">
            From install to PR comment
          </h2>
          <p className="mx-auto mt-2 max-w-[36rem] px-0.5 text-[14px] leading-snug text-[var(--color-muted)] sm:text-[16px] sm:leading-relaxed">
            Real sandbox run, real crash, real GitHub thread — in under a minute.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="mx-auto w-full min-w-0 max-w-[920px]"
        >
          <div
            className="overflow-hidden rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] sm:rounded-xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 12px 40px rgba(0,0,0,0.38)",
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)] px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
              <div className="flex shrink-0 gap-1 sm:gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]/90 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]/90 sm:h-2.5 sm:w-2.5" />
              </div>
              <div className="min-w-0 flex flex-1 justify-center px-1">
                <span className="w-full truncate rounded border border-[var(--color-border)] bg-[var(--color-canvas)] px-2 py-0.5 text-center font-[family-name:var(--font-mono)] text-[9px] leading-tight text-[var(--color-dim)] sm:w-auto sm:px-3 sm:py-1 sm:text-[11px]">
                  <span className="sm:hidden">github.com · PR · LogoMesh</span>
                  <span className="hidden sm:inline">github.com/pulls · LogoMesh</span>
                </span>
              </div>
              <span className="w-8 shrink-0 sm:w-12 md:w-14" aria-hidden />
            </div>

            <div className="p-3 sm:p-5 md:p-6">
              <GitHubComment />
            </div>
          </div>

          <p className="mt-3 px-1 text-center font-[family-name:var(--font-mono)] text-[10px] leading-snug text-[var(--color-dim)] sm:mt-4 sm:text-[12px] sm:leading-normal">
            Illustrative PR comment — what you see when LogoMesh confirms a bug.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
