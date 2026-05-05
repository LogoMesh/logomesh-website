"use client";

import { useRef } from "react";
import {
  Bell,
  TerminalSquare,
  FileCode,
  FileBadge,
  KeyRound,
  Lock,
  Scale,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { useFadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { LANDING_GRAPHICS } from "@/lib/landing-graphic-src";
import { MarketingGraphicPlaceholder } from "./MarketingGraphicPlaceholder";

const STEPS: {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
  graphicSrc: string;
  graphicTitle: string;
  graphicExport: string;
}[] = [
  {
    n: "01",
    title: "A production crash is detected",
    body: "Your error monitoring tool catches a real customer-facing crash and saves the details needed to replay it.",
    icon: Bell,
    graphicSrc: LANDING_GRAPHICS.how1,
    graphicTitle:
      "Screenshot: Sentry issue page with stack trace and frame locals (your error monitor of choice).",
    graphicExport: "~1200×800 @2x WebP. Show the issue + frame locals panel.",
  },
  {
    n: "02",
    title: "You start one LogoMesh run",
    body: "Paste the crash link into the LogoMesh CLI to start the reproduction flow.",
    icon: TerminalSquare,
    graphicSrc: LANDING_GRAPHICS.how2,
    graphicTitle:
      "Screenshot: terminal running `logomesh repro <sentry-url>` with progress lines.",
    graphicExport: "~1200×800 @2x. Crop tight to the CLI invocation.",
  },
  {
    n: "03",
    title: "LogoMesh creates a failing test",
    body: "You get a test that reliably reproduces the issue so your team can work from facts, not guesses.",
    icon: FileCode,
    graphicSrc: LANDING_GRAPHICS.how3,
    graphicTitle:
      "Screenshot: generated pytest opened in the editor next to the failing assertion.",
    graphicExport: "~1200×800 @2x. Highlight the test body and the assertion.",
  },
  {
    n: "04",
    title: "You get a clear record of the incident",
    body: "The run includes both the test output and a structured artifact your team can use for reporting and follow-up.",
    icon: FileBadge,
    graphicSrc: LANDING_GRAPHICS.how4,
    graphicTitle:
      "Screenshot: pytest output showing the failure plus the JSON audit artifact.",
    graphicExport: "~1200×800 @2x. Show test failure + artifact side by side.",
  },
];

const SECURITY_PILLARS: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    icon: Shield,
    title: "Hardened sandbox",
    body: "Airgapped. Nobody-user. Memory and PID limits for safer, isolated execution.",
  },
  {
    icon: KeyRound,
    title: "Scoped to declared paths",
    body:
      "You list which paths get scanned in YAML: billing/, checkout/, pricing/, refund/, payments/. Everything else is ignored by design.",
  },
  {
    icon: Lock,
    title: "No state from your DB",
    body:
      "The repro path reads frame locals captured at the crash. We do not pull from your production database.",
  },
  {
    icon: Scale,
    title: "Engineering artifact output",
    body:
      "Artifacts are intended for engineering workflows. Handle them with your normal internal data controls and review process.",
  },
];

