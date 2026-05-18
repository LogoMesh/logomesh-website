import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms · logomesh",
  description:
    "Beta terms of service for logomesh CLI and pilot installations. Use is at your own discretion. No warranties during beta.",
};

const SECTIONS = [
  {
    heading: "1 · Beta status",
    body: [
      "logomesh is in public beta. The CLI is free for non-commercial and evaluation use during the beta. Pilot installations are invite-only and governed by a separate pilot agreement.",
      "Functionality is provided AS IS during beta. We may change behavior, output formats, or pricing at any time without prior notice. Production use is at your own risk.",
    ],
  },
  {
    heading: "2 · Acceptable use",
    body: [
      "You may run logomesh against any source code or Sentry event you are authorized to access. You may not run logomesh against systems you are not authorized to test or against third-party code without a license to do so.",
      "You may not use logomesh to attempt to bypass authentication, authorization, or access controls on systems you do not own or operate.",
    ],
  },
  {
    heading: "3 · Audit artifacts",
    body: [
      "logomesh emits structured artifacts that reference PCI DSS and SOC2 control IDs. The artifact is engineering output produced from your own code and your own crash data. It is not a certification, an attestation, or a substitute for a qualified assessor.",
      "Use of the artifact in an audit, internal review, or compliance workflow is at your discretion. We make no representation that the artifact will be accepted by any specific assessor or in any specific framework.",
    ],
  },
  {
    heading: "4 · Limits of liability",
    body: [
      "During the beta, logomesh is provided without warranty of any kind. To the maximum extent permitted by law, our liability for any claim arising from your use of logomesh during the beta is capped at $0.",
      "If your use case requires liability terms beyond the beta cap, contact us about a paid commercial agreement before relying on logomesh in production.",
    ],
  },
  {
    heading: "5 · Open-source components",
    body: [
      "The CLI bundles open-source components including pytest, pytest-json-report, the Docker SDK, and others. Each is governed by its own license, included in the distribution. We do not modify their license terms.",
    ],
  },
  {
    heading: "6 · Termination",
    body: [
      "You may stop using the CLI at any time. We may terminate a pilot installation with reasonable notice if you violate these terms or the separate pilot agreement.",
      "On termination of a pilot installation, we will purge artifact metadata within 30 days. Local CLI artifacts remain entirely under your control.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative w-full">
      <div className="mx-auto max-w-[760px] px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
          Legal
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5.4vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
          Terms
        </h1>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-dim)]">
          Effective 2026-05-07 · logomesh public beta
        </p>

        <p className="mt-8 text-[16px] leading-[1.7] text-[var(--color-muted)]">
          The short version: the CLI is free during beta, the artifact is
          engineering output (not a certification), and your liability cap during
          the beta is zero. The long version is below. If your procurement
          process needs a custom MSA or DPA before piloting, ask.
        </p>

        <div className="mt-12 space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-[15.5px] leading-[1.7] text-[var(--color-muted)]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-border)] pt-8 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-dim)]">
          <Link href="/privacy" className="hover:text-[var(--color-accent)]">
            ← Privacy
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-accent)]">
            Contact for a custom agreement →
          </Link>
        </div>
      </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
