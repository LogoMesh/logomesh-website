"use client";

import { useCallback, useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { api, humanError } from "@/lib/api";

export const TEST_FIRED_EVENT = "logomesh:test-fired";

export function SendTestPanel({ installationId }: { installationId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const fire = useCallback(async () => {
    setError(null);
    setStatus("sending");
    try {
      await api.fireTest(installationId);
      setStatus("sent");
      window.dispatchEvent(new Event(TEST_FIRED_EVENT));
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (e) {
      setError(humanError(e));
      setStatus("idle");
    }
  }, [installationId]);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/55 p-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Send a test event
          </p>
          <p className="mt-1.5 max-w-[42rem] text-[14.5px] leading-[1.6] text-[var(--color-muted)]">
            Fires a stock crash fixture through the orchestrator end-to-end.
            The new run shows up in the table below within a few seconds.
          </p>
        </div>
        <motion.button
          type="button"
          onClick={fire}
          disabled={status === "sending"}
          whileHover={status === "sending" ? undefined : { scale: 1.02 }}
          whileTap={status === "sending" ? undefined : { scale: 0.98 }}
          className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-black font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_36px_-12px_rgba(196,255,0,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={14} strokeWidth={2.5} className="-ml-0.5" />
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Test sent"
              : "Send test event"}
        </motion.button>
      </div>
      {error ? (
        <p
          role="alert"
          className="mt-4 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-danger)]"
        >
          {error}
        </p>
      ) : null}
    </section>
  );
}
