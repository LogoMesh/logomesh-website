"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Stat = {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  source: string;
};

const STATS: Stat[] = [
  {
    value: 96,
    suffix: "%",
    label: "of developers don't fully trust AI-generated code — only 3% trust it highly",
    source: "Sonar · State of AI Code Quality · 2026",
  },
  {
    value: 78,
    suffix: "%",
    label: "of dev teams ignore most AI review feedback because it cries wolf too often",
    source: "Diffray · survey of 1,200+ developers · 2026",
  },
  {
    value: 57,
    suffix: "%",
    label: "fewer false positives when crashes are validated before posting — which is why LogoMesh stays silent until it has proof",
    source: "FalseCrashReducer · arXiv:2510.02185 · 2025",
  },
  {
    value: 23,
    suffix: ".5%",
    label: "increase in production incidents per PR year-over-year — as AI code ships faster than test culture can follow",
    source: "Cortex Engineering · AI Code Quality Report · 2026",
  },
];

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsStrip() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-b border-[var(--color-border)]"
      style={{ background: "var(--color-canvas-2)" }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          className="px-5 sm:px-8 md:px-10 py-8 md:py-11 border-b border-r border-[var(--color-border)] sm:last:border-r-0 md:[&:nth-child(2)]:border-r [&:nth-last-child(-n+1)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-last-child(-n+4)]:border-b-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
        >
          <div className="relative font-[family-name:var(--font-display)] text-[40px] sm:text-[48px] md:text-[54px] font-extrabold leading-none tracking-[-0.05em] mb-2.5 tabular-nums">
            {/* Subtle glow bloom behind the number */}
            <span
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(196,255,0,0.08) 0%, transparent 70%)",
              }}
            />
            <span
              className="relative text-[var(--color-accent)]"
              style={{ textShadow: "0 0 32px rgba(196,255,0,0.2)" }}
            >
              {s.prefix}
              <CountUp target={s.value} />
              {s.suffix}
            </span>
          </div>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.6] max-w-none sm:max-w-[200px]">
            {s.label}
          </p>
          <p className="mt-2.5 text-[13px] text-[var(--color-dim)] tracking-[0.03em]">
            {s.source}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
