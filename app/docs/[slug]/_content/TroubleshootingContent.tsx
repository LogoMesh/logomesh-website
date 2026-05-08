export function TroubleshootingContent() {
  return (
    <article className="docs-prose">
      <P>
        Common errors and how to resolve them. If your issue is not listed here,
        run with <Code>LOGOMESH_DEBUG=1</Code> and include the output when
        asking for help.
      </P>

      <H2>SENTRY_AUTH_TOKEN is not set</H2>
      <P>Export the token in your shell before running:</P>
      <Pre>{`export SENTRY_AUTH_TOKEN=sntrys_...`}</Pre>
      <P>
        Get a token at Sentry &rarr; Settings &rarr; Account &rarr; API Tokens.
        The only scope required is <Code>event:read</Code>. Org-level tokens
        work too.
      </P>

      <H2>no usable in-app frame</H2>
      <P>
        The Sentry event has no app frames. This happens when the crash occurred
        in middleware, a WSGI wrapper, or a third-party library before execution
        reached your code. Try a different Sentry issue that shows your package
        name in the stack trace.
      </P>
      <P>
        If you consistently see this on your own errors, configure the Sentry
        SDK with <Code>in_app_include</Code> pointing to your package:
      </P>
      <Pre>{`sentry_sdk.init(
    dsn="...",
    in_app_include=["mypackage"],
)`}</Pre>

      <H2>Test generates but always passes (no repro)</H2>
      <P>
        The LLM synthesizer wrote a test that does not reproduce the crash. Run
        with <Code>--no-llm</Code> to force the deterministic frame-locals
        replayer:
      </P>
      <Pre>{`logomesh repro <url> --no-llm`}</Pre>
      <P>
        If that also passes, the bug is likely fixed on the current branch.
        Check out the commit that was live when the Sentry event fired and run
        again to confirm.
      </P>

      <H2>source code did not parse cleanly</H2>
      <P>
        The file being analyzed has a syntax error. The error message includes
        the file path. Open that file, fix the syntax error, and re-run.
        LogoMesh does not attempt to generate tests for files that do not parse.
      </P>

      <H2>Sandbox exits with collection error (total: 0)</H2>
      <P>
        The generated test file has a syntax error, so pytest collected zero
        tests and exited. Set <Code>LOGOMESH_DEBUG=1</Code> to print the
        generated test to stdout before the sandbox runs it:
      </P>
      <Pre>{`LOGOMESH_DEBUG=1 logomesh repro <url>`}</Pre>
      <P>
        Inspect the printed test, identify the malformed line, and file an issue
        with the output attached.
      </P>

      <H2>Docker not found &rarr; subprocess fallback</H2>
      <P>
        Without Docker, LogoMesh falls back to a subprocess runner
        automatically. The subprocess runner is less isolated &mdash; it runs in
        your local Python environment without memory or PID limits.
      </P>
      <P>To use the subprocess runner explicitly:</P>
      <Pre>{`export LOGOMESH_SANDBOX_MODE=subprocess`}</Pre>
      <P>
        For compliance artifact generation, Docker isolation is strongly
        preferred.
      </P>

      <H2>Sentry path does not match local repo</H2>
      <P>
        Production containers often use paths like{" "}
        <Code>/app/src/billing/checkout.py</Code> that do not exist in your
        local checkout. Pass <Code>--repo</Code> to set the repo root:
      </P>
      <Pre>{`logomesh repro <url> --repo /path/to/your/repo`}</Pre>
      <P>
        LogoMesh strips common leading path components automatically (
        <Code>/app</Code>, <Code>/app/src</Code>, etc.). If your layout is
        unusual, confirm the file exists relative to the repo root you passed.
      </P>

      <H2>Token has wrong scope (403)</H2>
      <P>
        The token exists but lacks <Code>event:read</Code>. Go to Sentry &rarr;
        Settings &rarr; Account &rarr; API Tokens, delete the current token, and
        create a new one with <Code>event:read</Code> checked.
      </P>
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

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] p-4 font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[var(--color-ink)]">
      {children}
    </pre>
  );
}
