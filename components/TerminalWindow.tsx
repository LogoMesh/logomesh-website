"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TermLine = {
  text: string;
  color: "dim" | "muted" | "accent" | "danger" | "pass" | "white";
  ms: number;
};

type Scenario = {
  label: string;
  sublabel: string;
  pr: string;
  repo: string;
  lines: TermLine[];
};

const COLOR_MAP: Record<TermLine["color"], string> = {
  dim:    "text-[var(--color-dim)]",
  muted:  "text-[var(--color-muted)]",
  accent: "text-[var(--color-accent)]",
  danger: "text-[var(--color-danger)]",
  pass:   "text-[var(--color-pass)]",
  white:  "text-[var(--color-ink)] font-semibold",
};

const SCENARIOS: Scenario[] = [
  {
    label: "Flask",
    sublabel: "checkout",
    pr: "PR #47",
    repo: "sszz01/checkout-service",
    lines: [
      { text: "$ logomesh · PR #47 · checkout-service",   color: "muted",  ms: 500  },
      { text: "",                                           color: "dim",    ms: 800  },
      { text: "  ▸ fetching changed files...",             color: "dim",    ms: 1000 },
      { text: "  → checkout.py   (3 functions changed)",  color: "muted",  ms: 1250 },
      { text: "  → cart.py       (1 function changed)",   color: "muted",  ms: 1420 },
      { text: "",                                           color: "dim",    ms: 1600 },
      { text: "  ▸ inferring properties...",               color: "dim",    ms: 1820 },
      { text: "  ▸ generating adversarial tests (23)...", color: "dim",    ms: 2350 },
      { text: "  ▸ running sandbox (docker)...",           color: "dim",    ms: 2900 },
      { text: "",                                           color: "dim",    ms: 3550 },
      { text: "  [PASS]  test_checkout_valid_order",       color: "muted",  ms: 3680 },
      { text: "  [PASS]  test_checkout_empty_cart",        color: "muted",  ms: 3840 },
      { text: "  [PASS]  test_checkout_max_qty",           color: "muted",  ms: 4000 },
      { text: "  [PASS]  test_checkout_zero_items",        color: "muted",  ms: 4160 },
      { text: "  [FAIL]  test_checkout_negative_qty",      color: "danger", ms: 4330 },
      { text: "",                                           color: "dim",    ms: 4480 },
      { text: "  ▸ validating finding...",                 color: "dim",    ms: 4600 },
      { text: "  ✓ confirmed caller-reachable",            color: "accent", ms: 5300 },
      { text: "",                                           color: "dim",    ms: 5450 },
      { text: "  ─────────────────────────────────────",  color: "dim",    ms: 5560 },
      { text: "  LogoMesh found 1 issue",                  color: "white",  ms: 5680 },
      { text: "",                                           color: "dim",    ms: 5800 },
      { text: "  Negative quantity bypasses checkout",     color: "accent", ms: 5920 },
      { text: "",                                           color: "dim",    ms: 6020 },
      { text: "  Property : total should always be ≥ 0",  color: "muted",  ms: 6140 },
      { text: "  I called : checkout(item_id=1, qty=-5)", color: "muted",  ms: 6300 },
      { text: "  Got      : total = -$49.95",              color: "danger", ms: 6460 },
      { text: "  Location : checkout.py, line 42",         color: "muted",  ms: 6620 },
      { text: "  ─────────────────────────────────────",  color: "dim",    ms: 6760 },
    ],
  },
  {
    label: "Stripe",
    sublabel: "payments",
    pr: "PR #112",
    repo: "acme/payments-api",
    lines: [
      { text: "$ logomesh · PR #112 · payments-api",       color: "muted",  ms: 500  },
      { text: "",                                           color: "dim",    ms: 800  },
      { text: "  ▸ fetching changed files...",             color: "dim",    ms: 1000 },
      { text: "  → stripe_client.py  (2 functions)",      color: "muted",  ms: 1250 },
      { text: "  → webhook.py        (1 function)",       color: "muted",  ms: 1420 },
      { text: "",                                           color: "dim",    ms: 1600 },
      { text: "  ▸ inferring properties...",               color: "dim",    ms: 1820 },
      { text: "  ▸ generating adversarial tests (18)...", color: "dim",    ms: 2300 },
      { text: "  ▸ running sandbox (docker)...",           color: "dim",    ms: 2820 },
      { text: "",                                           color: "dim",    ms: 3400 },
      { text: "  [PASS]  test_charge_valid_amount",        color: "muted",  ms: 3530 },
      { text: "  [PASS]  test_charge_zero_amount",         color: "muted",  ms: 3690 },
      { text: "  [PASS]  test_idempotency_key_present",    color: "muted",  ms: 3860 },
      { text: "  [FAIL]  test_retry_double_charge",        color: "danger", ms: 4060 },
      { text: "",                                           color: "dim",    ms: 4210 },
      { text: "  ▸ validating finding...",                 color: "dim",    ms: 4330 },
      { text: "  ✓ confirmed caller-reachable",            color: "accent", ms: 5080 },
      { text: "",                                           color: "dim",    ms: 5230 },
      { text: "  ─────────────────────────────────────",  color: "dim",    ms: 5340 },
      { text: "  LogoMesh found 1 issue",                  color: "white",  ms: 5460 },
      { text: "",                                           color: "dim",    ms: 5580 },
      { text: "  Retry without idempotency charges twice", color: "accent", ms: 5700 },
      { text: "",                                           color: "dim",    ms: 5800 },
      { text: "  Property : each order charged at most once", color: "muted", ms: 5920 },
      { text: "  I called : charge(order_id=99, retry=True)", color: "muted", ms: 6080 },
      { text: "  Got      : Stripe debited $49.99 twice",  color: "danger", ms: 6240 },
      { text: "  Location : stripe_client.py, line 31",    color: "muted",  ms: 6400 },
      { text: "  ─────────────────────────────────────",  color: "dim",    ms: 6540 },
    ],
  },
  {
    label: "Django",
    sublabel: "auth",
    pr: "PR #203",
    repo: "org/user-service",
    lines: [
      { text: "$ logomesh · PR #203 · user-service",       color: "muted",  ms: 500  },
      { text: "",                                           color: "dim",    ms: 800  },
      { text: "  ▸ fetching changed files...",             color: "dim",    ms: 1000 },
      { text: "  → auth.py           (1 function changed)",color: "muted",  ms: 1250 },
      { text: "",                                           color: "dim",    ms: 1440 },
      { text: "  ▸ inferring properties...",               color: "dim",    ms: 1650 },
      { text: "  ▸ generating adversarial tests (14)...", color: "dim",    ms: 2150 },
      { text: "  ▸ running sandbox (docker)...",           color: "dim",    ms: 2650 },
      { text: "",                                           color: "dim",    ms: 3180 },
      { text: "  [PASS]  test_own_resource_access",        color: "muted",  ms: 3310 },
      { text: "  [PASS]  test_cross_user_blocked",         color: "muted",  ms: 3470 },
      { text: "  [FAIL]  test_overflow_bypasses_check",    color: "danger", ms: 3670 },
      { text: "",                                           color: "dim",    ms: 3820 },
      { text: "  ▸ validating finding...",                 color: "dim",    ms: 3940 },
      { text: "  ✓ confirmed caller-reachable",            color: "accent", ms: 4690 },
      { text: "",                                           color: "dim",    ms: 4840 },
      { text: "  ─────────────────────────────────────",  color: "dim",    ms: 4950 },
      { text: "  LogoMesh found 1 issue",                  color: "white",  ms: 5070 },
      { text: "",                                           color: "dim",    ms: 5190 },
      { text: "  Integer overflow bypasses auth check",    color: "accent", ms: 5310 },
      { text: "",                                           color: "dim",    ms: 5410 },
      { text: "  Property : users can only access their data", color: "muted", ms: 5530 },
      { text: "  I called : can_access(user_id=2**31, res=1)", color: "muted", ms: 5690 },
      { text: "  Got      : True — accessed another user",  color: "danger", ms: 5850 },
      { text: "  Location : auth.py, line 19",              color: "muted",  ms: 6010 },
      { text: "  ─────────────────────────────────────",  color: "dim",    ms: 6150 },
    ],
  },
];

