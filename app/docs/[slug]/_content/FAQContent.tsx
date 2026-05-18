import Link from "next/link";

export function FAQContent() {
  return (
    <article className="docs-prose">
      <P>Top questions from pilots and early users.</P>

      <H2>Does logomesh modify my code?</H2>
      <P>
        No. logomesh reads your source and runs a test in an isolated sandbox.
        Nothing is written to your repo unless you pass <Code>--draft-pr</Code>.
      </P>

      <H2>What if the test doesn&rsquo;t reproduce the crash?</H2>
      <P>
        logomesh retries once with the passing output. If it still doesn&rsquo;t
        reproduce, it exits with code 1. Common reasons: the bug is already
        fixed on this branch, or frame locals had type coercion issues (Sentry
        serializes everything as strings — <Code>"-1"</Code> vs{" "}
        <Code>-1</Code>). Pass <Code>--no-llm</Code> to use raw frame locals
        without synthesis.
      </P>

      <H2>Is my source code sent to an LLM?</H2>
      <P>
        The crashing function&rsquo;s source is sent to an LLM to synthesize
        the test. Frame locals are PII-redacted first (PAN regex + field-name
        matching). The test code and sandbox output stored in the artifact are
        deterministic — no LLM token touches them. Pass <Code>--no-llm</Code>{" "}
        to skip the LLM entirely and use frame-locals replay only.
      </P>

      <H2>What does &ldquo;sealed artifact&rdquo; mean for my audit?</H2>
      <P>
        The artifact carries{" "}
        <Code>llm_in_evidence_path: false</Code> and a SHA-256 of the test
        bytes. An auditor can verify that the evidence — the call expression and
        the sandbox output — came from the deterministic synthesizer, not an AI.
        The control mappings (SOC2 CC7.3, CC7.4, PCI DSS 12.10.5) map to
        post-incident response controls.
      </P>
      <P>
        Need attestation language for a workpaper?{" "}
        <Link
          href="/contact?topic=security"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Talk to logomesh security →
        </Link>
      </P>

      <H2>Does it work without Docker?</H2>
      <P>
        Yes. Without Docker, logomesh falls back to a subprocess runner. Less
        isolated (no network airgap), but the test still runs. For compliance
        artifacts, Docker isolation is recommended.
      </P>

      <H2>What Python versions are supported?</H2>
      <P>
        The sandbox runs Python 3.12. Your source file can target any version —
        logomesh parses it with the system Python.
      </P>

      <Aside>
        Have a question that isn&rsquo;t here?{" "}
        <Link
          href="/contact"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Ask us →
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
