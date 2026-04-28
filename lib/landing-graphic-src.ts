/**
 * Optional real marketing graphics (PNG/WebP/GIF in `public/` or absolute URL).
 *
 * “How it works” steps use HOW_1 … HOW_4 — drop GIFs per step (e.g. screen recordings).
 *
 * Set in `.env.local`, e.g.:
 *   NEXT_PUBLIC_LANDING_GRAPHIC_HERO=/marketing/hero-product.webp
 *   NEXT_PUBLIC_LANDING_GRAPHIC_OVERVIEW=/marketing/overview-pr-thread.webp
 *   NEXT_PUBLIC_LANDING_GRAPHIC_PROOF=/marketing/proof-comment.webp
 *   NEXT_PUBLIC_LANDING_GRAPHIC_HOW_1=/marketing/how-01-install.gif
 *   NEXT_PUBLIC_LANDING_GRAPHIC_HOW_2=/marketing/how-02-pr.gif
 *   NEXT_PUBLIC_LANDING_GRAPHIC_HOW_3=/marketing/how-03-checks.gif
 *   NEXT_PUBLIC_LANDING_GRAPHIC_HOW_4=/marketing/how-04-thread.gif
 */

export const LANDING_GRAPHICS = {
  hero: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_HERO?.trim() ?? "",
  overview: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_OVERVIEW?.trim() ?? "",
  proof: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_PROOF?.trim() ?? "",
  how1: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_HOW_1?.trim() ?? "",
  how2: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_HOW_2?.trim() ?? "",
  how3: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_HOW_3?.trim() ?? "",
  how4: process.env.NEXT_PUBLIC_LANDING_GRAPHIC_HOW_4?.trim() ?? "",
} as const;
