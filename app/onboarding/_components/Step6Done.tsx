"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Check, Square } from "lucide-react";
import { api, humanError } from "@/lib/api";
import type { WizardProgress } from "./OnboardingFlow";

function ChecklistRow({
  done,
  optional,
  children,
}: {
  done: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-[var(--color-ink)]">
      <span
        aria-hidden
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${done ? "bg-[var(--color-pass)]/15 text-[var(--color-pass)]" : "border border-[var(--color-border-hi)] text-[var(--color-dim)]"}`}
      >
        {done ? <Check size={12} strokeWidth={3} /> : <Square size={10} strokeWidth={2} />}
      </span>
      <span className={done ? "" : "text-[var(--color-muted)]"}>
        {children}
        {optional ? (
          <span className="ml-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-dim)]">
            (optional)
          </span>
        ) : null}
      </span>
    </li>
  );
}

export function Step6Done({
  installId,
  progress,
}: {
  installId: string;
  progress: WizardProgress;
}) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendAnother = useCallback(async () => {
    setError(null);
    setSending(true);
    try {
      await api.fireTest(installId);
      setToast("Test event queued. Open the dashboard to watch it.");
    } catch (e) {
      setError(humanError(e));
    } finally {
      setSending(false);
    }
  }, [installId]);

  return (
    <div>
      <div
        aria-hidden
        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
        style={{
          boxShadow: "0 0 32px rgba(196,255,0,0.18)",
        }}
      >
        <Check size={28} strokeWidth={2.5} />
      </div>

      <h2 className="mt-5 font-[family-name:var(--font-display)] text-[32px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--color-ink)]">
        You&rsquo;re set.
      </h2>
      <p className="mt-3 text-[15.5px] leading-[1.65] text-[var(--color-muted)]">
        Your dashboard is at{" "}
        <Link
          href={`/dashboard/${installId}`}
          className="font-[family-name:var(--font-mono)] text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          logomesh.dev/dashboard/{installId.slice(0, 8)}…
        </Link>{" "}
        — bookmark it now. The full URL is your access token, so don&rsquo;t
        share it publicly.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <motion.button
          type="button"
          onClick={() => router.push(`/dashboard/${installId}`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-black font-[family-name:var(--font-mono)] text-[14px] font-bold uppercase tracking-[0.1em] shadow-[0_12px_40px_-12px_rgba(196,255,0,0.4)]"
        >
          Go to dashboard
          <ArrowRight size={16} className="-mr-1 opacity-80" />
        </motion.button>
        <button
          type="button"
          onClick={sendAnother}
          disabled={sending}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[var(--color-border-hi)] px-5 py-3 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send another test event"}
        </button>
      </div>

      {toast ? (
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-pass)]">
          {toast}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-danger)]">
          {error}
        </p>
      ) : null}

      <div className="mt-9 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/60 p-5">
        <p className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Pilot kickoff checklist
        </p>
        <ul className="mt-3 space-y-2.5">
          <ChecklistRow done={progress.sentry}>
            Webhook configured in Sentry
          </ChecklistRow>
          <ChecklistRow done={progress.github}>GitHub PAT connected</ChecklistRow>
          <ChecklistRow done={progress.slack} optional>
            Slack notifications
          </ChecklistRow>
          <ChecklistRow done={false}>
            Wait for first real Sentry crash (or send another test)
          </ChecklistRow>
        </ul>
      </div>
    </div>
  );
}
