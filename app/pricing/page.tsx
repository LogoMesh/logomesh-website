import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing · LogoMesh",
  description:
    "Honest pricing for LogoMesh: free during beta, Agent Pro for engineering teams, Agent + Audit for regulated environments.",
};

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  forWho: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary";
  highlight?: boolean;
  features: { label: string; included: boolean | "coming" }[];
  footnote?: string;
};

const TIERS: Tier[] = [
  {
    name: "Free Beta",
    price: "Free",
    priceSuffix: "during beta",
    forWho: "Try the agent on a few real Sentry crashes",
    ctaLabel: "Start the wizard",
    ctaHref: "/onboarding",
    ctaVariant: "secondary",
    features: [
      { label: "The agent investigates every connected Sentry crash", included: true },
      { label: "Up to 3 reproductions per day", included: true },
      { label: "Dashboard with agent run history", included: true },
      { label: "Sealed audit file on every verified crash", included: true },
      { label: "PII redaction before anything leaves the agent", included: true },
      { label: "GitHub draft PR with the failing test", included: false },
      { label: "Slack delivery on a dedicated channel", included: false },
      { label: "Vendor security questionnaire support", included: false },
    ],
    footnote:
      "No credit card. After beta, the free tier keeps the same 3-a-day limit.",
  },
  {
    name: "Agent Pro",
    price: "$199",
    priceSuffix: "per month",
    forWho: "Engineering teams that want every crash auto-reproduced",
    ctaLabel: "Start the wizard",
    ctaHref: "/onboarding",
    ctaVariant: "primary",
    highlight: true,
    features: [
      { label: "Everything in Free Beta", included: true },
      { label: "Sentry webhook — every matching crash triggers the agent", included: true },
      { label: "Draft GitHub PR with the failing test", included: true },
      { label: "Slack delivery on a dedicated channel", included: true },
      { label: "Up to 200 reproductions per month", included: true },
      { label: "Direct Slack channel with the founders", included: true },
      { label: "Single-region managed Postgres for metadata", included: true },
      { label: "Dedicated VPC / on-prem deployment", included: false },
    ],
    footnote:
      "For teams ready to put the agent on real production crashes. We onboard you ourselves during this phase.",
  },
  {
    name: "Agent + Audit",
    price: "Custom",
    priceSuffix: "annual",
    forWho: "Regulated environments — PCI Level 1, SOC2 Type II, banking",
    ctaLabel: "Talk to founders",
    ctaHref: "/contact?topic=enterprise",
    ctaVariant: "secondary",
    features: [
      { label: "Everything in Agent Pro", included: true },
      { label: "Dedicated VPC or on-prem deployment", included: true },
      { label: "Audit-export bundle, MSA, DPA, security questionnaire", included: true },
      { label: "SLO on response time (verdict under 60s, P50)", included: true },
      { label: "SSO + named pager rotation for incident-mode runs", included: true },
      { label: "Priority on language expansion (Go / Node next)", included: "coming" },
      { label: "Quarterly business review with the engineering team", included: true },
      { label: "Custom audit-control mappings beyond PCI / SOC2", included: true },
    ],
    footnote:
      "Pricing depends on deployment and tenant volume. Typical engagements start in the low five figures annual.",
  },
];

const SECURITY_PILLARS = [
  {
    label: "No production DB access",
    body: "The agent works from the variable values Sentry captured at crash time. It never connects to your live database.",
  },
  {
    label: "Airgapped sandbox",
    body: "Every test runs in a Docker container with no network, an unprivileged user, and strict memory and process limits.",
  },
  {
    label: "No AI in the audit file",
    body: "The agent plans and uses tools. A deterministic Python function writes the proof. The audit file has no AI-generated content in it, by design.",
  },
];

