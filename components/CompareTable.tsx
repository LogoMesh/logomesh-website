"use client";

import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { EASE } from "@/lib/motion";

type Row = {
  capability: string;
  us: "yes" | "partial" | "no";
  coderabbit: "yes" | "partial" | "no";
  copilot: "yes" | "partial" | "no" | "label";
  snyk: "yes" | "partial" | "no";
  sonar: "yes" | "partial" | "no" | "label";
  copilotLabel?: string;
  sonarLabel?: string;
};

const ROWS: Row[] = [
  {
    capability: "LLM property / invariant inference",
    us: "yes", coderabbit: "no", copilot: "no", snyk: "no", sonar: "no",
  },
  {
    capability: "Adversarial test generation",
    us: "yes", coderabbit: "no", copilot: "label", copilotLabel: "suggestions only", snyk: "no", sonar: "no",
  },
  {
    capability: "Sandboxed code execution",
    us: "yes", coderabbit: "no", copilot: "no", snyk: "no", sonar: "no",
  },
  {
    capability: "Only comments with concrete evidence",
    us: "yes", coderabbit: "no", copilot: "no", snyk: "no", sonar: "no",
  },
  {
    capability: "Logic bug detection (beyond known patterns)",
    us: "yes", coderabbit: "partial", copilot: "partial", snyk: "no", sonar: "no",
  },
  {
    capability: "Known vulnerability patterns (SAST)",
    us: "partial", coderabbit: "partial", copilot: "partial", snyk: "yes", sonar: "yes",
  },
  {
    capability: "Zero setup, works on the next PR you open",
    us: "yes", coderabbit: "yes", copilot: "partial", snyk: "partial", sonar: "label", sonarLabel: "heavy config",
  },
];

const TOOLS = ["LogoMesh", "CodeRabbit", "Copilot", "Snyk", "SonarQube"];

function Cell({ val, label }: { val: "yes" | "partial" | "no" | "label"; label?: string }) {
  if (val === "yes")
    return (
      <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] text-center bg-[rgba(196,255,0,0.025)]">
        <Check size={14} className="inline text-[hsl(82_78%_78%)]" strokeWidth={3} />
      </td>
    );
  if (val === "no")
    return (
      <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] text-center">
        <Minus size={14} className="inline text-[var(--color-dim)]" strokeWidth={2} />
      </td>
    );
  if (val === "label")
    return (
      <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[13px] sm:text-[14px] text-[var(--color-muted)] text-center">
        {label}
      </td>
    );
  return (
    <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[13px] sm:text-[14px] text-[var(--color-muted)] text-center">
      partial
    </td>
  );
}

export function CompareTable() {
  return (
    <section
      id="compare"
      className="landing-surface-raised scroll-mt-[calc(5rem+env(safe-area-inset-top))] w-full min-w-0 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-[1280px] px-4 pt-16 pb-16 sm:px-8 md:px-10 md:pt-24 md:pb-24">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-3.5 mb-7"
        >
          <span className="landing-kicker">Compare</span>
          <span className="w-12 h-px bg-[var(--color-border-hi)]" />
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
            className="font-[family-name:var(--font-display)] text-[clamp(32px,4.1vw,52px)] font-extrabold leading-[0.96] tracking-[-0.04em]"
          >
            Same budget,
            <br />
            <span className="display-subline">different job.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="read-max text-[16px] leading-[1.72] text-[var(--color-muted)] sm:text-[18px] sm:leading-[1.75]"
          >
            Assistants suggest changes. We ship rerunnable failures on the code you changed. Pair Snyk
            and Sonar for known patterns, and use us when you want runtime proof on the diff.
          </motion.p>
        </div>

        <div className="mt-10 min-w-0 overflow-x-auto overscroll-x-contain md:mt-12">
          <table className="min-w-[640px] w-full border-collapse border border-[var(--color-border)] text-left sm:min-w-0">
          <thead>
            <motion.tr
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              <th className="px-3 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] bg-[var(--color-canvas-3)] font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-muted)] min-w-[140px] sm:min-w-[220px]">
                What it checks
              </th>
              {TOOLS.map((t, i) => (
                <th
                  key={t}
                  className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[12.5px] sm:text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-center whitespace-nowrap"
                  style={{
                    background: i === 0 ? "rgba(196,255,0,0.05)" : "var(--color-canvas-3)",
                    color: i === 0 ? "hsl(82 78% 82%)" : "var(--color-muted)",
                    borderTop: i === 0 ? "2px solid rgba(196,255,0,0.55)" : undefined,
                    textShadow:
                      i === 0 ? "0 1px 1px hsl(240 12% 4% / 0.9)" : undefined,
                  }}
                >
                  {t}
                </th>
              ))}
            </motion.tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <motion.tr
                key={i}
                className={`transition-colors duration-150 hover:bg-[var(--color-canvas-3)] ${i % 2 !== 0 ? "bg-[var(--color-canvas-2)]" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.06 }}
              >
                <td className="px-3 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-sans)] text-[15px] sm:text-[16px] text-[var(--color-muted)]">
                  {row.capability}
                </td>
                <Cell val={row.us} />
                <Cell val={row.coderabbit} />
                <Cell val={row.copilot} label={row.copilotLabel} />
                <Cell val={row.snyk} />
                <Cell val={row.sonar} label={row.sonarLabel} />
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
