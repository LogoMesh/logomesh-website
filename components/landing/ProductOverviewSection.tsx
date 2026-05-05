"use client";

import { useRef } from "react";
import { Cpu, ShieldCheck, GitPullRequest, ScrollText } from "lucide-react";
import { AuroraField } from "./AuroraField";
import { useFadeUp } from "@/lib/animations";

const CARDS = [
  {
    icon: Cpu,
    title: "Zero LLM in the repro path",
    body: "Synthesis is deterministic from the captured frame locals. The agent does not hallucinate the reproduction.",
  },
  {
    icon: ShieldCheck,
    title: "Hardened Docker sandbox",
    body: "Airgapped. Nobody-user. Memory and PID limits. Same sandbox that won AgentBeats Phase 2.",
  },
  {
    icon: GitPullRequest,
    title: "Human gates the fix",
    body: "When fix generation ships, the agent will open a draft PR. Nothing merges without your sign-off.",
  },
  {
    icon: ScrollText,
    title: "Audit-ready evidence chain",
    body: "JSON artifact mapped to PCI DSS 4.0 Req 6.3.2 and SOC2 CC8.1 control IDs. Generated as part of the repro.",
  },
] as const;

export function ProductOverviewSection() {
  const cardsRef = useRef<HTMLUListElement>(null);

  useFadeUp(cardsRef, { targets: "[data-card]", stagger: 0.12 });

  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="landing-surface-base relative w-full min-w-0 overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <AuroraField className="opacity-70" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 md:px-10">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="landing-kicker">Why LogoMesh</p>
          <h2
            id="why-heading"
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Replay, not a guess.
          </h2>
          <p className="marketing-lg mx-auto mt-5 max-w-[34rem] text-pretty text-[var(--color-muted)]">
            The repro reads the actual program state from the moment of the crash. The reproduction is deterministic.
            There is no narrative for the agent to hallucinate.
          </p>
        </div>

        <ul
          ref={cardsRef}
          className="mx-auto mt-14 grid max-w-[860px] gap-4 sm:grid-cols-2 sm:gap-5"
        >
          {CARDS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              data-card
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/70 p-8 backdrop-blur-sm transition-colors hover:border-[var(--color-border-hi)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(78 100% 50% / 0.06) 0%, transparent 70%)",
                }}
              />
              <div className="relative mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)]">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" strokeWidth={1.5} />
              </div>
              <h3 className="relative font-[family-name:var(--font-display)] text-[1.2rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
