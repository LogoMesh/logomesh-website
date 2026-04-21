"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import type { Line, Scenario } from "./terminal-scenarios";

const LINE_CLASS: Record<Line["kind"], string> = {
  cmd: "text-primary/80",
  "step-done": "text-foreground/80",
  "step-run": "text-foreground/70",
  crash: "text-destructive font-semibold",
  "crash-detail": "text-destructive/75 pl-0",
  success: "text-primary font-semibold",
};

type Props = {
  scenario: Scenario;
  lineDelay?: number;
};

export function TerminalReplay({ scenario, lineDelay = 220 }: Props) {
  const reducedMotion = useReducedMotion();
  const lineCount = scenario.lines.length;
  const [revealed, setRevealed] = useState(1);

  useEffect(() => {
    if (reducedMotion === true) return;

    const timerIds: number[] = [];
    timerIds.push(
      window.setTimeout(() => {
        setRevealed(1);
        scenario.lines.slice(1).forEach((_, idx) => {
          timerIds.push(
            window.setTimeout(
              () => setRevealed((count) => Math.max(count, idx + 2)),
              idx * lineDelay + 150,
            ),
          );
        });
      }, 0),
    );
    return () => {
      for (const id of timerIds) window.clearTimeout(id);
    };
  }, [lineDelay, reducedMotion, scenario]);

  const visibleCount = reducedMotion === true ? lineCount : revealed;
  const done = visibleCount >= lineCount;

  return (
    <div
      className="relative min-w-0 glass-strong overflow-hidden rounded-xl"
      role="img"
      aria-label={`LogoMesh terminal replay, ${scenario.label} pull request`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 85%, hsl(78 100% 50% / 0.25) 0%, transparent 65%)",
        }}
      />

      <div className="flex min-w-0 items-center gap-2 border-b border-border/80 bg-card/60 px-3 py-2.5 sm:px-4">
        <div className="flex shrink-0 gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[hsl(var(--window-close))]" aria-hidden />
          <span className="block h-3 w-3 rounded-full bg-[hsl(var(--window-minimize))]" aria-hidden />
          <span className="block h-3 w-3 rounded-full bg-[hsl(var(--window-expand))]" aria-hidden />
        </div>
        <span
          className="ml-2 min-w-0 flex-1 truncate font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground sm:ml-3"
          title={`logomesh · ${scenario.repo} · PR ${scenario.prNumber}`}
        >
          logomesh · {scenario.repo} · PR {scenario.prNumber}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em] text-dim">
          <span
            className={`h-1.5 w-1.5 rounded-full ${done ? "bg-success" : "bg-primary"}`}
            style={{ animation: done ? "none" : "pulse-dot 1.2s ease-in-out infinite" }}
            aria-hidden
          />
          {done ? "posted" : "running"}
        </span>
      </div>

      <div
        className="relative px-5 py-5 font-[family-name:var(--font-mono)] text-[13px] leading-[1.75] sm:text-[14px]"
        style={{ minHeight: "300px" }}
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
