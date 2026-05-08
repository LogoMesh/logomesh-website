"use client";

import { useCallback, useState } from "react";
import { Copy, Check } from "lucide-react";
import type { InstallationSummary } from "@/lib/types";
import { StatusPill } from "./StatusPill";

function CopyId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // No-op.
    }
  }, [value]);
  const truncated = `${value.slice(0, 8)}…${value.slice(-4)}`;
  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]"
      aria-label="Copy installation id"
      title={value}
    >
      <span>{truncated}</span>
      {copied ? (
        <Check size={13} strokeWidth={2.5} className="text-[var(--color-accent)]" />
      ) : (
        <Copy size={12} strokeWidth={2} className="text-[var(--color-dim)]" />
      )}
    </button>
  );
}

function formatCreated(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HeroStrip({ summary }: { summary: InstallationSummary }) {
  const status = summary.sentry.configured
    ? { tone: "success" as const, label: "Active" }
    : { tone: "warning" as const, label: "Paused — needs Sentry" };

  return (
    <section
      className="rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/70 p-6 backdrop-blur-sm"
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset" }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Installation
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <CopyId value={summary.id} />
            <span className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-dim)]">
              created {formatCreated(summary.created_at)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <StatusPill tone={status.tone}>● {status.label}</StatusPill>
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-muted)]">
            {summary.runs_count} run{summary.runs_count === 1 ? "" : "s"} ·{" "}
            {summary.github.configured ? "GitHub on" : "GitHub off"} ·{" "}
            {summary.slack.configured ? "Slack on" : "Slack off"}
          </p>
        </div>
      </div>
    </section>
  );
}
