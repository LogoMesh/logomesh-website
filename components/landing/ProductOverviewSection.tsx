"use client";

import { useRef } from "react";
import { AuroraField } from "./AuroraField";
import { useFadeUp } from "@/lib/animations";

const CARDS = [
  {
    n: "01",
    title: "Silent on clean PRs",
    body: "No praise spam. No nits. No score. If nothing broke, we say nothing.",
  },
  {
    n: "02",
    title: "Every comment comes with a repro",
    body: "The exact input. The line. The values at the moment it broke. No guesses.",
  },
  {
    n: "03",
    title: "Paste-ready fix test",
    body: "A test that passes only when your fix is right. Goes straight in your suite.",
  },
  {
    n: "04",
    title: "Mutation-checked",
    body: "Every fix test is mutation-checked. If it still passes on the buggy code, we don't post it.",
  },
  {
    n: "05",
    title: "Two independent signals",
    body: "Findings must hit at least two independent checks before we comment. Cuts the noise before you see it.",
  },
  {
    n: "06",
    title: "Blast radius",
    body: "We tell you which callers hit the broken path. Know what else to review before merge.",
  },
] as const;

export function ProductOverviewSection() {
  const cardsRef = useRef<HTMLUListElement>(null);

  useFadeUp(cardsRef, { targets: "h3", stagger: 0.07, y: 16, start: "top 88%" });
  useFadeUp(cardsRef, { targets: "[data-card]", stagger: 0.1 });

  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="landing-surface-base relative w-full min-w-0 overflow-hidden scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <AuroraField className="opacity-70" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 md:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="landing-kicker">
            Why LogoMesh
          </p>
          <h2
            id="why-heading"
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Proof, not opinions.
          </h2>
          <p className="marketing-lg mx-auto mt-6 max-w-[38rem] text-pretty text-[var(--color-muted)]">
            Other tools leave opinions on every PR. We only post when we can show the exact input that broke your code.
          </p>
        </div>

        <ul
          ref={cardsRef}
          className="mx-auto mt-16 grid max-w-[1180px] gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {CARDS.map(({ n, title, body }, i) => (
            <li
              key={n}
              data-card
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/70 p-7 backdrop-blur-sm transition-colors hover:border-[var(--color-border-hi)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(78 100% 50% / 0.06) 0%, transparent 70%)",
                }}
              />
              <p className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-dim)]">
                {n}
              </p>
              <h3 className="relative mt-4 font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.5rem]">
                {title}
              </h3>
              <p className="relative mt-3 text-[15.5px] leading-relaxed text-[var(--color-muted)] sm:text-[16.5px]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
