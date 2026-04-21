"use client";

import Image from "next/image";
import { Film, ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaKind = "video" | "gif" | "image";

type Props = {
  /** Short label — e.g. "Hero demo", "Install flow" */
  label: string;
  /** Where to drop the file, e.g. "/public/marketing/hero.mp4" */
  dropPath: string;
  /** Suggested capture (duration / dims) */
  spec?: string;
  /** Provide to render the real asset; leaves placeholder if empty */
  src?: string;
  /** video | gif | image — drives icon + copy */
  kind?: MediaKind;
  /** aspect-[16/10] etc. */
  aspectClassName?: string;
  /** Shadow strength */
  emphasis?: "hero" | "default";
};

const ICONS: Record<MediaKind, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  video: PlayCircle,
  gif: Film,
  image: ImageIcon,
};

const KIND_LABEL: Record<MediaKind, string> = {
  video: "Video",
  gif: "GIF",
  image: "Screenshot",
};

export function MediaPlaceholder({
  label,
  dropPath,
  spec,
  src,
  kind = "video",
  aspectClassName = "aspect-[16/10]",
  emphasis = "default",
}: Props) {
  const hasAsset = Boolean(src && src.length > 0);
  const Icon = ICONS[kind];

  if (hasAsset && kind === "video") {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-[#0a0a0e] ring-1 ring-white/[0.07] ring-inset",
          emphasis === "hero"
            ? "shadow-[0_32px_100px_-40px_rgba(0,0,0,0.88),0_0_0_1px_rgba(0,0,0,0.5)]"
            : "shadow-[0_20px_70px_-36px_rgba(0,0,0,0.8)]",
          aspectClassName,
        )}
      >
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  if (hasAsset) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-[#0a0a0e] ring-1 ring-white/[0.07] ring-inset",
          emphasis === "hero"
            ? "shadow-[0_32px_100px_-40px_rgba(0,0,0,0.88),0_0_0_1px_rgba(0,0,0,0.5)]"
            : "shadow-[0_20px_70px_-36px_rgba(0,0,0,0.8)]",
          aspectClassName,
        )}
      >
        <Image
          src={src!}
          alt={label}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, min(1280px, 55vw)"
          priority={emphasis === "hero"}
          unoptimized={src!.startsWith("http://") || src!.startsWith("https://")}
        />
      </div>
    );
  }

  return (
    <figure
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-[#0a0a0e] ring-1 ring-white/[0.07] ring-inset",
        emphasis === "hero"
          ? "shadow-[0_32px_100px_-40px_rgba(0,0,0,0.88),0_0_0_1px_rgba(0,0,0,0.5)]"
          : "shadow-[0_20px_70px_-36px_rgba(0,0,0,0.8)]",
        aspectClassName,
      )}
      aria-label={`${label} — media slot`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.85]"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% -10%, hsl(78 100% 50% / 0.09) 0%, transparent 52%),
            radial-gradient(ellipse 70% 50% at 100% 100%, hsl(274 72% 55% / 0.06) 0%, transparent 45%),
            linear-gradient(180deg, #0c0c12 0%, #08080c 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:px-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[var(--color-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-16 sm:w-16">
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.2} />
        </div>
        <p className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink)] sm:text-[17px]">
          {label}
        </p>
        <div className="flex flex-col items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-dim)] sm:text-[11px]">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 text-[var(--color-muted)]">
            Drop {KIND_LABEL[kind].toLowerCase()} → <span className="text-[var(--color-accent)]">{dropPath}</span>
          </span>
          {spec ? <span className="text-[var(--color-dim)]">{spec}</span> : null}
        </div>
      </div>
    </figure>
  );
}
