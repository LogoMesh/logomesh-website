import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LOGOMESH_GITHUB_REPO, LOGOMESH_PYPI } from "@/lib/product-links";

export const metadata: Metadata = {
  title: "Install · logomesh",
  description:
    "Install logomesh from PyPI — open-source CLI that reproduces Sentry crashes as failing pytest tests with audit-ready evidence.",
};

const INSTALL_STEPS = [
  {
    title: "Install",
    body: "Python 3.11+ and Docker running locally.",
    code: "pip install logomesh",
  },
  {
    title: "Configure",
    body: "Sentry token with event:read scope. OpenAI key optional (--no-llm skips it).",
    code: `export SENTRY_AUTH_TOKEN=sntryu_…
export OPENAI_API_KEY=sk-…`,
  },
  {
    title: "Reproduce",
    body: "Paste a Sentry issue URL against your current branch.",
    code: "logomesh repro https://sentry.io/organizations/your-org/issues/12345678/",
  },
] as const;

export default function InstallPage() {
  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative w-full">
          <section className="relative w-full">
            <div className="mx-auto max-w-[880px] px-5 py-16 sm:px-8 sm:py-24 md:py-28">
              <div className="mx-auto max-w-[720px] text-center">
                <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Open source
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.6vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
                  Install from PyPI.
                  <br />
                  <span className="text-[var(--color-accent)]">No hosted tier required.</span>
                </h1>
                <p className="mt-6 text-[17px] leading-[1.65] text-[var(--color-muted)] sm:text-[18px]">
                  logomesh is an MIT-licensed CLI. Paste a Sentry URL, get a failing pytest and a
                  sealed audit envelope mapped to SOC2 CC7.3 / CC7.4 and PCI DSS 12.10.5. The agent
                  investigates; deterministic code writes the proof.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href={LOGOMESH_GITHUB_REPO}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-[family-name:var(--font-mono)] text-[13.5px] font-bold text-black shadow-[0_12px_40px_-12px_rgba(196,255,0,0.4)] transition-opacity hover:opacity-90"
                  >
                    <GithubIcon size={16} />
                    View on GitHub
                  </Link>
                  <Link
                    href="/docs/quickstart"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[var(--color-border-hi)] bg-transparent px-6 py-3 font-[family-name:var(--font-mono)] text-[13.5px] font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/55"
                  >
                    Quick start docs
                    <ArrowRight size={15} className="-mr-1 opacity-70" />
                  </Link>
                </div>
              </div>

              <ol className="mt-14 list-none space-y-6">
                {INSTALL_STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/85 p-6 sm:p-7"
                  >
                    <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      Step {i + 1} · {step.title}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {step.body}
                    </p>
                    <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] p-4 font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[var(--color-ink)]">
                      <code>{step.code}</code>
                    </pre>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/50 p-6 text-center sm:p-8">
                <p className="flex items-center justify-center gap-2 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  <Terminal size={14} strokeWidth={2.25} aria-hidden />
                  Also on PyPI
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                  <Link
                    href={LOGOMESH_PYPI}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[var(--color-ink)] underline-offset-2 hover:underline"
                  >
                    pypi.org/project/logomesh
                  </Link>
                  {" · "}
                  <InlineCode>logomesh repro &lt;url&gt; --artifact</InlineCode> for the compliance JSON.
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-dim)]">
                  A hosted dashboard and webhook pilot exist for design partners — not required to
                  use the CLI.{" "}
                  <Link href="/contact" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                    Contact us
                  </Link>{" "}
                  if you need that path.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-ink)]">
      {children}
    </code>
  );
}
