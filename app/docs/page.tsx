import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const DOCS_INDEX = [
  {
    slug: "quickstart",
    title: "Quick start",
    description:
      "pip install logomesh, set your Sentry token, and reproduce your first crash from the CLI.",
  },
  {
    slug: "how-it-works",
    title: "How it works",
    description:
      "The 8-stage pipeline: from Sentry URL to a deterministic failing pytest in an isolated sandbox.",
  },
  {
    slug: "artifact",
    title: "Sealed artifact",
    description:
      "What the compliance JSON envelope contains, what llm_in_evidence_path: false means, and how an auditor verifies it.",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Common failure modes and how to fix them.",
  },
  {
    slug: "faq",
    title: "FAQ",
    description: "Top questions from pilots.",
  },
  {
    slug: "github-pat-vs-app",
    title: "GitHub PAT vs. App",
    description:
      "Why the pilot uses a personal access token, what scopes are required, and when the GitHub App migration lands.",
  },
  {
    slug: "compliance",
    title: "Compliance contract",
    description:
      "The three rules that govern every logomesh artifact, mapped to SOC2 CC7.3, CC7.4, and PCI DSS 12.10.5.",
  },
] as const;

export const metadata = {
  title: "logomesh · Docs",
  description:
    "Documentation for logomesh — Sentry URL to deterministic failing pytest in under 60 seconds.",
};

export default function DocsIndexPage() {
  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative z-[1] mx-auto flex w-full max-w-[900px] min-w-0 flex-1 flex-col px-6 py-16 md:py-24">
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Docs
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
            Documentation
          </h1>
          <p className="mt-4 text-[16.5px] leading-[1.7] text-[var(--color-muted)]">
            Sentry URL &rarr; deterministic failing pytest in an isolated
            sandbox in under 60 seconds.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {DOCS_INDEX.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]/40 p-5 transition-colors hover:border-[var(--color-border-hi)] hover:bg-[var(--color-canvas-2)]"
              >
                <span className="font-[family-name:var(--font-display)] text-[17px] font-bold leading-snug tracking-[-0.015em] text-[var(--color-ink)]">
                  {doc.title}
                </span>
                <span className="text-[14px] leading-[1.65] text-[var(--color-muted)]">
                  {doc.description}
                </span>
                <span className="mt-1 font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}