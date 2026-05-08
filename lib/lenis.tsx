// lib/lenis.tsx
"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

// App surfaces (wizard, dashboard) feel snappier without Lenis since they're
// constrained-height single-screen views; smooth-scroll is for the long-form
// marketing pages only.
function isAppSurface(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname.startsWith("/onboarding") || pathname.startsWith("/dashboard")
  );
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (isAppSurface(pathname)) return;
    const instance = new Lenis({ lerp: 0.65, smoothWheel: true });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
