"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE_SOFT } from "@/lib/motion";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is LogoMesh?",
    a: "A GitHub App for Python PRs. It reads the diff, runs checks in a sandbox, and comments only when it can show a failure you can reproduce, with inputs, output, and line in file.",
  },
  {
    q: "Is this production-ready?",
    a: "We&apos;re in public beta. Real teams use it on real PRs, but we&apos;re not pretending to replace your whole test matrix. Expect gaps; we&apos;d rather miss a comment than spam you.",
  },
  {
    q: "Does it comment on every pull request?",
    a: "No. If there&apos;s nothing concrete to show, it doesn&apos;t post.",
  },
  {
    q: "How do I get started?",
    a: "Install the app on a repo you&apos;re okay testing with, then open or touch a Python PR. Checks and any comment show up on that PR. Public repos are free while we&apos;re in beta.",
  },
];

/**
 * Accordion FAQ (Cluely / standard SaaS pattern).
 */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-surface-base w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 md:py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.52, ease: EASE_SOFT }}
          className="text-center"
        >
          <p className="landing-kicker">FAQ</p>
          <h2
            id="faq-heading"
            className="type-h2 mt-4 font-[family-name:var(--font-display)] font-extrabold text-[var(--color-ink)]"
          >
            Questions we get
          </h2>
        </motion.div>

        <div className="mt-12 space-y-2">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.42, ease: EASE_SOFT, delay: i * 0.04 }}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
