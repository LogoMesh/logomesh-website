"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, GitPullRequest } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/lib/motion";

const BROKEN = `def hit_rate(hits: int, misses: int) -> float:
    # returns 2.0 when hits=10, misses=5 — bug
    return hits / misses`;

const FIXED = `def hit_rate(hits: int, misses: int) -> float:
    total = hits + misses
    if total == 0:
        return 0.0
    return hits / total`;

// Minimal Python syntax tint — highlight keywords + numbers + comments.
function paint(code: string) {
  const KEYWORDS = ["def", "int", "float", "return", "if", "else"];
  const lines = code.split("\n");
  return lines.map((line, li) => {
    // Comment line
    if (line.trimStart().startsWith("#")) {
      return (
        <div key={li} className="text-dim">
          {line}
        </div>
      );
    }
    const tokens = line.split(/(\s+|[():,->])/);
    return (
      <div key={li}>
        {tokens.map((tok, ti) => {
          if (KEYWORDS.includes(tok)) {
            return (
              <span key={ti} className="text-[#ff7b72]">
                {tok}
              </span>
            );
          }
          if (/^\d+(\.\d+)?$/.test(tok)) {
            return (
              <span key={ti} className="text-[#ffa657]">
                {tok}
              </span>
            );
          }
          if (tok === "hit_rate") {
            return (
              <span key={ti} className="text-[#d2a8ff]">
                {tok}
              </span>
            );
          }
          return (
            <span key={ti} className="text-foreground/90">
              {tok}
            </span>
          );
        })}
      </div>
    );
  });
}

export function AutoFixFeature() {
  const [showFix, setShowFix] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyFix = async () => {
    try {
      await navigator.clipboard.writeText(FIXED);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop — clipboard may be unavailable in some contexts
    }
  };

  return (
    <section
      id="fix"
      className="relative w-full overflow-hidden border-t border-border py-24 sm:py-32 md:py-40"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 items-end gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12"
        >
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
              <span
                aria-hidden
                className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
                style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.55)" }}
              />
              The auto-fix
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.03em] text-foreground">
              One toggle:{" "}
              <span className="italic text-destructive">broken</span>{" "}
              <span className="text-muted-foreground">↔</span>{" "}
              <span className="italic text-primary">fixed</span>.
            </h2>
          </div>
          <p className="text-[16.5px] leading-[1.65] text-muted-foreground sm:text-[17px]">
            LogoMesh proposes a patch alongside every crash. Toggle between the
            broken version and the fix — or copy the fix straight into your PR.
          </p>
        </motion.div>

        {/* Bento card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="glass-strong relative mt-14 overflow-hidden rounded-2xl"
        >
          {/* Soft underglow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-12 -z-10 blur-3xl"
            style={{
              background: showFix
                ? "radial-gradient(50% 50% at 50% 85%, hsl(78 100% 50% / 0.22) 0%, transparent 65%)"
                : "radial-gradient(50% 50% at 50% 85%, hsl(0 84% 60% / 0.18) 0%, transparent 65%)",
              transition: "background 0.5s ease",
            }}
          />

          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-border/80 bg-card/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[12px]">
              <GitPullRequest size={13} className="text-primary" />
              <span className="text-muted-foreground">
                aiohttp/cache.py · line 148
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle */}
              <div
                role="group"
                aria-label="Code state"
                className="flex items-center rounded-lg border border-border bg-background/70 p-1"
              >
                <button
                  type="button"
                  onClick={() => setShowFix(false)}
                  aria-pressed={!showFix}
                  className={`relative rounded-md px-3 py-1 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.1em] transition-colors ${
                    !showFix ? "text-destructive-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {!showFix && (
                    <motion.span
                      layoutId="fix-toggle-pill"
                      className="absolute inset-0 rounded-md bg-destructive"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">Broken</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFix(true)}
                  aria-pressed={showFix}
                  className={`relative rounded-md px-3 py-1 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.1em] transition-colors ${
                    showFix ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {showFix && (
                    <motion.span
                      layoutId="fix-toggle-pill"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">Fixed</span>
                </button>
              </div>

              <button
                type="button"
                onClick={copyFix}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-card px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="Copy fix"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-primary" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy fix
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code panel */}
          <div className="relative font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.72] sm:text-[14.5px]">
            {/* Diff gutter strip */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1"
              style={{
                background: showFix
                  ? "linear-gradient(180deg, hsl(78 100% 50% / 0.75), hsl(78 100% 50% / 0.25))"
                  : "linear-gradient(180deg, hsl(0 84% 60% / 0.8), hsl(0 84% 60% / 0.25))",
                transition: "background 0.4s ease",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.pre
                key={showFix ? "fix" : "broken"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="overflow-x-auto px-6 py-6 sm:px-8 sm:py-7"
              >
                <code>{paint(showFix ? FIXED : BROKEN)}</code>
              </motion.pre>
            </AnimatePresence>
          </div>

          {/* Footer caption */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/80 bg-card/40 px-5 py-3 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-dim">
            <span>
              <span className="text-muted-foreground">Input:</span> hits=10,
              misses=5
            </span>
            <span>
              {showFix ? (
                <>
                  <span className="text-primary">→</span> returns 0.666…
                </>
              ) : (
                <>
                  <span className="text-destructive">→</span> returns 2.0
                </>
              )}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
