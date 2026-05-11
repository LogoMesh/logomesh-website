import type { HypothesisReport } from "@/lib/types";

const CRASH_CLASS_LABEL: Record<HypothesisReport["crash_class"], string> = {
  race_condition_write_write: "Race condition · concurrent writes",
  race_condition_optimistic_lock: "Race condition · optimistic lock",
  race_condition_read_after_write: "Race condition · read after write",
  fk_ordering: "Foreign key ordering",
  timing_dependent: "Timing-dependent failure",
  external_state_required: "Depends on external state",
  framework_bootstrap_required: "Needs framework bootstrap",
  input_validation: "Input validation failure",
  unknown: "Unclassified",
};

const DIFFICULTY_LABEL: Record<
  HypothesisReport["hypotheses"][number]["repro_difficulty"],
  string
> = {
  deterministic_local: "deterministic, runs locally",
  needs_threads: "needs threads",
  needs_real_db: "needs a real DB",
  needs_framework_bootstrap: "needs framework bootstrap",
  timing_sensitive_unreproducible: "timing-sensitive, hard to repro",
};

export function HypothesisReportPanel({ report }: { report: HypothesisReport }) {
  const confidencePct = Math.round(report.confidence * 100);

  return (
    <section
      aria-label="Investigation report"
      className="rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/85 p-6"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Investigation report
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[22px]">
            {report.one_line_summary}
          </h3>
        </div>
        <span className="inline-flex items-center self-start rounded-full border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] px-3 py-1 font-[family-name:var(--font-mono)] text-[11.5px] tracking-tight text-[var(--color-muted)]">
          {CRASH_CLASS_LABEL[report.crash_class]} · {confidencePct}% confidence
        </span>
      </header>

      {report.hypotheses.length > 0 ? (
        <div className="mt-6">
          <SectionTitle>What we think happened</SectionTitle>
          <ol className="mt-3 space-y-3">
            {report.hypotheses.map((h) => (
              <li
                key={h.rank}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)]/60 p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[var(--color-ink)]">
                    #{h.rank} · {Math.round(h.confidence * 100)}% confidence
                  </p>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-dim)]">
                    {DIFFICULTY_LABEL[h.repro_difficulty]}
                  </span>
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-muted)]">
                  {h.description}
                </p>
                {h.evidence_refs.length > 0 ? (
                  <ul className="mt-2 list-none space-y-1 pl-0">
                    {h.evidence_refs.map((ref, i) => (
                      <li
                        key={i}
                        className="text-[12.5px] leading-[1.55] text-[var(--color-dim)]"
                      >
                        — {ref}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {report.evidence.length > 0 ? (
        <div className="mt-6">
          <SectionTitle>Evidence the agent collected</SectionTitle>
          <ul className="mt-3 list-none space-y-1.5 pl-0">
            {report.evidence.map((e, i) => (
              <li
                key={i}
                className="flex gap-2 text-[13.5px] leading-[1.6] text-[var(--color-muted)]"
              >
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-dim)]">
                  {e.source}
                </span>
                <span className="min-w-0">{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {report.violated_invariants.length > 0 ? (
        <div className="mt-6">
          <SectionTitle>Invariants the crash implies were violated</SectionTitle>
          <ul className="mt-3 list-none space-y-1.5 pl-0">
            {report.violated_invariants.map((inv, i) => (
              <li
                key={i}
                className="flex items-baseline gap-2 text-[14px] leading-[1.6] text-[var(--color-muted)]"
              >
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-[var(--color-accent)]"
                />
                <span className="min-w-0">
                  {inv.statement}
                  <span className="ml-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-dim)]">
                    ({Math.round(inv.confidence * 100)}%)
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card title="To reproduce locally">
          <p className="text-[14px] leading-[1.65] text-[var(--color-muted)]">
            {report.suggested_repro_approach}
          </p>
        </Card>
        <Card title="Suggested fix pattern">
          <p className="text-[14px] leading-[1.65] text-[var(--color-muted)]">
            {report.suggested_fix_pattern}
          </p>
        </Card>
      </div>

      {report.related_files.length > 0 ? (
        <div className="mt-6">
          <SectionTitle>Related files</SectionTitle>
          <ul className="mt-2 flex flex-wrap gap-2">
            {report.related_files.map((f, i) => (
              <li
                key={i}
                className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-muted)]"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 border-t border-[var(--color-border)] pt-4 text-[12px] leading-[1.55] text-[var(--color-dim)]">
        This report is advisory. It is not part of the sealed audit evidence — the agent
        is not allowed to write proof. Use it as a starting point for human review.
      </p>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
      {children}
    </p>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)]/60 p-4">
      <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
