"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

type Metric = {
  value: number;
  suffix?: string;
  label: string;
  tint?: "lime" | "ink";
  offset?: string;
};

const METRICS: Metric[] = [
  {
    value: 0,
    label: "false positives · beta to date",
    tint: "lime",
    offset: "md:-mt-6",
  },
  {
    value: 12,
    suffix: "s",
    label: "median analysis per pull request",
    tint: "ink",
    offset: "md:mt-10",
  },
  {
    value: 14,
    suffix: "/14",
    label: "public repos with zero merge-blocking noise",
    tint: "ink",
    offset: "md:mt-2",
  },
  {
    value: 100,
    suffix: "%",
    label: "async · never blocks your merge",
    tint: "lime",
    offset: "md:-mt-8",
  },
];

function MetricValue({ value, suffix, tint }: Pick<Metric, "value" | "suffix" | "tint">) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const skipCountUp = reducedMotion === true || value === 0;
  const [animatedValue, setAnimatedValue] = useState(value === 0 ? 0 : 1);

  useEffect(() => {
    if (!inView || skipCountUp) return;

    const duration = 850;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setAnimatedValue(Math.round(value * eased));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, skipCountUp, value]);

  const shown =
    !inView ? (value === 0 ? 0 : 1) : skipCountUp ? value : animatedValue;

  return (
    <span
      ref={ref}
      className={`font-sans text-[clamp(5rem,14vw,10.5rem)] font-bold leading-[0.85] tracking-[-0.05em] ${
        tint === "lime" ? "text-primary" : "text-foreground"
      }`}
      style={
        tint === "lime"
          ? {
              textShadow:
                "0 0 32px hsl(78 100% 50% / 0.35), 0 0 72px hsl(78 100% 50% / 0.18)",
            }
          : undefined
      }
    >
      {shown}
      {suffix && <span className="text-muted-foreground">{suffix}</span>}
    </span>
  );
}

export function SocialProof() {
  return (
    <section id="proof" className="relative w-full overflow-hidden py-[6.5rem] sm:py-32 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.35) 35%, hsl(var(--primary) / 0.35) 65%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border/60 pb-10 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="font-sans text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
              <span
                aria-hidden
                className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
                style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.55)" }}
              />
              Receipts, not claims
            </p>
            <h2 className="mt-4 max-w-[22ch] font-sans text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
              Four numbers.{" "}
              <span className="italic text-muted-foreground">All of them honest.</span>
            </h2>
          </motion.div>

          <motion.a
            href="https://agentbeats.berkeley.edu"
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            whileHover={{ y: -2 }}
            className="glass group inline-flex items-center gap-3 rounded-lg px-4 py-3 no-underline"
          >
            <Image
              src="/california_golden_bears.png"
              alt="California Golden Bears"
              width={28}
              height={28}
              className="h-7 w-auto opacity-90 transition-opacity group-hover:opacity-100"
            />
            <div className="leading-tight">
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-primary">
                1st place
              </p>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                UC Berkeley AgentBeats — Software Testing Track
              </p>
            </div>
          </motion.a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-14 sm:mt-20 sm:gap-x-12 md:grid-cols-4 md:gap-x-8">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 + index * 0.08 }}
              className={`flex flex-col ${metric.offset ?? ""}`}
            >
              <MetricValue value={metric.value} suffix={metric.suffix} tint={metric.tint} />
              <div className="mt-3 flex items-start gap-2">
                <span aria-hidden className="mt-[9px] h-px w-4 shrink-0 bg-primary/70" />
                <p className="max-w-[18rem] font-sans text-[12px] uppercase leading-[1.55] tracking-[0.1em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.18em] text-dim sm:mt-20"
        >
          <span aria-hidden className="h-px w-10 bg-border-strong" />
          Pilot data · public Python OSS repositories · updated weekly
        </motion.p>
      </div>
    </section>
  );
}
