"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import type { Line, Scenario } from "./terminal-scenarios";

// Class lookup → prevents Tailwind purging dynamic strings
const LINE_CLASS: Record<Line["kind"], string> = {
  "cmd": "text-primary/80",
  "step-done": "text-foreground/80",
  "step-run": "text-foreground/70",
  "crash": "text-destructive font-semibold",
  "crash-detail": "text-destructive/75 pl-0",
  "success": "text-primary font-semibold",
};

type Props = {
  scenario: Scenario;
  /** ms between line reveals — spec calls for ~200ms */
  lineDelay?: number;
};

export function TerminalReplay({ scenario, lineDelay = 220 }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  // Reset + replay whenever scenario changes
  useEffect(() => {
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    scenario.lines.forEach((_, idx) => {
      timers.push(
        setTimeout(() => setVisibleCount((c) => Math.max(c, idx + 1)), idx * lineDelay + 120),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [scenario, lineDelay]);

  const done = visibleCount >= scenario.lines.length;

  return (
    <div
      className="relative glass-strong overflow-hidden rounded-xl"
      role="img"
      aria-label={`LogoMesh terminal replay — ${scenario.label} pull request`}
    >
      {/* Soft lime underglow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 85%, hsl(78 100% 50% / 0.25) 0%, transparent 65%)",
        }}
      />

      {/* macOS title bar */}
      <div className="flex items-center gap-2 border-b border-border/80 bg-card/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="block h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="block h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <span className="ml-3 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground">
          logomesh · {scenario.repo} · PR {scenario.prNumber}
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em] text-dim">
          <span
            className={`h-1.5 w-1.5 rounded-full ${done ? "bg-success" : "bg-primary"}`}
            style={{ animation: done ? "none" : "pulse-dot 1.2s ease-in-out infinite" }}
            aria-hidden
          />
          {done ? "posted" : "running"}
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="relative px-5 py-5 font-[family-name:var(--font-mono)] text-[13px] leading-[1.75] sm:text-[14px]"
        style={{ minHeight: "272px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="flex flex-col"
          >
            {scenario.lines.map((line, idx) => (
              <motion.div
                key={`${scenario.id}-${idx}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{
                  opacity: idx < visibleCount ? 1 : 0,
                  x: idx < visibleCount ? 0 : -6,
                }}
                transition={{ duration: 0.28, ease: EASE }}
                className={`whitespace-pre-wrap break-words ${LINE_CLASS[line.kind]}`}
              >
                {line.text}
                {/* Blinking caret on last visible line while still running */}
                {idx === visibleCount - 1 && !done && (
                  <span
                    className="animate-blink ml-1 inline-block h-[1em] w-[0.55ch] translate-y-[2px] bg-primary align-middle"
                    aria-hidden
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Persistent prompt caret when idle */}
        {done && (
          <div className="mt-2 font-[family-name:var(--font-mono)] text-[13px] text-foreground/40">
            ${" "}
            <span
              className="animate-blink inline-block h-[1em] w-[0.55ch] translate-y-[2px] bg-foreground/40 align-middle"
              aria-hidden
            />
          </div>
        )}
      </div>
    </div>
  );
}
