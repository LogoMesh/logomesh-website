"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { api, humanError } from "@/lib/api";

const SLACK_PREFIX = "https://hooks.slack.com/";

export function Step5Slack({
  installId,
  onDone,
  onSkip,
}: {
  installId: string;
  onDone: () => void;
  onSkip: () => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = url.startsWith(SLACK_PREFIX);
  const canSubmit = valid && !loading;

  const submit = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await api.setSlack(installId, url.trim());
      onDone();
    } catch (e) {
      setError(humanError(e));
    } finally {
      setLoading(false);
    }
  }, [installId, url, onDone]);

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        Step 5 of 6 — Optional
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)]">
        Slack notifications
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-muted)]">
        We&rsquo;ll post one line per shipped artifact to a channel of your
        choosing. Use a Slack{" "}
        <a
          href="https://api.slack.com/messaging/webhooks"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          incoming webhook
        </a>{" "}
        — takes about a minute to create.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) submit();
        }}
        className="mt-7"
      >
        <label className="mb-2 block font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-dim)]">
          Slack incoming-webhook URL
        </label>
        <input
          type="url"
          autoComplete="off"
          spellCheck={false}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://hooks.slack.com/services/T…/B…/…"
          className="w-full rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3.5 py-3 font-[family-name:var(--font-mono)] text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
        {url.length > 0 && !valid ? (
          <p className="mt-1.5 text-[12px] text-[var(--color-danger)]">
            URL must start with{" "}
            <span className="font-[family-name:var(--font-mono)]">
              {SLACK_PREFIX}
            </span>
            .
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02 } : undefined}
            whileTap={canSubmit ? { scale: 0.98 } : undefined}
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-black font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_36px_-12px_rgba(196,255,0,0.4)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {loading ? "Connecting…" : "Connect Slack"}
            <ArrowRight size={15} className="-mr-1 opacity-80" />
          </motion.button>
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[var(--color-border-hi)] px-5 py-3 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
          >
            Skip for now
          </button>
        </div>
      </form>

      {error ? (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 p-4"
        >
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-danger)]">
            Couldn&rsquo;t connect Slack
          </p>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]">
            {error}
          </p>
        </div>
      ) : null}
    </div>
  );
}
