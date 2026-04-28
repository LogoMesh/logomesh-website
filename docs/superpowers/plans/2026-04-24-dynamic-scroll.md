# Dynamic Scroll & Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Vanta.js animated hero background + Lenis smooth scroll + GSAP ScrollTrigger section reveals (split-text headlines, staggered fade-up cards) to the LogoMesh marketing site.

**Architecture:** Custom hooks `useFadeUp` and `useSplitText` in `lib/animations.ts` (powered by `@gsap/react` `useGSAP`). `LenisProvider` in `lib/lenis.tsx` wraps `app/layout.tsx`, integrates Lenis RAF with GSAP's ticker. Vanta.js + Three.js loaded via CDN `<Script>` in layout; Hero polls `window.VANTA` until ready. Existing `whileInView` motion patterns replaced by hooks; `whileHover`/`whileTap` kept untouched.

**Tech Stack:** `gsap` 3.12+, `@gsap/react`, `lenis`, Vanta.js CDN, Next.js 16, Tailwind 4, TypeScript

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install packages**

```bash
cd /Users/ovoievodin/zasha/logomesh-website
npm install gsap @gsap/react lenis
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Verify types resolve**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors (gsap ships its own types; lenis ships types).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add gsap, @gsap/react, lenis"
```

---

## Task 2: Create LenisProvider (`lib/lenis.tsx`)

Initializes Lenis smooth scroll and wires it to GSAP's ticker so ScrollTrigger reads Lenis scroll positions instead of raw window scroll.

**Files:**
- Create: `lib/lenis.tsx`

- [ ] **Step 1: Create the file**

```tsx
// lib/lenis.tsx
"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.08, smoothWheel: true });
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
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add lib/lenis.tsx
git commit -m "feat: add LenisProvider with GSAP ScrollTrigger integration"
```

---

## Task 3: Create animation hooks (`lib/animations.ts`)

Two hooks: `useFadeUp` fades + rises elements on scroll entry; `useSplitText` splits a headline into lines and staggers them in.

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Create the file**

```ts
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
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add useFadeUp and useSplitText GSAP scroll hooks"
```

---

## Task 4: Wire LenisProvider + Vanta CDN scripts in `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add Vanta type declaration**

At the top of `app/layout.tsx`, before the imports, add a type declaration file instead — create `types/vanta.d.ts`:

```ts
// types/vanta.d.ts
export {};

declare global {
  interface Window {
    VANTA: {
      NET: (config: Record<string, unknown>) => { destroy: () => void };
    };
    THREE: unknown;
  }
}
```

```bash
mkdir -p /Users/ovoievodin/zasha/logomesh-website/types
```

Create the file at `types/vanta.d.ts` with the content above.

- [ ] **Step 2: Update `app/layout.tsx`**

Replace the entire file content with:

