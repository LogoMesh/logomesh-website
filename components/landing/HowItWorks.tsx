"use client";

import { motion } from "motion/react";
import { GitBranch, Container, MessageSquare } from "lucide-react";
import { EASE } from "@/lib/motion";
import { inViewOnce } from "@/lib/landing-motion";

const STEPS = [
  {
    icon: GitBranch,
    title: "PR opened",
    body: "LogoMesh listens for new pull requests—no YAML, no CI wiring.",
  },
  {
    icon: Container,
    title: "Tests in sandbox",
    body: "Infers guarantees, fuzzes adversarial inputs, and runs code in a hardened Docker sandbox.",
  },
  {
    icon: MessageSquare,
    title: "Bug + proof posted",
    body: "Only when a crash is caller-reachable and confirmed—otherwise, silence.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-border bg-muted/15 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
            How it works
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            Three steps. One pipeline.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From open PR to reproducible comment—or intentional quiet.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-px md:bg-border">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-background/80 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-card-glow)] md:rounded-none md:border-0 md:bg-card/90 md:p-8 md:first:rounded-l-2xl md:last:rounded-r-2xl"
            >
              <div className="mb-4 inline-flex rounded-xl border border-border bg-muted/40 p-3 text-primary">
                <s.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-[-0.03em] md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
