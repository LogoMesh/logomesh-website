"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoMark } from "@/components/LogoMark";
import { useInstallationId } from "@/lib/use-installation";
import type { CreateInstallationResponse } from "@/lib/types";
import { Step1Welcome } from "./Step1Welcome";
import { Step2Install } from "./Step2Install";
import { Step3Sentry } from "./Step3Sentry";
import { Step4Github } from "./Step4Github";
import { Step5Slack } from "./Step5Slack";
import { Step6Done } from "./Step6Done";
import { StepIndicator } from "./StepIndicator";

const TOTAL_STEPS = 6;

export type WizardProgress = {
  sentry: boolean;
  github: boolean;
  slack: boolean;
};

function readStepFromHash(): number {
  if (typeof window === "undefined") return 1;
  const m = window.location.hash.match(/step=(\d)/);
  if (!m) return 1;
  const n = Number(m[1]);
  return n >= 1 && n <= TOTAL_STEPS ? n : 1;
}

function writeStepToHash(step: number) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", `#step=${step}`);
}

export function OnboardingFlow() {
  const { save } = useInstallationId();
  const [step, setStep] = useState(1);
  const [install, setInstall] = useState<CreateInstallationResponse | null>(
    null,
  );
  const [progress, setProgress] = useState<WizardProgress>({
    sentry: false,
    github: false,
    slack: false,
  });

  // Sync step ↔ URL hash so refresh keeps progress.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration from URL hash
    setStep(readStepFromHash());
    function onHashChange() {
      setStep(readStepFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goTo = useCallback((next: number) => {
    if (next < 1 || next > TOTAL_STEPS) return;
    writeStepToHash(next);
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const handleInstallCreated = useCallback(
    (data: CreateInstallationResponse) => {
      save(data.id);
      setInstall(data);
    },
    [save],
  );

  const handleSentryDone = useCallback(
    () => setProgress((p) => ({ ...p, sentry: true })),
    [],
  );
  const handleGithubDone = useCallback(
    () => setProgress((p) => ({ ...p, github: true })),
    [],
  );
  const handleSlackDone = useCallback(
    () => setProgress((p) => ({ ...p, slack: true })),
    [],
  );

  // Steps 3-6 require an install. If hash put us past step 2 without one
  // (e.g. cold-load of #step=4), fall back to the install step quietly.
  const effectiveStep = !install && step > 2 ? 2 : step;

  return (
    <>
      {/* Mobile gate — wizard is desktop-only for v1 */}
      <div className="flex min-h-dvh items-center justify-center px-6 py-12 lg:hidden">
        <div className="max-w-md text-center">
          <p
            className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]"
          >
            Open on desktop
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]">
            The setup wizard is desktop-only for v1.
          </h1>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--color-muted)]">
            Pilot v1 expects a laptop or larger display. Open this URL on your
            desktop and we&rsquo;ll get you to a sealed crash artifact in about
            four minutes.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] hover:underline"
          >
            ← Back to logomesh.dev
          </Link>
        </div>
      </div>

      {/* Desktop wizard */}
      <div className="hidden min-h-dvh flex-col lg:flex">
        <header className="mx-auto flex w-full max-w-[1080px] items-center justify-between px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <LogoMark size={28} />
            <span
              className="font-mono text-[16px] font-semibold leading-none"
              style={{ letterSpacing: "-0.03em" }}
            >
              <span
                className="text-[var(--color-accent)]"
                style={{
                  textShadow:
                    "0 0 14px rgba(196,255,0,0.4), 0 0 6px rgba(196,255,0,0.18)",
                }}
              >
                logo
              </span>
              <span className="text-[var(--color-muted)]">mesh</span>
            </span>
          </Link>
          <StepIndicator current={effectiveStep} total={TOTAL_STEPS} />
        </header>

        <main className="flex flex-1 items-start justify-center px-6 pb-16 pt-2">
          <div className="w-full max-w-[680px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={effectiveStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.75rem] border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/80 p-8 backdrop-blur-md md:p-10"
                style={{
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.04) inset, 0 28px 80px -36px rgba(0,0,0,0.75)",
                }}
              >
                {effectiveStep === 1 && (
                  <Step1Welcome onNext={() => goTo(2)} />
                )}
                {effectiveStep === 2 && (
                  <Step2Install
                    existing={install}
                    onCreated={handleInstallCreated}
                    onContinue={() => goTo(3)}
                  />
                )}
                {effectiveStep === 3 && install && (
                  <Step3Sentry
                    install={install}
                    onDone={() => {
                      handleSentryDone();
                      goTo(4);
                    }}
                  />
                )}
                {effectiveStep === 4 && install && (
                  <Step4Github
                    installId={install.id}
                    onDone={() => {
                      handleGithubDone();
                      goTo(5);
                    }}
                  />
                )}
                {effectiveStep === 5 && install && (
                  <Step5Slack
                    installId={install.id}
                    onDone={() => {
                      handleSlackDone();
                      goTo(6);
                    }}
                    onSkip={() => goTo(6)}
                  />
                )}
                {effectiveStep === 6 && install && (
                  <Step6Done
                    installId={install.id}
                    progress={progress}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}
