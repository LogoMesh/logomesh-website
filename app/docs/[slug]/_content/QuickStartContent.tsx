import Link from "next/link";

export function QuickStartContent() {
  return (
    <article className="docs-prose">
      <P>
        Three steps. Four minutes. No SDK.
      </P>

      <H2>1. Start the wizard</H2>
      <P>
        Go to{" "}
        <Link href="/onboarding" className="text-[var(--color-accent)] underline-offset-2 hover:underline">
          /onboarding
        </Link>{" "}
        and connect Sentry + GitHub. Takes literally two minutes. Your secrets are encrypted
        before they ever touch our database.
      </P>

      <H2>2. Paste the webhook</H2>
      <P>
        Drop the LogoMesh webhook URL into your Sentry project, fire a test event,
        and watch the agent work live in your dashboard. Done.
      </P>

      <H2>3. You&rsquo;re live</H2>
      <P>
        Every new crash in Sentry now triggers the agent automatically. You get a draft PR
        with the failing test and a sealed audit file. Your team does the rest — we never
        touch your code.
      </P>
      <Pre>{`## LogoMesh reproduced your crash

### Negative quantity bypasses checkout validation
Crash:     ValueError matched on both sides
Called:    checkout(item_id=1, qty=-5)
Got:       Order created with total -$49.95
Location:  checkout.py, line 42
Verdict:   reproduced · audit file sealed`}</Pre>

      <H2>What the dashboard shows you</H2>
      <Ul>
        <Li>
          Every run the agent has done — verdict, duration, cost.
        </Li>
        <Li>
          The sealed audit file with the SOC2 / PCI control mapping, ready to forward
          to your reviewer.
        </Li>
        <Li>
          The agent&rsquo;s decisions — which tools it called, what it tried, why it
          stopped — for the curious or for incident review.
        </Li>
      </Ul>

      <Aside>
        <strong className="text-[var(--color-ink)]">Power users: </strong>
        you can still run <Code>logomesh repro &lt;sentry-url&gt;</Code> locally if you want
        to poke at the agent on a single crash. The dashboard is what most teams use.{" "}
        <Link
          href="/docs/how-it-works"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          See how the agent works →
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
