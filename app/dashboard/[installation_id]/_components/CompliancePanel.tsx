import Link from "next/link";
import { ShieldCheck, FileText } from "lucide-react";

export function CompliancePanel() {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/45 p-6">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
        >
          <ShieldCheck size={15} strokeWidth={2.25} />
        </span>
        <p className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
          Compliance posture
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Evidence path
          </p>
          <p className="mt-1.5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
            All evidence sealed: deterministic synthesizer, zero LLM in evidence path.
          </p>
        </div>
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Control mappings
          </p>
          <p className="mt-1.5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
            PCI DSS 6.3.2 · SOC2 CC8.1
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <Link
          href="/docs/compliance"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)] hover:underline"
        >
          <FileText size={13} strokeWidth={2.25} />
          Read the full attestation language →
        </Link>
      </div>
    </section>
  );
}
