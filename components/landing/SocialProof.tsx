"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { inViewOnce } from "@/lib/landing-motion";

const METRICS = [
  { label: "avg. analysis", value: "12s" },
  { label: "false positives in beta", value: "0" },
  { label: "async execution", value: "100%" },
];

export function SocialProof() {
  return (
    <section
      id="proof-strip"
      className="border-t border-border py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-border bg-card/50 px-6 py-10 md:flex-row md:items-stretch md:gap-12 md:px-10 glass"
        >
          <div className="flex max-w-md flex-col items-center gap-4 text-center md:items-start md:text-left">
            <Image
              src="/california_golden_bears.png"
              alt="University of California Golden Bears"
              width={120}
              height={48}
              className="h-10 w-auto opacity-90"
              loading="lazy"
            />
            <p className="font-mono text-sm font-semibold leading-snug text-foreground">
              🏆 1st place · UC Berkeley AgentBeats — Software Testing Track
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Independent recognition for automated testing that finds real
              defects—not slides.
            </p>
          </div>
          <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3 md:border-l md:border-border md:pl-12">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-background/40 px-4 py-4 text-center md:text-left"
              >
                <p className="font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
