"use client";

import { LogoMark } from "@/components/LogoMark";

const NAV = [
  { label: "Demo", href: "#demo" },
  { label: "Examples", href: "#examples" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Why", href: "#why" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8 md:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <a
            href="#"
            className="inline-flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <LogoMark size={26} />
            <span
              className="font-mono text-[17px] font-semibold sm:text-[18px]"
              style={{ letterSpacing: "-0.03em" }}
            >
              <span className="text-primary/90">logo</span>
              <span className="text-muted-foreground">mesh</span>
            </span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex list-none flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/apps/logomesh"
                  className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p
          id="beta-python-footnote"
          tabIndex={-1}
          className="mx-auto mt-8 max-w-2xl scroll-mt-24 border-t border-border pt-6 text-center font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs"
        >
          <span className="font-semibold text-foreground/80" aria-hidden>
            *
          </span>{" "}
          Beta runs on Python repos today; TypeScript, Go, and more are in
          development.
        </p>
      </div>
    </footer>
  );
}
