"use client";

import { useState, useEffect, useRef } from "react";
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

  const active = SCENARIOS[activeIdx];

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Framework scenarios"
        className="mb-3 flex w-fit items-center gap-1 rounded-lg border border-border/80 bg-card/60 p-1 backdrop-blur-sm"
      >
        {SCENARIOS.map((scenario, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={scenario.id}
              id={`tab-${scenario.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`terminal-panel-${scenario.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => pick(idx)}
              className={`relative cursor-pointer rounded-md px-3.5 py-1.5 font-sans text-[12px] uppercase tracking-[0.12em] transition-colors ${
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

        {!userLocked && !reducedMotion && (
          <span
            className="ml-2 hidden items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-dim sm:inline-flex"
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
