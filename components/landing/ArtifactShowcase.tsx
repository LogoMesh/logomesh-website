"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, FileJson, FileText, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Three-stack visual for `TheCommentSection`:
 *   1) failing pytest snippet with syntax-tinted highlighting
 *   2) frame locals (the exact arguments captured at the crash)
 *   3) signed audit envelope (PCI DSS / SOC2)
 *
 * Replaces the MediaPlaceholder that was showing a literal play-circle icon
 * and the text "Failing pytest, frame locals, audit artifact" — which is a
 * conversion-killing void on a product website.
 */

export function ArtifactShowcase() {
  const reducedMotion = useReducedMotion();

  const transition = (delay: number) =>
    reducedMotion
      ? { duration: 0 }
      : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay };

  return (
    <div className="relative grid gap-3.5 sm:gap-4">
      {/* (1) Failing pytest */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={transition(0)}
        className="relative overflow-hidden rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]"
      >
        <ArtifactHeader
          icon={<FileText size={13} strokeWidth={2} />}
          eyebrow="01 · failing pytest"
          name="tests/repro/test_4582_negative_qty.py"
        />
        <pre className="overflow-x-auto px-4 py-4 font-[family-name:var(--font-mono)] text-[12.25px] leading-[1.7] sm:px-5 sm:text-[13px]">
          <code>
            <Tok kind="kw">def</Tok>{" "}
            <Tok kind="fn">test_repro_negative_qty_bypass</Tok>
            <Tok kind="punct">():</Tok>
            {"\n"}
            <Tok kind="indent">    </Tok>
            <Tok kind="comment"># synthesized from Sentry event 4582 frame locals</Tok>
            {"\n"}
            <Tok kind="indent">    </Tok>
            order <Tok kind="op">=</Tok> <Tok kind="fn">checkout</Tok>
            <Tok kind="punct">(</Tok>
            {"\n"}
            <Tok kind="indent">        </Tok>
            item_id<Tok kind="op">=</Tok>
            <Tok kind="num">1</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">        </Tok>
            qty<Tok kind="op">=</Tok>
            <Tok kind="num">-5</Tok>
            <Tok kind="punct">,</Tok>{"  "}
            <Tok kind="comment"># observed in production</Tok>
            {"\n"}
            <Tok kind="indent">        </Tok>
            currency<Tok kind="op">=</Tok>
            <Tok kind="str">&quot;USD&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">    </Tok>
            <Tok kind="punct">)</Tok>
            {"\n"}
            <Tok kind="indent">    </Tok>
            <Tok kind="kw">assert</Tok> order<Tok kind="punct">.</Tok>total{" "}
            <Tok kind="op">&gt;=</Tok> <Tok kind="num">0</Tok>
            <Tok kind="punct">,</Tok>{" "}
            <Tok kind="str">f&quot;total leaked: {"{"}order.total{"}"}&quot;</Tok>
          </code>
        </pre>
        <FootChip tone="danger" label="FAIL · total = -$49.95" />
      </motion.div>

      {/* (2) Frame locals */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={transition(0.15)}
        className="relative overflow-hidden rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]"
      >
        <ArtifactHeader
          icon={<FileJson size={13} strokeWidth={2} />}
          eyebrow="02 · frame locals (verbatim)"
          name="checkout.py:42 · innermost app frame"
        />
        <pre className="overflow-x-auto px-4 py-4 font-[family-name:var(--font-mono)] text-[12.25px] leading-[1.7] sm:px-5 sm:text-[13px]">
          <code>
            <Tok kind="punct">{"{"}</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;item_id&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="num">1</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;qty&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="num">-5</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;currency&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="str">&quot;USD&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;customer_email&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="redacted">&quot;⟨redacted⟩&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;card_pan&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="redacted">&quot;⟨redacted⟩&quot;</Tok>
            {"\n"}
            <Tok kind="punct">{"}"}</Tok>
          </code>
        </pre>
        <FootChip tone="muted" label="PII redacted before any LLM or test code" />
      </motion.div>

      {/* (3) Audit envelope */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={transition(0.3)}
        className="relative overflow-hidden rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/95 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]"
      >
        <ArtifactHeader
          icon={<ScrollText size={13} strokeWidth={2} />}
          eyebrow="03 · audit artifact (signed)"
          name="logomesh/4582-repro.json"
        />
        <pre className="overflow-x-auto px-4 py-4 font-[family-name:var(--font-mono)] text-[12.25px] leading-[1.7] sm:px-5 sm:text-[13px]">
          <code>
            <Tok kind="punct">{"{"}</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;sentry_event&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="str">&quot;4582/9a3c…&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;property_violated&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="str">&quot;order.total &gt;= 0&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;repro_test&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="str">&quot;tests/repro/test_4582_negative_qty.py&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;controls&quot;</Tok>
            <Tok kind="punct">: [</Tok>
            <Tok kind="str">&quot;PCI DSS 12.10.5&quot;</Tok>
            <Tok kind="punct">, </Tok>
            <Tok kind="str">&quot;SOC2 CC7.3&quot;</Tok>
            <Tok kind="punct">, </Tok>
            <Tok kind="str">&quot;SOC2 CC7.4&quot;</Tok>
            <Tok kind="punct">],</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;evidence_hash&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="str">&quot;sha256:bf17…e2&quot;</Tok>
            <Tok kind="punct">,</Tok>
            {"\n"}
            <Tok kind="indent">  </Tok>
            <Tok kind="key">&quot;llm_in_evidence_path&quot;</Tok>
            <Tok kind="punct">: </Tok>
            <Tok kind="bool">false</Tok>
            {"\n"}
            <Tok kind="punct">{"}"}</Tok>
          </code>
        </pre>
        <FootChip tone="pass" label="deterministic from frame locals · no LLM" />
      </motion.div>
    </div>
  );
}

function ArtifactHeader({
  icon,
  eyebrow,
  name,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-canvas-3)]/70 px-4 py-2 sm:px-5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/80 text-[var(--color-accent)]">
        {icon}
      </span>
      <p className="font-[family-name:var(--font-mono)] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <span className="ml-auto truncate font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--color-dim)]">
        {name}
      </span>
    </div>
  );
}

