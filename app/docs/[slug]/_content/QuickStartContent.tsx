import Link from "next/link";
import { LOGOMESH_GITHUB_REPO } from "@/lib/product-links";

export function QuickStartContent() {
  return (
    <article className="docs-prose">
      <P>Three steps. A Sentry URL. No SDK in your app.</P>

      <H2>1. Install</H2>
      <Pre>{`pip install logomesh`}</Pre>
      <P>
        Requires Python 3.11+, Docker running locally, and a Sentry auth token with{" "}
        <Code>event:read</Code> scope. An OpenAI key is optional — pass{" "}
        <Code>--no-llm</Code> to skip the agent entirely.
      </P>

      <H2>2. Configure</H2>
      <Pre>{`export SENTRY_AUTH_TOKEN=sntryu_…
export OPENAI_API_KEY=sk-…   # optional`}</Pre>
      <P>A <Code>.env</Code> in your repo root works too.</P>

      <H2>3. Reproduce</H2>
      <Pre>{`logomesh repro https://sentry.io/organizations/your-org/issues/12345678/`}</Pre>
      <P>
        Add <Code>--artifact</Code> for the compliance JSON, <Code>--draft-pr</Code> for a GitHub
        draft PR, or <Code>--no-llm</Code> for deterministic-only mode.
      </P>
      <Pre>{`## logomesh reproduced your crash

### Negative quantity bypasses checkout validation
Crash:     ValueError matched on both sides
Called:    checkout(item_id=1, qty=-5)
Got:       Order created with total -$49.95
Location:  checkout.py, line 42
Verdict:   reproduced · audit file sealed`}</Pre>

      <H2>What you get</H2>
      <Ul>
        <Li>A failing pytest against your current branch — synthesized from frame locals, not LLM output.</Li>
        <Li>
          Optional sealed audit file with <Code>llm_in_evidence_path: false</Code> and mappings to
          SOC2 CC7.3 / CC7.4 and PCI DSS 12.10.5.
        </Li>
        <Li>
          A clear verdict when reproduction is not possible — never a fake green.
        </Li>
      </Ul>

      <Aside>
        <strong className="text-[var(--color-ink)]">Source &amp; issues: </strong>
        <Link
          href={LOGOMESH_GITHUB_REPO}
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          github.com/LogoMesh/LogoMesh-Dev
        </Link>
        . Full pipeline:{" "}
        <Link
          href="/docs/how-it-works"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          How it works →
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
