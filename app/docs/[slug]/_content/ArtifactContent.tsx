import Link from "next/link";

export function ArtifactContent() {
  return (
    <article className="docs-prose">
      <P>
        <Code>logomesh repro {"<url>"} --artifact</Code> writes a JSON envelope
        alongside the failing pytest. It is designed for a human auditor, not
        for a dashboard badge. Every field has a deterministic definition an
        auditor can verify independently.
      </P>

      <H2>What the artifact is</H2>
      <P>
        A signed JSON document that records the exact inputs, the synthesized
        test, the sandbox output, and the exception match verdict for a single
        reproduction run. It does not contain an AI opinion. It contains hashes
        and types.
      </P>
      <Pre>{`{
  "control_mappings": ["SOC2 CC7.3", "SOC2 CC7.4", "PCI DSS 12.10.5"],
  "evidence_path_seal": {
    "llm_in_evidence_path": false,
    "synthesizer": "frame-locals → pytest (deterministic)",
    "sandbox_exception_type": "ValueError",
    "expected_exception_type": "ValueError",
    "verified_exception_match": true,
    "test_sha256_first16": "203ba3cdb6803e85"
  },
  "git": {
    "branch": "fix/checkout-qty",
    "commit": "abc1234"
  }
}`}</Pre>

      <H2>llm_in_evidence_path: false</H2>
      <P>
        The call expression, the test code, and the sandbox output in this
        artifact came from the deterministic synthesizer only. The synthesizer
        reads frame locals directly from the Sentry event and emits a pytest
        file without calling any language model.
      </P>
      <P>
        An auditor can verify this by hashing the frame-locals input and the
        generated test file and comparing both against the values in the
        artifact. <Code>test_sha256_first16</Code> is the first 16 hex
        characters of the SHA-256 of the test file as written to disk before
        sandbox execution.
      </P>
      <P>
        Auxiliary LLM calls — hypothesis suggesters, context enrichers — are
        tagged <Code>in_evidence_path: false</Code> and excluded from the seal.
        They never appear inside <Code>evidence_path_seal</Code>.
      </P>

      <H2>verified_exception_match: true</H2>
      <P>
        &ldquo;Reproduced&rdquo; has a precise definition. The sandbox must
        raise the{" "}
        <strong className="text-[var(--color-ink)]">same exception type</strong>{" "}
        that the Sentry event recorded. A pytest exit code with{" "}
        <Code>failed &gt; 0</Code> alone is not sufficient &mdash; a{" "}
        <Code>NameError</Code> from a broken import also produces a failure, and
        that is not a reproduction.
      </P>
      <P>
        <Code>verified_exception_match</Code> is only <Code>true</Code> when{" "}
        <Code>sandbox_exception_type</Code> equals{" "}
        <Code>expected_exception_type</Code> exactly. If they diverge, the
        artifact sets <Code>needs_human_review: true</Code> with the reason. No
        green verdict ships on a wrong match.
      </P>

      <H2>Control mappings</H2>
      <P>
        The three controls are post-incident response controls, not pre-release
        code-review controls.
      </P>
      <Ul>
        <Li>
          <strong className="text-[var(--color-ink)]">SOC2 CC7.3</strong> —
          evaluation of security events to identify those that are security
          incidents. The sealed reproduction is machine-witnessed evidence that
          the event was evaluated and the root-cause call was identified.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">SOC2 CC7.4</strong> —
          response to identified security incidents. The artifact + draft PR
          pair documents both the incident evidence and the remediation branch.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">PCI DSS 12.10.5</strong>{" "}
          — incident response plan includes monitoring and responding to alerts
          from security monitoring systems. The artifact provides audit-ready
          evidence that the Sentry alert was acted on with a verifiable response.
        </Li>
      </Ul>
      <P>
        Do not confuse these with <Code>CC8.1</Code> (change management) or{" "}
        <Code>PCI DSS 6.3.2</Code> (pre-release code review). Those govern
        controls applied before a change ships. The artifact records what
        happened after a crash was captured in production.
      </P>

      <H2>needs_human_review: true</H2>
      <P>
        If exception types do not match, or the sandbox produced no output, the
        artifact sets <Code>needs_human_review: true</Code> and includes a{" "}
        <Code>review_reason</Code> string explaining what diverged. The artifact
        is still written to disk so there is a complete record. It is never
        promoted to a draft PR automatically when this flag is set.
      </P>

      <Aside>
        Questions about walking an auditor through a single artifact end to
        end?{" "}
        <Link
          href="/contact?topic=security"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Talk to the LogoMesh security team →
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
  return <ul className="mt-4 list-none space-y-2.5 pl-0">{children}</ul>;
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
