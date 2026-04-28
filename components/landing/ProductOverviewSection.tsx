"use client";

import { useRef } from "react";
import { Bell, FileCode, ShieldCheck, GitPullRequest } from "lucide-react";
import { AuroraField } from "./AuroraField";
import { useFadeUp } from "@/lib/animations";

const CARDS = [
  {
    icon: Bell,
    title: "Silent on clean PRs",
    body: "If nothing broke, you hear nothing. No noise, no scores, no opinions.",
  },
  {
    icon: FileCode,
    title: "Every comment has a repro",
    body: "The exact input, the exact line, the exact output. Not a guess — proof.",
  },
  {
    icon: ShieldCheck,
    title: "Two signals before we post",
    body: "A finding has to pass two independent checks. Most tools stop at one.",
  },
  {
    icon: GitPullRequest,
    title: "A fix test, ready to paste",
    body: "We include a test that fails on the bug and passes on the fix. Drop it straight into your suite.",
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
            Proof, not opinions.
          </h2>
          <p className="marketing-lg mx-auto mt-5 max-w-[34rem] text-pretty text-[var(--color-muted)]">
            We only comment when we can show the exact input that broke your code.
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
