"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      whileHover={{ borderColor: "rgba(196,255,0,0.28)" }}
      className={`bg-[var(--color-canvas)] border border-[var(--color-border)] p-6 md:p-7 flex flex-col cursor-default transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(196,255,0,0.05)] max-md:text-center md:text-left ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Mini terminal showing property inference output
function PropertyCard() {
  return (
    <div className="mt-auto bg-[var(--color-canvas-2)] border border-[var(--color-border)] p-5 text-left font-[family-name:var(--font-mono)] text-[13.5px] leading-[1.7] md:p-4">
      <motion.p
        className="text-[var(--color-dim)] mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        # LLM inferred 3 properties for checkout()
      </motion.p>
      {[
        "P1: total should always be ≥ 0",
        "P2: item_count should match items array length",
        "P3: applied_discount ≤ subtotal",
      ].map((t, i) => (
        <motion.p
          key={i}
          className="text-[var(--color-accent)]"
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3 + i * 0.18,
          }}
        >
          {t}
        </motion.p>
      ))}
    </div>
  );
}

const FLAGS = [
  "airgapped",
  "nobody user",
  "128 MB RAM",
  "50 PIDs",
  "read-only",
];

// Mini sandbox execution card
function SandboxCard() {
  return (
    <div className="mt-auto bg-[var(--color-canvas-2)] border border-[var(--color-border)] p-5 text-left font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] space-y-2 md:p-4">
      <p className="text-[var(--color-dim)]">Container environment:</p>
      <div className="flex gap-2 flex-wrap mt-1">
        {FLAGS.map((flag, i) => (
          <motion.span
            key={flag}
            className="relative px-2 py-px text-[12px] font-bold uppercase tracking-wide"
            style={{
              color: "#93c5fd",
              border: "1px solid rgba(29,99,237,0.45)",
              background: "rgba(29,99,237,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            animate={{
              boxShadow: [
                "0 0 0px 0px rgba(29,99,237,0)",
                "0 0 8px 2px rgba(29,99,237,0.5)",
                "0 0 0px 0px rgba(29,99,237,0)",
              ],
            }}
            transition={{
              opacity: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.1,
              },
              scale: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.1,
              },
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.45,
              },
            }}
          >
            {flag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section
      id="features"
      className="w-full py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 md:px-10">
      {/* Section title + description */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-10 text-center md:mb-14 md:text-left"
      >
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,3.85vw,48px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-[var(--color-ink)]">
          What you get on day one
        </h2>
        <p className="read-max mt-4 mx-auto text-[15px] leading-[1.72] text-[var(--color-muted)] sm:text-[16px] sm:leading-[1.75] md:mx-0">
          Faster review cycles and fewer surprises in prod, without standing up new CI or
          writing extra tests yourself. LogoMesh does the adversarial work when the PR
          opens.
        </p>
      </motion.div>

      {/* Bento grid — 3-col so 2+1 fills perfectly each row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-3 auto-rows-auto">
        {/* Large card — Property Inference (spans 2 cols) */}
        <BentoCard className="lg:col-span-2" delay={0}>
          <span className="font-[family-name:var(--font-mono)] text-[12px] sm:text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            01 · Property Inference
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[24px] md:text-[22px] font-extrabold leading-[1.1] tracking-[-0.03em] mb-3">
            Tests aimed at
            <br />
            <span className="display-subline">your real rules.</span>
          </h3>
          <p className="text-[14px] text-[var(--color-muted)] leading-[1.68] mb-5 sm:text-[15px] sm:leading-[1.7]">
            First we ask what your function is supposed to guarantee. Here is a fake
            example for{" "}
            <code className="font-[family-name:var(--font-mono)] text-[var(--color-accent)] bg-[var(--color-accent-sub)] px-1">
              checkout()
            </code>
            . The kind of list we might infer:
          </p>
          <PropertyCard />
        </BentoCard>

        {/* Sandboxed exec */}
        <BentoCard delay={0.06}>
          <span className="font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            02 · Sandboxed Exec
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[21px] md:text-[19px] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3">
            Failures your
            <br />
            linter cannot see.
          </h3>
          <p className="text-[14px] text-[var(--color-muted)] leading-[1.68] mb-5 sm:text-[15px] sm:leading-[1.7]">
            Logic bugs show up at runtime. We execute the changed code in a locked-down
            container so you see real tracebacks, not a guessed warning.
          </p>
          <SandboxCard />
        </BentoCard>

        {/* Zero config card */}
        <BentoCard className="lg:col-span-2" delay={0.1}>
          <div className="flex items-center justify-between gap-8 flex-col md:flex-row md:items-start">
            <div className="flex-1 w-full">
              <span className="font-[family-name:var(--font-mono)] text-[12px] sm:text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4 block">
                03 · Zero Config
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[24px] md:text-[22px] font-extrabold leading-[1.1] tracking-[-0.03em] mb-3">
                Live on your
                <br />
                <span className="display-subline">next pull request.</span>
              </h3>
              <p className="text-[14px] text-[var(--color-muted)] leading-[1.68] sm:text-[15px] sm:leading-[1.7]">
                One GitHub App install. Your team keeps the same workflow; LogoMesh hooks
                PR events automatically. No new pipeline to own when you are already
                underwater.
              </p>
            </div>
            <div className="flex-shrink-0 flex w-full max-w-[min(100%,18rem)] flex-col gap-2.5 font-[family-name:var(--font-mono)] text-[12px] sm:text-[13px] md:max-w-none">
              {[
                { label: "Config files required", val: "0" },
                { label: "Setup time", val: "< 60s" },
                { label: "PR events handled", val: "Auto" },
                { label: "Languages supported", val: "Python" },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 sm:gap-8"
                >
                  <span className="text-[var(--color-muted)] text-[12px]">
                    {label}
                  </span>
                  <span className="text-[var(--color-accent)] font-bold">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Crash validation */}
        <BentoCard delay={0.14}>
          <span className="font-[family-name:var(--font-mono)] text-[12px] sm:text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            04 · Crash Validation
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[21px] md:text-[19px] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3">
            Comments your
            <br />
            team will trust.
          </h3>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.7]">
            We validate crashes before they hit your thread, so you are not chasing
            ghosts. Outside research on crash-validation pipelines (see citation below)
            shows how much noise that class of gate can remove. We bake that idea into
            what we post.
          </p>
          <div className="mt-auto pt-5 border-t border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-dim)]">
            arXiv:2510.02185, crash validation study
          </div>
        </BentoCard>
      </div>
      </div>
    </section>
  );
}
