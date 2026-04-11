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
      className={`bg-[var(--color-canvas)] border border-[var(--color-border)] p-7 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Mini terminal showing property inference output
function PropertyCard() {
  return (
    <div className="mt-auto bg-[#08080b] border border-[var(--color-border-hi)] p-4 font-[family-name:var(--font-mono)] text-[12.5px] leading-[1.7]">
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
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.18 }}
        >
          {t}
        </motion.p>
      ))}
    </div>
  );
}

// Mini sandbox execution card
function SandboxCard() {
  return (
    <div className="mt-auto bg-[#08080b] border border-[var(--color-border-hi)] p-4 font-[family-name:var(--font-mono)] text-[12px] leading-[1.65] space-y-1">
      <p className="text-[var(--color-dim)]">Container environment:</p>
      <div className="flex gap-2 flex-wrap mt-1">
        {["airgapped", "nobody user", "128 MB RAM", "50 PIDs", "read-only"].map((flag) => (
          <span
            key={flag}
            className="border border-[var(--color-border-hi)] text-[var(--color-muted)] px-2 py-px text-[11px] font-bold uppercase tracking-wide"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section className="max-w-[1280px] mx-auto px-10 py-24">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex items-center gap-3.5 mb-7"
      >
        <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Why it catches what others miss
        </span>
        <span className="w-12 h-px bg-[var(--color-border-hi)]" />
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-auto">

        {/* Large card — Property Inference (spans 2 cols) */}
        <BentoCard className="lg:col-span-2" delay={0}>
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            01 · Property Inference
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] mb-3">
            Asks what should
            <br />
            <em className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--color-muted)]">always be true.</em>
          </h3>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.7] mb-5">
            Before generating a single test, LogoMesh uses the LLM to reason about your function&rsquo;s
            contracts, invariants, and postconditions. This is what it inferred for{" "}
            <code className="font-[family-name:var(--font-mono)] text-[var(--color-accent)] bg-[var(--color-accent-sub)] px-1">
              checkout()
            </code>:
          </p>
          <PropertyCard />
        </BentoCard>

        {/* Sandboxed exec */}
        <BentoCard delay={0.06}>
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            02 · Sandboxed Exec
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[20px] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3">
            Actually runs
            <br />the code.
          </h3>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.7] mb-5">
            Not static analysis. Not an LLM guess. Real execution in a hardened Docker container.
          </p>
          <SandboxCard />
        </BentoCard>

        {/* Zero config card */}
        <BentoCard className="lg:col-span-2" delay={0.1}>
          <div className="flex items-start justify-between gap-8 flex-col md:flex-row">
            <div className="flex-1">
              <span className="font-[family-name:var(--font-mono)] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4 block">
                03 · Zero Config
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] mb-3">
                Works on the
                <br />
                <em className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--color-muted)]">next PR you open.</em>
              </h3>
              <p className="text-[15px] text-[var(--color-muted)] leading-[1.7]">
                Install the GitHub App. That&rsquo;s it. No config file.
                No YAML. No CI integration. LogoMesh listens for PR events
                and runs the full pipeline automatically.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-2.5 font-[family-name:var(--font-mono)] text-[13px]">
              {[
                { label: "Config files required", val: "0" },
                { label: "Setup time", val: "< 60s" },
                { label: "PR events handled", val: "Auto" },
                { label: "Languages supported", val: "Python" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between gap-8">
                  <span className="text-[var(--color-muted)] text-[12px]">{label}</span>
                  <span className="text-[var(--color-accent)] font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Crash validation */}
        <BentoCard delay={0.14}>
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-4">
            04 · Crash Validation
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[20px] font-extrabold leading-[1.1] tracking-[-0.025em] mb-3">
            57% fewer
            <br />false positives.
          </h3>
          <p className="text-[15px] text-[var(--color-muted)] leading-[1.7]">
            LLM validates every crash is caller-reachable before posting.
            False positives are the #1 reason developers uninstall.
          </p>
          <div className="mt-auto pt-5 border-t border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]">
            arXiv:2510.02185 — crash validation study
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
