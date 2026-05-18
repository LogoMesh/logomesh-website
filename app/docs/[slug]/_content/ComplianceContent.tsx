import Link from "next/link";

export function ComplianceContent() {
  return (
    <article className="docs-prose">
      <P>
        These five clauses make up the logomesh compliance contract. They are
        the same three rules that govern the orchestrator&rsquo;s evidence
        path, plus the standards mapping and the audit trail that follows from
        them. If any clause stops being true for an artifact, the artifact is
        not shipped.
      </P>

      <H2>Sealed evidence path</H2>
      <P>
        The bytes inside every shipped artifact came from the deterministic
        synthesizer and the sandbox only. No LLM token touches the call
        expression, the test code, or the sandbox output stored in the
        artifact. The artifact carries a stamp{" "}
        <Code>evidence_path_seal.llm_in_evidence_path: false</Code> that an
        auditor can verify by hashing the inputs and comparing.
      </P>
      <P>
        Auxiliary tools — hypothesis suggesters, context probes, web search —
        are explicitly tagged advisory and excluded from the seal. They live
        in <Code>environment_prep</Code> or other sibling blocks marked{" "}
        <Code>in_evidence_path: false</Code>.
      </P>

      <H2>Verified exception match</H2>
      <P>
        &ldquo;Reproduced&rdquo; means the sandbox raised the{" "}
        <strong className="text-[var(--color-ink)]">same exception type</strong>{" "}
        the Sentry event captured. A pytest exit code of{" "}
        <Code>failed &gt; 0</Code> alone is not enough — a{" "}
        <Code>NameError</Code> from a busted import counts as failed too. The
        artifact only records{" "}
        <Code>verified_exception_match: true</Code> when the sandbox exception
        type matches the type recorded by the error monitor.
      </P>

      <H2>No silent ship on mismatch</H2>
      <P>
        If the verification gate fails, the run emits{" "}
        <Code>needs_human_review: true</Code> with the reason — never a green
        &ldquo;shipped&rdquo; verdict on a wrong artifact. Mismatches surface
        with a structured <Code>review_reason</Code> so a human can decide
        whether the divergence is meaningful.
      </P>

      <H2>Control mappings: SOC2 CC7.3 / CC7.4 · PCI DSS 12.10.5</H2>
      <P>
        Every artifact embeds post-incident response controls — not pre-release
        code-review controls. The CLI emits:
      </P>
      <Pre>{`"controls": [
  "SOC2-CC7.3",
  "SOC2-CC7.4",
  "PCI-DSS-4.0-12.10.5"
]`}</Pre>
      <P>Human-readable docs and dashboards may show the same three as:</P>
      <Pre>{`"control_mappings": [
  "SOC2 CC7.3",
  "SOC2 CC7.4",
  "PCI DSS 12.10.5"
]`}</Pre>
      <Ul>
        <Li>
          <strong className="text-[var(--color-ink)]">SOC2 CC7.3</strong> —
          evaluate security events to determine whether they could or have
          resulted in a failure to meet objectives. The deterministic repro is
          machine-witnessed evaluation of the production incident.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">SOC2 CC7.4</strong> —
          respond to identified security incidents. The sealed test, optional
          draft PR, and audit trail document the response.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">PCI DSS 12.10.5</strong>{" "}
          — incident response procedures are in place and followed. The sealed
          envelope is the procedural artifact tying the alert to a verifiable
          reproduction.
        </Li>
      </Ul>
      <P>
        <strong className="text-[var(--color-ink)]">Do not use</strong>{" "}
        <Code>PCI DSS 6.3.2</Code> or <Code>SOC2 CC8.1</Code> for this product.
        Those govern pre-release secure code review and change management — i.e.
        controls applied <em>before</em> a change ships. logomesh fires{" "}
        <em>after</em> a production crash is captured; the correct mapping is
        incident response (CC7.3 / CC7.4 / 12.10.5).
      </P>

      <H2>Audit trail and attestation</H2>
      <P>
        Each <Code>logomesh repro … --artifact</Code> run writes a timestamped
        JSON envelope to disk. Reviewers can hash the test bytes, verify{" "}
        <Code>llm_in_evidence_path: false</Code>, and walk the control mapping
        without trusting marketing copy.
      </P>
      <Aside>
        Need attestation language for your own SOC2 / PCI workpaper?{" "}
        <Link
          href="/contact?topic=security"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Talk to logomesh security →
        </Link>
      </Aside>
    </article>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 first:mt-0 font-[family-name:var(--font-display)] text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15.5px] leading-[1.72] text-[var(--color-muted)]">
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-none space-y-2.5 pl-0">
      {children}
    </ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[15px] leading-[1.65] text-[var(--color-muted)]">
      <span
        aria-hidden
        className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
      />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-ink)]">
      {children}
    </code>
  );
}

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] p-4 font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[var(--color-ink)]">
      {children}
    </pre>
  );
}

function Aside({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-10 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/50 p-5 text-[14.5px] leading-[1.65] text-[var(--color-muted)]">
      {children}
    </aside>
  );
}