export function HowItWorksSection() {
  const stepsRef = useRef<HTMLOListElement>(null);
  useFadeUp(stepsRef, { targets: "[data-step]", stagger: 0.1 });

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="landing-surface-muted relative w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-24 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="landing-kicker">
            How it works
          </p>
          <h2
            id="how-heading"
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            How LogoMesh works
          </h2>
          <p className="marketing-lg mx-auto mt-5 max-w-[40rem] text-pretty text-[var(--color-muted)]">
            A simple four-step flow from production crash to reproducible test output.
          </p>
        </div>

        <ol
          ref={stepsRef}
          className="mx-auto mt-14 max-w-[960px] list-none md:mt-20"
          aria-label="Steps from install to thread"
        >
          {STEPS.map(({ n, title, body, icon: Icon, graphicSrc, graphicTitle, graphicExport }, i) => {
            const isLast = i === STEPS.length - 1;
            /** Odd rows: image left, copy right on large screens (still copy-first in DOM on mobile). */
            const zigzag = i % 2 === 1;
            return (
              <li
                key={n}
                data-step
                className={`relative flex gap-4 sm:gap-6 md:gap-8 ${isLast ? "" : "pb-14 md:pb-20"}`}
              >
                <div className="relative flex w-[52px] shrink-0 flex-col items-center self-stretch sm:w-14">
                  <div className="relative z-[2] flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] shadow-[0_0_0_1px_rgba(0,0,0,0.35)] sm:h-12 sm:w-12 landing-icon-bright">
                    <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                  </div>
                  <span className="mt-2 font-[family-name:var(--font-display)] text-[1.125rem] font-extrabold tabular-nums leading-none text-[var(--color-border-hi)] sm:text-[1.25rem]">
                    {n}
                  </span>
                  {!isLast ? (
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-[3.35rem] bottom-0 z-[1] w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-border-hi)] via-[var(--color-border)] to-[var(--color-border)] sm:top-[3.6rem]"
                    />
                  ) : null}
                </div>

                <article className="min-w-0 flex-1 pt-0.5 pb-1">
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
                    <header
                      className={cn(
                        "space-y-3",
                        zigzag && "lg:order-2",
                      )}
                    >
                      <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.45rem]">
                        {title}
                      </h3>
                      <p className="marketing-lg text-pretty text-[var(--color-muted)]">{body}</p>
                    </header>
                    <div
                      className={cn(
                        "min-w-0 lg:max-w-none",
                        zigzag && "lg:order-1",
                      )}
                    >
                      <MarketingGraphicPlaceholder
                        variant="step"
                        title={graphicTitle}
                        recommendedExport={graphicExport}
                        src={graphicSrc}
                      />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <aside
          aria-label="Current product behavior"
          className="mx-auto mt-12 max-w-[860px] rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/85 px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] text-[var(--color-accent)]"
              aria-hidden
            >
              <span className="font-mono text-[12px] font-semibold tracking-tight">→</span>
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                Today
              </p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-muted)] sm:text-[15px]">
                <span className="text-[var(--color-ink)]">Manual run from a crash link.</span> A developer starts the run
                and gets reproducible output quickly.{" "}
                <span className="text-[var(--color-ink)]">Scope is focused.</span> LogoMesh is strongest on deterministic
                backend failures that can be replayed from captured runtime state.
              </p>
            </div>
          </div>
        </aside>

        <div
          id="security"
          aria-labelledby="security-heading"
          className="mx-auto mt-16 max-w-[960px] scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)] pt-14 md:mt-20 md:pt-20"
        >
          <div className="mx-auto max-w-[720px] text-center">
            <p className="landing-kicker">
              Security
            </p>
            <h3
              id="security-heading"
              className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
            >
              Built with security boundaries in mind.
            </h3>
            <p className="mx-auto mt-5 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-[var(--color-muted)] sm:text-[18px] sm:leading-[1.75]">
              LogoMesh runs in an isolated sandbox, focuses only on paths you define, and does not require pulling full
              production database state for reproduction.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 xl:grid-cols-4 xl:gap-6">
            {SECURITY_PILLARS.map(({ title: pillarTitle, body, icon: PillarIcon }, i) => (
              <article
                key={pillarTitle}
                className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/90 p-5 sm:p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] landing-icon-bright">
                  <PillarIcon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                </span>
                <h4 className="mt-4 font-[family-name:var(--font-display)] text-[1.125rem] font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.2rem]">
                  {pillarTitle}
                </h4>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]">
                  {body}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[40rem] text-center text-[14px] leading-relaxed text-[var(--color-dim)] sm:mt-10 sm:text-[15px]">
            More detail lives in the docs. Ask if you need something for a security review.
          </p>
        </div>
      </div>
    </section>
  );
}
