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

const STEPS: {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    n: "01",
    title: "Your crashes don't sit waiting",
    body: "The moment Sentry catches a crash, the agent picks it up. No manual trigger, no human in the loop.",
    icon: Bell,
  },
  {
    n: "02",
    title: "An agent reproduces the bug for you",
    body: "It reads the crash, finds the right piece of your code, and figures out how to trigger it. If it can't, it tells you why — never a fake green.",
    icon: TerminalSquare,
  },
  {
    n: "03",
    title: "The proof is written by code, not AI",
    body: "A deterministic Python function writes the failing test and the audit file. No hallucinations land in your evidence. That's the part your auditor cares about.",
    icon: FileCode,
  },
  {
    n: "04",
    title: "Your team gets a draft PR they can trust",
    body: "Real failing test. Sealed audit file mapped to SOC2 and PCI. We never touch your code or merge a PR — your team ships the fix.",
    icon: FileBadge,
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
    body: "Airgapped Docker container, unprivileged user, memory and PID limits. Refuses to run in production without Docker isolation.",
  },
  {
    icon: KeyRound,
    title: "Per-installation secrets",
    body:
      "Each install has its own Sentry HMAC secret, GitHub PAT, and Slack webhook, encrypted at rest in Supabase and rotatable from the dashboard.",
  },
  {
    icon: Lock,
    title: "No state from your DB",
    body:
      "The repro path reads frame locals captured at the crash. logomesh never connects to your production database.",
  },
  {
    icon: Scale,
    title: "PII redacted before every LLM call",
    body:
      "PAN (Luhn-validated), SSN, email, JWTs, and 15+ API-key prefixes are scrubbed before anything reaches an LLM or the audit seal.",
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
            From crash to verified test, automatically
          </h2>
          <p className="marketing-lg mx-auto mt-5 max-w-[40rem] text-pretty text-[var(--color-muted)]">
            Four things happen between a Sentry alert and the failing test landing in your PR queue.
          </p>
        </div>

        <ol
          ref={stepsRef}
          className="mx-auto mt-14 max-w-[960px] list-none md:mt-20"
          aria-label="Steps from install to thread"
        >
          {STEPS.map(({ n, title, body, icon: Icon }, i) => {
            const isLast = i === STEPS.length - 1;
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
                  <header className="space-y-3">
                    <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.45rem]">
                      {title}
                    </h3>
                    <p className="marketing-lg text-pretty text-[var(--color-muted)]">{body}</p>
                  </header>
                </article>
              </li>
            );
          })}
        </ol>

        <aside
          aria-label="Why the agent does not write the proof"
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
                Why we split the job
              </p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-muted)] sm:text-[15px]">
                <span className="text-[var(--color-ink)]">AI is great at planning. It is not great at evidence.</span>{" "}
                The agent does the investigation. A deterministic Python function writes the failing test and the
                audit file. And the agent only marks a crash &ldquo;reproduced&rdquo; if the sandbox raised{" "}
                <span className="text-[var(--color-ink)]">the same error</span> your users saw — not a similar one.
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
              Security you don&rsquo;t have to argue for
            </h3>
            <p className="mx-auto mt-5 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-[var(--color-muted)] sm:text-[18px] sm:leading-[1.75]">
              Every reproduction runs in an isolated sandbox. We never touch your production database. The same boundaries apply on the free tier and the enterprise deployment.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 xl:grid-cols-4 xl:gap-6">
            {SECURITY_PILLARS.map(({ title: pillarTitle, body, icon: PillarIcon }) => (
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