function FootChip({
  tone,
  label,
}: {
  tone: "danger" | "pass" | "muted";
  label: string;
}) {
  const palette =
    tone === "danger"
      ? { bg: "rgba(255,59,59,0.08)", border: "rgba(255,59,59,0.3)", fg: "var(--color-danger)" }
      : tone === "pass"
      ? { bg: "rgba(0,232,122,0.08)", border: "rgba(0,232,122,0.3)", fg: "var(--color-pass)" }
      : { bg: "var(--color-canvas-3)", border: "var(--color-border)", fg: "var(--color-muted)" };

  return (
    <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] px-4 py-2 sm:px-5">
      {tone === "danger" ? null : <Check size={11} strokeWidth={3} style={{ color: palette.fg }} />}
      <span
        className="inline-flex items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em]"
        style={{
          backgroundColor: palette.bg,
          borderColor: palette.border,
          color: palette.fg,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* Inline syntax-token component — keeps the JSX readable without a real parser */
function Tok({
  kind,
  children,
}: {
  kind:
    | "kw"
    | "fn"
    | "num"
    | "str"
    | "key"
    | "comment"
    | "op"
    | "punct"
    | "redacted"
    | "bool"
    | "indent";
  children: React.ReactNode;
}) {
  const cls: Record<string, string> = {
    kw: "text-[hsl(var(--syntax-keyword))]",
    fn: "text-[var(--color-accent)]",
    num: "text-[hsl(var(--syntax-number))]",
    str: "text-[hsl(var(--syntax-symbol))]",
    key: "text-[var(--color-accent)]/85",
    comment: "text-[var(--color-dim)] italic",
    op: "text-[var(--color-muted)]",
    punct: "text-[var(--color-muted)]",
    bool: "text-[hsl(var(--syntax-number))]",
    redacted: "text-[var(--color-dim)] line-through decoration-[var(--color-dim)]/50",
    indent: "text-[var(--color-dim)]",
  };
  return <span className={cn(cls[kind])}>{children}</span>;
}
