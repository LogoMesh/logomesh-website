import Link from "next/link";

export function HowItWorksContent() {
  return (
    <article className="docs-prose">
      <P>
        One command triggers a deterministic eight-stage pipeline. Each stage
        has a single job; none of them share mutable state with the others.
      </P>

      <H2>1. Parse URL</H2>
      <P>
        LogoMesh extracts the Sentry organization slug and issue ID from the
        URL you pass. No browser session or OAuth flow required — just the URL
        and your <Code>SENTRY_AUTH_TOKEN</Code>.
      </P>

      <H2>2. Fetch crash</H2>
      <P>
        The Sentry API returns the latest event for that issue: error type,
        message, full stack trace, and — critically — the frame locals captured
        at crash time. These are the real values from memory at the moment the
        exception was raised.
      </P>

      <H2>3. Pick the frame</H2>
      <P>
        LogoMesh selects the innermost frame whose filename belongs to your
        application, not a library or interpreter internal. Frame locals are
        PII-redacted at this step — before they touch anything else. PAN
        patterns and field-name heuristics (e.g. <Code>card_number</Code>,{" "}
        <Code>ssn</Code>) are masked before any LLM call or test-file write.
      </P>

      <H2>4. Read source</H2>
      <P>
        LogoMesh locates the crashing function&rsquo;s source on disk using
        the file path in the stack frame. If the file cannot be found — for
        example, on a CI machine without a checkout — it falls back to the
        context lines Sentry captured alongside the frame.
      </P>

      <H2>5. Synthesize test</H2>
      <P>
        An LLM writes a pytest that imports the function and calls it with
        values derived from the frame locals. The test does not wrap the call
        in <Code>try/except</Code> or <Code>pytest.raises</Code> — the
        exception must propagate naturally so the sandbox exit code is
        unambiguous. Pass <Code>--no-llm</Code> to skip the LLM entirely and
        build the test from frame locals only.
      </P>

      <H2>6. Run sandbox</H2>
      <P>
        The test runs inside a Docker container: network disabled, running as
        the <Code>nobody</Code> user, 512 KB file cap, randomized report
        filename to prevent path-guessing. LogoMesh never pip-installs
        dependencies from your code inside the sandbox — only the packages
        already in the image are available.
      </P>

      <H2>7. Retry if needed</H2>
      <P>
        If the test passes (no repro), LogoMesh makes one retry: it sends the
        passing output back to the LLM and asks it to fix the test. Common
        causes are type mismatches — for example, the frame local was the
        string <Code>&quot;-1&quot;</Code> but the function expects an int{" "}
        <Code>-1</Code>. One retry only; if it still does not reproduce, exit
        code <Code>1</Code> is returned.
      </P>

      <H2>8. Output</H2>
      <P>
        Exit <Code>0</Code>: reproduced — you get the formatted report and a
        copy of the failing test. Exit <Code>1</Code>: not reproduced on this
        branch. Exit <Code>2</Code>: a pipeline error occurred. With{" "}
        <Code>--artifact</Code>, a sealed JSON envelope is written alongside
        the report.
      </P>

      <Aside>
        <strong className="text-[var(--color-ink)]">
          What &ldquo;reproduced&rdquo; means:{" "}
        </strong>
        The sandbox pytest run returned{" "}
        <Code>{`result["failed"] > 0`}</Code>. The test crashed — confirming
        the bug exists on this branch. A passing test (zero failures) means
        either the branch already has a fix, the synthesized test is wrong, or
        the crash requires external state that was not injected. Use{" "}
        <Code>--state-file</Code> to provide captured state for the latter
        case.{" "}
        <Link
          href="/docs/quick-start"
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
