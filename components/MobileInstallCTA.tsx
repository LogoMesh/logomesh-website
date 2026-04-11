"use client";

import { useEffect, useRef } from "react";
import { GithubIcon } from "./icons/GithubIcon";

export function MobileInstallCTA() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const show = window.scrollY > 240;
      bar.style.transform = show ? "translateY(0)" : "translateY(100%)";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-[10001] md:hidden w-full shadow-[0_-8px_28px_rgba(0,0,0,0.45)]"
      style={{
        transform: "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        background: "var(--color-accent)",
        borderTop: "1px solid rgba(0,0,0,0.12)",
      }}
      aria-label="Install LogoMesh on GitHub"
    >
      <a
        href="https://github.com/apps/logomesh"
        className="flex w-full min-h-[48px] items-center justify-center gap-2 px-4 font-[family-name:var(--font-mono)] text-[13px] font-bold text-black"
        style={{
          paddingTop: "0.625rem",
          paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))",
        }}
      >
        <GithubIcon size={14} />
        Install on GitHub — it&rsquo;s free
      </a>
    </div>
  );
}
