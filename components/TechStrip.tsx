"use client";

import { motion } from "motion/react";
import { TECH_LOGOS } from "./icons/TechLogos";

const DOUBLED = [...TECH_LOGOS, ...TECH_LOGOS];

export function TechStrip() {
  return (
    <div
      className="border-y border-[var(--color-border)] overflow-hidden"
      style={{ background: "var(--color-canvas-2)" }}
    >
      <div className="flex items-center gap-0">
        {/* Label */}
        <div className="flex-shrink-0 px-8 py-6 border-r border-[var(--color-border)] flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] whitespace-nowrap">
            Works with
          </span>
        </div>

        {/* Marquee track */}
        <div className="relative flex-1 overflow-hidden">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to right, var(--color-canvas-2), transparent)` }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to left, var(--color-canvas-2), transparent)` }}
          />

          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 32,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {DOUBLED.map(({ name, Logo }, i) => (
              <div
                key={i}
                className="group flex-shrink-0 flex items-center gap-3.5 px-7 border-r border-[var(--color-border)] py-5 transition-colors duration-300 hover:bg-[var(--color-canvas-3)]"
              >
                <span className="opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                  <Logo size={28} />
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[var(--color-dim)] group-hover:text-[var(--color-ink)] transition-colors duration-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
