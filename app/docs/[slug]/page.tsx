import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GithubPatVsAppContent } from "./_content/GithubPatVsAppContent";
import { ComplianceContent } from "./_content/ComplianceContent";

type DocEntry = {
  title: string;
  description: string;
  Body: () => React.JSX.Element;
};

const DOCS: Record<string, DocEntry> = {
  "github-pat-vs-app": {
    title: "GitHub PAT vs. App",
    description:
      "Why LogoMesh's pilot uses a personal access token, what scopes are required, and when the GitHub App migration lands.",
    Body: GithubPatVsAppContent,
  },
  compliance: {
    title: "Compliance contract",
    description:
      "The three rules that govern every LogoMesh artifact, mapped to PCI DSS 6.3.2 and SOC2 CC8.1.",
    Body: ComplianceContent,
  },
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = DOCS[slug];
  if (!entry) return { title: "LogoMesh · Docs" };
  return {
    title: `LogoMesh · ${entry.title}`,
    description: entry.description,
  };
}

export default async function DocsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = DOCS[slug];
  if (!entry) notFound();

  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative z-[1] mx-auto flex w-full max-w-[760px] min-w-0 flex-1 flex-col px-6 py-16 md:py-24">
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Pilot docs
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
            {entry.title}
          </h1>
          <p className="mt-4 text-[16.5px] leading-[1.7] text-[var(--color-muted)]">
            {entry.description}
          </p>
          <div className="mt-10">
            <entry.Body />
          </div>
          <div className="mt-14 border-t border-[var(--color-border)] pt-6">
            <Link
              href="/"
              className="font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              ← Back to logomesh.dev
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
