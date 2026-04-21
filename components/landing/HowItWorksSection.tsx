"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Box,
  GitBranch,
  KeyRound,
  Lock,
  MessageSquare,
  Scale,
  Shield,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LANDING_GRAPHICS } from "@/lib/landing-graphic-src";
import { MarketingGraphicPlaceholder } from "./MarketingGraphicPlaceholder";

const STEPS: {
  n: string;
  title: string;
  body: string;
  icon: typeof Box;
  graphicSrc: string;
  graphicTitle: string;
  graphicExport: string;
}[] = [
  {
    n: "01",
    title: "Add it to the repo",
    body: "Install the GitHub App once. After that, Python PRs on that repo are in scope.",
    icon: Box,
    graphicSrc: LANDING_GRAPHICS.how1,
    graphicTitle:
      "Screenshot: GitHub, Settings, Integrations, LogoMesh in the installed apps row.",
    graphicExport: "~1200×800 @2x WebP. Show the real install state.",
  },
  {
    n: "02",
    title: "A Python PR opens or updates",
    body: "We read the diff and focus on what changed: files, functions, behavior.",
    icon: GitBranch,
    graphicSrc: LANDING_GRAPHICS.how2,
    graphicTitle: "Screenshot: open PR with title, branch, and changed files list (Python).",
    graphicExport: "~1200×800 @2x. Crop to the PR header + file list.",
  },
  {
    n: "03",
    title: "Checks run in isolation",
    body: "Generated tests and sandbox runs target your change, not a generic lint pass.",
    icon: Shield,
    graphicSrc: LANDING_GRAPHICS.how3,
    graphicTitle:
      "Screenshot: Checks tab or run log with LogoMesh in progress or completed (your real UI).",
    graphicExport: "~1200×800 @2x. Prefer the actual check names your app posts.",
  },
  {
    n: "04",
    title: "You see it on the PR",
    body: "Breakage shows up as a comment: inputs, output, file, line. No breakage, no comment.",
    icon: MessageSquare,
    graphicSrc: LANDING_GRAPHICS.how4,
    graphicTitle:
      "Screenshot: PR comment thread with a LogoMesh comment showing inputs, output, and file and line.",
    graphicExport: "~1200×800 @2x. Match your production styling.",
  },
];

const SECURITY_PILLARS: {
  title: string;
  body: string;
  icon: typeof Shield;
}[] = [
  {
    icon: Shield,
    title: "GitHub App model",
    body:
      "You pick which repos get the app. Permissions are what you approve in GitHub, and you can uninstall anytime.",
  },
  {
    icon: Lock,
    title: "Isolated execution",
    body:
      "Work runs in a sandbox meant for untrusted code, separate from production, with limits on what it can touch.",
  },
  {
    icon: KeyRound,
    title: "Scoped to the change",
    body:
      "We pull what we need from the PR to exercise the diff, not a standing export of your whole codebase.",
  },
  {
    icon: Scale,
    title: "Compliance path",
    body:
      "Formal SOC 2 packs are not what we ship today. Small surface area in public beta. Enterprise controls are on the roadmap.",
  },
];

export function HowItWorksSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="landing-surface-muted relative w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-24 md:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="landing-kicker"
          >
            How it works
          </motion.p>
          <motion.h2
            id="how-heading"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Four steps
          </motion.h2>
        </div>

        <ol
          className="mx-auto mt-14 max-w-[960px] list-none md:mt-20"
          aria-label="Steps from install to thread"
        >
          {STEPS.map(({ n, title, body, icon: Icon, graphicSrc, graphicTitle, graphicExport }, i) => {
            const isLast = i === STEPS.length - 1;
            /** Odd rows: image left, copy right on large screens (still copy-first in DOM on mobile). */
            const zigzag = i % 2 === 1;
            return (
              <motion.li
                key={n}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i }}
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
              </motion.li>
            );
          })}
        </ol>

        <div
          id="security"
          aria-labelledby="security-heading"
          className="mx-auto mt-16 max-w-[960px] scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)] pt-14 md:mt-20 md:pt-20"
        >
          <div className="mx-auto max-w-[720px] text-center">
            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="landing-kicker"
            >
              Security
            </motion.p>
            <motion.h3
              id="security-heading"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
              className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
            >
              Built for least privilege.
            </motion.h3>
            <motion.p
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
              className="mx-auto mt-5 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-[var(--color-muted)] sm:text-[18px] sm:leading-[1.75]"
            >
              Short version: least privilege, isolated runs, no mystery access. Here&apos;s how we talk about it today,
              and what comes later if you need a security packet.
            </motion.p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 xl:grid-cols-4 xl:gap-6">
            {SECURITY_PILLARS.map(({ title: pillarTitle, body, icon: PillarIcon }, i) => (
              <motion.article
                key={pillarTitle}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.06 * i }}
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
              </motion.article>
            ))}
          </div>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-8 max-w-[40rem] text-center text-[14px] leading-relaxed text-[var(--color-dim)] sm:mt-10 sm:text-[15px]"
          >
            More detail lives in docs and the GitHub App listing. Ask if you need something for a security review.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
