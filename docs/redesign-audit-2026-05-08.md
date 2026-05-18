---
title: "logomesh UI/UX Redesign — Audit + Plan"
authored: 2026-05-08
branch: marketing-rewrite
role: UI/UX Pro Max v2.0
---

# logomesh — UI/UX Audit + Redesign

Honest, opinionated audit of the current site + product, against the 2026 replacement context ("logomesh is a modern dashboard SaaS with a 4-minute Sentry wizard — CLI is legacy"). Everything below is scoped to the `marketing-rewrite` branch. Nothing touches `main`.

---

## 1. Executive Summary

The foundation is already strong — sophisticated design tokens, fluid type, HSL palette with an acid-lime accent, tasteful motion. Three uncommitted components (`HeroProductFrame`, `ArtifactShowcase`, `TrustStrip`) are *excellent* and are the highest-leverage improvements, but none are wired into `app/page.tsx` yet.

The single biggest problem is a **positioning-vs-product mismatch**. The product is a Sentry webhook → dashboard → sealed artifact SaaS. The landing page still talks like a CLI tool ("pip install logomesh", "paste a Sentry URL into the CLI"), which directly contradicts the replacement context. A compliance officer arriving from a vendor shortlist won't find the concepts in the session-handoff (wizard, per-install secrets, webhook trigger) on the homepage.

The second biggest problem is a **broken compliance mapping** repeated across 5+ components (`PCI DSS 6.3.2 / SOC2 CC8.1`). The backend explicitly corrected this months ago — the right mapping is **PCI DSS 12.10.5 + SOC2 CC7.3 + CC7.4** (incident response controls). A buyer with a SOC2 auditor on the line will catch it in 30 seconds. This is a credibility-destroying bug masquerading as a design system issue.

The third biggest problem is **CTA hierarchy chaos**: the Nav has two lime primary buttons ("Get started" and "Read the docs") competing side-by-side, the hero's primary CTA is "Read the docs" (sends skeptics deeper, doesn't activate), and the global CTASection ends on a `pip install` terminal snippet with no wizard entry point.

These three fixes alone will convert meaningfully better. Everything else is polish.

---

## 2. Full Audit

### 2.1 Overall Strategy & Information Architecture

**Current state:**
- Landing flow: Nav → Hero → SocialProofStrip → TheCommentSection → RealWorldHarnessSection ("proof") → ProductOverviewSection ("why") → HowItWorksSection → FAQ → CTA → Footer. Seven sections below the hero.
- The three newly-added premium components (TrustStrip, HeroProductFrame, ArtifactShowcase) are NOT in `app/page.tsx`. They sit uncommitted in `components/landing/` like unopened gifts.
- Nav section anchors: `why`, `how-it-works`, `cta`. The `Contact` link is top-right; `Docs` is a CTA button, not a link. No `Pricing` link in the Nav at all — but a polished `/pricing` page exists.

**Problems:**
- **Buried IA for the new core value prop.** The wizard (the product per the replacement context) isn't referenced anywhere in the IA until the nav button. Sections read as if the user is about to install a CLI.
- **"Why" section is generic.** `ProductOverviewSection` copy is abstract ("Debug from facts, not guesswork", "Isolated by default") — it could be pasted into any infra tool. No falsifiable claims, no differentiator vs. Sentry Replay / Rookout / Datadog Live Debugger.
- **"Who it's for" ≠ "How it works".** `RealWorldHarnessSection` describes a YAML-path-scope product ("logomesh only scans paths you declare in YAML") that does not match the webhook/frame-locals reality. The whole in-scope/crashes-we-reproduce cards are describing a product we don't have.
- **No navigation to Pricing.** A paid-tier shortlist buyer has to discover pricing from the footer or guess. Top-nav should surface it.

**Score: 5/10** — the architecture is clean and scannable; it's describing the wrong product.

### 2.2 Visual Design & Brand Expression

