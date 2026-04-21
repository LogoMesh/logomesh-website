"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Bug } from "lucide-react";
import { EASE } from "@/lib/motion";
import { HARNESS_AGGREGATE, HARNESS_SHOWCASE } from "@/lib/harness-public.generated";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { cn } from "@/lib/utils";

/** Spotlight repos (matches first rows of harness showcase; synced from generated data). */
const FEATURED = HARNESS_SHOWCASE.slice(0, 6);

function ownerSlug(repo: string): string {
  return repo.split("/")[0] ?? repo;
}

function RepoAvatar({
  owner,
  className,
}: {
  owner: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] font-mono text-[11px] font-bold uppercase tracking-tight text-[var(--color-accent)]",
          className,
        )}
        aria-hidden
      >
        {owner.slice(0, 2)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- GitHub org avatars; external URL without Image remote config.
    <img
      src={`https://github.com/${owner}.png?size=96`}
      alt=""
      width={44}
      height={44}
      loading="lazy"
      decoding="async"
      className={cn(
        "h-11 w-11 shrink-0 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] object-cover",
        className,
      )}
      onError={() => setFailed(true)}
    />
  );
}

export function SocialProofStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="relative w-full min-w-0 border-t border-[var(--color-border)] bg-[var(--color-canvas)]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 md:px-10 md:py-14">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-center gap-4"
          >
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              aria-hidden
            >
              <Bug className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <h2
                id="social-proof-heading"
                className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.65rem)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]"
              >
                Bugs caught across open source Python projects
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]">
                Live harness data:{" "}
                <span className="font-semibold tabular-nums text-[var(--color-ink)]">
                  {HARNESS_AGGREGATE.confirmedFindingsSum}
                </span>{" "}
                confirmed findings across{" "}
                <span className="font-semibold tabular-nums text-[var(--color-ink)]">
                  {HARNESS_AGGREGATE.distinctRepos}
                </span>{" "}
                repos. Six sample projects match the proof table.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.ul
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURED.map((row, i) => {
            const owner = ownerSlug(row.repo);
            const ghRepoUrl = `https://github.com/${row.repo}`;
            const ghPrUrl = `${ghRepoUrl}/pull/${row.prNumber}`;

            return (
              <motion.li
                key={row.repo}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 * i }}
              >
                <article className="group relative flex h-full gap-4 rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/90 p-4 shadow-[var(--shadow-card)] transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-canvas-2)]">
                  <RepoAvatar owner={owner} />

                  <div className="min-w-0 flex-1">
                    <a
                      href={ghRepoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex max-w-full items-center gap-1.5 font-mono text-[13px] font-semibold text-[var(--color-ink)] underline-offset-2 hover:text-[var(--color-accent)] hover:underline sm:text-[14px]"
                    >
                      <span className="truncate">{row.repo}</span>
                      <span className="shrink-0 opacity-70 transition-opacity group-hover:opacity-100">
                        <GithubIcon size={14} />
                      </span>
                    </a>

                    <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12.5px] leading-snug text-[var(--color-dim)] sm:text-[13px]">
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary/12 px-2 py-0.5 font-mono font-semibold tabular-nums text-primary">
                        <Bug className="h-3.5 w-3.5 opacity-90" strokeWidth={2} aria-hidden />
                        {row.confirmedFindings} bugs
                      </span>
                      <a
                        href={ghPrUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-mono text-[12px] text-[var(--color-muted)] underline-offset-2 hover:text-[var(--color-ink)] hover:underline"
                      >
                        PR #{row.prNumber}
                      </a>
                    </p>

                    <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-[var(--color-muted)]">
                      {row.title}
                    </p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
