"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { TECH_LOGOS } from "@/components/icons/TechLogos";

function LogoCell({
  name,
  Logo,
}: {
  name: string;
  Logo: (typeof TECH_LOGOS)[number]["Logo"];
}) {
  return (
    <div className="flex shrink-0 items-center gap-3.5 border-r border-border py-5 pl-2 pr-7 sm:pl-3">
      <span className="opacity-90">
        <Logo size={28} />
      </span>
      <span className="whitespace-nowrap font-mono text-[14px] font-semibold tracking-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

function LogoCellVertical({
  name,
  Logo,
}: {
  name: string;
  Logo: (typeof TECH_LOGOS)[number]["Logo"];
}) {
  return (
    <div className="flex w-full shrink-0 items-center justify-center gap-3 px-4 py-3.5">
      <Logo size={24} />
      <span className="font-mono text-[13px] font-semibold text-foreground/85">
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
      className="flex w-full shrink-0 flex-col divide-y divide-border"
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
    "linear-gradient(to right, transparent, black 5rem, black calc(100% - 5rem), transparent)",
  maskImage:
    "linear-gradient(to right, transparent, black 5rem, black calc(100% - 5rem), transparent)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

const MARQUEE_MASK_Y: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 1.5rem, black calc(100% - 1.5rem), transparent)",
  maskImage:
    "linear-gradient(to bottom, transparent, black 1.5rem, black calc(100% - 1.5rem), transparent)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

export function FrameworkMarquee() {
  const reducedMotion = useReducedMotion() === true;
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
    <div className="border-y border-border bg-card/60">
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-center gap-3 border-b border-border px-5 py-4 sm:px-8 sm:py-5">
          <span
            className="h-2 w-2 shrink-0 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-primary"
            aria-hidden
          />
          <span className="font-mono text-[clamp(0.85rem,3.4vw,1.15rem)] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Python frameworks supported
          </span>
        </div>

        <div
          className="relative h-[min(48vh,20rem)] w-full overflow-hidden [contain:paint]"
          style={MARQUEE_MASK_Y}
        >
          {reducedMotion ? (
            <div
              className="h-full overflow-y-auto [scrollbar-width:none]"
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

      <div className="hidden md:flex md:items-center md:gap-0">
        <div className="flex shrink-0 items-center gap-2.5 border-r border-border px-6 py-6 sm:px-8 sm:py-7">
          <span
            className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-primary"
            aria-hidden
          />
          <span className="whitespace-nowrap font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Python frameworks supported
          </span>
        </div>

        <div
          className="relative min-w-0 flex-1 overflow-hidden [contain:paint]"
          style={MARQUEE_MASK}
        >
          {reducedMotion ? (
            <div className="flex items-center gap-0 overflow-x-auto [scrollbar-width:none]">
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
    </div>
  );
}
