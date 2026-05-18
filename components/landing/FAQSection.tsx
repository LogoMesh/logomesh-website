"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_SOFT } from "@/lib/motion";
import { useSplitText, useFadeUp } from "@/lib/animations";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does logomesh actually do?",
    a: "When a Python crash hits Sentry, an AI agent investigates the crash, finds the part of your code that broke, and writes a failing test that reproduces it. You get a draft GitHub PR with the test and a sealed audit file your reviewer can sign off on — usually inside a minute.",
  },
  {
    q: "Is it really an AI agent?",
    a: "Yes. It plans, uses tools, recovers when it gets stuck, and knows when to shut up and ask for help. The one thing it's strictly forbidden from doing is writing the final test code — that part stays 100% deterministic so your auditors don't have a meltdown.",
  },
  {
    q: "Who is this for?",
    a: "Python backend engineers and SREs at fintechs who use Sentry daily. If your team is in the middle of SOC2 Type II or PCI audit prep and your reviewer flagged 'evidence of post-incident fix verification' as a gap — we built this for you.",
  },
  {
    q: "How fast is it?",
    a: "pip install logomesh, export your Sentry token, and run logomesh repro <url> against your checkout. Most crashes return a verdict in about a minute once Docker is warm.",
  },
  {
    q: "Do I have to change my codebase?",
    a: "No. logomesh connects to Sentry via a webhook and to GitHub via a personal access token. You don't install an SDK, don't wrap your code, don't change your error handling.",
  },
  {
    q: "Do we stay in control of changes?",
    a: "Always. logomesh opens a draft PR with the failing test — it never merges, never modifies main, never auto-fixes. Your team decides what the fix looks like.",
  },
  {
    q: "Is it secure?",
    a: "Every repro runs in an airgapped Docker sandbox (unprivileged user, memory + PID caps, no network). We never pull from your production database. PII is redacted before anything reaches an LLM or the audit seal.",
  },
  {
    q: "What does the audit file contain?",
    a: "A sealed JSON envelope with the failing test, the redacted crash values, a hash of the test bytes, a flag confirming no AI wrote the proof, and control mappings to PCI DSS 12.10.5 and SOC2 CC7.3 / CC7.4. It's designed so an auditor can verify the chain of custody without trusting our word for it.",
  },
  {
    q: "Does it fix the bug automatically?",
    a: "No. Today logomesh reproduces crashes and generates evidence. Your team owns diagnosis and the code change. Auto-remediation is on the roadmap but will always require explicit approval.",
  },
  {
    q: "What if a crash can't be reproduced?",
    a: "We flag it as `needs_human_review` with a structured reason (frame locals insufficient, depends on DB state, race condition, etc.). We never fake a green.",
  },
  {
    q: "How do we start?",
    a: "Open Quick start in the docs from the nav. It walks through install, Sentry, GitHub, and your first test event in about four minutes.",
  },
  {
    q: "What does it cost?",
    a: "The CLI is MIT-licensed and free on PyPI. A hosted webhook pilot exists for design partners who want a dashboard — contact us if you need that path. There is no $199/mo self-serve tier.",
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
