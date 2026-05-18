"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { api, humanError } from "@/lib/api";

const PAT_RE = /^(ghp_|github_pat_)/;
const REPO_RE = /^[\w.-]+\/[\w.-]+$/;

export function Step4Github({
  installId,
  onDone,
}: {
  installId: string;
  onDone: () => void;
}) {
  const [pat, setPat] = useState("");
  const [repo, setRepo] = useState("");
  const [showPat, setShowPat] = useState(false);
  const [showRationale, setShowRationale] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validPat = PAT_RE.test(pat.trim());
  const validRepo = REPO_RE.test(repo.trim());
  const canSubmit = validPat && validRepo && !loading;

  const submit = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await api.setGithub(installId, pat.trim(), repo.trim());
      onDone();
    } catch (e) {
      setError(humanError(e));
    } finally {
      setLoading(false);
    }
  }, [installId, pat, repo, onDone]);

  return (
    <div>
      <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        Step 4 of 6
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)]">
        Connect GitHub
      </h2>
      <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-muted)]">
        logomesh opens a draft PR with the failing pytest and the sealed
        artifact. We need a token with{" "}
        <span className="font-[family-name:var(--font-mono)] text-[var(--color-ink)]">
          repo
        </span>{" "}
        +{" "}
        <span className="font-[family-name:var(--font-mono)] text-[var(--color-ink)]">
          workflow
        </span>{" "}
        scopes.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) submit();
        }}
        className="mt-7 space-y-5"
      >
        <div>
          <label className="mb-2 block font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-dim)]">
            GitHub PAT
          </label>
          <div className="relative">
            <input
              type={showPat ? "text" : "password"}
              autoComplete="off"
              spellCheck={false}
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              placeholder="ghp_… or github_pat_…"
              className="w-full rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3.5 py-3 pr-12 font-[family-name:var(--font-mono)] text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
            />
            <button
              type="button"
              onClick={() => setShowPat((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              aria-label={showPat ? "Hide token" : "Show token"}
            >
              {showPat ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {pat.length > 0 && !validPat ? (
            <p className="mt-1.5 text-[12px] text-[var(--color-danger)]">
              PAT must start with{" "}
              <span className="font-[family-name:var(--font-mono)]">ghp_</span>{" "}
              or{" "}
              <span className="font-[family-name:var(--font-mono)]">
                github_pat_
              </span>
              .
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-dim)]">
            Repository (owner/name)
          </label>
          <input
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="example/billing"
            className="w-full rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3.5 py-3 font-[family-name:var(--font-mono)] text-[14px] text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)]"
          />
          {repo.length > 0 && !validRepo ? (
            <p className="mt-1.5 text-[12px] text-[var(--color-danger)]">
              Must look like{" "}
              <span className="font-[family-name:var(--font-mono)]">
                owner/name
              </span>
              .
            </p>
          ) : null}
        </div>

        <motion.button
          type="submit"
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.02 } : undefined}
          whileTap={canSubmit ? { scale: 0.98 } : undefined}
          className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-black font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] shadow-[0_10px_36px_-12px_rgba(196,255,0,0.4)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {loading ? "Connecting…" : "Connect GitHub"}
          <ArrowRight size={15} className="-mr-1 opacity-80" />
        </motion.button>
      </form>

      {error ? (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 p-4"
        >
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-danger)]">
            Couldn&rsquo;t connect GitHub
          </p>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink)]">
            {error}
          </p>
        </div>
      ) : null}

      <details
        open={showRationale}
        onToggle={(e) => setShowRationale(e.currentTarget.open)}
        className="mt-7 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/60 p-4"
      >
        <summary className="cursor-pointer list-none font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          Why a PAT, not a GitHub App?
        </summary>
        <div className="mt-3 space-y-2 text-[13.5px] leading-[1.65] text-[var(--color-muted)]">
          <p>
            v1 ships with a personal access token because the GitHub App
            install + permissions flow adds days of compliance review. Pilot
            customers can be live in the time it takes to mint a PAT.
          </p>
          <p>
            v1.1 (target Q3 2026) replaces this with a proper GitHub App. Your
            PAT can be rotated or revoked at any time from your GitHub
            settings.{" "}
            <Link
              href="/docs/github-pat-vs-app"
              className="text-[var(--color-accent)] underline-offset-2 hover:underline"
            >
              Read the migration plan →
            </Link>
          </p>
        </div>
      </details>
    </div>
  );
}
