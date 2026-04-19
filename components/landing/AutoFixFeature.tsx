"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { EASE } from "@/lib/motion";
import { inViewOnce } from "@/lib/landing-motion";

const BROKEN = `def charge(order_id: str, retry: bool = False):
    # missing idempotency guard
    stripe.charge(order_id)
    if retry:
        stripe.charge(order_id)`;

const FIXED = `def charge(order_id: str, retry: bool = False, key: str | None = None):
    idem = key or make_idempotency_key(order_id)
    stripe.charge(order_id, idempotency_key=idem)
    if retry:
        stripe.charge(order_id, idempotency_key=idem + ":retry")`;

export function AutoFixFeature() {
  const [mode, setMode] = useState<"broken" | "fixed">("broken");
  const [copied, setCopied] = useState(false);

  async function copyFix() {
    try {
      await navigator.clipboard.writeText(FIXED);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      id="auto-fix"
      className="border-t border-border bg-muted/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10 text-center md:mb-14 md:text-left"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
            The auto-fix
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            From crash to patch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mx-0">
            Toggle between the vulnerable path and the LogoMesh-suggested fix.
            Copy the corrected snippet straight into your branch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          className="mx-auto max-w-3xl rounded-2xl border border-border glass"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div className="flex rounded-lg border border-border bg-background/50 p-0.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setMode("broken")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  mode === "broken"
                    ? "bg-destructive/20 text-destructive"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Broken
              </button>
              <button
                type="button"
                onClick={() => setMode("fixed")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  mode === "fixed"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                LogoMesh fix
              </button>
            </div>
            <button
              type="button"
              onClick={copyFix}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 font-mono text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-card"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-success" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              Copy fix
            </button>
          </div>
          <div className="relative min-h-[220px] overflow-x-auto p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.pre
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="font-mono text-[11px] leading-relaxed text-foreground sm:text-[13px]"
              >
                {mode === "broken" ? BROKEN : FIXED}
              </motion.pre>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
