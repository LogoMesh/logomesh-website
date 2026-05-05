"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_SOFT } from "@/lib/motion";
import { useSplitText, useFadeUp } from "@/lib/animations";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does LogoMesh actually do?",
    a: "LogoMesh turns a production crash report into a reproducible failing test and structured incident output.",
  },
  {
    q: "Do I need to understand AI to use it?",
    a: "No. You paste a crash link, run one command, and get clear output your team can act on.",
  },
  {
    q: "Who is this for?",
    a: "Backend engineering teams that want faster incident response and lower time-to-reproduce for production crashes.",
  },
  {
    q: "How fast is it?",
    a: "Typical runs complete in about a minute, replacing manual crash reconstruction steps.",
  },
  {
    q: "Do we stay in control of changes?",
    a: "Yes. LogoMesh helps generate reproducible evidence, but your team reviews and approves what happens next.",
  },
  {
    q: "Is it secure?",
    a: "LogoMesh runs in an isolated environment with scoped boundaries designed for production engineering workflows.",
  },
  {
    q: "What do we get after each run?",
    a: "You get a failing reproducible test plus a structured artifact for debugging and internal incident follow-up.",
  },
  {
    q: "Does it fix the bug automatically?",
    a: "No. Today LogoMesh reproduces crashes and generates evidence. Your team owns diagnosis and code changes.",
  },
  {
    q: "Can this run automatically?",
    a: "Today teams start runs manually from a crash link.",
  },
  {
    q: "How do we start?",
    a: "Install LogoMesh, point it at your crash reporting workflow, and run your first reproduction from an incident link.",
  },
  {
    q: "What does it cost?",
    a: "LogoMesh is in beta. Contact us for current team and enterprise access details.",
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
