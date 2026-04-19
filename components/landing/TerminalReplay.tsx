"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "motion/react";

const LINE_MS = 200;

export type TermLineKind =
  | "muted"
  | "dim"
  | "accent"
  | "danger"
  | "success"
  | "foreground";

const KIND_CLASS: Record<TermLineKind, string> = {
  muted: "text-muted-foreground",
  dim: "text-muted-foreground/70",
  accent: "text-primary",
  danger: "text-destructive",
  success: "text-success",
  foreground: "text-foreground font-semibold",
};

export type TermScenario = {
  id: string;
  label: string;
  sublabel: string;
  pr: string;
  repo: string;
  lines: { text: string; kind: TermLineKind }[];
};

export const TERMINAL_SCENARIOS: TermScenario[] = [
  {
    id: "flask",
    label: "Flask",
    sublabel: "checkout",
    pr: "PR #47",
    repo: "checkout-service",
    lines: [
      { text: "$ logomesh · PR #47 · checkout-service", kind: "muted" },
      { text: "▸ fetching changed files... ✓", kind: "dim" },
      { text: "▸ inferring guarantees... ✓", kind: "dim" },
      { text: "▸ fuzzing applyCoupon()...", kind: "dim" },
      { text: "", kind: "dim" },
      {
        text: '✗ CRASH on input { coupon: "EXPIRED", retry: 2 }',
        kind: "danger",
      },
      { text: "   → customer charged twice", kind: "danger" },
      { text: "", kind: "dim" },
      { text: "✓ proof + fix posted to PR #47", kind: "success" },
    ],
  },
  {
    id: "stripe",
    label: "Stripe",
    sublabel: "payments",
    pr: "PR #112",
    repo: "payments-api",
    lines: [
      { text: "$ logomesh · PR #112 · payments-api", kind: "muted" },
      { text: "▸ fetching changed files... ✓", kind: "dim" },
      { text: "▸ inferring guarantees... ✓", kind: "dim" },
      { text: "▸ fuzzing charge()...", kind: "dim" },
      { text: "", kind: "dim" },
      {
        text: "✗ CRASH on retry without idempotency key",
        kind: "danger",
      },
      { text: "   → Stripe debited $49.99 twice", kind: "danger" },
      { text: "", kind: "dim" },
      { text: "✓ proof + fix posted to PR #112", kind: "success" },
    ],
  },
  {
    id: "django",
    label: "Django",
    sublabel: "auth",
    pr: "PR #203",
    repo: "user-service",
    lines: [
      { text: "$ logomesh · PR #203 · user-service", kind: "muted" },
      { text: "▸ fetching changed files... ✓", kind: "dim" },
      { text: "▸ inferring guarantees... ✓", kind: "dim" },
      { text: "▸ fuzzing can_access()...", kind: "dim" },
      { text: "", kind: "dim" },
      {
        text: "✗ CRASH on user_id = 2**31 (integer overflow)",
        kind: "danger",
      },
      { text: "   → accessed another user’s data", kind: "danger" },
      { text: "", kind: "dim" },
      { text: "✓ proof + fix posted to PR #203", kind: "success" },
    ],
  },
];

const MAX_LINES = Math.max(...TERMINAL_SCENARIOS.map((s) => s.lines.length)) + 1;

export function TerminalReplay() {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scenario = TERMINAL_SCENARIOS[tab];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const run = useCallback(
    (lines: TermScenario["lines"]) => {
      clearTimers();
      setShown(0);
      lines.forEach((_, i) => {
        const t = setTimeout(() => setShown(i + 1), i * LINE_MS);
        timersRef.current.push(t);
      });
    },
    [clearTimers],
  );

  useEffect(() => {
    const start = window.setTimeout(() => {
      run(TERMINAL_SCENARIOS[tab].lines);
    }, 0);
    return () => {
      clearTimeout(start);
      clearTimers();
    };
  }, [tab, run, clearTimers]);

  return (
    <div id="terminal-replay" className="relative w-full scroll-mt-28">
      <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-primary/25 via-primary/5 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-xl border border-border glass-strong">
        <div
          className="flex items-end gap-px overflow-x-auto border-b border-border bg-card/80 px-1 pt-1 [scrollbar-width:none]"
          role="tablist"
          aria-label="Demo scenario"
        >
          <span className="shrink-0 self-end px-3 pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px]">
            Try
          </span>
          {TERMINAL_SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className="min-h-[44px] shrink-0 cursor-pointer border border-b-0 px-3 py-2.5 font-mono text-[11px] transition-colors duration-150 sm:px-4 sm:text-[12px]"
              style={{
                background: i === tab ? "hsl(var(--card))" : "transparent",
                borderColor:
                  i === tab ? "hsl(var(--border))" : "transparent",
                color: i === tab ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                marginBottom: i === tab ? "-1px" : "0",
                borderBottom:
                  i === tab ? "1px solid hsl(var(--card))" : "1px solid transparent",
              }}
            >
              <span className={i === tab ? "text-primary" : ""}>{s.label}</span>
              <span className="text-muted-foreground"> · {s.sublabel}</span>
            </button>
          ))}
        </div>

        <div className="relative border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28c840]" />
            <span className="absolute left-1/2 max-w-[min(100%,14rem)] -translate-x-1/2 truncate font-mono text-[10px] text-muted-foreground sm:max-w-[min(100%,24rem)] sm:text-[11px]">
              <span className="hidden sm:inline">
                logomesh · {scenario.repo} ·{" "}
              </span>
              {scenario.pr}
            </span>
          </div>
        </div>

        <div
          className="relative z-[1] overflow-hidden bg-card/90"
          style={
            {
              ["--term-line-count" as string]: MAX_LINES,
            } as CSSProperties
          }
        >
          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,hsl(0 0% 0% / 0.05) 2px,hsl(0 0% 0% / 0.05) 4px)",
            }}
          />
          <div
            className="terminal-window-scroll relative z-[1] overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 [scrollbar-width:none]"
            style={{ maxHeight: "min(52vh, 420px)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[11px] leading-[1.65] sm:text-[13px]"
              >
                {scenario.lines.slice(0, shown).map((line, idx) => (
                  <span
                    key={`${scenario.id}-${idx}-${line.text}`}
                    className={`block whitespace-pre-wrap break-words ${KIND_CLASS[line.kind]}`}
                  >
                    {line.text || "\u00A0"}
                  </span>
                ))}
                <span
                  className="inline-block h-[13px] w-[7px] translate-y-[2px] bg-primary align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                  aria-hidden
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
