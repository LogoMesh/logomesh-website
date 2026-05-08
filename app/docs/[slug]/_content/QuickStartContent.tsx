import Link from "next/link";

export function QuickStartContent() {
  return (
    <article className="docs-prose">
      <P>
        Four steps from a Sentry URL to a failing pytest you can paste into
        your repo. No account required for the core repro path — you need a
        Sentry API token and Docker.
      </P>

      <H2>1. Install</H2>
      <Pre>{`pip install logomesh
# or, if you use uv:
uv add logomesh`}</Pre>

      <H2>2. Set your Sentry token</H2>
      <P>
        Go to Sentry → Settings → Account → API Tokens → Create New Token.
        The only scope you need is <Code>event:read</Code>.
      </P>
      <Pre>{`export SENTRY_AUTH_TOKEN=sntrys_...`}</Pre>

      <H2>3. Run</H2>
      <Pre>{`logomesh repro https://sentry.io/organizations/<org>/issues/<id>/`}</Pre>
      <P>
        LogoMesh fetches the event, picks the innermost app frame, synthesizes
        a pytest, and runs it in an isolated Docker sandbox. The whole round
        trip takes under 60 seconds on a warm Docker daemon.
      </P>

      <H2>4. Get a failing pytest</H2>
      <P>
        If the bug reproduces, you get a structured report and a ready-to-paste
        test. Exit code <Code>0</Code> means reproduced. Exit code{" "}
        <Code>1</Code> means not reproduced on this branch. Exit code{" "}
        <Code>2</Code> means an error occurred.
      </P>
      <Pre>{`## LogoMesh found 1 issue

### Negative quantity bypasses checkout validation
Property:  Order total should always be ≥ 0
I called:  checkout(item_id=1, qty=-5)
Got:       Order created with total -$49.95
Location:  checkout.py, line 42`}</Pre>

      <H2>Optional flags</H2>
      <Ul>
        <Li>
          <Code>--artifact</Code> — emit a sealed JSON envelope mapped to PCI
          DSS 12.10.5 and SOC2 CC7.3 / CC7.4 for post-incident evidence.
        </Li>
        <Li>
          <Code>--draft-pr</Code> — open a GitHub draft PR that includes the
          repro test alongside a description of the violated property.
        </Li>
        <Li>
          <Code>--no-llm</Code> — skip the LLM synthesis step and build the
          test deterministically from frame locals only. Fastest path; no API
          key needed.
        </Li>
        <Li>
          <Code>--json</Code> — write machine-readable output to stdout instead
          of the human-formatted report.
        </Li>
        <Li>
          <Code>--state-file &lt;path&gt;</Code> — inject a captured snapshot
          of DB / Redis / HTTP state so the replay is fully deterministic.
        </Li>
        <Li>
          <Code>--repo &lt;path&gt;</Code> — point to a local repo root if
          automatic path resolution fails to locate the crashing source file.
        </Li>
      </Ul>

      <Aside>
        LogoMesh uses Docker for the sandbox (airgapped, nobody user). If
        Docker is not available it falls back to a subprocess — less isolated
        but still works. For production use, run with Docker.{" "}
        <Link
          href="/docs/how-it-works"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          See how the sandbox works →
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
