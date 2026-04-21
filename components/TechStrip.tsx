"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TECH_LOGOS } from "./icons/TechLogos";
import { EASE } from "@/lib/motion";

function LogoCell({
  name,
  Logo,
}: {
  name: string;
  Logo: (typeof TECH_LOGOS)[number]["Logo"];
}) {
  return (
    <div className="shrink-0 flex items-center gap-3.5 px-7 border-r border-[var(--color-border)] py-5">
      <span className="opacity-80">
        <Logo size={28} />
      </span>
      <span className="landing-kicker-glow-muted font-[family-name:var(--font-mono)] text-[15px] font-semibold text-[var(--color-ink)] whitespace-nowrap lg:text-[16px]">
        {name}
      </span>
    </div>
  );
}

/** Stacked row for vertical marquee (mobile) — borders via parent divide-y for a clean loop seam */
function LogoCellVertical({
  name,
  Logo,
}: {
  name: string;
  Logo: (typeof TECH_LOGOS)[number]["Logo"];
}) {
  return (
    <div className="flex w-full shrink-0 items-center justify-center gap-3 px-4 py-3.5">
      <span className="opacity-100">
        <Logo size={24} />
      </span>
      <span className="landing-kicker-glow-muted font-[family-name:var(--font-mono)] text-[15px] font-semibold text-[var(--color-ink)] lg:text-[16px]">
        {name}
      </span>
    </div>
  );
}

function LogoHalf({ id }: { id: "a" | "b" }) {
  return (
    <div
      className="flex shrink-0 items-center gap-0"
      aria-hidden={id === "b" ? true : undefined}
    >
      {TECH_LOGOS.map(({ name, Logo }, i) => (
        <LogoCell key={`${id}-${name}-${i}`} name={name} Logo={Logo} />
      ))}
    </div>
  );
}

function LogoHalfVertical({ id }: { id: "a" | "b" }) {
  return (
    <div
      className="flex w-full shrink-0 flex-col divide-y divide-[var(--color-border)]"
      aria-hidden={id === "b" ? true : undefined}
    >
      {TECH_LOGOS.map(({ name, Logo }, i) => (
        <LogoCellVertical key={`${id}-${name}-${i}`} name={name} Logo={Logo} />
      ))}
    </div>
  );
}

const MARQUEE_MASK: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
  maskImage:
    "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

const MARQUEE_MASK_Y: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 1.25rem, black calc(100% - 1.25rem), transparent)",
  maskImage:
    "linear-gradient(to bottom, transparent, black 1.25rem, black calc(100% - 1.25rem), transparent)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

export function TechStrip() {
  const reducedMotion = useReducedMotion() === true;
  const stripMotion = reducedMotion
    ? undefined
    : ({
        initial: { opacity: 0, y: 44 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px 0px", amount: 0.2 },
        transition: { duration: 0.62, ease: EASE },
      } as const);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const [marqueeShiftPx, setMarqueeShiftPx] = useState(0);
  const [marqueeShiftYPx, setMarqueeShiftYPx] = useState(0);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hEl = horizontalTrackRef.current?.children[0] as
          | HTMLElement
          | undefined;
        if (hEl) {
          const w = hEl.getBoundingClientRect().width;
          if (w > 0) setMarqueeShiftPx(Math.round(w));
        }
        const vEl = verticalTrackRef.current?.children[0] as
          | HTMLElement
          | undefined;
        if (vEl) {
          // Subpixel-accurate loop distance — rounding caused a visible jump at the bottom each cycle
          const h = vEl.getBoundingClientRect().height;
          if (h > 0) setMarqueeShiftYPx(h);
        }
      });
    };

    measure();
    const ros: ResizeObserver[] = [];
    const hChild = horizontalTrackRef.current?.children[0];
    const vChild = verticalTrackRef.current?.children[0];
    if (hChild) {
      const ro = new ResizeObserver(measure);
      ro.observe(hChild);
      ros.push(ro);
    }
    if (vChild) {
      const ro = new ResizeObserver(measure);
      ro.observe(vChild);
      ros.push(ro);
    }
    void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ros.forEach((r) => r.disconnect());
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion]);

  const horizontalStyle = {
    "--marquee-shift": `${marqueeShiftPx}px`,
  } as CSSProperties;

  const verticalStyle = {
    "--marquee-shift-y": `${marqueeShiftYPx}px`,
  } as CSSProperties;

  return (
    <motion.section
      id="trust"
      aria-label="Frameworks supported"
      className="w-full min-w-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-y border-[var(--color-border)] overflow-hidden shadow-[0_-24px_48px_-28px_rgba(0,0,0,0.55)]"
      style={{ background: "var(--color-canvas-2)" }}
      {...stripMotion}
    >
      {/* Mobile: heading on top, vertical marquee below (same loop as desktop) */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-center gap-3 border-b border-[var(--color-border)] px-5 py-4 sm:px-8 sm:py-5">
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="landing-kicker-glow-muted font-[family-name:var(--font-mono)] text-[clamp(1.0625rem,3.4vw,1.375rem)] font-bold uppercase tracking-[0.1em] text-[hsl(82_68%_92%)]">
            Frameworks supported
          </span>
        </div>

        <div
          className="relative h-[min(48vh,20rem)] w-full overflow-hidden [contain:paint]"
          style={MARQUEE_MASK_Y}
        >
          {reducedMotion ? (
            <div
              className="h-full overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <LogoHalfVertical id="a" />
            </div>
          ) : (
            <div
              ref={verticalTrackRef}
              className={
                marqueeShiftYPx > 0
                  ? "tech-marquee-track-y--ready flex w-full flex-col pointer-events-none"
                  : "flex w-full flex-col pointer-events-none"
              }
              style={verticalStyle}
            >
              <LogoHalfVertical id="a" />
              <LogoHalfVertical id="b" />
            </div>
          )}
        </div>
      </div>

      {/* md+: horizontal marquee */}
      <div className="hidden md:flex md:items-center md:gap-0">
        <div className="shrink-0 px-4 sm:px-8 py-5 sm:py-6 border-r border-[var(--color-border)] flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="landing-kicker-glow-muted font-[family-name:var(--font-mono)] text-[15px] font-bold uppercase tracking-[0.11em] text-[hsl(82_68%_92%)] whitespace-nowrap lg:text-[16px]">
            Frameworks supported
          </span>
        </div>

        <div
          className="relative min-w-0 flex-1 overflow-hidden [contain:paint]"
          style={MARQUEE_MASK}
        >
          {reducedMotion ? (
            <div
              className="flex items-center gap-0 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <LogoHalf id="a" />
            </div>
          ) : (
            <div
              ref={horizontalTrackRef}
              className={
                marqueeShiftPx > 0
                  ? "tech-marquee-track tech-marquee-track--ready flex w-max items-stretch pointer-events-none"
                  : "tech-marquee-track flex w-max items-stretch pointer-events-none"
              }
              style={horizontalStyle}
            >
              <LogoHalf id="a" />
              <LogoHalf id="b" />
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
