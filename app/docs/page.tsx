import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex w-full flex-1 flex-col">
        <Nav />
        <div className="mx-auto w-full max-w-[720px] flex-1 px-4 py-12 sm:px-8 md:py-16">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-[-0.03em] text-[var(--color-ink)]">
            Docs
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-muted)]">
            Detailed documentation will live here. For now, start with the full walkthrough or install
            the GitHub app.
          </p>
          <ul className="mt-8 space-y-3 font-[family-name:var(--font-mono)] text-[14px] text-[var(--color-muted)]">
            <li>
              <Link
                href="/how-it-works"
                className="text-[var(--color-accent)] underline decoration-[var(--color-border-hi)] underline-offset-4 hover:decoration-[var(--color-accent)]"
              >
                How it works
              </Link>{" "}
              — product tour, examples, pipeline
            </li>
            <li>
              <a
                href="https://github.com/apps/logomesh"
                className="text-[var(--color-accent)] underline decoration-[var(--color-border-hi)] underline-offset-4 hover:decoration-[var(--color-accent)]"
              >
                Install on GitHub
              </a>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
