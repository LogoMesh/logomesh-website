"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Check, X } from "lucide-react";
import { api, humanError } from "@/lib/api";
import type { InstallationSummary } from "@/lib/types";
import { StatusPill } from "./StatusPill";

type Service = "sentry" | "github" | "slack";

type ModalState =
  | { kind: "closed" }
  | { kind: "open"; service: Service };

const PAT_RE = /^(ghp_|github_pat_)/;
const REPO_RE = /^[\w.-]+\/[\w.-]+$/;
const SLACK_PREFIX = "https://hooks.slack.com/";

function ServiceRow({
  label,
  configured,
  detail,
  onEdit,
}: {
  label: string;
  configured: boolean;
  detail: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex flex-col">
        <p className="font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink)]">
          {label}
        </p>
        <p className="mt-1 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-muted)]">
          {detail}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <StatusPill tone={configured ? "success" : "neutral"} size="sm">
          {configured ? "Connected" : "Not configured"}
        </StatusPill>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border-hi)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
        >
          <Pencil size={11} strokeWidth={2.5} />
          {configured ? "Update" : "Connect"}
        </button>
      </div>
    </div>
  );
}

export function ConfigPanel({
  installationId,
  initial,
}: {
  installationId: string;
  initial: InstallationSummary;
}) {
  const [summary, setSummary] = useState(initial);
  const [modal, setModal] = useState<ModalState>({ kind: "closed" });

  const closeModal = useCallback(() => setModal({ kind: "closed" }), []);

  const onSaved = useCallback(
    (service: Service, patch: Partial<InstallationSummary>) => {
      setSummary((s) => ({ ...s, ...patch }));
      closeModal();
    },
    [closeModal],
  );

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/45">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <p className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Configuration
        </p>
      </div>
      <ServiceRow
        label="Sentry"
        configured={summary.sentry.configured}
        detail={
          summary.sentry.configured
            ? summary.sentry.last_event_at
              ? `Last event ${new Date(summary.sentry.last_event_at).toLocaleString()}`
              : "Connected — no events yet"
            : "Webhook not yet wired up"
        }
        onEdit={() => setModal({ kind: "open", service: "sentry" })}
      />
      <ServiceRow
        label="GitHub"
        configured={summary.github.configured}
        detail={
          summary.github.repo
            ? `Posting draft PRs to ${summary.github.repo}`
            : "PAT and repo not yet set"
        }
        onEdit={() => setModal({ kind: "open", service: "github" })}
      />
      <ServiceRow
        label="Slack"
        configured={summary.slack.configured}
        detail={
          summary.slack.configured
            ? "Notifying on every shipped artifact"
            : "Optional — pipeline still ships without it"
        }
        onEdit={() => setModal({ kind: "open", service: "slack" })}
      />

      <AnimatePresence>
        {modal.kind === "open" ? (
          <Modal
            installationId={installationId}
            service={modal.service}
            onClose={closeModal}
            onSaved={onSaved}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Modal({
  installationId,
  service,
  onClose,
  onSaved,
}: {
  installationId: string;
  service: Service;
  onClose: () => void;
  onSaved: (service: Service, patch: Partial<InstallationSummary>) => void;
}) {
  const [token, setToken] = useState("");
  const [repo, setRepo] = useState("");
  const [slackUrl, setSlackUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      if (service === "sentry") {
        if (token.length < 8) throw new Error("Token looks too short.");
        await api.setSentryToken(installationId, token.trim());
        onSaved(service, {
          sentry: { configured: true, last_event_at: new Date().toISOString() },
        });
      } else if (service === "github") {
        if (!PAT_RE.test(token.trim()))
          throw new Error("PAT must start with ghp_ or github_pat_.");
        if (!REPO_RE.test(repo.trim()))
          throw new Error("Repository must be owner/name.");
        await api.setGithub(installationId, token.trim(), repo.trim());
        onSaved(service, { github: { configured: true, repo: repo.trim() } });
      } else if (service === "slack") {
        if (!slackUrl.startsWith(SLACK_PREFIX))
          throw new Error("URL must start with https://hooks.slack.com/.");
        await api.setSlack(installationId, slackUrl.trim());
        onSaved(service, { slack: { configured: true } });
      }
    } catch (e) {
      setError(humanError(e));
    } finally {
      setLoading(false);
    }
  }, [installationId, service, token, repo, slackUrl, onSaved]);

  const title =
    service === "sentry"
      ? "Update Sentry token"
      : service === "github"
        ? "Update GitHub PAT + repo"
        : "Update Slack webhook";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) submit();
        }}
        className="relative w-full max-w-md rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] p-6"
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ boxShadow: "0 30px 80px -36px rgba(0,0,0,0.85)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-[20px] font-extrabold leading-tight tracking-[-0.025em] text-[var(--color-ink)]">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[var(--color-muted)] hover:bg-[var(--color-canvas-3)] hover:text-[var(--color-ink)]"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {service === "sentry" ? (
          <Field
            label="Sentry auth token"
            placeholder="sntrys_…"
            value={token}
            onChange={setToken}
            type="password"
          />
        ) : null}

        {service === "github" ? (
          <>
            <Field
              label="GitHub PAT"
              placeholder="ghp_… or github_pat_…"
              value={token}
              onChange={setToken}
              type="password"
            />
            <Field
              label="Repository (owner/name)"
              placeholder="example/billing"
              value={repo}
              onChange={setRepo}
            />
          </>
        ) : null}

        {service === "slack" ? (
          <Field
            label="Slack incoming-webhook URL"
            placeholder="https://hooks.slack.com/services/…"
            value={slackUrl}
            onChange={setSlackUrl}
            type="url"
          />
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mt-4 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-danger)]"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="font-[family-name:var(--font-mono)] text-[12.5px] uppercase tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-black font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.1em] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={13} strokeWidth={2.5} />
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="mt-5">
      <label className="mb-1.5 block font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-dim)]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3 py-2.5 font-[family-name:var(--font-mono)] text-[13.5px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
