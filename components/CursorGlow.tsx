"use client";

import { useEffect, useRef } from "react";

// Global spotlight that follows the cursor — direct DOM update, no re-renders
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(196,255,0,0.045) 0%, transparent 60%)`;
    };

    // Start invisible until mouse enters
    const onLeave = () => {
      el.style.background = "none";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden
    />
  );
}
