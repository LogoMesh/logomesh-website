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
    capability: "Zero setup — works on the next PR you open",
    us: "yes", coderabbit: "yes", copilot: "partial", snyk: "partial", sonar: "label", sonarLabel: "heavy config",
  },
];

const TOOLS = ["LogoMesh", "CodeRabbit", "Copilot", "Snyk", "SonarQube"];

function Cell({ val, label }: { val: "yes" | "partial" | "no" | "label"; label?: string }) {
  if (val === "yes")
    return (
      <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] text-center bg-[rgba(196,255,0,0.025)]">
        <Check size={14} className="inline text-[var(--color-accent)]" strokeWidth={3} />
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
      <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] text-[var(--color-muted)] text-center">
        {label}
      </td>
    );
  return (
    <td className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] text-[var(--color-muted)] text-center">
      partial
    </td>
  );
}

export function CompareTable() {
  return (
    <section id="compare" className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-10 py-16 md:py-24">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex items-center gap-3.5 mb-7"
      >
        <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          vs. everything else
        </span>
        <span className="w-12 h-px bg-[var(--color-border-hi)]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-10 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="font-[family-name:var(--font-display)] text-[clamp(38px,4.8vw,60px)] font-extrabold leading-[0.96] tracking-[-0.04em]"
        >
          They comment.
          <br />
          <em className="font-[family-name:var(--font-serif)] italic font-normal text-[var(--color-muted)]" style={{ fontStyle: "italic" }}>
            We prove.
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          className="text-[17px] leading-[1.75] text-[var(--color-muted)]"
        >
          Every other tool in this category reads your diff and guesses what might be wrong.
          LogoMesh executes the code and shows you the crash.
          A comment from us contains the input, the output, and the file location.
        </motion.p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-[var(--color-border)] border-collapse text-left">
          <thead>
            <motion.tr
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              <th className="px-3 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] bg-[var(--color-canvas-3)] font-[family-name:var(--font-mono)] text-[11px] sm:text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-muted)] min-w-[140px] sm:min-w-[220px]">
                Capability
              </th>
              {TOOLS.map((t, i) => (
                <th
                  key={t}
                  className="px-2 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-mono)] text-[11px] sm:text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-center whitespace-nowrap"
                  style={{
                    background: i === 0 ? "rgba(196,255,0,0.05)" : "var(--color-canvas-3)",
                    color: i === 0 ? "var(--color-accent)" : "var(--color-muted)",
                    borderTop: i === 0 ? "2px solid rgba(196,255,0,0.55)" : undefined,
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
                <td className="px-3 sm:px-5 py-3 sm:py-3.5 border border-[var(--color-border)] font-[family-name:var(--font-sans)] text-[13px] sm:text-[15px] text-[var(--color-muted)]">
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
    </section>
  );
}
