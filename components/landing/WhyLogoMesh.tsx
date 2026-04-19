"use client";

import { motion } from "motion/react";
import { Bell } from "lucide-react";
import { EASE } from "@/lib/motion";
import { inViewOnce } from "@/lib/landing-motion";

const BENEFITS = [
  {
    n: "01",
    title: "We catch what humans miss.",
    body: "Reviewers read the diff; LogoMesh executes adversarial inputs in a hardened Docker sandbox—so boundary bugs and state slips surface before merge.",
    visual: "finish",
  },
  {
    n: "02",
    title: "Undeniable proof, no guessing.",
    body: "Every report shows the exact call, the property it violated, and what came back—reproducible evidence, not a vague warning.",
    visual: "proof",
  },
  {
    n: "03",
    title: "Zero false alarms.",
    body: "If nothing is caller-reachable and confirmed, you hear nothing. Silence is intentional: no noisy notifications.",
    visual: "silent",
  },
] as const;

function MiniVisual({ kind }: { kind: (typeof BENEFITS)[number]["visual"] }) {
  if (kind === "finish") {
    return (
      <div className="relative h-28 overflow-hidden rounded-lg border border-border bg-muted/30 p-3 font-mono text-[10px] text-muted-foreground">
        <div className="mb-2 flex justify-between text-[9px] uppercase tracking-wider">
          <span>staging</span>
          <span className="text-primary">merge queue</span>
        </div>
        <div className="relative h-8 rounded border border-dashed border-border">
          <motion.div
            className="absolute bottom-1 left-2 top-1 w-10 rounded-sm bg-destructive/80"
            initial={{ x: 0 }}
            whileInView={{ x: 96 }}
            viewport={inViewOnce}
            transition={{ duration: 2.2, ease: EASE, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="absolute bottom-1 right-2 text-[9px] text-success">
            intercepted
          </span>
        </div>
        <p className="mt-2 text-[9px] leading-relaxed">
          Bug stopped short of the production finish line.
        </p>
      </div>
    );
  }
  if (kind === "proof") {
    return (
      <div className="space-y-1.5 rounded-lg border border-border bg-muted/30 p-3 font-mono text-[11px] leading-relaxed">
        <p className="text-success">✓ reproduced locally</p>
        <p className="text-success">✓ caller-reachable</p>
        <p className="text-destructive">✗ charged 2× on retry</p>
        <p className="text-muted-foreground">→ idempotency key missing</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted/30 py-6 font-mono text-[11px] text-muted-foreground">
      <Bell className="h-8 w-8 text-primary/40" strokeWidth={1.25} />
      <span>0 noisy notifications today</span>
    </div>
  );
}

export function WhyLogoMesh() {
  return (
    <section
      id="why"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-14 md:mb-20"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Why LogoMesh
            </span>
            <span className="h-px w-12 bg-border" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-foreground">
            Proof-first verification
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Built for teams who ship fast—and refuse to learn about bugs from
            users.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-20">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              className={`flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="rounded-2xl border border-border p-6 glass md:flex-1 md:p-8">
                <MiniVisual kind={b.visual} />
              </div>
              <div className="md:flex-1">
                <span className="font-mono text-sm font-bold text-primary">
                  {b.n}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">
                  {b.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
