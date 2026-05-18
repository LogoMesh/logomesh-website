"use client";

import { useRef } from "react";
import {
  ShieldCheck,
  Cpu,
  CheckCheck,
  TerminalSquare,
  ScrollText,
  FileCode,
  type LucideIcon,
} from "lucide-react";
import { useSplitText, useFadeUp } from "@/lib/animations";

const PROOF_POINTS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    icon: TerminalSquare,
    title: "60-second reproduction",
    body: "From a Sentry issue URL to a verified failing test.",
  },
  {
    icon: Cpu,
    title: "Deterministic evidence",
    body: "Audit records are generated from captured runtime values — never from model output.",
  },
  {
    icon: ShieldCheck,
    title: "Isolated execution",
    body: "Every run uses a hardened Docker sandbox with no network access and strict resource limits.",
  },
  {
    icon: CheckCheck,
    title: "500+ quality checks",
    body: "Automated tests run on every release to keep the engine reliable.",
  },
  {
    icon: ScrollText,
    title: "Structured audit records",
    body: "Each run produces JSON evidence designed for post-incident review and compliance handoff.",
  },
  {
    icon: FileCode,
    title: "Python, today",
    body: "Purpose-built for Python backend incidents where runtime context captures the failure.",
  },
];

export function SocialProofStrip() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useSplitText(headingRef);
  useFadeUp(gridRef, { targets: "li", stagger: 0.07 });

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="relative w-full min-w-0 border-t border-[var(--color-border)] bg-[var(--color-canvas)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 md:px-10 md:py-14">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex flex-col items-center gap-4">
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              aria-hidden
            >
              <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <h2
                ref={headingRef}
                id="social-proof-heading"
                className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.65rem)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]"
              >
                Reliable, secure, and built for production.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]">
                Every reproduction runs in isolation with strict boundaries — so your team can trust the results.
              </p>
            </div>
          </div>
        </div>

        <ul
          ref={gridRef}
          className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROOF_POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <article className="group relative flex h-full gap-4 rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/90 p-4 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-canvas-2)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] text-[var(--color-accent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-[1rem] font-bold tracking-[-0.01em] text-[var(--color-ink)] sm:text-[1.05rem]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-[var(--color-muted)] sm:text-[14px]">
                    {body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
