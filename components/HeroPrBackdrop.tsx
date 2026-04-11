"use client";

import { useEffect, useState } from "react";

/**
 * Dimmed PR-style backdrop for the hero. Optional video via
 * NEXT_PUBLIC_HERO_PR_VIDEO_URL (e.g. .mp4/.webm hosted on your CDN).
 * If unset or on error, the SVG PR mock is shown. Video is disabled when
 * prefers-reduced-motion: reduce.
 */
export function HeroPrBackdrop() {
  const [reducedMotion, setReducedMotion] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoSrc =
    typeof process.env.NEXT_PUBLIC_HERO_PR_VIDEO_URL === "string"
      ? process.env.NEXT_PUBLIC_HERO_PR_VIDEO_URL.trim()
      : "";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const fn = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const showVideo = Boolean(videoSrc) && !reducedMotion && !videoFailed;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* Full-bleed within section: anchor to viewport width */}
      <div
        className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
        }}
      >
        {/* Readability: darken + vignette over the decorative layer */}
        <div
          className="absolute inset-0 z-2"
          style={{
            background:
              "linear-gradient(105deg, var(--color-canvas) 0%, rgba(6,6,8,0.92) 38%, rgba(6,6,8,0.55) 62%, rgba(6,6,8,0.35) 100%)",
          }}
        />

        {showVideo ? (
          <video
            className="absolute right-[-5%] top-1/2 z-1 h-[min(88vh,820px)] w-auto min-w-[55%] max-w-[72%] -translate-y-1/2 opacity-[0.22] object-cover object-left sm:opacity-[0.26]"
            src={videoSrc}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
        ) : null}

        {/* SVG: dimmed PR / diff — always present as base or fallback */}
        <svg
          className={`absolute right-0 top-1/2 z-1 h-[min(78vh,640px)] w-[min(92vw,680px)] -translate-y-1/2 translate-x-[8%] ${
            showVideo ? "opacity-[0.14] sm:opacity-[0.16]" : "opacity-[0.2] sm:opacity-[0.24]"
          }`}
          viewBox="0 0 520 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Decorative pull request preview</title>
          {/* Window chrome */}
          <rect
            x="24"
            y="28"
            width="472"
            height="364"
            rx="10"
            stroke="var(--color-border-hi)"
            strokeWidth="1.2"
            fill="var(--color-canvas-2)"
            opacity="0.85"
          />
          <rect x="24" y="28" width="472" height="44" rx="10" fill="var(--color-canvas-3)" />
          <rect x="24" y="62" width="472" height="10" fill="var(--color-canvas-3)" />

          {/* Fake title bar */}
          <text
            x="44"
            y="56"
            fill="var(--color-muted)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="11"
            letterSpacing="0.06em"
          >
            Open · sszz01/checkout-service
          </text>
          <text
            x="320"
            y="56"
            fill="var(--color-dim)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="10"
          >
            #47
          </text>

          {/* Tabs */}
          <rect x="44" y="84" width="128" height="28" rx="4" fill="var(--color-canvas-4)" opacity="0.5" />
          <text
            x="56"
            y="102"
            fill="var(--color-ink)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="10"
          >
            checkout.py
          </text>

          {/* Diff column */}
          <text
            x="44"
            y="138"
            fill="var(--color-dim)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
          >
            @@ def checkout(qty, items):
          </text>
          <rect x="44" y="148" width="420" height="14" rx="2" fill="rgba(46,160,67,0.12)" />
          <text
            x="52"
            y="159"
            fill="#7ee787"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
          >
            + if qty &lt; 0: raise ValueError(&quot;qty&quot;)
          </text>
          <rect x="44" y="168" width="380" height="14" rx="2" fill="rgba(248,81,73,0.1)" />
          <text
            x="52"
            y="179"
            fill="#ffa657"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
          >
            - return Order(total=sub * qty)
          </text>
          <rect x="44" y="188" width="400" height="14" rx="2" fill="rgba(46,160,67,0.1)" />
          <text
            x="52"
            y="199"
            fill="#7ee787"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
          >
            + return Order(total=max(0, sub * qty))
          </text>

          {/* Bot comment block */}
          <rect x="44" y="228" width="432" height="120" rx="8" stroke="var(--color-border-hi)" fill="var(--color-canvas)" />
          <circle cx="64" cy="252" r="10" fill="var(--color-accent)" opacity="0.35" />
          <text
            x="82"
            y="256"
            fill="var(--color-muted)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="10"
          >
            logomesh bot
          </text>
          <text
            x="62"
            y="284"
            fill="var(--color-danger)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="10"
            fontWeight="600"
          >
            Negative quantity bypasses validation
          </text>
          <text
            x="62"
            y="306"
            fill="var(--color-dim)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
          >
            Property: total ≥ 0 · confirmed in sandbox
          </text>
        </svg>
      </div>
    </div>
  );
}
