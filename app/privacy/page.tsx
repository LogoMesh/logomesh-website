import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy · logomesh",
  description:
    "How logomesh handles crash data, frame locals, and audit artifacts. PII is redacted at capture time. No frame data leaves your sandbox unredacted.",
};

const SECTIONS = [
  {
    heading: "What we collect",
    body: [
      "When you run logomesh against a Sentry event, the CLI fetches the event payload from your Sentry organization using credentials you provide. The fetched payload is processed locally on the machine running the CLI.",
      "When you connect a pilot installation, we additionally store the metadata you supply during onboarding — your Sentry organization slug, GitHub installation id, and (optionally) Slack incoming webhook URL — for the lifetime of the pilot.",
    ],
  },
  {
    heading: "PII redaction",
    body: [
      "Frame locals captured at the moment of failure are passed through a deterministic redactor before any LLM call and before being written into a synthesized test. The redactor matches PAN-shaped numerics (Luhn-validated) and a configurable field-name allowlist (email, password, token, secret, card_*, ssn, dob, phone).",
      "Redacted values are replaced with the literal token ⟨redacted⟩. Original values do not transit our systems and are not persisted in any audit artifact.",
    ],
  },
  {
    heading: "Where data lives",
    body: [
      "Reproduction runs execute in a hardened, airgapped Docker sandbox on the machine that invoked the CLI. Sandbox containers run as the unprivileged `nobody` user with memory and PID limits and no outbound network. Generated tests, redacted frame locals, and signed audit artifacts are written under the working directory.",
      "For pilot installations, we store the same artifact metadata in a single-region managed Postgres instance with at-rest encryption. Raw frame locals are never persisted server-side.",
    ],
  },
  {
    heading: "What we never do",
    body: [
      "We do not pull from your production database to construct a reproduction. The repro path reads frame locals captured at the crash, never live customer state.",
      "We do not train any model on your code, your crash payloads, or your audit artifacts. The audit-artifact path itself contains no LLM call — it is deterministic from the redacted frame locals.",
      "We do not upload your generated tests, your source code, or any non-public symbol from your codebase to a third party.",
    ],
  },
  {
    heading: "Subprocessors",
    body: [
      "CLI mode has no subprocessors — everything runs locally.",
      "Pilot installations use Sentry (your account), GitHub (your installation), and — optionally — your Slack incoming webhook. We do not share data with any other third party.",
    ],
  },
  {
    heading: "Your controls",
    body: [
      "Pilot tenants can revoke a Sentry token, GitHub app installation, or Slack webhook at any time from the dashboard. Revocation is enforced on the next pipeline run; in-flight runs are not retroactively cancelled.",
      "Pilot artifact metadata is deleted within 30 days of revocation. Artifacts written to your working directory in CLI mode are entirely under your control.",
    ],
  },
];

export default function PrivacyPage() {
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
          Privacy
        </h1>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--color-dim)]">
          Effective 2026-05-07 · logomesh public beta
        </p>

        <p className="mt-8 text-[16px] leading-[1.7] text-[var(--color-muted)]">
          logomesh is a crash-reproduction tool for backend Python services. The
          summary below describes what data the CLI and pilot service touch, what
          they never touch, and the controls available to pilot tenants. If your
          security review needs more detail than what is here, get in touch.
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

        <div className="mt-16 rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/70 p-6 sm:p-8">
          <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Security review questions
          </p>
          <p className="mt-3 text-[15.5px] leading-[1.65] text-[var(--color-muted)]">
            We will respond to a vendor questionnaire (CAIQ-Lite or your own
            template) within two business days during the pilot.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 font-[family-name:var(--font-mono)] text-[13px] font-bold text-black"
            >
              <Mail size={14} strokeWidth={2.4} />
              Contact security
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--color-border-hi)] bg-transparent px-4 py-2.5 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              Read the Terms →
            </Link>
          </div>
        </div>
      </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
