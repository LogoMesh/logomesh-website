"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { LANDING_GRAPHICS } from "@/lib/landing-graphic-src";
import { MarketingGraphicPlaceholder } from "@/components/landing/MarketingGraphicPlaceholder";

export function ProofSection() {
  return (
    <section
      id="proof"
      className="landing-surface-raised section-y-lg w-full min-w-0 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[880px] px-5 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center"
        >
          <p className="landing-kicker">On the thread</p>
          <h2 className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)] md:text-[clamp(1.85rem,4vw,2.65rem)]">
            Evidence, not opinions.
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-pretty text-[18px] leading-relaxed text-[var(--color-muted)] sm:text-[20px]">
            Comments read like mini bug reports with inputs, output, and file and line so you can
            replay them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="relative mx-auto mt-12 max-w-[720px] md:mt-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[1.25rem] opacity-60 blur-2xl md:-inset-5"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(196,255,0,0.1) 0%, transparent 65%)",
            }}
          />
          <MarketingGraphicPlaceholder
            variant="default"
            title="Real PR comment with property, call, result, and file and line. Export from production or staging."
            recommendedExport="~1400×900 @2x WebP. Set NEXT_PUBLIC_LANDING_GRAPHIC_PROOF."
            src={LANDING_GRAPHICS.proof}
            aspectClassName="aspect-[16/11]"
          />
        </motion.div>

        <p className="mx-auto mt-10 max-w-[28rem] text-center text-[16px] leading-relaxed text-[var(--color-dim)] sm:text-[17px]">
          Nothing to say? No post.
        </p>
      </div>
    </section>
  );
}
