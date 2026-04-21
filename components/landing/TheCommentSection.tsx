"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { AuroraField } from "./AuroraField";

const CALLOUTS = [
  {
    label: "What we tried",
    body: "The exact input that broke your code.",
  },
  {
    label: "What broke",
    body: "The output, the file, and the line.",
  },
  {
    label: "A test for your fix",
    body: "Paste-ready. Passes only when your fix is right.",
  },
] as const;

export function TheCommentSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="the-comment"
      aria-labelledby="the-comment-heading"
      className="landing-surface-base relative w-full min-w-0 overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <AuroraField className="opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 20%, hsl(78 100% 50% / 0.05) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 85% 85%, hsl(274 72% 55% / 0.045) 0%, transparent 52%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 md:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="landing-kicker"
          >
            The comment
          </motion.p>
          <motion.h2
            id="the-comment-heading"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            One comment per issue. That&apos;s it.
          </motion.h2>
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            className="marketing-lg mx-auto mt-6 max-w-[40rem] text-pretty text-[var(--color-muted)]"
          >
            No score. No &ldquo;looks good to me.&rdquo; No nits. If there&apos;s nothing to show, we don&apos;t post.
          </motion.p>
        </div>

        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-14 grid max-w-[1080px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14"
        >
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 opacity-80 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(78 100% 50% / 0.14) 0%, transparent 65%)",
              }}
            />
            <div className="relative">
              <MediaPlaceholder
                label="The comment, as it lands on GitHub"
                dropPath="/public/marketing/comment.png"
                spec="1600×1100 @2x · crop tight, redact tokens"
                kind="image"
                aspectClassName="aspect-[16/11]"
              />
            </div>
          </div>

          <ol className="order-1 list-none space-y-4 lg:order-2">
            {CALLOUTS.map((item, i) => (
              <motion.li
                key={item.label}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 * i }}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/70 px-5 py-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {item.label}
                </p>
                <p className="mt-2 font-sans text-[16px] leading-relaxed text-[var(--color-ink)] sm:text-[17px]">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
