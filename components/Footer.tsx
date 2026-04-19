import { LogoMark } from "./LogoMark";

type FooterNavLink = { label: string; href: string; external?: boolean };

const LINKS: FooterNavLink[] = [
  { label: "Demo", href: "#demo" },
  { label: "Why", href: "#why" },
  { label: "How It Works", href: "#how" },
  { label: "Install", href: "https://github.com/apps/logomesh", external: true },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-border/80 bg-card pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1280px] px-5 py-5 sm:px-8 sm:py-8 md:px-10">
        <div className="grid grid-cols-1 items-center gap-4 text-center lg:grid-cols-3 lg:gap-6 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <a
              href="#hero"
              className="inline-flex min-h-[44px] w-fit items-center gap-2"
            >
              <LogoMark size={24} />
              <span className="font-sans text-[16px] font-semibold tracking-[0.03em] text-foreground sm:text-[17px]">
                logo
                <span className="text-primary">mesh</span>
              </span>
            </a>
          </div>

          <nav className="flex justify-center" aria-label="Footer">
            <ul className="flex list-none flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-5">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer noopener" : undefined}
                    className="inline-flex min-h-[44px] items-center rounded-md px-1 py-0.5 font-sans text-[12.5px] uppercase tracking-[0.12em] text-dim transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mx-auto max-w-[20rem] font-sans text-[12px] font-normal leading-relaxed text-dim lg:mx-0 lg:max-w-[17.5rem] lg:justify-self-end lg:text-right">
            Pre-merge verification. Only comments when it has proof.
          </p>
        </div>

        <p
          id="beta-python-footnote"
          tabIndex={-1}
          className="mx-auto mt-4 max-w-[40rem] scroll-mt-24 border-t border-border/80 pt-4 text-center font-sans text-[11px] font-normal leading-snug text-dim sm:mt-5 sm:leading-relaxed sm:text-[12px]"
        >
          <span className="font-semibold text-muted-foreground" aria-hidden>
            *
          </span>{" "}
          During this beta, LogoMesh only runs on Python-based repositories for now. TypeScript,
          Go, and other languages are in development.
        </p>
      </div>
    </footer>
  );
}
