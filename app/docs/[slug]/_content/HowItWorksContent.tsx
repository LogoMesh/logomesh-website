import Link from "next/link";

export function HowItWorksContent() {
  return (
    <article className="docs-prose">
      <P>
        logomesh is an AI agent with a tight job. The agent plans and uses tools.
        A separate, deterministic Python function writes the actual proof.
        That split is the whole point: AI is great at planning, but auditors
        won&rsquo;t accept evidence that an AI wrote.
      </P>

      <H2>What the agent does</H2>
      <P>
        When Sentry fires, the agent runs a short investigation against your code:
      </P>
      <Ul>
        <Li>
          Reads the crash — error type, message, stack trace, and the variable values
          that were in memory at the moment of failure.
        </Li>
        <Li>
          Finds the part of your code that broke. If the file path doesn&rsquo;t
          match your repo layout, it tries again with hints from a search step.
        </Li>
        <Li>
          Checks if your project has any missing dependencies the sandbox would need,
          and prepares them in an isolated bundle before the test runs.
        </Li>
        <Li>
          Calls the deterministic synthesizer to write the failing test.
        </Li>
        <Li>
          Runs the test in a hardened Docker sandbox (no network, unprivileged user,
          memory + process caps).
        </Li>
        <Li>
          Verifies that the sandbox raised the <em>same</em> error your users saw —
          not a similar error, the same one.
        </Li>
        <Li>
          If something blocks it, it tells you why (&ldquo;can&rsquo;t find your source&rdquo;,
          &ldquo;crash needs database state we don&rsquo;t have&rdquo;, etc.) instead of
          guessing.
        </Li>
      </Ul>

      <H2>What the agent is NOT allowed to do</H2>
      <P>
        This is the part that matters for compliance.
      </P>
      <Ul>
        <Li>
          <strong className="text-[var(--color-ink)]">Write the test code.</strong> The
          failing test is written by a pure Python function from the captured crash
          values — never by an AI. The bytes in the test file have no AI in them.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">Write the audit file.</strong> The
          sealed JSON envelope is built deterministically. It includes a hash of the
          test bytes and a flag that says <Code>llm_in_evidence_path: false</Code>.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">Edit your code.</strong> logomesh
          opens a draft PR. It never pushes, never merges, never &ldquo;auto-fixes.&rdquo;
          Your team owns the change.
        </Li>
        <Li>
          <strong className="text-[var(--color-ink)]">Fake a green check.</strong> If
          the test crashed with a different error than your users saw, the run is
          flagged for human review with a structured reason. Never silently shipped.
        </Li>
      </Ul>

      <H2>What you get back</H2>
      <P>
        Every run produces three artifacts: a failing test file, a sealed JSON audit
        envelope mapped to SOC2 CC7.3 / CC7.4 and PCI DSS 12.10.5, and a verdict —
        <Code>reproduced</Code>, <Code>needs_human_review</Code>, or <Code>error</Code>.
        The audit envelope is what you forward to your reviewer.
      </P>

      <Aside>
        <strong className="text-[var(--color-ink)]">
          What &ldquo;reproduced&rdquo; really means:{" "}
        </strong>
        The agent&rsquo;s test crashed in the sandbox with the same error type
        your users saw in Sentry. If it crashed with a different error, or if it
        passed, you don&rsquo;t get a green &mdash; you get a reason.{" "}
        <Link
          href="/docs/quickstart"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Back to Quick Start →
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
