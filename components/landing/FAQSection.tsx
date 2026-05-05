"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_SOFT } from "@/lib/motion";
import { useSplitText, useFadeUp } from "@/lib/animations";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is this different from other agents that try to reproduce crashes?",
    a: "Other tools confuse \"the script errored\" with \"the bug reproduced.\" They run code, something breaks, and they call it a reproduction. LogoMesh uses the actual program state from the moment of the real crash: the exact variable values, the exact arguments. The reproduction is a replay, not a guess.",
  },
  {
    q: "Does the agent hallucinate the bug?",
    a: "The repro path runs zero LLM calls. Synthesis is deterministic from the captured frame locals. The agent reads the reproduction directly from the crash, it does not narrate it.",
  },
  {
    q: "What kind of crashes does this work on?",
    a: "Pure-function failures: refund miscalculations, off-by-one on totals, float rounding on tax, validation bypasses. The kind of bugs that do not need database state to reproduce. Crashes that require a long-running session or production data are out of scope today.",
  },
  {
    q: "What stops it from running on the wrong files?",
    a: "You declare which paths are in scope in a YAML config: billing/, checkout/, pricing/, refund/, payments/. Everything else is ignored by design.",
  },
  {
    q: "What languages do you support?",
    a: "Python today. Other languages later.",
  },
  {
    q: "How fast?",
    a: "About 60 seconds from the CLI invocation to a failing pytest. The 30 to 40 minutes of manual reconstruction, gone.",
  },
  {
    q: "What is the audit artifact?",
    a: "A structured JSON evidence chain mapped to PCI DSS 4.0 Req 6.3.2 and SOC2 CC8.1 control IDs. PII and secrets redaction is not yet shipped, so the raw artifact is not safe to hand directly to an auditor today. It is audit-ready evidence, not a finished compliance pack.",
  },
  {
    q: "Does the agent fix the bug?",
    a: "Not yet. Today the agent reproduces the crash. Fix generation and a draft PR are next. When that ships, the agent will open a draft PR with the failing test, the passing test, and the audit trail attached. Nothing merges without your sign-off.",
  },
  {
    q: "Does it run on every crash automatically?",
    a: "Today the developer runs logomesh repro <sentry-url>. The Sentry webhook trigger that fires the agent automatically is in progress.",
  },
  {
    q: "How do I install?",
    a: "pip install logomesh, then logomesh repro <sentry-url>. There is also an MCP server for Claude Code integration.",
  },
  {
    q: "What does it cost?",
    a: "Free during beta: 3 reproductions a day, full features, no credit card. Team is $30 per user per month above that. Enterprise is custom (SSO, audit log, on-prem, SLA).",
  },
  {
    q: "Who is this for?",
    a: "Backend engineers at fintech companies (payments, billing, checkout, pricing) using Python. Series A to B, 20 to 200 engineers. Not for general-purpose testing or non-Python codebases.",
  },
];

/**
 * Accordion FAQ (Cluely / standard SaaS pattern).
 */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  useSplitText(headingRef);
  useFadeUp(faqListRef, { targets: "[data-faq]", stagger: 0.06 });

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-surface-base w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 md:py-24 md:px-10">
        <div className="text-center">
          <p className="landing-kicker">FAQ</p>
          <h2
            ref={headingRef}
            id="faq-heading"
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Questions engineers ask.
          </h2>
        </div>

        <div ref={faqListRef} className="mt-12 space-y-2">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                data-faq
                className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]"
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen ? "true" : "false"}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full min-w-0 items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-4"
                >
                  <span className="min-w-0 flex-1 pr-2 font-sans text-[17px] font-semibold leading-snug text-[var(--color-ink)] sm:text-[18px]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--color-muted)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: EASE_SOFT }}
                      className="overflow-hidden border-t border-[var(--color-border)]"
                    >
                      <p className="px-4 pb-5 pt-3 text-[17px] leading-relaxed text-pretty text-[var(--color-muted)] sm:px-5 sm:text-[18px] sm:leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
