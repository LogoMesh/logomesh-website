"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { GithubIcon } from "@/components/icons/GithubIcon";

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8 md:px-10">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em]"
          aria-label="LogoMesh home"
        >
          <LogoMark size={22} />
          <span className="font-[family-name:var(--font-mono)] text-[14px] font-semibold tracking-[0.04em] text-foreground">
            logo
            <span className="text-primary">mesh</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right-side CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/apps/logomesh"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
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
            className="glow-primary hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 font-[family-name:var(--font-mono)] text-[12px] font-semibold uppercase tracking-[0.08em] text-primary-foreground sm:inline-flex"
          >
            <GithubIcon size={13} />
            Install
          </motion.a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-card/60 text-foreground md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/90 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://github.com/apps/logomesh"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-[family-name:var(--font-mono)] text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-foreground"
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
