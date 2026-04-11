"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/GithubIcon";
import { LogoMark } from "./LogoMark";

const links = [
  /* Evidence = Real production incidents only (#evidence) */
  { label: "Evidence", href: "#evidence" },
  { label: "How it works", href: "#proof" },
  { label: "Features", href: "#features" },
  { label: "Pipeline", href: "#how" },
];

const sectionIds = links.map((l) => l.href.slice(1));

function scrollToHash(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : "";
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

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
      // Above Real production incidents: no in-page section should read as "active"
      const ev = document.getElementById("evidence");
      if (ev && window.scrollY < ev.offsetTop - 48) {
        setActiveId("");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
      { rootMargin: "-22% 0px -58% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function onMobileNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => scrollToHash(href), 120);
  }

  function onMobileHomeClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname);
    }, 120);
  }

  return (
    <>
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[10000] w-full border-b transition-all duration-300",
        scrolled || menuOpen
          ? "border-[var(--color-border)] bg-[var(--color-canvas)]/95 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          : "border-[var(--color-border-hi)]/50 bg-[var(--color-canvas)]/92 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 sm:px-8 md:px-10 pt-[env(safe-area-inset-top)] pb-3.5">
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
            "flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] sm:min-h-[40px]",
            "bg-[var(--color-accent)] text-black",
            "font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] font-bold uppercase tracking-wide",
            "transition-all duration-150 hover:opacity-90 hover:-translate-y-px",
          )}
        >
          <GithubIcon size={12} />
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
        <ul className="md:hidden w-full list-none flex flex-col gap-1 pt-4 pb-2 border-t border-[var(--color-border)] mt-3 basis-full">
          <li>
            <a
              href="#"
              onClick={onMobileHomeClick}
              className="flex items-center min-h-[44px] py-2 text-[15px] text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-ink)]"
            >
              Home
            </a>
          </li>
          {links.map((l) => {
            const isActive = activeId === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => onMobileNavClick(e, l.href)}
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
      </div>

      {/* Scroll progress along bottom of nav — avoids stacking over Install / controls */}
      <div
        className="pointer-events-none h-[2px] w-full bg-[var(--color-border)]"
        aria-hidden
      >
        <div
          ref={progressRef}
          className="h-full bg-[var(--color-accent)]"
          style={{ width: "0%", transition: "none" }}
        />
      </div>
    </nav>
    </>
  );
}
