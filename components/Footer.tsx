import { LogoMark } from "./LogoMark";

const LINKS = ["Docs", "GitHub", "Privacy", "Terms"];

/** Solid only — next token after CTA (`--color-canvas-2`) for a clear but related footer band */
const FOOTER_SOLID = "var(--color-canvas-3)";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--color-border-hi)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      style={{ backgroundColor: FOOTER_SOLID }}
    >

      {/* Content — stacked + centered on small screens; 3-col grid on lg so nav is truly centered */}
      <div className="relative z-[2] mx-auto max-w-[1280px] px-4 sm:px-8 py-4 sm:py-7 md:py-8">
        <div className="grid grid-cols-1 items-center gap-2.5 text-center sm:gap-4 lg:grid-cols-3 lg:gap-6 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <a
              href="#"
              className="inline-flex w-fit items-center gap-1.5 min-h-[36px] sm:min-h-[44px]"
            >
              <LogoMark size={26} />
              <span
                className="font-mono text-[17px] sm:text-[18px] font-semibold"
                style={{ letterSpacing: "-0.03em" }}
              >
                <span style={{ color: "rgba(196,255,0,0.45)" }}>logo</span>
                <span className="text-muted">mesh</span>
              </span>
            </a>
          </div>

          <nav
            className="flex justify-center lg:justify-center"
            aria-label="Footer"
          >
            <ul className="flex list-none flex-wrap justify-center gap-x-4 gap-y-0.5 sm:gap-x-5 sm:gap-y-1">
              {LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="inline-flex items-center min-h-[36px] py-0.5 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-dim)] hover:text-[var(--color-muted)] transition-colors sm:min-h-[44px] sm:py-0"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mx-auto max-w-[20rem] font-[family-name:var(--font-mono)] text-[12px] leading-relaxed text-[var(--color-dim)] lg:mx-0 lg:max-w-[min(100%,17.5rem)] lg:justify-self-end lg:text-right">
            Pre-merge verification. Only comments when it has proof.
          </p>
        </div>

        <p
          id="beta-python-footnote"
          tabIndex={-1}
          className="mx-auto mt-3 max-w-[40rem] scroll-mt-24 border-t border-[var(--color-border)] pt-3 text-center font-[family-name:var(--font-mono)] text-[11px] leading-snug text-[var(--color-dim)] sm:mt-5 sm:pt-4 sm:leading-relaxed sm:text-[12px]"
        >
          <span className="font-semibold text-[var(--color-muted)]" aria-hidden>
            *
          </span>{" "}
          During this beta, LogoMesh only runs on Python-based repositories for now. TypeScript,
          Go, and other languages are in development.
        </p>
      </div>
    </footer>
  );
}
