"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { api, humanError } from "@/lib/api";
import type { CreateInstallationResponse } from "@/lib/types";

const STEPS = [
  "Open your Sentry project → Settings → Custom Integrations.",
  'Click "Create New Integration".',
  null, // rendered specially with the pasted values
  "Permissions: read on Issue, write on Issue & Comment.",
  "Save. Copy the new integration's auth token, paste below.",
] as const;

export function Step3Sentry({
  install,
  onDone,
}: {
  install: CreateInstallationResponse;
  onDone: () => void;
}) {
  const [token, setToken] = useState("");
  const [stage, setStage] = useState<"idle" | "saving" | "firing" | "sent">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const sendTest = useCallback(async () => {
    if (!token.trim()) {
      setError("Paste the Sentry auth token first.");
      return;
    }
    setError(null);
    setStage("saving");
    try {
      await api.setSentryToken(install.id, token.trim());
      setStage("firing");
      await api.fireTest(install.id);
      setStage("sent");
    } catch (e) {
      setError(humanError(e));
      setStage("idle");
    }
  }, [install.id, token]);

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        Step 3 of 6
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)]">
        Configure Sentry
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-muted)]">
        Wire your Sentry project to send issue events to logomesh. Five steps,
        about a minute.
      </p>

      <ol className="mt-7 space-y-4">
        {STEPS.map((text, i) => {
          if (i === 2) {
            return (
              <li
                key={i}
                className="flex gap-3 text-[14.5px] leading-[1.6] text-[var(--color-ink)]"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-hi)] font-[family-name:var(--font-mono)] text-[12px] font-bold text-[var(--color-muted)]">
                  3
                </span>
                <div className="min-w-0 space-y-1.5">
                  <p>
                    Name <span className="font-[family-name:var(--font-mono)] text-[var(--color-accent)]">logomesh</span>{" "}
                    — paste the values below.
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    <code className="rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-ink)] break-all">
                      <span className="text-[var(--color-dim)]">Webhook URL: </span>
                      {install.webhook_url}
                    </code>
                    <code className="rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-ink)] break-all">
                      <span className="text-[var(--color-dim)]">Client Secret: </span>
                      {install.client_secret}
                    </code>
                  </div>
                </div>
              </li>
            );
          }
          return (
            <li
              key={i}
              className="flex gap-3 text-[14.5px] leading-[1.6] text-[var(--color-ink)]"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-hi)] font-[family-name:var(--font-mono)] text-[12px] font-bold text-[var(--color-muted)]">
                {i + 1}
              </span>
              <span>{text}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-7">
        <label className="mb-2 block font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-dim)]">
          Sentry auth token (read &amp; write on issues + events)
        </label>
        <input
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="sntrys_…"
          className="w-full rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3.5 py-3 font-[family-name:var(--font-mono)] text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <motion.button
          type="button"
          onClick={sendTest}
          disabled={stage === "saving" || stage === "firing"}
          whileHover={
            stage === "idle" || stage === "sent" ? { scale: 1.02 } : undefined
          }
          whileTap={
            stage === "idle" || stage === "sent" ? { scale: 0.98 } : undefined
          }
          className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] px-5 py-3 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {stage === "saving"
            ? "Saving token…"
            : stage === "firing"
              ? "Firing test event…"
              : stage === "sent"
                ? "Send another test"
                : "Send test event"}
        </motion.button>

        <motion.button
          type="button"
          onClick={onDone}
          disabled={stage !== "sent"}
          whileHover={stage === "sent" ? { scale: 1.02 } : undefined}
          whileTap={stage === "sent" ? { scale: 0.98 } : undefined}
          className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-black font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_36px_-12px_rgba(196,255,0,0.4)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Continue
          <ArrowRight size={15} className="-mr-1 opacity-80" />
        </motion.button>
      </div>

      {stage === "sent" ? (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--color-pass)]/40 bg-[var(--color-pass)]/8 p-4"
          style={{ background: "rgba(0,232,122,0.06)" }}
        >
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-pass)]/20 text-[var(--color-pass)]">
            <Check size={12} strokeWidth={3} />
          </span>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-pass)]">
              Test sent
            </p>
            <p className="mt-1 text-[14px] leading-[1.55] text-[var(--color-ink)]">
              Check this dashboard for the verdict — pipeline runs in a few
              seconds.
            </p>
          </div>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 p-4"
        >
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-danger)]">
            Couldn&rsquo;t send test event
          </p>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]">
            {error}
          </p>
        </div>
      ) : null}
    </div>
  );
}
