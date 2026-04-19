"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { EASE } from "@/lib/motion";

const LINKS = [
  { label: "Demo", href: "#demo" },
  { label: "Why", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "Fix", href: "#fix" },
  { label: "Proof", href: "#proof" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/72 shadow-[0_1px_0_hsl(0_0%_100%_/_0.04)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8 md:px-10">
        <a
          href="#hero"
          className="group flex min-h-[44px] items-center gap-2 rounded-md text-[15px] font-semibold tracking-[-0.01em]"
          aria-label="LogoMesh home"
        >
          <LogoMark
            size={22}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          <span className="font-sans text-[14px] font-semibold tracking-[0.04em] text-foreground">
            logo
            <span className="text-primary transition-colors group-hover:text-primary-glow">
              mesh
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[40px] items-center rounded-md px-3 py-2 text-[13.5px] text-muted-foreground transition-[background,color] hover:bg-card/70 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/apps/logomesh"
            className="hidden min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] text-muted-foreground transition-[background,color] hover:bg-card/70 hover:text-foreground md:inline-flex"
            aria-label="LogoMesh on GitHub"
          >
            <GithubIcon size={14} />
            GitHub
          </a>

          <motion.a
            href="https://github.com/apps/logomesh"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="glow-primary hidden min-h-[42px] items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-primary-foreground sm:inline-flex"
          >
            <GithubIcon size={13} />
            Install
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-card/70 text-foreground transition-[border-color,background-color] md:hidden ${
              open ? "border-primary/60 bg-card" : "border-border-strong"
            }`}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="overflow-hidden border-t border-border/80 bg-background/94 backdrop-blur-xl md:hidden"
          >
            <nav id="mobile-navigation" className="flex flex-col gap-1 px-5 py-4">
              <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.18em] text-dim">
                Pre-merge verification
              </p>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-[15px] text-muted-foreground transition-[background,color] hover:bg-card hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/apps/logomesh"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-foreground"
              >
                <GithubIcon size={14} /> Install on GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
