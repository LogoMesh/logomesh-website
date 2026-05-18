import Link from "next/link";
import { LogoMark } from "./LogoMark";

const LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Get started", href: "/pricing" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

/** Solid only: next token after CTA (`--color-canvas-2`) for a clear but related footer band */
const FOOTER_SOLID = "var(--color-canvas-3)";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--color-border-hi)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      style={{ backgroundColor: FOOTER_SOLID }}
    >
      <div className="relative z-[2] mx-auto max-w-[1280px] px-4 sm:px-8 py-4 sm:py-7 md:py-8">
        <div className="grid grid-cols-1 items-center gap-2.5 text-center sm:gap-4 lg:grid-cols-3 lg:gap-6 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-1.5 min-h-[36px] sm:min-h-[44px]"
            >
              <LogoMark size={26} />
              <span
                className="font-mono text-[17px] sm:text-[18px] font-semibold"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span style={{ color: "rgba(196,255,0,0.45)" }}>logo</span>
                <span className="text-[var(--color-muted)]">mesh</span>
              </span>
            </Link>
          </div>

          <nav
            className="flex justify-center lg:justify-center"
            aria-label="Footer"
          >
            <ul className="flex list-none flex-wrap justify-center gap-x-4 gap-y-0.5 sm:gap-x-5 sm:gap-y-1">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-[36px] py-0.5 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-dim)] hover:text-[var(--color-muted)] transition-colors sm:min-h-[44px] sm:py-0"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mx-auto max-w-[22rem] text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px] lg:mx-0 lg:max-w-[min(100%,17.5rem)] lg:justify-self-end lg:text-right">
            From Sentry alert to verified reproduction.
          </p>
        </div>

        <div className="mt-3 flex flex-col items-center gap-2.5 border-t border-[var(--color-border)] pt-3 text-center sm:mt-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2 sm:pt-4">
          <span className="font-[family-name:var(--font-mono)] text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Resources
          </span>
          <Link
            href="/docs/github-pat-vs-app"
            className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            GitHub PAT vs. App
          </Link>
          <Link
            href="/docs/compliance"
            className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            Compliance contract
          </Link>
        </div>

        <p
          id="beta-python-footnote"
          tabIndex={-1}
          className="mx-auto mt-3 max-w-[40rem] scroll-mt-24 border-t border-[var(--color-border)] pt-3 text-center text-[14px] leading-relaxed text-[var(--color-dim)] sm:mt-5 sm:pt-4 sm:text-[15px]"
        >
          <span className="font-semibold text-[var(--color-muted)]" aria-hidden>
            *
          </span>{" "}
          Open source · MIT license · Python 3.11+. Enterprise deployments available on request.
        </p>
      </div>
    </footer>
  );
}
