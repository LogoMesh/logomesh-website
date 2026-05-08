"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { api, humanError } from "@/lib/api";
import type { CreateInstallationResponse } from "@/lib/types";

function CopyField({
  label,
  value,
  mono = false,
  warning,
}: {
  label: string;
  value: string;
  mono?: boolean;
  warning?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // No-op — older browsers or restricted contexts.
    }
  }, [value]);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-dim)]">
          {label}
        </span>
        {warning ? (
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-warning,#fbbf24)]">
            {warning}
          </span>
        ) : null}
      </div>
      <div className="flex items-stretch gap-2">
        <div
          className={`flex-1 overflow-x-auto rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3.5 py-3 text-[13.5px] ${mono ? "font-[family-name:var(--font-mono)]" : ""} text-[var(--color-ink)]`}
        >
          {value}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] px-3 text-[12px] font-[family-name:var(--font-mono)] font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <>
              <Check size={14} strokeWidth={2.5} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} strokeWidth={2} /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function Step2Install({
  existing,
  onCreated,
  onContinue,
}: {
  existing: CreateInstallationResponse | null;
  onCreated: (data: CreateInstallationResponse) => void;
  onContinue: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.createInstallation();
      onCreated(data);
    } catch (e) {
      setError(humanError(e));
    } finally {
      setLoading(false);
    }
  }, [onCreated]);

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        Step 2 of 6
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)]">
        Create your installation
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-muted)]">
        We&rsquo;ll mint your webhook URL and a one-time client secret. The
        secret is shown once and never again — keep your password manager open.
      </p>

      {!existing && !loading && !error ? (
        <motion.button
          type="button"
          onClick={create}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-xl bg-[var(--color-accent)] px-7 py-3.5 text-black font-[family-name:var(--font-mono)] text-[14.5px] font-bold shadow-[0_12px_40px_-12px_rgba(196,255,0,0.4)]"
        >
          Create installation
          <ArrowRight size={17} className="-mr-1 opacity-70" />
        </motion.button>
      ) : null}

      {loading ? (
        <div className="mt-8 space-y-3" aria-live="polite">
          <div className="h-12 w-full animate-pulse rounded-lg bg-[var(--color-canvas-3)]" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-[var(--color-canvas-3)]" />
          <div className="h-12 w-3/4 animate-pulse rounded-lg bg-[var(--color-canvas-3)]" />
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="mt-8 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 p-4"
        >
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-danger)]">
            Something didn&rsquo;t work
          </p>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]">
            {error}
          </p>
          <button
            type="button"
            onClick={create}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-hi)] px-3 py-2 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] hover:border-[var(--color-accent)]"
          >
            Try again
          </button>
        </div>
      ) : null}

      {existing ? (
        <div className="mt-8 space-y-5">
          <CopyField label="Webhook URL" value={existing.webhook_url} />
          <CopyField
            label="Client secret"
            value={existing.client_secret}
            mono
            warning="Save this — won't be shown again"
          />

          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:gap-4">
            <motion.button
              type="button"
              onClick={onContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-black font-[family-name:var(--font-mono)] text-[14px] font-bold shadow-[0_12px_40px_-12px_rgba(196,255,0,0.35)]"
            >
              I&rsquo;ve copied both — continue
              <ArrowRight size={16} className="-mr-1 opacity-70" />
            </motion.button>
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[var(--color-border-hi)] px-5 py-3 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              Show me how to paste these into Sentry
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
