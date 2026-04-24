"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_SOFT } from "@/lib/motion";
import { useSplitText, useFadeUp } from "@/lib/animations";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is this different from CodeRabbit, Copilot, or Sourcery?",
    a: "Those tools leave opinions on every PR. LogoMesh only posts when it can show a broken input and the output it produced. Silence means clean.",
  },
  {
    q: "Will this spam my PRs?",
    a: "No. Clean PR, no comment. Ever.",
  },
  {
    q: "What about false positives?",
    a: "We only post when the failure reproduces. If we can't reproduce it, you don't see it.",
  },
  {
    q: "How do you know the fix test actually catches the bug?",
    a: "Every fix test is mutation-checked. We mutate the code around the finding and confirm the test fails on the broken version. If it still passes on the bug, we throw it out.",
  },
  {
    q: "What stops noisy or borderline findings from reaching the PR?",
    a: "Every finding has to clear at least two independent signals before we post: the repro, the regression check, and the mutation check. One signal is never enough.",
  },
  {
    q: "Do you suggest fixes, or only point out problems?",
    a: "Both. When we can, we attach a suggested patch to the finding. You accept it, edit it, or ignore it — same as any GitHub suggestion.",
  },
  {
    q: "Will I know what else my change affects?",
    a: "Yes. We surface the blast radius — which callers touch the broken path — so you know what else to review before merge.",
  },
  {
    q: "What languages do you support?",
    a: "Python today. Other languages later.",
  },
  {
    q: "Private repos?",
    a: "On the roadmap. Free on public repos during beta.",
  },
  {
    q: "What does it cost?",
    a: "Free during beta.",
  },
  {
    q: "How do I start?",
    a: "Install the GitHub App on a repo, then open a Python PR. That's it.",
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
            Questions we get.
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
