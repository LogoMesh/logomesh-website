"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, FileJson } from "lucide-react";
import { api, humanError } from "@/lib/api";
import type { Run } from "@/lib/types";
import { StatusPill, type StatusPillTone } from "./StatusPill";
import { TEST_FIRED_EVENT } from "./SendTestPanel";

const BASELINE_INTERVAL = 30_000;
const FAST_INTERVAL = 3_000;
const FAST_WINDOW = 30_000;

function statusVisual(run: Run): { tone: StatusPillTone; label: string } {
  if (run.status === "in_progress") return { tone: "info", label: "⏳ In progress" };
  if (run.status === "error") return { tone: "danger", label: "⛔ Error" };
  if (run.status === "human_review") return { tone: "warning", label: "⚠ Review" };
  // shipped:
  if (run.verified_exception_match === true)
    return { tone: "success", label: "✓ Verified" };
  if (run.verified_exception_match === false)
    return { tone: "warning", label: "✗ Mismatch" };
  return { tone: "neutral", label: "Shipped" };
}

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
}

function formatRelative(iso: string): string {
  const ts = new Date(iso).getTime();
  const diffMs = Date.now() - ts;
  const min = Math.round(diffMs / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.round(hr / 24);
  return `${day} day${day === 1 ? "" : "s"} ago`;
}

function ExceptionCell({ run }: { run: Run }) {
  if (!run.expected_exception_type && !run.sandbox_exception_type) {
    return <span className="text-[var(--color-dim)]">—</span>;
  }
  const matched = run.verified_exception_match === true;
  return (
    <div className="flex flex-col gap-0.5 font-[family-name:var(--font-mono)] text-[12.5px] leading-tight">
      <span className={matched ? "text-[var(--color-pass)]" : "text-[var(--color-ink)]"}>
        {run.sandbox_exception_type ?? "—"}
      </span>
      {run.expected_exception_type ? (
        <span className="text-[var(--color-dim)]">
          expected {run.expected_exception_type}
        </span>
      ) : null}
    </div>
  );
}

export function RunsTable({ installationId }: { installationId: string }) {
  const [runs, setRuns] = useState<Run[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollMode, setPollMode] = useState<"slow" | "fast">("slow");
  const fastFlipTimerRef = useRef<number | null>(null);
  const pollTimerRef = useRef<number | null>(null);
  const pollModeRef = useRef<"slow" | "fast">("slow");

  useEffect(() => {
    pollModeRef.current = pollMode;
  }, [pollMode]);

  const fetchRuns = useCallback(async () => {
    try {
      const data = await api.listRuns(installationId, 20);
      setRuns(data.runs);
      setError(null);
    } catch (e) {
      setError(humanError(e));
    }
  }, [installationId]);

  // Poll loop. Recurses with computed interval depending on mode.
  useEffect(() => {
    let cancelled = false;
    function schedule() {
      if (cancelled) return;
      const interval =
        pollModeRef.current === "fast" ? FAST_INTERVAL : BASELINE_INTERVAL;
      pollTimerRef.current = window.setTimeout(async () => {
        await fetchRuns();
        schedule();
      }, interval);
    }
    void fetchRuns(); // eslint-disable-line react-hooks/set-state-in-effect -- initial mount fetch
    schedule();
    return () => {
      cancelled = true;
      if (pollTimerRef.current) window.clearTimeout(pollTimerRef.current);
    };
  }, [fetchRuns]);

  // Bump into fast-poll mode when SendTestPanel fires a test.
  useEffect(() => {
    function onTest() {
      setPollMode("fast");
      if (fastFlipTimerRef.current) window.clearTimeout(fastFlipTimerRef.current);
      fastFlipTimerRef.current = window.setTimeout(
        () => setPollMode("slow"),
        FAST_WINDOW,
      );
      void fetchRuns();
    }
    window.addEventListener(TEST_FIRED_EVENT, onTest);
    return () => {
      window.removeEventListener(TEST_FIRED_EVENT, onTest);
      if (fastFlipTimerRef.current) window.clearTimeout(fastFlipTimerRef.current);
    };
  }, [fetchRuns]);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/45">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <p className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Recent runs
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--color-dim)]">
          {runs == null
            ? "Loading…"
            : `${runs.length} of last 20 · auto-refresh every ${
                pollMode === "fast" ? "3" : "30"
              }s`}
        </p>
      </div>

      {error ? (
        <div role="alert" className="px-6 py-5">
          <p className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-danger)]">
            {error}
          </p>
        </div>
      ) : runs == null ? (
        <div className="space-y-2 px-6 py-5" aria-live="polite">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full animate-pulse rounded-md bg-[var(--color-canvas-3)]"
            />
          ))}
        </div>
      ) : runs.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-[15px] text-[var(--color-muted)]">
            No runs yet. Send a test event above to see one.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-dim)]">
                <Th>Status</Th>
                <Th>Sentry issue</Th>
                <Th>Exception</Th>
                <Th align="right">Duration</Th>
                <Th>Created</Th>
                <Th align="right">Action</Th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => {
                const visual = statusVisual(run);
                return (
                  <tr
                    key={run.id}
                    className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-canvas-3)]/40 last:border-b-0"
                  >
                    <Td>
                      <StatusPill tone={visual.tone}>{visual.label}</StatusPill>
                    </Td>
                    <Td>
                      <span className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-ink)]">
                        {run.sentry_issue_id}
                      </span>
                    </Td>
                    <Td>
                      <ExceptionCell run={run} />
                    </Td>
                    <Td align="right">
                      <span className="font-[family-name:var(--font-mono)] text-[13px] tabular-nums text-[var(--color-muted)]">
                        {formatDuration(run.duration_s)}
                      </span>
                    </Td>
                    <Td>
                      <span
                        className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-muted)]"
                        title={new Date(run.created_at).toLocaleString()}
                      >
                        {formatRelative(run.created_at)}
                      </span>
                    </Td>
                    <Td align="right">
                      <div className="flex items-center justify-end gap-3">
                        {run.pr_url ? (
                          <a
                            href={run.pr_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-accent)] hover:underline"
                          >
                            PR <ExternalLink size={11} strokeWidth={2.5} />
                          </a>
                        ) : (
                          <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]">
                            no PR
                          </span>
                        )}
                        <Link
                          href={api.artifactUrl(installationId, run.id)}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                        >
                          <FileJson size={12} strokeWidth={2} />
                          artifact
                        </Link>
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 font-[family-name:var(--font-mono)] text-[10.5px] font-bold uppercase tracking-[0.14em] ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td className={`px-6 py-3.5 align-middle ${align === "right" ? "text-right" : "text-left"}`}>
      {children}
    </td>
  );
}
