import Link from "next/link";

export function ComplianceContent() {
  return (
    <article className="docs-prose">
      <P>
        These five clauses make up the LogoMesh compliance contract. They are
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
        in the dashboard with the{" "}
        <span className="font-[family-name:var(--font-mono)] text-[hsl(38_95%_72%)]">
          ✗ Mismatch
        </span>{" "}
        pill so a human can decide whether the divergence is meaningful.
      </P>

      <H2>Control mappings: PCI DSS 6.3.2 / SOC2 CC8.1</H2>
      <P>
        Every artifact embeds a{" "}
        <Code>{`"control_mappings": ["PCI DSS 6.3.2", "SOC2 CC8.1"]`}</Code>{" "}
        block. Those two controls govern the audit-evidence path the artifact
        is designed to satisfy:
      </P>
      <Ul>
        <Li>
          <strong className="text-[var(--color-ink)]">
            PCI DSS 6.3.2
          </strong>{" "}
          — review of bespoke and custom code prior to release to identify
          potential vulnerabilities. The sealed reproduction is the
          machine-witnessed evidence the reviewer keeps on file.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">SOC2 CC8.1</strong> —
          authorization, design, development, and configuration of changes
          including system components. The artifact + draft PR pair documents
          the change motivation alongside its proof.
        </Li>
      </Ul>

      <H2>Audit trail and attestation</H2>
      <P>
        Each installation accumulates an append-only{" "}
        <Code>session_audit</Code> stream stamped on every artifact. Reviewers
        can request the session journal from a customer-success contact; we
        do not transmit it through the dashboard surface to keep the
        URL-as-secret risk surface narrow during pilot v1.
      </P>
      <P>
        For the long form — including the precise rule numbering for both
        controls and how to walk an auditor through a single artifact end to
        end — open a security-review thread.
      </P>
      <Aside>
        Need attestation language for your own SOC2 / PCI workpaper?{" "}
        <Link
          href="/contact?topic=security"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Talk to LogoMesh security →
        </Link>
      </Aside>
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Inline prose primitives — kept identical to the sibling content file
// for visual consistency without a typography plugin.
// ──────────────────────────────────────────────────────────────────────

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

function Aside({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-10 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/50 p-5 text-[14.5px] leading-[1.65] text-[var(--color-muted)]">
      {children}
    </aside>
  );
}
