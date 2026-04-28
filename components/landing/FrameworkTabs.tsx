"use client";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TerminalReplay } from "./TerminalReplay";
import { SCENARIOS } from "./terminal-scenarios";

const CYCLE_MS = 7000;

export function FrameworkTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userLocked, setUserLocked] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (userLocked || reducedMotion) return;
    cycleRef.current = setInterval(() => {
      setActiveIdx((idx) => (idx + 1) % SCENARIOS.length);
    }, CYCLE_MS);
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [reducedMotion, userLocked]);

  const pick = (idx: number) => {
    setUserLocked(true);
    setActiveIdx(idx);
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const n = SCENARIOS.length;
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (idx + 1) % n;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (idx - 1 + n) % n;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = n - 1;
    } else {
      return;
    }
    pick(next);
    queueMicrotask(() => {
      document.getElementById(`tab-${SCENARIOS[next].id}`)?.focus();
    });
  };

  const active = SCENARIOS[activeIdx];

  return (
    <div className="w-full min-w-0">
      <div className="mb-3 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-0 items-center gap-2">
          <div
            role="tablist"
            aria-label="Example product previews"
            className="flex min-w-0 items-center gap-1 rounded-lg border border-border/80 bg-card/60 p-1 backdrop-blur-sm"
          >
            {SCENARIOS.map((scenario, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={scenario.id}
                  id={`tab-${scenario.id}`}
                  role="tab"
                  aria-selected={isActive ? "true" : "false"}
                  aria-controls={`terminal-panel-${scenario.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => pick(idx)}
                  onKeyDown={(e) => onTabKeyDown(e, idx)}
                  className={`relative shrink-0 cursor-pointer rounded-md px-3.5 py-2 font-sans text-[14px] uppercase tracking-[0.09em] transition-colors sm:text-[15px] ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="fw-tab-pill"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{scenario.label}</span>
                </button>
              );
            })}
          </div>

          {!userLocked && !reducedMotion && (
            <span
              className="hidden shrink-0 items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-dim sm:inline-flex"
              aria-hidden
            >
              <span
                className="block h-1.5 w-1.5 rounded-full bg-primary/70"
                style={{ animation: "pulse-dot 1.4s ease-in-out infinite" }}
              />
              cycling
            </span>
          )}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`terminal-panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
      >
        <TerminalReplay scenario={active} />
      </div>
    </div>
  );
}