```tsx
import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ScrollReset } from "@/components/ScrollReset";
import { LenisProvider } from "@/lib/lenis";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: true,
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#060608",
};

export const metadata: Metadata = {
  title: "LogoMesh · Ship Python PRs with proof, not noise",
  description:
    "Merge with confidence. LogoMesh runs your changed Python in a sandbox and only comments when it can show a reproducible bug. Free GitHub App for public repos in beta.",
  icons: {
    apple: "/branding/logomesh-github-app-256.png",
  },
  openGraph: {
    title: "LogoMesh",
    description:
      "Pre-merge checks for Python PRs. Run the code you changed and post only when there is proof. Free in beta.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jbMono.variable}`}>
      <body
        className={`${dmSans.className} bg-background antialiased [text-rendering:optimizeLegibility]`}
      >
        <Script id="scroll-restoration-head" strategy="beforeInteractive">
          {`(function(){try{if("scrollRestoration"in history)history.scrollRestoration="manual";}catch(e){}})()`}
        </Script>
        {/* Vanta deps — load after page is interactive to avoid blocking */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
          strategy="afterInteractive"
        />
        <ScrollReset />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Build check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx types/vanta.d.ts
git commit -m "feat: wire LenisProvider and Vanta CDN scripts in layout"
```

---

## Task 5: Add Vanta canvas to `Hero.tsx`

Adds an animated acid-lime particle network behind the existing aurora orbs. The canvas sits at `z-index: 0`; aurora orbs are already `z-index: auto` (positioned inside the `aria-hidden` wrapper); content grid is `z-[1]`.

**Files:**
- Modify: `components/landing/Hero.tsx`

- [ ] **Step 1: Add the Vanta canvas ref and useEffect**

At the top of `Hero.tsx`, add `useEffect` and `useRef` to the existing React import:

```tsx
import { useEffect, useRef } from "react";
```

Inside the `Hero` function body, before the `return`, add:

```tsx
const vantaRef = useRef<HTMLDivElement>(null);
const vantaEffect = useRef<{ destroy: () => void } | null>(null);

useEffect(() => {
  let cancelled = false;

  function init() {
    if (cancelled || !vantaRef.current || vantaEffect.current) return;
    if (typeof window === "undefined" || !window.VANTA?.NET) return;
    vantaEffect.current = window.VANTA.NET({
      el: vantaRef.current,
      color: 0xc4ff00,
      backgroundColor: 0x0a0a0b,
      points: 8.0,
      maxDistance: 22.0,
      spacing: 18.0,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
    });
  }

  init();
  const poll = setInterval(() => {
    if (window.VANTA?.NET) {
      init();
      clearInterval(poll);
    }
  }, 150);

  return () => {
    cancelled = true;
    clearInterval(poll);
    vantaEffect.current?.destroy();
    vantaEffect.current = null;
  };
}, []);
```

- [ ] **Step 2: Add the canvas div to JSX**

Inside the `<section>` element, as the first child (before the aurora `aria-hidden` div), add:

```tsx
<div
  ref={vantaRef}
  aria-hidden
  className="pointer-events-none absolute inset-0 z-0"
/>
```

The section's existing `overflow-hidden` class clips the Vanta canvas naturally.

- [ ] **Step 3: Build check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 4: Start dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000. The hero should show a subtle acid-lime particle network in the background. Existing text and buttons are unaffected. On slow connections the network may appear ~1-2s after load (CDN scripts are `afterInteractive`).

- [ ] **Step 5: Commit**

```bash
git add components/landing/Hero.tsx
git commit -m "feat: add Vanta.js NET particle background to hero"
```

---

## Task 6: Update `SocialProofStrip.tsx`

Replace `whileInView` motion patterns with `useSplitText` on the `h2` and `useFadeUp` on the card grid.

**Files:**
- Modify: `components/landing/SocialProofStrip.tsx`

- [ ] **Step 1: Add imports and refs**

At the top of the file, add:

```tsx
import { useRef } from "react";
import { useSplitText, useFadeUp } from "@/lib/animations";
```

Remove `useReducedMotion` from the `motion/react` import (no longer needed). Keep `motion` for any `whileHover`/`whileTap` if present (none in this component — full import can be removed).

Inside `SocialProofStrip`, add refs:

```tsx
const headingRef = useRef<HTMLHeadingElement>(null);
const gridRef = useRef<HTMLUListElement>(null);

useSplitText(headingRef);
useFadeUp(gridRef, { targets: "li", stagger: 0.07 });
```

Remove the `const reducedMotion = useReducedMotion();` line.

- [ ] **Step 2: Replace motion elements**

Replace the outer `motion.div` wrapping the icon + heading block:

```tsx
// BEFORE
<motion.div
  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.4, ease: EASE }}
  className="flex flex-col items-center gap-4"
>

// AFTER
<div className="flex flex-col items-center gap-4">
```

Close tag: `</motion.div>` → `</div>`

Add `ref={headingRef}` to the `<h2>` element:

```tsx
<h2
  ref={headingRef}
  id="social-proof-heading"
  className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.65rem)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]"
