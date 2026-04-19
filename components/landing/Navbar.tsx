"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LogoMark } from "@/components/LogoMark";

const links = [
  { label: "Demo", href: "#demo" },
  { label: "Examples", href: "#examples" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pipeline", href: "#how" },
];

const sectionIds = ["demo", "examples", "how", "features"];

function getDocumentOffsetTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function getActiveSectionIdFromScroll(): string {
  const bias = 96;
  const y = window.scrollY + bias;
  let active = "";
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (y >= getDocumentOffsetTop(el)) active = id;
  }
  return active;
}

function scrollToHash(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : "";
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function Navbar() {
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
  const programmaticSectionNavRef = useRef(false);
  const programmaticNavClearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    inHomeZoneRef.current = inHomeZone;
  }, [inHomeZone]);

  useEffect(() => {
    dockedRef.current = docked;
  }, [docked]);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menuOpen, docked]);

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

      const demoEl = document.getElementById("demo");
      const demoTop = demoEl != null ? getDocumentOffsetTop(demoEl) : 0;
      const homeRaw =
        demoEl != null ? window.scrollY < demoTop - 56 : window.scrollY < 120;
      const home = programmaticSectionNavRef.current ? false : homeRaw;
      inHomeZoneRef.current = home;
      setInHomeZone(home);
      if (programmaticSectionNavRef.current) return;
      if (home) {
        setActiveId("");
      } else {
        setActiveId(getActiveSectionIdFromScroll());
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (programmaticNavClearTimerRef.current) {
        clearTimeout(programmaticNavClearTimerRef.current);
      }
    };
  }, []);

  function goToSection(href: string) {
    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;
    if (programmaticNavClearTimerRef.current) {
      clearTimeout(programmaticNavClearTimerRef.current);
    }
    programmaticSectionNavRef.current = true;
    scrollToHash(href);
    inHomeZoneRef.current = false;
    setInHomeZone(false);
    setActiveId(id === "how" ? "how" : id);
    programmaticNavClearTimerRef.current = window.setTimeout(() => {
      programmaticSectionNavRef.current = false;
      programmaticNavClearTimerRef.current = null;
    }, 1000);
  }

  function goHome() {
    if (programmaticNavClearTimerRef.current) {
      clearTimeout(programmaticNavClearTimerRef.current);
      programmaticNavClearTimerRef.current = null;
    }
    programmaticSectionNavRef.current = false;
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

  function onDesktopSectionClick(
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    goToSection(href);
  }

  const shell = (isDocked: boolean) =>
    cn(
      "flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border px-4 py-3 transition-colors duration-300 sm:px-5 md:px-7",
      isDocked || menuOpen
        ? "border-border border-b bg-background/94 shadow-[0_8px_40px_hsl(0_0%_0%/0.45)] backdrop-blur-2xl"
        : "border-border/80 bg-background/88 backdrop-blur-xl",
      isDocked && "border-b-primary/25",
    );

  const navChrome = (
    <>
      <a
        href="#"
        className="flex shrink-0 items-center gap-2.5 py-0.5"
        onClick={(e) => {
          e.preventDefault();
          goHome();
        }}
      >
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center">
          <LogoMark size={30} />
        </span>
        <span
          className="flex h-[30px] items-center font-mono text-[17px] font-semibold leading-none sm:text-[18px]"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span
            className="text-primary"
            style={{
              textShadow:
                "0 0 18px hsl(var(--primary) / 0.45), 0 0 6px hsl(var(--primary) / 0.2)",
            }}
          >
            logo
          </span>
          <span className="text-foreground">mesh</span>
        </span>
      </a>

      <ul className="m-0 hidden list-none items-center gap-7 p-0 md:flex">
        <li>
          <a
            href="#"
            onClick={onDesktopHomeClick}
            className={cn(
              "inline-block border-b-2 py-1 text-sm transition-colors duration-200",
              inHomeZone
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            Home
          </a>
        </li>
        {links.map((l) => {
          const sectionKey = l.href.slice(1);
          const isActive =
            !inHomeZone &&
            (activeId === sectionKey ||
              (sectionKey === "how" && activeId === "how"));
          return (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => onDesktopSectionClick(e, l.href)}
                className={cn(
                  "inline-block border-b-2 py-1 text-sm transition-colors duration-200",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex shrink-0 items-center gap-3">
        <a
          href="https://github.com/apps/logomesh"
          className={cn(
            "inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-primary px-3 py-2",
            "font-mono text-[11px] font-bold uppercase tracking-wide text-primary-foreground sm:text-xs",
            "transition-all duration-150 hover:scale-[1.03] hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)] active:opacity-95",
          )}
        >
          <GithubIcon size={12} />
          <span className="hidden sm:inline">Install on GitHub</span>
          <span className="sm:hidden">Install</span>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[5px] rounded-lg border border-transparent hover:border-border md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              "block h-px w-5 bg-muted-foreground transition-transform duration-200",
              menuOpen && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-muted-foreground transition-opacity duration-200",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-muted-foreground transition-transform duration-200",
              menuOpen && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>
      </div>

      {menuOpen && (
        <ul className="m-0 mt-2 flex w-full list-none flex-col gap-0.5 border-t border-border p-0 pt-3 md:hidden">
          <li>
            <a
              href="#"
              onClick={onMobileHomeClick}
              className={cn(
                "flex min-h-[44px] items-center py-2 text-[15px] transition-colors",
                inHomeZone
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {inHomeZone && (
                <span className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              )}
              Home
            </a>
          </li>
          {links.map((l) => {
            const sectionKey = l.href.slice(1);
            const isActive =
              !inHomeZone &&
              (activeId === sectionKey ||
                (sectionKey === "how" && activeId === "how"));
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => onMobileNavClick(e, l.href)}
                  className={cn(
                    "flex min-h-[44px] items-center py-2 text-[15px] transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <span className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
      <div className="w-full max-w-[1280px] px-3 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-6 md:px-8">
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
                ? "fixed left-3 right-3 top-[max(0.5rem,env(safe-area-inset-top))] z-[10000] mx-auto w-[calc(100%-1.5rem)] max-w-[1280px] sm:w-[calc(100%-3rem)]"
                : "relative w-full",
              docked && dockAnim && "nav-dock-animated",
            )}
          >
            {navChrome}
          </nav>
        </div>
      </div>
      <div
        ref={sentinelRef}
        className="pointer-events-none mx-auto h-px w-full max-w-[1280px]"
        aria-hidden
      />
    </>
  );
}
