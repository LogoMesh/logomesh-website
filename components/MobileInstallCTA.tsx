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
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        transform: "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-canvas)",
      }}
      aria-label="Install LogoMesh on GitHub"
    >
      <a
        href="https://github.com/apps/logomesh"
        className="flex items-center justify-center gap-2.5 py-4 font-[family-name:var(--font-mono)] text-[13px] font-bold text-black"
        style={{ background: "var(--color-accent)" }}
      >
        <GithubIcon size={15} />
        Install on GitHub — it&rsquo;s free
      </a>
    </div>
  );
}