>
```

Replace `motion.ul` with plain `ul` + `ref`:

```tsx
// BEFORE
<motion.ul
  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
  className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
>

// AFTER
<ul
  ref={gridRef}
  className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
>
```

Replace each `motion.li` with plain `li` (remove initial/whileInView/transition props):

```tsx
// BEFORE
<motion.li
  key={row.repo}
  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-24px" }}
  transition={{ duration: 0.45, ease: EASE, delay: 0.05 * i }}
>

// AFTER
<li key={row.repo}>
```

Close tags: `</motion.li>` → `</li>`, `</motion.ul>` → `</ul>`

Remove unused `EASE` import if no other motion elements remain.

- [ ] **Step 3: Build check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add components/landing/SocialProofStrip.tsx
git commit -m "feat: GSAP scroll reveals for SocialProofStrip"
```

---

## Task 7: Update `TheCommentSection.tsx`

**Files:**
- Modify: `components/landing/TheCommentSection.tsx`

- [ ] **Step 1: Read the file**

```bash
head -30 /Users/ovoievodin/zasha/logomesh-website/components/landing/TheCommentSection.tsx
```

- [ ] **Step 2: Add import + ref + hook**

Add to imports:

```tsx
import { useRef } from "react";
import { useFadeUp } from "@/lib/animations";
```

Inside the component function, add:

```tsx
const sectionRef = useRef<HTMLElement>(null);
useFadeUp(sectionRef, { y: 24, start: "top 88%" });
```

Add `ref={sectionRef}` to the outermost `<section>` element.

Remove any `motion.div` with `whileInView` / `initial` / `whileInView` props — replace with plain `div`. Keep any `whileHover`/`whileTap` elements.

- [ ] **Step 3: Build check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add components/landing/TheCommentSection.tsx
git commit -m "feat: GSAP scroll reveal for TheCommentSection"
```

---

## Task 8: Update `RealWorldHarnessSection.tsx`

**Files:**
- Modify: `components/landing/RealWorldHarnessSection.tsx`

- [ ] **Step 1: Read the relevant headline element**

```bash
grep -n "h2\|h3\|landing-kicker\|font-display\|motion\." /Users/ovoievodin/zasha/logomesh-website/components/landing/RealWorldHarnessSection.tsx | head -20
```

- [ ] **Step 2: Add imports + refs + hooks**

```tsx
import { useRef } from "react";
import { useSplitText, useFadeUp } from "@/lib/animations";
```

Inside the component:

```tsx
const headingRef = useRef<HTMLHeadingElement>(null);
const statsRef = useRef<HTMLDivElement>(null);

useSplitText(headingRef);
useFadeUp(statsRef, { targets: "[data-stat]", stagger: 0.08 });
```

Add `ref={headingRef}` to the section's main `h2` or `h3` headline element.

Add `ref={statsRef}` to the wrapper div containing the stat items. Add `data-stat` attribute to each stat item element so `useFadeUp` can target them via `targets: "[data-stat]"`.

Remove `whileInView` motion wrappers — replace with plain HTML equivalents. Keep `whileHover`/`whileTap`.

- [ ] **Step 3: Build check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add components/landing/RealWorldHarnessSection.tsx
git commit -m "feat: GSAP scroll reveals for RealWorldHarnessSection"
```

---

## Task 9: Update `ProductOverviewSection.tsx`

**Files:**
- Modify: `components/landing/ProductOverviewSection.tsx`

- [ ] **Step 1: Read the file**

```bash
grep -n "h3\|motion\.\|whileInView\|className" /Users/ovoievodin/zasha/logomesh-website/components/landing/ProductOverviewSection.tsx | head -30
```

- [ ] **Step 2: Add imports + refs + hooks**

```tsx
import { useRef } from "react";
import { useSplitText, useFadeUp } from "@/lib/animations";
```

Inside the component:

```tsx
const cardsRef = useRef<HTMLDivElement>(null);
useFadeUp(cardsRef, { targets: "[data-card]", stagger: 0.1 });
```

Add `ref={cardsRef}` to the wrapper div containing the feature cards.

Add `data-card` to each feature card element.

For each feature card's `h3`, add `ref` and `useSplitText` — since there are multiple cards, use a callback ref pattern:

```tsx
// Above the return statement:
const cardRefs = useRef<(HTMLHeadingElement | null)[]>([]);

// In JSX, on each h3:
ref={(el) => { cardRefs.current[i] = el; }}
```

Call `useSplitText` in a loop is not possible with hooks. Instead, animate all `h3` elements via `useFadeUp` with a `targets` selector as a simpler alternative:

```tsx
useFadeUp(cardsRef, { targets: "h3", stagger: 0.07, y: 16 });
useFadeUp(cardsRef, { targets: "[data-card]", stagger: 0.1 });
```

Use two separate `useFadeUp` calls with different `targets` and `start` values:
- `h3` elements: `start: "top 88%"`, `y: 16`, `stagger: 0.07`
- `[data-card]`: `start: "top 85%"`, `stagger: 0.1`

Remove `whileInView` motion wrappers.

- [ ] **Step 3: Build check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add components/landing/ProductOverviewSection.tsx
git commit -m "feat: GSAP scroll reveals for ProductOverviewSection"
```

---

## Task 10: Update `HowItWorksSection.tsx`

**Files:**
- Modify: `components/landing/HowItWorksSection.tsx`

- [ ] **Step 1: Read existing motion patterns**

```bash
grep -n "motion\.\|whileInView\|initial" /Users/ovoievodin/zasha/logomesh-website/components/landing/HowItWorksSection.tsx | head -20
```

- [ ] **Step 2: Add imports + ref + hook**

```tsx
import { useRef } from "react";
import { useFadeUp } from "@/lib/animations";
```

Inside the component:

```tsx
const stepsRef = useRef<HTMLDivElement>(null);
useFadeUp(stepsRef, { targets: "[data-step]", stagger: 0.1 });
```

Add `ref={stepsRef}` to the wrapper containing the step cards.

Add `data-step` attribute to each step card element.

Remove `whileInView` motion wrappers — replace `motion.div` / `motion.li` with plain `div` / `li`. Keep `whileHover`/`whileTap`.

- [ ] **Step 3: Build check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add components/landing/HowItWorksSection.tsx
git commit -m "feat: GSAP scroll reveals for HowItWorksSection"
```

---

## Task 11: Update `FAQSection.tsx`

**Files:**
- Modify: `components/landing/FAQSection.tsx`

- [ ] **Step 1: Add imports + refs + hooks**

```tsx
import { useRef } from "react";
import { useSplitText, useFadeUp } from "@/lib/animations";
```

Inside the component (before `return`):

```tsx
const headingRef = useRef<HTMLHeadingElement>(null);
const faqListRef = useRef<HTMLDivElement>(null);

useSplitText(headingRef);
useFadeUp(faqListRef, { targets: "[data-faq]", stagger: 0.06 });
```

- [ ] **Step 2: Update JSX**

Replace the `motion.div` wrapping the kicker + heading:

```tsx
// BEFORE
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.52, ease: EASE_SOFT }}
  className="text-center"
>

// AFTER
<div className="text-center">
```

Add `ref={headingRef}` to the `<h2>` element.

Add `ref={faqListRef}` to the `<div className="mt-12 space-y-2">` wrapper.

Replace `motion.div` FAQ item wrappers:

```tsx
// BEFORE
<motion.div
  key={item.q}
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-20px" }}
  transition={{ duration: 0.42, ease: EASE_SOFT, delay: i * 0.04 }}
  className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]"
>

// AFTER
<div
  key={item.q}
  data-faq
  className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas-2)]"
>
```

Close tags: `</motion.div>` → `</div>`.