**Current state:**
- Palette: near-black `hsl(240 6% 4%)` canvas + acid lime `hsl(78 100% 50%)` (#C4FF00) primary + semantic red/green/amber. Dark-only.
- Type: DM Sans (display + body) + JetBrains Mono (code + labels). Fluid clamp scale. Tight tracking on display.
- Motion: GSAP (scroll-triggered fades) + Motion (component entrances) + Lenis (recently removed). Film grain + aurora orbs + section kickers with acid glow. Vanta NET in the hero.

**Strengths:**
- The lime + near-black + mono combo is on-trend for 2026 engineer-facing SaaS (Linear, Vercel, Railway, Supabase dark theme). It feels intentional.
- Kicker + hairline rule treatment (`.landing-kicker`, `.landing-section-hairline`) gives the site a consistent scannable rhythm.
- Film grain + glass layers punch up the production value without overcooking.

**Problems:**
- **Vanta NET in the hero** (`VANTA.NET` with acid-lime points) is the visual clash of the site. It runs in parallel with the aurora orbs + `hsl(78 100% 50% / 0.35)` bloom. Hero product-side is *also* has its own bloom + MediaPlaceholder. Layered on top of the page dot grid, the hero has four overlapping ambient systems. Pick one.
- **Acid-lime glow is over-applied.** Headline highlights, button shadows, CTA glow-pulse, section kickers, and Vanta points all share the same treatment. The primary color has no tonal reserve for actual emphasis — everything shouts equally.
- **Film grain overlay (`opacity: 0.022`)** is a nice touch but combined with the Vanta particles + aurora orbs + kicker glow produces visual fatigue on long scroll. Reduce grain to 0.012 or scope it to specific sections.
- **Wordmark split (`logo` in lime + `mesh` in muted)** works in the nav but the footer fades `logo` to `rgba(196,255,0,0.45)` — inconsistent and weakens the brand anchor.

**Score: 8/10** — the design language is current, confident, and thoroughly executed; the surface is just over-lit.

### 2.3 Interaction & Motion Design

**Current state:**
- Scroll-triggered fades via custom `useFadeUp` / `useSplitText` (GSAP).
- Motion library for component entrances + button hover/tap.
- Nav dock animation on scroll past the hero sentinel.
- FAQ accordion with height/opacity animation.
- Terminal blink + marquee for tech strip.

**Strengths:**
- `HeroProductFrame` (uncommitted) does a staged line-reveal that's the best micro-interaction on the site. It answers "what do I get?" without a video. Ship it.
- `ArtifactShowcase` (uncommitted) reveals the three-stack (pytest, frame locals, artifact) on scroll with tasteful 0.15s staggered delays.
- Reduced-motion coverage is thorough (`@media (prefers-reduced-motion: reduce)` disables animations + resets opacity/transform) — accessibility-conscious by default.

**Problems:**
- **No loading states in the wizard.** Step 2 (Install creation) goes from button click → response. If the backend is slow, the user stares at a frozen button. Add a skeleton card state with "Creating your installation…" + a progress dot.
- **No optimistic feedback in `SendTestPanel`.** Clicking "Send test event" should immediately insert a shimmer row at the top of the runs table with status `in_progress`. Currently relies on the 3s poll to see the new row — feels slow.
- **FAQ accordion animates `height: auto` with Motion** — works, but the content shift repaints the entire section. Wrap in `contain: layout paint` to confine reflow.
- **No keyboard shortcuts anywhere.** 2026 B2B SaaS baseline is Cmd+K palette + `/` for search + `gh` / `gd` / `g?` navigation. Neither the marketing site nor the dashboard has any.
- **No hover state on RunsTable rows beyond background tint.** Add a subtle accent-color left border on hover; makes the "clickable?" question instantly legible.

**Score: 7/10** — what's there is refined; there are visible gaps for a product interface.

### 2.4 Conversion & Persuasion Architecture

**Current state:**
- Hero CTA: `Read the docs` (primary, lime) → `/docs`. Secondary: `See how it works` → anchor.
- Nav CTAs: `Get started` (lime) → `/onboarding`. `Read the docs` (lime) → `/docs`. Both rendered with the same weight + color.
- CTASection (bottom of page): one CTA `Read the docs` → `/docs`. Visual terminal shows `pip install logomesh` + `logomesh repro <sentry-url>`.
- Pricing page has clean tier CTAs (Free, Pilot invite-only, Enterprise custom).
- Social proof: Berkeley AgentBeats badge in the hero; feature strip labeled "Built for reliable and secure execution". No customer logos, no testimonial, no usage stat.

**Problems:**
- **Primary CTA is "Read the docs".** In a B2B SaaS funnel, docs are a mid-funnel asset. The primary CTA above the fold should activate — "Start the wizard" (→ /onboarding) or "Reproduce your first crash free". Docs should be a secondary link, not a competing primary button.
- **Two lime primary buttons in the nav.** "Get started" and "Read the docs" have identical visual weight. Demote docs to a ghost/outline button (border-border-strong, transparent bg).
- **No "above the fold" trust signal for security buyers.** The new `TrustStrip` (PCI claims, airgapped sandbox, no-LLM-in-evidence-path) exists but isn't wired. It belongs *immediately below the hero*, before the generic SocialProofStrip, so a security reviewer sees the 4 claims in 10 seconds.
- **CTASection (bottom of page) is CLI-first.** The big terminal says `pip install logomesh`. But the session-handoff replacement context is explicit: CLI is legacy. The bottom of the page should funnel to the wizard, not the pip path.
- **Pricing has no landing-page anchor.** Users read the landing, get interested, and then have to hunt for pricing. Add a `/pricing` Nav link and a `Pricing` section reference in the closing CTA.
- **"Free during beta · 3 reproductions a day" is buried in a footnote.** That's the best risk-removal signal we have. Surface it in the hero and in the CTASection, not 12 lines below the primary button.
- **No social proof beyond one award.** Berkeley AgentBeats is credible, but in a B2B shortlist a single academic credential carries less weight than 3 named pilots or 1 case study. Since pilots are invite-only/under-NDA, add an anonymized "Design partners: a PCI Level 1 payments platform + a SOC2 Type II fintech" line with a "Who we're talking to" hover.

**Score: 4/10** — the persuasion architecture is working against itself.

### 2.5 Onboarding & Activation Flow

**Current state:**
- 6-step wizard at `/onboarding`. Desktop-only gate for mobile. Hash-routed (`#step=3`) so refresh preserves progress.
- Step 1 Welcome → Step 2 Install create → Step 3 Sentry token → Step 4 GitHub PAT + repo → Step 5 Slack (optional) → Step 6 Done.
- Live validation against Sentry/GitHub/Slack APIs on save — excellent.
- `localStorage.logomesh.installation_id` + `client_secret` persisted for dashboard access.

**Strengths:**
- The wizard itself is one of the cleanest I've seen in a pre-seed B2B. Hash-based routing, correct secret handling (client_secret shown once, stored for bearer use), live upstream validation. This is ship-quality.
- Desktop-only gate for v1 is the right call — compliance officers use laptops.

**Problems:**
- **Step 1 compliance mapping is wrong** (same bug as the landing page): `"PCI DSS 6.3.2 / SOC2 CC8.1 evidence path, sealed"`.
- **No "resume" affordance** on the landing page for a returning user mid-wizard. The Nav has a `Dashboard` link if `localStorage.logomesh.installation_id` is set, but no "Finish setup →" link for a user who got to step 3 and closed the tab.
- **Step 6 is the last screen but the funnel doesn't celebrate.** After 4 minutes of setup, show a bigger "You're ready" moment — confetti-free, but a visible success pulse + a prominent "Go to dashboard" card with the bookmarkable URL pre-selected. Low effort, high perceived polish.
- **No progress autosave to the backend.** If step 4 fails silently, the user re-enters GitHub PAT from step 3 state. This is serviceable; it becomes painful at scale. (Out of scope for P1 but worth a roadmap note.)

**Score: 8/10** — excellent skeleton; needs polish on the end.

### 2.6 Dashboard & Core Product Experience

**Current state:**
- Panels stacked vertically: HeroStrip → SendTestPanel → RunsTable → ConfigPanel → CompliancePanel.
- HeroStrip: installation ID (copy button) + status pill.
- RunsTable: 6 columns (Status, Sentry issue, Exception, Duration, Created, Action). Poll every 30s, fast-poll every 3s for 30s after a test.
- StatusPill with 5 tones (verified, mismatch, review, in-progress, error).

**Strengths:**
- RunsTable auto-refresh pattern (slow poll → fast-poll window after a test fire) is the right trade-off vs. SSE/WebSockets for v1.
- The exception-match cell (sandbox type vs expected type) is a sharp piece of information — compliance auditors will look for exactly this.
- Empty state copy ("No runs yet. Send a test event above to see one.") is clear.

**Problems:**
- **No sticky sidebar / top-nav in the dashboard.** Every scroll position disconnects the user from installation identity + actions. Dashboards in 2026 (Linear, Retool, Supabase) use a persistent left rail.
- **No command palette.** On a dashboard with runs + installations + docs, Cmd+K should fuzzy-search runs by Sentry issue id, jump to the latest shipped PR, or trigger "Send test event" without scroll.
- **SendTestPanel button** is a single lime button. For a "fire a real webhook at production" button, it should have a confirmation affordance (or at least a subtle pre-click "This sends a real Sentry fixture through your orchestrator" tooltip).
- **ConfigPanel edit flow is opaque from the current file.** Need to read it, but per the pattern the edit modals should show the current masked secret (`sk_live_••••…1a3f`) and a clear last-validated timestamp.
- **No "first run" zero-state.** A new install on the dashboard sees 3-5 empty panels. Add a Compact Getting Started card that disappears once the user has ≥1 successful run.
- **Compliance panel is a disclosure block, not an interactive proof.** Let users download a sample sealed artifact JSON to inspect (`controls: ["PCI DSS 12.10.5", "SOC2 CC7.3", "SOC2 CC7.4"]`) — the seal is the product differentiator, make it tangible.

**Score: 7/10** — fundamentally sound; needs the 2026 product-UI polish layer.

### 2.7 Accessibility, Performance & Technical UX

**Strengths:**
- Reduced-motion handling is thorough.
- Focus-visible outlines with a triple-shadow ring (`0 0 0 1px bg, 3px ring, 6px ring/0.18`). Best I've seen in a hand-rolled setup.
- ARIA on FAQ (`aria-expanded`, `aria-controls`, `role="region"`), mobile menu toggle, nav landmarks.
- Min tap target 44px respected (mobile menu button, CTA buttons).

**Problems:**
- **Contrast check needed**: `--color-dim: 240 5% 52%` on `--color-canvas-2: #0c0c0f` hits ~5.6:1 contrast — AA text for normal, not AAA. Body text and footnotes use `dim` in many places. Tighten to `240 5% 58%` (~6.8:1) for AAA body.
- **No visible skip link** for keyboard users landing on `/`. Add `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>` in `app/layout.tsx`.
- **Hero has no `<h1>` scope-aware semantics**: it uses `h1` but the JSX structure also has `<p class="animate-rise rise-d1"…>` before it as visual eyebrow. Ensure reading order: eyebrow → h1 → subheading → CTA → trust. It is correct currently; double-check `tabindex` on the Vanta canvas is -1 (it's `aria-hidden`, fine).
- **Vanta NET** loads `three.min.js` + `vanta.net.min.js` from the global `window.THREE` + `window.VANTA` — this is a blocking network dependency that costs LCP. Either self-host, lazy-load after `idleCallback`, or replace with a lighter CSS-only ambient.
- **Google Fonts via `next/font`** — DM Sans with weights `400, 500, 600, 700, 800, 900` + JetBrains Mono with `300..700`. That's 11 font files. Strip unused weights (900 for DM Sans is never referenced in components I read; 300 for JB Mono likely unused).
- **`tsconfig.tsbuildinfo`** is 193KB and committed into the repo (git status shows it under version control). Add to `.gitignore`.

**Score: 7/10** — accessibility work is intentional; perf has known Vanta + font weight wins.

### 2.8 Competitive Benchmarking

Versus 3–5 best-in-class AI B2B SaaS interfaces in 2026:

| | logomesh today | Linear | Vercel (Otter) | Supabase | Stripe | Retool |
|---|---|---|---|---|---|---|
| Hero clarity (<4s) | 6 | 10 | 9 | 8 | 10 | 8 |
| CTA hierarchy | 4 | 10 | 9 | 9 | 10 | 8 |
| Trust signals above-fold | 5 | 8 | 7 | 9 | 10 | 8 |
| Motion polish | 8 | 10 | 9 | 7 | 8 | 7 |
| Cmd+K / keyboard | 0 | 10 | 9 | 9 | 7 | 10 |
| Dashboard IA | 5 | 10 | 9 | 10 | 9 | 10 |
| Docs IA | 5 | 8 | 9 | 10 | 10 | 8 |
| Pricing honesty | 9 | 7 | 6 | 8 | 8 | 6 |
| Dark/Light parity | 2 (dark only) | 10 | 10 | 10 | 10 | 10 |

**Where we win:** Pricing page is honest ("$0 during pilot, we ask for written feedback") — Linear/Stripe/Retool aren't. Design system has a distinctive brand voice (acid-lime brutalism).

**Where we lose:** Keyboard ergonomics (0 vs. 10 on Linear), dashboard persistence of state (no sidebar), docs depth (no search/embedded code), dark/light parity (dark-only — OK for engineer-facing but closes off some enterprise buyers).

---

## 3. Redesigned Experience (page-by-page)

For each page: problems + solution + copy recommendations + motion spec. Layout specs use named CSS + component references, not ASCII art — easier for the implementer.

### 3.1 Homepage (`app/page.tsx`)

**Section order (redesigned):**

```
Nav (docked-on-scroll, demoted docs CTA)
  ↓
Hero  (primary CTA = "Start the wizard free", secondary = "Read the docs",
       right side = HeroProductFrame [already exists, unwired])
  ↓
TrustStrip  (NEW — wire the uncommitted component immediately below hero;
             answers "is this safe?" in 10 seconds for security reviewers)
  ↓
TheCommentSection  (keep, but replace MediaPlaceholder with ArtifactShowcase;
                    fix compliance mapping; rewrite to webhook-first)
  ↓
HowItWorksSection  (rewrite Step 2 to webhook-first, not CLI-first;
                    add a 5th step: "You ship the fix with confidence")
  ↓
RealWorldHarnessSection  (rename "proof", sharpen — drop the YAML-path fiction;
                          replace with the real scope signal: "best on
                          deterministic Python business-logic crashes where
                          frame locals capture the failure")
  ↓
ProductOverviewSection  (tighten copy; every card needs a falsifiable claim)
  ↓
Pricing teaser  (NEW — one-row 3-card preview with "See full pricing →";
                 pulls buyers to /pricing without another click)
  ↓
FAQSection  (rewrite all CLI-first answers to webhook-first; drop the
             "Do I need to understand AI to use it?" question)
  ↓
CTASection  (rewrite: replace pip install terminal with wizard preview;
             primary CTA = "Start the wizard — 4 minutes, free during beta";
             keep the mouse-tracking glow)
  ↓
Footer  (wire /privacy, /terms, fix GitHub link or remove)
```

**Key copy changes:**

- Hero eyebrow: `For engineering teams handling production incidents` → `Python · For Sentry users doing SOC2 or PCI incident response`
- Hero headline: keep `Reproduce production crashes in about a minute.` but **change subline time from "about a minute" to "in 60 seconds"** to match docs + product claim. Consistency beats hedging.
- Hero subtitle: `Paste a crash link from your error tracker.` → `When your Sentry webhook fires, logomesh reads the program state at the moment of failure and writes a failing pytest that reproduces the crash. The audit artifact is deterministic from frame locals — no LLM in the evidence path.`
- Hero primary CTA: `Read the docs` → **`Start the wizard — free during beta`** (→ `/onboarding`). Secondary button: `Read the docs` (→ `/docs`), demoted to outline/ghost.
- Hero proof chips: keep Berkeley pill. Change the three generic pills:
  - `Under-a-minute repro flow` → `60-second Sentry → failing pytest`
  - `Deterministic test output` → `Zero LLM in the evidence path`
  - `No auto code changes` → `PCI DSS 12.10.5 · SOC2 CC7.3 / CC7.4`

### 3.2 Nav

**Problems:** Two competing lime CTAs. No pricing link. Mobile menu is vertical collapse (dated).

**Solution:**
- Primary CTA remains `Get started` (lime, → `/onboarding`).
- Demote `Read the docs` to outline style: `border border-border-strong bg-transparent text-foreground/90 hover:border-primary/55`.
- Add `Pricing` section link between `How it works` and `Get started`.
- Keep the section anchors. Keep the dock animation.
- Mobile menu: leave functional for now. P2 upgrade = bottom sheet.

### 3.3 Pricing (`app/pricing/page.tsx`)

**The page is actually well-built.** Tiers are right (Free CLI / Invite-only Pilot / Enterprise custom), feature matrix is honest, FAQ section is sharp.

**Two fixes:**
1. The "CLI" tier name + "pip install logomesh" CTA contradicts the positioning replacement ("CLI is legacy"). Rename to **`Solo`** (price: Free during beta). CTA: `Get started` → `/onboarding`. The Solo tier still includes the CLI as an "advanced mode" feature, but the tier doesn't lead with CLI.
2. Remove `PII redaction at capture time` from the Free tier (wording suggests a different product) → `PII redaction before LLM sees any frame data`.

### 3.4 Docs (`app/docs/page.tsx`)

**Compliance mapping is already correct here** (CC7.3/CC7.4 + 12.10.5). Good.

**Problems:** No search, no sidebar, no code-embedded walkthroughs. Flat card grid.

**P2 solution:** `Cmd+K` command palette in the docs shell with fuzzy search across MDX content (`@ai-sdk/rsc` or a lightweight client-side `flexsearch` index), a persistent left rail with collapsible section groups, and inline `<CodeBlock runnable>` for the quickstart snippets.

**P1 (today):** add a prominent "Quick start" CTA at the top of the index that opens the wizard — a lot of users arriving at docs actually want to try, not read.

### 3.5 Onboarding wizard

**Problem:** Step 1 compliance mapping is wrong.

**Fix (P1):** Update `Step1Welcome.tsx` bullets to `PCI DSS 12.10.5 · SOC2 CC7.3 + CC7.4 evidence path, sealed`.

**Polish (P2):**
- Add a visible progress trail under the step indicator ("Sentry ✓ · GitHub ✓ · Slack ○") so users see where they are across the 6 steps at a glance.
- Step 6 becomes a "you're ready" moment with a pulse halo on the dashboard URL.
- Add a persistent `← Back` arrow on steps 2–5 (currently step transitions are forward-only).

### 3.6 Dashboard (`app/dashboard/[installation_id]/`)

**Problems:**
- Panels stacked vertically — no persistent context.
- No command palette.
- RunsTable row hover is weak.
- No zero-state coaching for a fresh install.

**P1 fixes (ship today):**
- Add a 1-line coaching banner at the top of the dashboard when `runs_count === 0`: `Send a test event to see your first sealed artifact (takes ~30s).` Dismissible, localStorage-remembered.
- RunsTable row hover: add a 2px left border in `--color-accent/30`. Click goes to `/dashboard/[id]/runs/[run_id]` (new route; can be a drawer in P2).

**P2 fixes:**
- Persistent left rail: `Installation · Runs · Integrations · Compliance · Docs`. Collapses to icon-only on narrow viewports.
- Cmd+K palette.

### 3.7 Contact (`app/contact/page.tsx`)

Read it briefly — serves the topic-routed enterprise inquiries. Fine for P1.

### 3.8 Legal (`app/privacy`, `app/terms`)

Untracked. Wire the footer links. Content is content — leave to legal review.

---

## 4. 2026 Best-Practice Checklist

| Item | Current | Fix |
|---|---|---|
| AI-native visual language (gradients, confidence meters, streaming indicators) | Partial (the wizard "sending test event" state could show a pipeline trace) | Add a live pipeline-step indicator to `SendTestPanel` |
| Zero-state brilliance | Weak (runs table empty state is one line; dashboard has no coaching) | Add dashboard coaching banner + first-run celebration on step 6 |
| Cmd+K / AI command bar | **Missing** | P2 — add to docs first, then dashboard |
| Generative UI elements | Out of scope (this is a deterministic-repro product, generative UI would contradict the brand promise) | Skip |
| Progressive disclosure | Good on pricing; weak on docs | P2 — docs search + sidebar |
| Enterprise trust without corporate-boring | **Strong** (acid lime + near-black is distinctive) | Keep; just wire TrustStrip |
| Delightful friction removal (smart defaults, keyboard-first) | **Missing keyboard** | P2 Cmd+K; P1 — dashboard coaching banner |
| Data privacy/security visible+beautiful | Good intent (TrustStrip exists) | P1 — wire it |
| Accessibility as a feature | Solid reduced-motion; missing skip link + AA→AAA on dim text | P1 — tighten `--dim` lightness |

---

## 5. Visual Style Guide (delta from current)

The current system is 90% correct. The delta is:

**Color tokens (patch to `globals.css`):**

```css
/* Body-grade neutrals — bump dim for AAA body contrast */
--dim: 240 5% 58%;              /* was 52% — ~6.8:1 on canvas */

/* Softer primary glow variants — reserve the full shadow-glow for the single
   hero CTA only; buttons elsewhere use a quieter glow */
--shadow-glow-muted: 0 0 24px hsl(78 100% 50% / 0.18), 0 0 48px hsl(78 100% 50% / 0.08);
```

**Type scale:** keep.

**Spacing:** keep.

**Motion tokens:** keep. Add one ease for heavier UI reveals (wizard step → next step):

```css
--ease-soft-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* slight overshoot */
```

**Components to codify:**

- `Button.primary` (lime, glow-strong) — **reserved** for hero + wizard Step 1 + dashboard "Send test event".
- `Button.secondary` (outline, ghost) — everywhere else (Nav "Read the docs", "See how it works", section CTAs).
- `Pill.trust` (new) — used in TrustStrip + Hero proof chips. `border-border-strong bg-card/40 text-foreground/85 px-3.5 py-1.5 rounded-full min-h-[38px]`.
- `Pill.compliance` (new) — mono-typeset control ID pill. `border-accent/35 bg-accent/6 text-accent-foreground font-mono text-[11.5px] uppercase tracking-[0.14em]`.

---

## 6. Implementation Priority

### P1 — Ship today on `marketing-rewrite`. Effort: 2–4h. Impact: direct conversion + credibility.

1. **Fix the compliance mapping** in all 5 files: `TheCommentSection.tsx`, `Step1Welcome.tsx`, `HeroProductFrame.tsx`, `ArtifactShowcase.tsx`, `TrustStrip.tsx` → `PCI DSS 12.10.5 · SOC2 CC7.3 / CC7.4`.
2. **Wire `HeroProductFrame`, `TrustStrip`, `ArtifactShowcase` into `app/page.tsx`.** HeroProductFrame replaces the hero MediaPlaceholder. TrustStrip sits directly below the hero. ArtifactShowcase replaces the placeholder inside TheCommentSection.
3. **Rewrite hero copy + CTA** per §3.1.
4. **Demote Nav "Read the docs"** to outline. Add `Pricing` link.
5. **Rewrite CTASection** — replace the pip-install terminal with a wizard-preview card, primary CTA "Start the wizard — free during beta".
6. **Rewrite HowItWorksSection Step 2** to webhook-first. Drop YAML-scope fiction in RealWorldHarnessSection.
7. **FAQ copy rewrite** for webhook-first positioning.
8. **Footer wiring** — `/privacy`, `/terms` links (replace `#`).
9. **Bump `--dim` to 58%** for AAA body contrast.
10. **Dashboard coaching banner** when `runs_count === 0`.

### P2 — Next sprint. Effort: 2–3 days.

1. Dashboard persistent left rail + Cmd+K palette.
2. Docs search + sidebar.
3. Onboarding progress trail + back arrows.
4. Skip link + font-weight strip + Vanta lazy-load.
5. Pricing teaser card on landing.

### P3 — Roadmap. Effort: ≥1 sprint each.

1. Light theme parity.
2. Mobile-responsive wizard (currently desktop-only gate).
3. Inline runnable code in docs.
4. Keyboard-first navigation shortcuts (`gh`, `gd`, `?`).

---

## 7. Success Metrics

Define these before shipping P1 so we can measure the delta.

| Metric | Baseline proxy | Target after P1 |
|---|---|---|
| Hero → onboarding start rate | N/A (no analytics wired; use manual cookie-gate test if useful) | ≥ 12% |
| Landing → pricing page CTR | N/A | ≥ 8% |
| Onboarding step-1 → step-6 completion | N/A | ≥ 55% |
| Dashboard day-1 retention | N/A | ≥ 60% |
| Sales-qualified leads from `/contact?topic=enterprise` per month | 0 (pre-launch) | ≥ 3 |

Analytics integration (Posthog or Vercel Analytics) is deliberately out of scope for v1 per the original wizard spec. P2 can revisit once the positioning is set.

---

## 8. What's shipping today

Per this audit, the changes being committed on `marketing-rewrite` today are the P1 list above. The commits follow the scope-per-commit pattern used elsewhere in the repo. The uncommitted premium components (`HeroProductFrame`, `TrustStrip`, `ArtifactShowcase`, `CopyInstallCommand`) get included in the same commits so they finally land instead of sitting untracked.

— End of audit.