export function TerminalWindow() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runAnimation = useCallback((lines: TermLine[]) => {
    const body = bodyRef.current;
    const cursor = cursorRef.current;
    if (!body || !cursor) return;

    setDone(false);

    while (body.firstChild && body.firstChild !== cursor) {
      body.removeChild(body.firstChild);
    }

    const lastMs = lines[lines.length - 1].ms;

    lines.forEach(({ text, color, ms }) => {
      const id = setTimeout(() => {
        const span = document.createElement("span");
        span.className = `block whitespace-pre font-[family-name:var(--font-mono)] text-[11.5px] sm:text-[13.5px] leading-[1.65] ${COLOR_MAP[color]}`;
        span.textContent = text || "\u00A0";
        body.insertBefore(span, cursor);
        body.scrollTop = body.scrollHeight;
      }, ms);
      timersRef.current.push(id);
    });

    const doneId = setTimeout(() => setDone(true), lastMs + 400);
    timersRef.current.push(doneId);
  }, []);

  const switchScenario = useCallback((idx: number) => {
    clearTimers();
    setActive(idx);
    setDone(false);
    // Small tick so React updates active state before animation clears DOM
    setTimeout(() => runAnimation(SCENARIOS[idx].lines), 0);
  }, [clearTimers, runAnimation]);

  const replay = useCallback(() => {
    clearTimers();
    runAnimation(SCENARIOS[active].lines);
  }, [clearTimers, runAnimation, active]);

  useEffect(() => {
    runAnimation(SCENARIOS[0].lines);
    return clearTimers;
  }, [runAnimation, clearTimers]);

  const current = SCENARIOS[active];

  return (
    <div>
      {/* Scenario tabs */}
      <div className="flex items-end gap-px mb-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-dim)] px-3 pb-2 self-end">
          try with:
        </span>
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => switchScenario(i)}
            className="font-[family-name:var(--font-mono)] text-[12px] px-4 py-2 border border-b-0 transition-all duration-150 cursor-pointer"
            style={{
              background: i === active ? "#08080b" : "transparent",
              borderColor: i === active ? "var(--color-border-hi)" : "transparent",
              color: i === active ? "var(--color-ink)" : "var(--color-dim)",
              borderBottom: i === active ? "1px solid #08080b" : "1px solid transparent",
              marginBottom: i === active ? "-1px" : "0",
            }}
          >
            <span style={{ color: i === active ? "var(--color-accent)" : "inherit" }}>
              {s.label}
            </span>
            {" ·"} {s.sublabel}
          </button>
        ))}
      </div>

      {/* Terminal window */}
      <div className="border border-[var(--color-border-hi)] bg-[#08080b] overflow-hidden relative">
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",
          }}
        />
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)] relative">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] text-[var(--color-muted)] tracking-wide whitespace-nowrap max-w-[55%] overflow-hidden text-ellipsis">
            <span className="hidden sm:inline">logomesh&nbsp;&nbsp;·&nbsp;&nbsp;{current.repo}&nbsp;&nbsp;·&nbsp;&nbsp;</span>{current.pr}
          </span>
        </div>
        {/* Body */}
        <div
          ref={bodyRef}
          className="relative z-[1] px-4 sm:px-6 py-5 min-h-[260px] sm:min-h-[320px] overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <span
            ref={cursorRef}
            className="inline-block w-[7px] h-[13px] bg-[var(--color-accent)] align-text-bottom ml-px"
            style={{ animation: "blink 1.05s step-end infinite" }}
          />
        </div>

        {/* Replay button */}
        <button
          onClick={replay}
          className="absolute bottom-4 right-4 z-[3] font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)] hover:text-[var(--color-accent)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(4px)",
            pointerEvents: done ? "auto" : "none",
            transition: "opacity 0.4s, transform 0.4s, color 0.15s",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v5h5" />
            <path d="M3.51 10.49a6 6 0 1 0 .49-7.49L1 4" />
          </svg>
          Replay
        </button>
      </div>
    </div>
  );
}
