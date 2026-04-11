"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/GithubIcon";
import { LogoMark } from "./LogoMark";

const links = [
  { label: "Evidence", href: "#problem" },
  { label: "How it works", href: "#proof" },
  { label: "Pipeline", href: "#how" },
  { label: "Compare", href: "#compare" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (progressRef.current) {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        progressRef.current.style.width = `${pct}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress — fixed at very top of viewport, separate from the floating nav */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 z-[60] h-[1.5px] bg-[var(--color-accent)] pointer-events-none"
        style={{ width: "0%", transition: "none" }}
        aria-hidden
      />
    <nav
      className={cn(
        "fixed top-3 left-3 right-3 z-50 flex flex-wrap items-center justify-between px-4 sm:px-5 md:px-8 py-3.5",
        "border transition-all duration-300",
        scrolled || menuOpen
          ? "border-[var(--color-border)] bg-[var(--color-canvas)]/92 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          : "border-[var(--color-border-hi)]/50 bg-[var(--color-canvas)]/80 backdrop-blur-md",
      )}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 shrink-0">
        <LogoMark size={22} />
        <span
          className="font-mono text-[14.5px] font-semibold leading-none"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span
            className="text-accent"
            style={{ textShadow: "0 0 18px rgba(196,255,0,0.5), 0 0 6px rgba(196,255,0,0.25)" }}
          >
            logo
          </span>
          <span className="text-ink">mesh</span>
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => {
          const isActive = activeId === l.href.slice(1);
          return (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                className={cn(
                  "text-[14px] transition-colors duration-200 pb-1",
                  isActive
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                )}
              >
                {l.label}
              </a>
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300",
                  isActive ? "w-full opacity-100" : "w-0 opacity-0",
                )}
              />
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4">
        {/* CTA */}
        <a
          href="https://github.com/apps/logomesh"
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 min-h-[44px]",
            "bg-[var(--color-accent)] text-black",
            "font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-wider",
            "transition-all duration-150 hover:opacity-90 hover:-translate-y-px",
          )}
        >
          <GithubIcon size={13} />
          <span className="hidden sm:inline">Install on GitHub</span>
          <span className="sm:hidden">Install</span>
        </a>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center min-w-[44px] min-h-[44px] w-11 h-11 gap-[5px]"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              "block w-5 h-px bg-[var(--color-muted)] transition-all duration-200",
              menuOpen && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-[var(--color-muted)] transition-all duration-200",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-[var(--color-muted)] transition-all duration-200",
              menuOpen && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden w-full list-none flex flex-col gap-1 pt-4 pb-2 border-t border-[var(--color-border)] mt-4">
          {links.map((l) => {
            const isActive = activeId === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center min-h-[44px] py-2 text-[15px] transition-colors duration-150",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mr-2 align-middle" />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
    </>
  );
}
