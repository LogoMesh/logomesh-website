"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_SOFT } from "@/lib/motion";
import { useSplitText, useFadeUp } from "@/lib/animations";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does logomesh do?",
    a: "When a Python crash lands in Sentry, an AI agent investigates it, identifies the failing code path, and produces a deterministic failing test that reproduces the issue. You receive a draft pull request with the test and a sealed audit record suitable for compliance review — typically within a minute.",
  },
  {
    q: "Is it really an AI agent?",
    a: "Yes. The agent plans, calls tools, and escalates when it needs human input. It never writes the final test or audit evidence — those are generated deterministically so auditors can verify the chain of custody independently.",
  },
  {
    q: "Who is this for?",
    a: "Python backend and platform teams who rely on Sentry for production incidents — especially in regulated environments preparing for SOC 2 Type II or PCI audits where post-incident verification is required.",
  },
  {
    q: "How fast is it?",
    a: "Most teams are running their first reproduction within minutes of install. A typical crash returns a verdict in about 60 seconds once your environment is configured.",
  },
  {
    q: "Do I have to change my codebase?",
    a: "No SDK and no code changes required. Connect Sentry and GitHub, then point logomesh at an issue URL. Your existing error monitoring and deployment workflow stay the same.",
  },
  {
    q: "Do we stay in control of changes?",
    a: "Always. logomesh opens a draft pull request with the failing test. It never merges, never modifies your default branch, and never ships fixes on your behalf.",
  },
  {
    q: "Is it secure?",
    a: "Every reproduction runs in an isolated Docker sandbox with no network access, an unprivileged user, and strict resource limits. logomesh never connects to your production database. Sensitive data is redacted before anything reaches a language model or the audit record.",
  },
  {
    q: "What does the audit file contain?",
    a: "A sealed JSON envelope with the failing test, redacted crash values, a cryptographic hash of the test bytes, confirmation that no AI wrote the proof, and mappings to PCI DSS 12.10.5 and SOC 2 CC7.3 / CC7.4 — structured so auditors can verify independently.",
  },
  {
    q: "Does it fix the bug automatically?",
    a: "No. logomesh reproduces incidents and generates evidence. Your engineering team owns diagnosis and remediation. Any future automation will require explicit approval.",
  },
  {
    q: "What if a crash can't be reproduced?",
    a: "logomesh returns a clear status with a structured explanation — insufficient runtime context, dependency on live database state, race conditions, and similar cases. It never reports success without a verified match.",
  },
  {
    q: "How do we get started?",
    a: "Follow the Quick start guide in our documentation: install logomesh, configure your Sentry credentials, and run your first reproduction against a real issue.",
  },
  {
    q: "What does it cost?",
    a: "logomesh is open source and free to install from PyPI under the MIT license. Enterprise teams who need a managed deployment or webhook integration can contact us for options.",
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
            Common questions.
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
