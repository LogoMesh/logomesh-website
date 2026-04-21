"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type MarketingGraphicVariant = "hero" | "default" | "step";

type Props = {
  /** Shown in empty state and as alt text when an image is set */
  title: string;
  /** Designer note, e.g. recommended export dimensions */
  recommendedExport: string;
  /** Env-backed URL or path (see `lib/landing-graphic-src.ts`) */
  src: string;
  /** Tailwind aspect ratio */
  aspectClassName?: string;
  /** Visual weight: hero = above-the-fold primary capture */
  variant?: MarketingGraphicVariant;
};

const variantAspect: Record<MarketingGraphicVariant, string> = {
  hero: "aspect-[16/11] min-h-[220px] sm:min-h-[280px]",
  default: "aspect-[16/10]",
  step: "aspect-[4/3]",
};

/**
 * Slot for real PNG/WebP/GIF product captures. Empty state is intentionally
 * minimal and premium, not a CSS clone of another product’s UI.
 */
export function MarketingGraphicPlaceholder({
  title,
  recommendedExport,
  src,
  aspectClassName,
  variant = "default",
}: Props) {
  const hasAsset = src.length > 0;
  const aspect = aspectClassName ?? variantAspect[variant];

  return (
    <figure
      className={cn(
        "group relative w-full min-h-0 overflow-hidden rounded-2xl bg-[#0a0a0e]",
        "ring-1 ring-white/[0.07] ring-inset",
        "shadow-[0_32px_100px_-40px_rgba(0,0,0,0.88),0_0_0_1px_rgba(0,0,0,0.5)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:p-px",
        "before:bg-[linear-gradient(145deg,rgba(255,255,255,0.12)_0%,transparent_45%,transparent_100%)]",
        "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        "before:[mask-composite:xor,exclude]",
        aspect,
      )}
    >
      {hasAsset ? (
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, min(1280px, 55vw)"
          priority={variant === "hero"}
          unoptimized={src.startsWith("http://") || src.startsWith("https://")}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col">
          {/* Ambient mesh — subtle, no fake UI chrome */}
          <div
            className="absolute inset-0 opacity-[0.85]"
            aria-hidden
            style={{
              background: `
                radial-gradient(ellipse 90% 60% at 50% -10%, rgba(196, 255, 0, 0.09) 0%, transparent 52%),
                radial-gradient(ellipse 70% 50% at 100% 100%, rgba(120, 140, 255, 0.04) 0%, transparent 45%),
                linear-gradient(180deg, #0c0c12 0%, #08080c 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
            aria-hidden
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-12">
            <div
              className={cn(
                "mb-5 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                variant === "hero" ? "h-14 w-14 sm:h-16 sm:w-16" : "h-12 w-12 sm:h-14 sm:w-14",
              )}
              aria-hidden
            >
              <Sparkles
                className={variant === "hero" ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6 sm:h-7 sm:w-7"}
                strokeWidth={1.2}
              />
            </div>

            <p className="landing-kicker">Product frame</p>
            <figcaption className="mt-3 max-w-[26rem] space-y-2">
              <p className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[var(--color-ink)] sm:text-[18px]">
                {title}
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-[var(--color-muted)] sm:text-[14px]">
                {recommendedExport}
              </p>
            </figcaption>
          </div>
        </div>
      )}
    </figure>
  );
}
