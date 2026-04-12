"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons/GithubIcon";
import { LogoMark } from "./LogoMark";

const links = [
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
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [docked, setDocked] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [dockAnim, setDockAnim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [inHomeZone, setInHomeZone] = useState(true);
  const inHomeZoneRef = useRef(true);
  const dockedRef = useRef(false);

  useEffect(() => {
    inHomeZoneRef.current = inHomeZone;
  }, [inHomeZone]);

  useEffect(() => {
    dockedRef.current = docked;
  }, [docked]);

  // Measure nav height for placeholder when docked (menu open changes height)
  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menuOpen, docked]);

  // Dock when sentinel scrolls above viewport; home zone vs sections for highlights
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const onScroll = () => {
      const top = sentinel.getBoundingClientRect().top;
      if (!dockedRef.current && top < 0) {
        setDocked(true);
        setDockAnim(true);
        window.setTimeout(() => setDockAnim(false), 600);
      }
      if (dockedRef.current && window.scrollY < 8) {
        setDocked(false);
      }

      const ev = document.getElementById("evidence");
      const home =
        ev != null ? window.scrollY < ev.offsetTop - 56 : window.scrollY < 120;
      // Keep in sync immediately so IntersectionObserver / hash nav don’t race React’s useEffect
      inHomeZoneRef.current = home;
      setInHomeZone(home);
      if (home) setActiveId("");
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
        if (inHomeZoneRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goToSection(href: string) {
    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;
    scrollToHash(href);
    inHomeZoneRef.current = false;
    setInHomeZone(false);
    setActiveId(id);
  }

  function goHome() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
    inHomeZoneRef.current = true;
    setInHomeZone(true);
    setActiveId("");
  }

  function onMobileNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => goToSection(href), 120);
  }

  function onMobileHomeClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => goHome(), 120);
  }

  function onDesktopHomeClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    goHome();
  }

  function onDesktopSectionClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    goToSection(href);
  }

  const shell = (docked: boolean) =>
    cn(
      "flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 sm:px-5 md:px-7 py-3 rounded-2xl border transition-colors duration-300",
      docked || menuOpen
        ? "border-[var(--color-border)] bg-[var(--color-canvas)]/94 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
        : "border-[var(--color-border-hi)]/55 bg-[var(--color-canvas)]/88 backdrop-blur-xl",
    );

  const navChrome = (
    <>
      <a
        href="#"
        className="flex items-center gap-2.5 shrink-0 py-0.5"
        onClick={(e) => {
          e.preventDefault();
          goHome();
        }}
      >
        <span className="flex h-[22px] w-[22px] items-center justify-center shrink-0">
          <LogoMark size={22} />
        </span>
        <span
          className="font-mono text-[14.5px] font-semibold leading-none flex items-center h-[22px]"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span
            className="text-accent"
            style={{
              textShadow:
                "0 0 18px rgba(196,255,0,0.45), 0 0 6px rgba(196,255,0,0.2)",
            }}
          >
            logo
          </span>
          <span className="text-ink">mesh</span>
        </span>
      </a>

      <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
        <li>
          <a
            href="#"
            onClick={onDesktopHomeClick}
            className={cn(
              "inline-block text-[14px] py-1 border-b-2 transition-colors duration-200",
              inHomeZone
                ? "text-[var(--color-ink)] border-[var(--color-accent)]"
                : "text-[var(--color-muted)] border-transparent hover:text-[var(--color-ink)] hover:border-[var(--color-border-hi)]",
            )}
          >
            Home
          </a>
        </li>
        {links.map((l) => {
          const isActive = !inHomeZone && activeId === l.href.slice(1);
          return (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => onDesktopSectionClick(e, l.href)}
                className={cn(
                  "inline-block text-[14px] py-1 border-b-2 transition-colors duration-200",
                  isActive
                    ? "text-[var(--color-ink)] border-[var(--color-accent)]"
                    : "text-[var(--color-muted)] border-transparent hover:text-[var(--color-ink)] hover:border-[var(--color-border-hi)]",
                )}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 shrink-0">
        <a
          href="https://github.com/apps/logomesh"
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px]",
            "bg-[var(--color-accent)] text-black rounded-lg",
            "font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] font-bold uppercase tracking-wide",
            "transition-opacity duration-150 hover:opacity-90 active:opacity-95",
          )}
        >
          <GithubIcon size={12} />
          <span className="hidden sm:inline">Install on GitHub</span>
          <span className="sm:hidden">Install</span>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center min-w-[44px] min-h-[44px] w-11 h-11 gap-[5px] rounded-lg border border-transparent hover:border-[var(--color-border)] transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              "block w-5 h-px bg-[var(--color-muted)] transition-transform duration-200",
              menuOpen && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-[var(--color-muted)] transition-opacity duration-200",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-[var(--color-muted)] transition-transform duration-200",
              menuOpen && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden w-full list-none flex flex-col gap-0.5 m-0 p-0 pt-3 mt-2 border-t border-[var(--color-border)]">
          <li>
            <a
              href="#"
              onClick={onMobileHomeClick}
              className={cn(
                "flex items-center min-h-[44px] py-2 text-[15px] transition-colors",
                inHomeZone
                  ? "text-[var(--color-ink)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
              )}
            >
              {inHomeZone && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mr-2 shrink-0" />
              )}
              Home
            </a>
          </li>
          {links.map((l) => {
            const isActive = !inHomeZone && activeId === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => onMobileNavClick(e, l.href)}
                  className={cn(
                    "flex items-center min-h-[44px] py-2 text-[15px] transition-colors",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mr-2 shrink-0" />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto px-3 sm:px-6 md:px-8 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <div className="relative">
          {docked && (
            <div
              aria-hidden
              className="w-full"
              style={{ height: Math.max(navHeight, 52) }}
            />
          )}
          <nav
            ref={navRef}
            className={cn(
              shell(docked),
              docked
                ? "fixed left-3 right-3 top-[max(0.5rem,env(safe-area-inset-top))] z-[10000] mx-auto max-w-[1280px] w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)]"
                : "relative w-full",
              docked && dockAnim && "nav-dock-animated",
            )}
          >
            {navChrome}
          </nav>
        </div>
      </div>
      {/* When this point scrolls above the viewport, the in-flow nav has left the screen — dock */}
      <div
        ref={sentinelRef}
        className="h-px w-full max-w-[1280px] mx-auto pointer-events-none"
        aria-hidden
      />
    </>
  );
}
