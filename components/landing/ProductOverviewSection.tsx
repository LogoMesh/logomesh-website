"use client";

import { useRef } from "react";
import { Cpu, ShieldCheck, GitPullRequest, ScrollText } from "lucide-react";
import { AuroraField } from "./AuroraField";
import { useFadeUp } from "@/lib/animations";

const CARDS = [
  {
    icon: Cpu,
    title: "Debug from facts, not guesswork",
    body: "The same crash input produces the same failing test output, so teams can reproduce issues consistently.",
  },
  {
    icon: ShieldCheck,
    title: "Isolated by default",
    body: "Runs in a hardened sandbox with clear boundaries for safer execution in production-minded workflows.",
  },
  {
    icon: GitPullRequest,
    title: "You stay in control",
    body: "LogoMesh reproduces incidents. Your team decides root cause, remediation, and every code change.",
  },
  {
    icon: ScrollText,
    title: "Clear incident trail",
    body: "Every run includes a structured artifact for internal review, handoff, and post-incident documentation.",
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
            Why teams choose LogoMesh
          </h2>
          <p className="marketing-lg mx-auto mt-5 max-w-[34rem] text-pretty text-[var(--color-muted)]">
            It gives incident responders a repeatable starting point in minutes, helping teams reduce time-to-repro and
            move faster through debugging.
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
