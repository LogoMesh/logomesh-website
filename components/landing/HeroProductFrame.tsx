"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero product frame: shows a single end-to-end repro in a terminal-style window.
 *
 * Three-stage reveal:
 *   1) the command + Sentry URL
 *   2) the pipeline progress
 *   3) the verdict + the synthesized failing pytest
 *
 * Designed to answer the unspoken hero question — "what comes back?" — within
 * 4–6 seconds of landing, without a video or external asset.
 */

type LineKind =
  | "cmd"
  | "muted"
  | "step"
  | "warn"
  | "ink"
  | "pass"
  | "danger"
  | "code-key"
  | "code-line"
  | "blank";

type Line = { kind: LineKind; text: string };

const LINES: Line[] = [
  { kind: "cmd", text: "logomesh repro https://sentry.io/issues/4582/events/9a3c…" },
  { kind: "blank", text: "" },
  { kind: "step", text: "▸ fetching Sentry event ········· ✓ 312ms" },
  { kind: "step", text: "▸ extracting innermost frame ···· ✓ checkout.py:42" },
  { kind: "step", text: "▸ redacting PII (PAN, emails) ··· ✓ 4 fields scrubbed" },
  { kind: "step", text: "▸ synthesizing pytest from locals ✓ deterministic" },
  { kind: "step", text: "▸ running in airgapped sandbox ·· ✓ 8.4s" },
  { kind: "blank", text: "" },
  { kind: "danger", text: "✗ FAIL  test_repro_negative_qty_bypass" },
  { kind: "blank", text: "" },
  { kind: "ink", text: "  Property : order total should always be ≥ 0" },
  { kind: "ink", text: "  Called   : checkout(item_id=1, qty=-5)" },
  { kind: "danger", text: "  Got      : Order created with total -$49.95" },
  { kind: "ink", text: "  Location : checkout.py, line 42" },
  { kind: "blank", text: "" },
  { kind: "pass", text: "✓ artifact written → ./logomesh/4582-repro.json" },
  { kind: "muted", text: "  signed · PCI DSS 12.10.5 · SOC2 CC7.3 / CC7.4" },
];

const LINE_COLOR: Record<LineKind, string> = {
  cmd: "text-[var(--color-ink)]",
  muted: "text-[var(--color-dim)]",
  step: "text-[var(--color-muted)]",
  warn: "text-[#ffbd2e]",
  ink: "text-[var(--color-ink)]",
  pass: "text-[var(--color-pass)]",
  danger: "text-[var(--color-danger)]",
  "code-key": "text-[var(--color-accent)]",
  "code-line": "text-[var(--color-muted)]",
  blank: "",
};

export function HeroProductFrame() {
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(1);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: number[] = [];
    LINES.forEach((_line, idx) => {
      // step lines tick faster; the verdict + pytest reveal slower for emphasis
      const baseDelay = 320;
      const slow = idx >= 8 ? 460 : baseDelay;
      const t = window.setTimeout(
        () => setRevealed((prev) => Math.max(prev, idx + 1)),
        idx === 0 ? 250 : 250 + idx * slow * 0.55,
      );
      timers.push(t);
    });
    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, [reducedMotion]);

  const visibleCount = reducedMotion ? LINES.length : revealed;
  const done = visibleCount >= LINES.length;

  return (
    <div
      className="relative w-full min-w-0"
      role="img"
      aria-label="logomesh terminal: reproducing a Sentry crash, ending in a failing pytest and a signed PCI DSS / SOC2 audit artifact"
    >
      {/* lime bloom behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-90 blur-3xl sm:-inset-8"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(196,255,0,0.16) 0%, transparent 62%)",
        }}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/95 backdrop-blur-md",
          "shadow-[0_32px_100px_-40px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(255,255,255,0.04)]",
        )}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-canvas-2)] px-4 py-2.5">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
            <span className="block h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden />
            <span className="block h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
          </div>
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-2 truncate font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-[var(--color-dim)]">
            <span className="hidden sm:inline">~/checkout-service</span>
            <span className="hidden sm:inline text-[var(--color-border-hi)]">·</span>
            <span>logomesh repro</span>
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-dim)]">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                done ? "bg-[var(--color-pass)]" : "bg-[var(--color-accent)]",
              )}
              style={{
                animation: done ? "none" : "pulse-dot 1.2s ease-in-out infinite",
              }}
              aria-hidden
            />
            {done ? "complete" : "running"}
          </span>
        </div>

        {/* body */}
        <div className="relative px-4 py-4 font-[family-name:var(--font-mono)] text-[12.5px] leading-[1.7] sm:px-6 sm:py-5 sm:text-[13.5px]">
          <div className="flex flex-col">
            {LINES.map((line, idx) => {
              const visible = idx < visibleCount;
              const isLastVisible = idx === visibleCount - 1 && !done;

              if (line.kind === "blank") {
                return (
                  <div key={idx} className="h-[0.75em]" aria-hidden />
                );
              }

              const isCmd = line.kind === "cmd";

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{
                    opacity: visible ? 1 : 0,
                    x: visible ? 0 : -4,
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    LINE_COLOR[line.kind],
                    line.kind === "danger" && "font-semibold",
                    line.kind === "pass" && "font-semibold",
                    line.kind === "cmd" && "font-semibold",
                  )}
                >
                  {isCmd ? (
                    <>
                      <span className="select-none text-[var(--color-accent)]/80">
                        ${" "}
                      </span>
                      {line.text}
                    </>
                  ) : (
                    line.text
                  )}
                  {isLastVisible && (
                    <span
                      className="ml-1 inline-block h-[1em] w-[0.55ch] translate-y-[2px] bg-[var(--color-accent)] align-middle"
                      style={{ animation: "blink 1.05s step-end infinite" }}
                      aria-hidden
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* result chip rail at the bottom */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--color-border)] bg-[var(--color-canvas-2)]/70 px-4 py-2.5 sm:px-6">
          <ResultChip
            done={done}
            tone="danger"
            icon={<FileWarning size={11} strokeWidth={2.4} />}
            label="1 failing test"
          />
          <ResultChip
            done={done}
            tone="pass"
            icon={<Check size={11} strokeWidth={3} />}
            label="audit artifact"
          />
          <span className="ml-auto font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-dim)]">
            elapsed · 9.1s
          </span>
        </div>
      </div>
    </div>
  );
}

function ResultChip({
  done,
  tone,
  icon,
  label,
}: {
  done: boolean;
  tone: "danger" | "pass";
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em] transition-opacity duration-300",
        done ? "opacity-100" : "opacity-40",
        tone === "danger"
          ? "border-[var(--color-danger)]/30 bg-[var(--color-danger)]/8 text-[var(--color-danger)]"
          : "border-[var(--color-pass)]/30 bg-[var(--color-pass)]/8 text-[var(--color-pass)]",
      )}
      style={{
        backgroundColor:
          tone === "danger"
            ? "rgba(255, 59, 59, 0.08)"
            : "rgba(0, 232, 122, 0.08)",
      }}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}
