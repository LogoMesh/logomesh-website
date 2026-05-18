# Dynamic Scroll & Animation Design

**Date:** 2026-04-24  
**Stack addition:** Vanta.js + GSAP + @gsap/react + Lenis  

---

## Goal

Add cinematic scroll animations and an animated hero background to the existing logomesh marketing site. No content changes — pure motion layer on top of existing components.

---

## Architecture

### Animation approach: Hooks per component (Option A)

Two custom hooks in `lib/animations.ts`:
- `useSplitText(ref)` — splits headline element into lines, staggers each line in on scroll entry via GSAP ScrollTrigger
- `useFadeUp(ref, options?)` — fades + rises element (or child elements) on scroll entry

One provider in `lib/lenis.tsx`:
- `LenisProvider` — initializes Lenis smooth scroll, runs RAF loop, exposes `useLenis()` hook
- Mounted once in `app/layout.tsx`, wraps all pages

All hooks guard with `typeof window !== 'undefined'` for SSR safety. GSAP contexts cleaned up on component unmount.

### Hero background: Vanta.js

- Loaded via `<Script>` tag (Next.js) from CDN in `app/layout.tsx` — avoids SSR issues with Three.js peer dep
- Canvas injected into `Hero.tsx` as `position:absolute; inset:0; z-index:0` behind existing aurora orbs
- Vanta color set to acid-lime (`#C4FF00`) with near-black background (`#0a0a0b`)
- Existing `animate-rise` CSS animations on hero content untouched

---

## Dependencies

```bash
npm install gsap @gsap/react lenis
```

Vanta.js + Three.js loaded via CDN (no npm install).

---

## Component Animation Map

| Component | Hook(s) used | Target elements |
|---|---|---|
| `Hero` | Vanta canvas only | Background canvas behind aurora |
| `SocialProofStrip` | `useSplitText` + `useFadeUp` | `h2` → split; stat cards → fade-up staggered |
| `TheCommentSection` | `useFadeUp` | Entire section container |
| `RealWorldHarnessSection` | `useSplitText` + `useFadeUp` | Section headline → split; stat numbers → fade-up staggered |
| `ProductOverviewSection` | `useSplitText` + `useFadeUp` | Feature `h3`s → split; card bodies → fade-up staggered |
| `HowItWorksSection` | `useFadeUp` | Step cards → fade-up staggered (0.1s delay each) |
| `FAQSection` | `useSplitText` + `useFadeUp` | `h2` → split; FAQ items → fade-up staggered |
| `CTASection` | `useFadeUp` | Full section container |

---

## New Files

```
lib/lenis.tsx          # LenisProvider, useLenis()
lib/animations.ts      # useSplitText(), useFadeUp()
```

## Modified Files

```
app/layout.tsx                                  # LenisProvider wrap + Vanta CDN Script
components/landing/Hero.tsx                     # Vanta canvas
components/landing/SocialProofStrip.tsx
components/landing/TheCommentSection.tsx
components/landing/RealWorldHarnessSection.tsx
components/landing/ProductOverviewSection.tsx
components/landing/HowItWorksSection.tsx
components/landing/FAQSection.tsx
components/CTASection.tsx
```

---

## Constraints

- No content changes — motion layer only
- No new pages, API routes, or schema changes
- Vanta via CDN only — never import from npm (SSR incompatible)
- GSAP contexts must clean up on unmount (prevent ScrollTrigger leaks)
- All hooks must be SSR-safe (`typeof window !== 'undefined'` guard)