export default function PricingPage() {
  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative w-full">
          {/* Header */}
          <section className="relative w-full">
            <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-24 md:py-28">
              <div className="mx-auto max-w-[720px] text-center">
                <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Pricing
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.6vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
                  Try the agent free.
                  <br />
                  <span
                    className="text-[var(--color-accent)]"
                    style={{
                      textShadow:
                        "0 0 22px rgba(196,255,0,0.45), 0 0 48px rgba(196,255,0,0.25)",
                    }}
                  >
                    Pay when it pays for itself.
                  </span>
                </h1>
                <p className="mt-6 text-[17px] leading-[1.65] text-[var(--color-muted)] sm:text-[18px]">
                  Start free during the beta — the agent investigates up to three crashes a
                  day. Agent Pro turns it on for every Sentry alert, adds the GitHub draft PR
                  and Slack delivery, and gets you direct access to the founders. Agent + Audit
                  is for regulated teams that need a VPC, an MSA, and an audit-export bundle.
                </p>
              </div>

              {/* Tiers */}
              <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
                {TIERS.map((tier) => (
                  <article
                    key={tier.name}
                    className={
                      tier.highlight
                        ? "relative flex flex-col rounded-2xl border border-[var(--color-accent)]/55 bg-[var(--color-canvas-2)] p-6 shadow-[0_0_0_1px_rgba(196,255,0,0.15),0_30px_80px_-40px_rgba(196,255,0,0.25)] sm:p-7"
                        : "relative flex flex-col rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/85 p-6 sm:p-7"
                    }
                  >
                    {tier.highlight && (
                      <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10.5px] font-bold uppercase tracking-[0.14em] text-black">
                        Recommended
                      </span>
                    )}

                    <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {tier.name}
                    </p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-[family-name:var(--font-display)] text-[2.25rem] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
                        {tier.price}
                      </span>
                      {tier.priceSuffix ? (
                        <span className="text-[13px] text-[var(--color-dim)]">
                          {tier.priceSuffix}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--color-muted)]">
                      {tier.forWho}
                    </p>

                    <ul className="mt-6 list-none space-y-2.5 border-t border-[var(--color-border)] pt-5">
                      {tier.features.map((f) => (
                        <li
                          key={f.label}
                          className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--color-muted)]"
                        >
                          <span
                            aria-hidden
                            className={
                              f.included === true
                                ? "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                                : f.included === "coming"
                                ? "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-hi)] text-[var(--color-dim)]"
                                : "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-[var(--color-dim)]"
                            }
                          >
                            {f.included === true ? (
                              <Check size={10} strokeWidth={3} />
                            ) : f.included === "coming" ? (
                              <span className="font-mono text-[8px] font-bold">
                                Q
                              </span>
                            ) : (
                              <Minus size={10} strokeWidth={2.5} />
                            )}
                          </span>
                          <span
                            className={
                              f.included === false
                                ? "text-[var(--color-dim)] line-through decoration-[var(--color-dim)]/40"
                                : ""
                            }
                          >
                            {f.label}
                            {f.included === "coming" ? (
                              <span className="ml-1.5 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-dim)]">
                                · in roadmap
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6">
                      <Link
                        href={tier.ctaHref}
                        className={
                          tier.ctaVariant === "primary"
                            ? "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-3 font-[family-name:var(--font-mono)] text-[13.5px] font-bold text-black shadow-[0_12px_40px_-12px_rgba(196,255,0,0.4)] transition-opacity hover:opacity-90"
                            : "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[var(--color-border-hi)] bg-transparent px-5 py-3 font-[family-name:var(--font-mono)] text-[13.5px] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/55"
                        }
                      >
                        {tier.ctaLabel}
                        <ArrowRight size={15} className="-mr-1 opacity-70" />
                      </Link>
                      {tier.footnote ? (
                        <p className="text-[12.5px] leading-[1.55] text-[var(--color-dim)]">
                          {tier.footnote}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Security pillars */}
          <section className="relative border-t border-[var(--color-border)] bg-[var(--color-canvas-2)]/40">
            <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20">
              <div className="mx-auto max-w-[720px] text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/80 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  <ShieldCheck size={12} strokeWidth={2.2} />
                  Same security posture across all tiers
                </span>
                <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.1rem)] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
                  What you don&apos;t pay extra for
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.65] text-[var(--color-muted)]">
                  Security boundaries don&apos;t scale with tier. The free beta and the
                  Agent + Audit deployment use the same agent, the same sandbox, and the
                  same redactor.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
                {SECURITY_PILLARS.map((p) => (
                  <article
                    key={p.label}
                    className="rounded-xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] p-5"
                  >
                    <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      {p.label}
                    </p>
                    <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--color-muted)]">
                      {p.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ-light */}
          <section className="relative border-t border-[var(--color-border)]">
            <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-20">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,3vw,1.85rem)] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
                Common pricing questions
              </h2>
              <dl className="mt-8 space-y-7">
                <Q
                  q="What happens to free-beta users when the beta ends?"
                  a="The free tier stays free, with the same 3-reproductions-a-day cap. We may add a paid Solo tier for engineers who want a higher limit, but we will not pull functionality out of free."
                />
                <Q
                  q="Why $199 for Agent Pro?"
                  a="That price assumes your team is on Sentry and ships a few crashes a week. If reproducing one production crash usually eats half a day of engineering time, the agent pays for itself the first week. We onboard you ourselves during this phase, so you also get founder time included."
                />
                <Q
                  q="Do you store our crash data?"
                  a="We store artifact metadata — event IDs, test file paths, control mappings, hashes — never the raw variable values from the crash. PII is redacted before anything leaves the agent."
                />
                <Q
                  q="Do you have SOC2 Type II?"
                  a="Type I in progress. Type II target Q3 2026. We share our gap-analysis report under NDA during procurement."
                />
                <Q
                  q="Can we buy Agent + Audit today?"
                  a="Yes, but we'll steer you to Agent Pro first. We don't sell the audit-bundle tier to teams that haven't run the agent against a real production crash yet."
                />
              </dl>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Q({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-[family-name:var(--font-display)] text-[16.5px] font-bold tracking-[-0.015em] text-[var(--color-ink)]">
        {q}
      </dt>
      <dd className="mt-2 text-[15px] leading-[1.65] text-[var(--color-muted)]">
        {a}
      </dd>
    </div>
  );
}
