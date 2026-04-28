"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { EASE } from "@/lib/motion";

const GITHUB_APP_URL = "https://github.com/apps/logomesh";

type Snippet = {
  id: string;
  label: string;
  filename: string;
  /** Plain lines; # starts a comment for styling */
  lines: string[];
};

const SNIPPETS: Snippet[] = [
  {
    id: "github",
    label: "GitHub App",
    filename: "install.md",
    lines: [
      "# Free beta · install on selected repos",
      "",
      `# ${GITHUB_APP_URL}`,
      "",
      "# LogoMesh shows up under Checks.",
      "# It only comments when it has something reproducible.",
    ],
  },
  {
    id: "python",
    label: "Your Python",
    filename: "requirements.txt",
    lines: [
      "# We run your changed Python in isolation.",
      "# Typical deps (yours will vary):",
      "",
      "pytest>=8",
      "httpx>=0.27",
      "pydantic>=2",
    ],
  },
  {
    id: "flow",
    label: "What runs",
    filename: "on-each-push.txt",
    lines: [
      "# On each PR update:",
      "#  · read the diff",
      "#  · run isolated checks on what changed",
      "#  · stress inputs + replay failures",
      "",
      "# Nothing broke? No comment.",
    ],
  },
];

function classifyLine(line: string): "comment" | "url" | "text" {
  const t = line.trim();
  if (t.includes("https://") || t.includes("http://")) return "url";
  const lead = line.trimStart();
  if (lead.startsWith("#")) return "comment";
  return "text";
}

export function IntegrateShowcase() {
  const baseId = useId();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snippet = SNIPPETS[active];
  const body = snippet.lines.join("\n");

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, [body]);

  const onKeyDownTab = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const n = SNIPPETS.length;
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (idx + 1) % n;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (idx - 1 + n) % n;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = n - 1;
    } else {
      return;
    }
    setActive(next);
    queueMicrotask(() => {
      document.getElementById(`${baseId}-tab-${SNIPPETS[next].id}`)?.focus();
    });
  };

  return (
    <section
      id="integrate"
      aria-labelledby={`${baseId}-heading`}
      className="landing-surface-raised relative w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 70% 0%, hsl(78 100% 50% / 0.07) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 15% 90%, hsl(274 72% 45% / 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <motion.p
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="landing-kicker"
            >
              Integrate
            </motion.p>
            <motion.h2
              id={`${baseId}-heading`}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
              className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
            >
              Connect on GitHub.
              <span className="display-subline text-balance">
                One install. The snippets are optional copy paste.
              </span>
            </motion.h2>
            <motion.p
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
              className="mt-6 max-w-[38rem] text-pretty marketing-lg text-[var(--color-muted)]"
            >
              Install once, then ship PRs as usual. We diff, sandbox, and only ping the thread when something fails with a
              repro. Beta means things move. We&apos;ll keep this page straight with you.
            </motion.p>
            <motion.p
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
              className="mt-6 text-[15px] leading-relaxed text-[var(--color-dim)] sm:text-[16px]"
            >
              Install from{" "}
              <a
                href="#cta"
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              >
                below
              </a>
              {" or the nav. No extra green button here. See "}
              <a
                href="#scenario-preview"
                className="font-medium text-[var(--color-muted)] underline decoration-[var(--color-border-hi)] underline-offset-4 transition-colors hover:text-[var(--color-ink)]"
              >
                example runs
              </a>
              .
            </motion.p>
            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
              className="mt-8"
            >
              <a
                href="#scenario-preview"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/90 px-5 text-[15px] font-medium text-[var(--color-ink)] backdrop-blur-sm transition-colors hover:border-primary/45 hover:text-[var(--color-ink)]"
              >
                Preview example runs
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.58, ease: EASE, delay: 0.06 }}
            className="relative min-w-0"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[1.35rem] opacity-90 blur-2xl sm:-inset-4"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 30%, hsl(78 100% 50% / 0.14) 0%, transparent 68%)",
              }}
            />

            <div className="landing-code-showcase product-frame-shell relative overflow-hidden rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/80 px-3 py-2.5 sm:px-4">
                <div className="flex shrink-0 gap-1.5">
                  <span className="block h-2.5 w-2.5 rounded-full bg-[hsl(var(--window-close))]" aria-hidden />
                  <span className="block h-2.5 w-2.5 rounded-full bg-[hsl(var(--window-minimize))]" aria-hidden />
                  <span className="block h-2.5 w-2.5 rounded-full bg-[hsl(var(--window-expand))]" aria-hidden />
                </div>
                <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-dim)] sm:text-[11.5px]">
                  {snippet.filename}
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)] transition-colors hover:border-primary/40 hover:text-[var(--color-ink)] sm:text-[11.5px]"
                >
                  {copied ? <Check size={13} className="text-[hsl(var(--success))]" /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div
                role="tablist"
                aria-label="Integration snippets"
                className="flex flex-wrap gap-1 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/50 px-2 py-2 sm:px-3"
              >
                {SNIPPETS.map((s, idx) => {
                  const isActive = idx === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      id={`${baseId}-tab-${s.id}`}
                      aria-selected={isActive ? "true" : "false"}
                      aria-controls={`${baseId}-panel`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(idx)}
                      onKeyDown={(e) => onKeyDownTab(e, idx)}
                      className={`relative rounded-lg px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors sm:text-[12px] ${
                        isActive ? "text-primary-foreground" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-lg bg-primary shadow-[0_0_24px_hsl(78_100%_50%/0.25)]" aria-hidden />
                      )}
                      <span className="relative">{s.label}</span>
                    </button>
                  );
                })}
              </div>

              <div
                role="tabpanel"
                id={`${baseId}-panel`}
                aria-labelledby={`${baseId}-tab-${snippet.id}`}
                tabIndex={0}
                className="landing-code-showcase-panel px-4 py-4 sm:px-5 sm:py-5"
              >
                <pre className="m-0 font-mono text-[12.5px] leading-[1.72] sm:text-[13.5px]">
                  <code>
                    {snippet.lines.map((line, i) => {
                      const kind = classifyLine(line);
                      const cls =
                        kind === "comment"
                          ? "text-[hsl(var(--syntax-keyword))]/75"
                          : kind === "url"
                            ? "text-[hsl(var(--syntax-symbol))]"
                            : "text-foreground";
                      return (
                        <span key={`${snippet.id}-${i}`} className="block">
                          <span className="select-none pr-3 font-mono text-[11px] tabular-nums text-[var(--color-dim)] opacity-80 sm:text-[12px]">
                            {(i + 1).toString().padStart(2, " ")}
                          </span>
                          <span className={cls}>{line || " "}</span>
                        </span>
                      );
                    })}
                  </code>
                </pre>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {copied ? "Snippet copied to clipboard" : ""}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