Remove unused `EASE_SOFT` import if no other motion elements remain.

- [ ] **Step 3: Build check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add components/landing/FAQSection.tsx
git commit -m "feat: GSAP scroll reveals for FAQSection"
```

---

## Task 12: Update `CTASection.tsx`

CTASection has `motion.h2`, `motion.p`, `motion.div` with `whileInView`, plus a `motion.a` with `whileHover`/`whileTap` (keep the button). The `sectionRef` is already used for mouse tracking — reuse it for `useFadeUp`.

**Files:**
- Modify: `components/CTASection.tsx`

- [ ] **Step 1: Add imports + hooks**

Add to imports:

```tsx
import { useFadeUp } from "@/lib/animations";
```

The component already has `const sectionRef = useRef<HTMLElement>(null)`. Reuse it:

```tsx
useFadeUp(sectionRef, { targets: "[data-reveal]", stagger: 0.08, y: 22 });
```

- [ ] **Step 2: Update JSX**

Replace `motion.h2` with plain `h2` + `data-reveal`:

```tsx
// BEFORE
<motion.h2
  initial={{ opacity: 0, y: 22 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.8, ease: EASE_SOFT }}
  className="relative font-[family-name:var(--font-display)] ..."
>

// AFTER
<h2
  data-reveal
  className="relative font-[family-name:var(--font-display)] ..."
>
```

Replace `motion.p` (subtitle) with plain `p` + `data-reveal`:

```tsx
// BEFORE
<motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.65, ease: EASE_SOFT, delay: 0.1 }}
  className="marketing-lg ..."
>

// AFTER
<p data-reveal className="marketing-lg ...">
```

Replace the outer `motion.div` wrapping the CTA button with plain `div` + `data-reveal` (keep inner `motion.a` with `whileHover`/`whileTap` unchanged):

```tsx
// BEFORE
<motion.div
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
  className="relative"
>
  <motion.a ... whileHover whileTap>...</motion.a>
</motion.div>

// AFTER
<div data-reveal className="relative">
  <motion.a ... whileHover whileTap>...</motion.a>
</div>
```

Replace the footnote `motion.p`:

```tsx
// BEFORE
<motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.28 }}
  className="relative mt-10 ..."
>

// AFTER
<p data-reveal className="relative mt-10 ...">
```

Remove unused `EASE_SOFT` and `EASE` imports if nothing else uses them.

- [ ] **Step 3: Build check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add components/CTASection.tsx
git commit -m "feat: GSAP scroll reveals for CTASection"
```

---

## Task 13: Full build + visual verification

- [ ] **Step 1: Production build**

```bash
npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` with no TypeScript errors or missing module errors.

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Open http://localhost:3000.

- [ ] **Step 3: Visual checklist**

Work through each item:

```
[ ] Hero: Vanta particle network visible in background (may take ~1s to appear)
[ ] Hero: Existing text + buttons animate in correctly (animate-rise CSS unchanged)
[ ] Hero: Particles respond to mouse movement
[ ] SocialProofStrip: h2 lines cascade in on scroll
[ ] SocialProofStrip: repo cards fade up staggered
[ ] TheCommentSection: section fades up on scroll
[ ] RealWorldHarnessSection: headline splits + cascades
[ ] RealWorldHarnessSection: stat numbers fade up staggered
[ ] ProductOverviewSection: cards fade up staggered
[ ] HowItWorksSection: step cards fade up staggered
[ ] FAQSection: heading lines cascade in
[ ] FAQSection: FAQ items stagger up
[ ] CTASection: headline + body + button + footnote stagger in
[ ] Scroll feels smooth (Lenis inertia)
[ ] CTA button hover/tap effects still work
[ ] No console errors
[ ] Reduced motion: disable animations in system accessibility settings — verify page shows content without animation
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: dynamic scroll animations complete — Vanta hero + GSAP ScrollTrigger + Lenis"
```
