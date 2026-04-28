// lib/animations.ts
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export interface FadeUpOptions {
  /** CSS selector for child targets within the ref element. If omitted, animates the ref element itself. */
  targets?: string;
  stagger?: number;
  y?: number;
  delay?: number;
  /** ScrollTrigger start value. Default: "top 85%" */
  start?: string;
}

export function useFadeUp<T extends Element>(
  ref: RefObject<T | null>,
  options: FadeUpOptions = {}
) {
  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const {
        targets,
        stagger = 0.1,
        y = 30,
        delay = 0,
        start = "top 85%",
      } = options;
      const els = targets
        ? Array.from(ref.current.querySelectorAll<Element>(targets))
        : [ref.current];

      gsap.fromTo(
        els,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [] }
  );
}

export function useSplitText<T extends HTMLElement>(ref: RefObject<T | null>) {
  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      const split = new SplitText(ref.current, { type: "lines" });

      gsap.fromTo(
        split.lines,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => split.revert();
    },
    { scope: ref, dependencies: [] }
  );
}
