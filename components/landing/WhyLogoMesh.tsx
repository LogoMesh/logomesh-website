"use client";

import { motion } from "motion/react";
import { BellOff, Bug, ShieldCheck } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { ReactNode } from "react";

function PipelineVisual() {
  return (
    <div className="font-sans text-[12px]">
      <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-dim">
        <span>PR opened</span>
        <span>Production</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "var(--gradient-primary)" }}
          initial={{ width: "0%" }}
          whileInView={{ width: "48%" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: "48%" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1], delay: 1.3 }}
        >
          <span className="relative block h-4 w-4 -translate-x-1/2 rounded-full bg-destructive ring-4 ring-destructive/20">
            <Bug
              size={10}
              className="absolute inset-0 m-auto text-destructive-foreground"
              strokeWidth={2.5}
            />
          </span>
        </motion.div>
      </div>
      <motion.p
        className="mt-4 text-foreground/90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <span className="text-destructive">◆</span> caught · applyCoupon() · PR #47
      </motion.p>
      <p className="mt-1 text-dim">0 bugs reached main in 14 public-repo PRs</p>
    </div>
  );
}

function ProofVisual() {
  const steps = [
    { mark: "✓", tone: "text-primary", text: "call applyCoupon('EXPIRED')" },
    { mark: "✓", tone: "text-primary", text: "retry_count = 2" },
    { mark: "✗", tone: "text-destructive", text: "customer.charged === 2" },
  ];

  return (
    <div className="font-sans text-[12.5px] leading-[1.8]">
      <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-dim">
        Reproduction · posted to PR
      </p>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3 + index * 0.35, duration: 0.25 }}
        >
          <span className={`${step.tone} font-bold`}>{step.mark}</span>
          <span className="text-foreground/85">{step.text}</span>
        </motion.div>
      ))}
      <motion.div
        className="mt-3 border-t border-border pt-3 text-destructive"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 1.4, duration: 0.4 }}
      >
        <span className="font-semibold">bug:</span> customer charged twice
      </motion.div>
    </div>
  );
}

function SilenceVisual() {
  const skipped = [
    "maybe flaky — skipped",
    "probably fine — skipped",
    "might be related — skipped",
  ];

  return (
    <div className="font-sans text-[12.5px]">
      <div className="flex items-center justify-between rounded-xl border border-border/80 bg-background/55 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <BellOff size={18} className="text-dim" />
          </div>
          <div>
            <p className="font-sans text-[13px] font-medium text-foreground/90">
              0 noisy notifications
            </p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-dim">
              today · this week · ever in beta
            </p>
          </div>
        </div>
        <span className="font-sans text-[2.1rem] leading-none text-primary">
          0
        </span>
      </div>

      <motion.div
        className="mt-4 space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {skipped.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/60 px-3 py-2 text-dim"
          >
            <span className="line-through decoration-dim/60">{item}</span>
            <span className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
              ignored
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

type Benefit = {
  number: string;
  icon: ReactNode;
  title: string;
  body: ReactNode;
  visual: ReactNode;
};

const BENEFITS: Benefit[] = [
  {
    number: "01",
    icon: <Bug size={16} strokeWidth={2.25} />,
    title: "We catch what humans miss.",
    body: "LogoMesh runs hundreds of adversarial edge cases humans never think to try — negative amounts, expired tokens, empty payloads, retry storms. It finds the bug that would have taken your on-call engineer down at 3am.",
    visual: <PipelineVisual />,
  },
  {
    number: "02",
    icon: <ShieldCheck size={16} strokeWidth={2.25} />,
    title: "Undeniable proof, no guessing.",
    body: "Every comment includes the exact input, the expected behavior, and the observed failure — reproducible on your machine in one command. No trust scores. No \u201cmaybe.\u201d Just evidence.",
    visual: <ProofVisual />,
  },
  {
    number: "03",
    icon: <BellOff size={16} strokeWidth={2.25} />,
    title: "Zero false alarms.",
    body: "If LogoMesh can\u2019t reproduce the crash inside its sandbox, it stays silent. No spam. No \u201cmight be broken.\u201d 0 false positives across 14 public-repo PRs and counting.",
    visual: <SilenceVisual />,
  },
];

export function WhyLogoMesh() {
  return (
    <section id="why" className="relative w-full overflow-hidden pt-[7rem] pb-[7.5rem] sm:pt-36 sm:pb-40 md:pt-44 md:pb-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, hsl(78 100% 50% / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[48rem]"
        >
          <p className="font-sans text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            <span
              aria-hidden
              className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
              style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.55)" }}
            />
            Why LogoMesh
          </p>
          <h2 className="mt-5 font-sans text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-foreground">
            A reviewer that only speaks
            <span className="italic text-muted-foreground"> when it&rsquo;s sure.</span>
          </h2>
          <p className="mt-5 max-w-[40rem] text-[16.5px] leading-[1.6] text-muted-foreground sm:text-[18px]">
            Every other tool drowns you in warnings. LogoMesh runs the failing
            input, captures the crash, and posts one PR comment with the fix.
            Or it says nothing at all.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24 md:mt-24">
          {BENEFITS.map((benefit, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
                className={`grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                    <span>{benefit.number}</span>
                    <span className="h-px w-8 bg-primary/40" aria-hidden />
                    {benefit.icon}
                  </span>
                  <h3 className="mt-4 font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-5 max-w-[36rem] text-[16px] leading-[1.7] text-muted-foreground sm:text-[17px]">
                    {benefit.body}
                  </p>
                </div>

                <div className="glass rounded-2xl border border-border/70 bg-card/70 p-6 sm:p-7">
                  {benefit.visual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
