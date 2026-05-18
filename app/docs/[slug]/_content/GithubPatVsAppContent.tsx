import Link from "next/link";

export function GithubPatVsAppContent() {
  return (
    <article className="docs-prose">
      <H2>Why a PAT, not a GitHub App, in v1</H2>
      <P>
        Pilot v1 ships using a customer-supplied{" "}
        <Code>personal access token</Code> because installing a GitHub App
        requires your security team to review marketplace permissions, an
        OAuth flow, and webhook delivery before anyone can write a draft PR.
        For a four-minute install, that review is the bottleneck. A PAT
        confines the trust to a single token your reviewers already understand
        — they can grant it, scope it, and revoke it from the GitHub UI without
        any new audit document.
      </P>

      <H2>Required scopes</H2>
      <P>
        Mint the token at{" "}
        <ExternalLink href="https://github.com/settings/tokens">
          github.com/settings/tokens
        </ExternalLink>
        . logomesh needs exactly two scopes:
      </P>
      <Ul>
        <Li>
          <Code>repo</Code> — read the diff, push the branch, open the draft
          pull request that carries the failing pytest and the sealed
          artifact.
        </Li>
        <Li>
          <Code>workflow</Code> — only required if your repository&rsquo;s CI
          runs the generated pytest as part of an Actions workflow. Skip it if
          your pipeline runs elsewhere.
        </Li>
      </Ul>
      <P>
        Use a fine-grained PAT scoped to the single repository you&rsquo;re
        piloting on. We never read code outside that repository, and we
        don&rsquo;t enumerate other repos via the token.
      </P>

      <H2>How to rotate or revoke</H2>
      <Ol>
        <Li>
          Open <ExternalLink href="https://github.com/settings/tokens">
            github.com/settings/tokens
          </ExternalLink>{" "}
          and either delete or regenerate the token.
        </Li>
        <Li>
          In your logomesh dashboard, open the GitHub row in the configuration
          panel and paste the new token. The old one stops working
          immediately.
        </Li>
        <Li>
          Audit pull requests labelled{" "}
          <Code>logomesh:auto</Code> if you want a record of what was opened
          while the previous token was live.
        </Li>
      </Ol>

      <H2>The v1.1 migration</H2>
      <P>
        v1.1 (target Q3 2026) replaces the PAT path with a proper GitHub App
        install. The App will request the same{" "}
        <Code>contents:write</Code> + <Code>pull_requests:write</Code>{" "}
        permissions a PAT carries today, but with per-installation key
        material, narrower webhook delivery, and a one-click uninstall.
        Existing PAT installations will continue to work; we&rsquo;ll prompt
        on the dashboard when the App is available so you can migrate when
        your reviewers have time.
      </P>

      <Aside>
        Have questions about scoping the PAT for a regulated environment?{" "}
        <Link
          href="/contact?topic=security"
          className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        >
          Reach the security team →
        </Link>
      </Aside>
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Lightweight inline prose primitives — keeps this page self-contained
// without pulling in @tailwindcss/typography or @next/mdx.
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

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mt-4 list-none space-y-2.5 pl-0">
      {children}
    </ol>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[15px] leading-[1.65] text-[var(--color-muted)]">
      <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
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

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-accent)] underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function Aside({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-10 rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/50 p-5 text-[14.5px] leading-[1.65] text-[var(--color-muted)]">
      {children}
    </aside>
  );
}
