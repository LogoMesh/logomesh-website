"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { TECH_LOGOS } from "./icons/TechLogos";

function LogoCell({
  name,
  Logo,
}: {
  name: string;
  Logo: (typeof TECH_LOGOS)[number]["Logo"];
}) {
  return (
    <div className="shrink-0 flex items-center gap-3.5 px-7 border-r border-[var(--color-border)] py-5">
      <span className="opacity-40">
        <Logo size={28} />
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[var(--color-dim)] whitespace-nowrap">
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

const MARQUEE_MASK: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
  maskImage:
    "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

export function TechStrip() {
  const reducedMotion = useReducedMotion() === true;
  const trackRef = useRef<HTMLDivElement>(null);
  const [marqueeShiftPx, setMarqueeShiftPx] = useState(0);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    const firstHalf = track?.children[0] as HTMLElement | undefined;
    if (!firstHalf) return;

    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = firstHalf.getBoundingClientRect().width;
        setMarqueeShiftPx(Math.round(w));
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(firstHalf);
    void document.fonts.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reducedMotion]);

  const trackStyle = {
    "--marquee-shift": `${marqueeShiftPx}px`,
  } as CSSProperties;

  return (
    <div
      className="border-y border-[var(--color-border)] overflow-hidden"
      style={{ background: "var(--color-canvas-2)" }}
    >
      <div className="flex items-center gap-0">
        <div className="shrink-0 px-4 sm:px-8 py-5 sm:py-6 border-r border-[var(--color-border)] flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] whitespace-nowrap">
            Works with
          </span>
        </div>

        {/* Mask fades edges in one layer (avoids gradient overlays fighting the animated row). */}
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
              ref={trackRef}
              className={
                marqueeShiftPx > 0
                  ? "tech-marquee-track tech-marquee-track--ready flex w-max items-stretch pointer-events-none"
                  : "tech-marquee-track flex w-max items-stretch pointer-events-none"
              }
              style={trackStyle}
            >
              <LogoHalf id="a" />
              <LogoHalf id="b" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
