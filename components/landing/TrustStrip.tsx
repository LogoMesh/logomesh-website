"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Database,
  Cpu,
  BadgeCheck,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { useFadeUp } from "@/lib/animations";

/**
 * Above-the-fold trust band — the four claims a fintech security reviewer
 * looks for in the first 10 seconds. Replaces the previous marketing-fluff
 * strip ("Built for reliable and secure execution.") with concrete statements
 * each with a falsifiable subject ("we never X", "Y is deterministic", etc).
 *
 * Pairs with the longer SocialProofStrip below; this is the airport-billboard
 * version, that one is the brochure.
 */

const PILLARS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    icon: Database,
    title: "No production DB access",
    body: "Reproduction reads frame locals from the crash event. We never connect to your live database.",
  },
  {
    icon: Lock,
    title: "Airgapped sandbox",
    body: "Docker container, unprivileged user, memory and PID limits, no outbound network.",
  },
  {
    icon: Cpu,
    title: "No LLM in evidence path",
    body: "The audit artifact is deterministic from redacted frame locals — the LLM never touches the seal.",
  },
  {
    icon: BadgeCheck,
    title: "PCI DSS 12.10.5 · SOC2 CC7.3 / CC7.4",
    body: "Each artifact maps the repro to post-incident response control IDs. Reviewer-ready on day one.",
  },
];

export function TrustStrip() {
  const ref = useRef<HTMLUListElement>(null);
  useFadeUp(ref, { targets: "li", stagger: 0.08, y: 16 });

  return (
    <section
      aria-label="Security posture at a glance"
      className="relative w-full min-w-0 border-y border-[var(--color-border-hi)] bg-[var(--color-canvas-2)]/70 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-7 sm:px-8 sm:py-9 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex shrink-0 items-center gap-3 lg:max-w-[230px]">
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)]/90 text-[var(--color-accent)]"
            aria-hidden
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2} />
          </span>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[10.5px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              For your security team
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-display)] text-[15px] font-bold leading-tight tracking-[-0.015em] text-[var(--color-ink)]">
              The four claims that pass a vendor review.
            </p>
          </div>
        </div>

        <ul
          ref={ref}
          className="grid flex-1 list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="group flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)]/60 p-3.5 transition-colors hover:border-[var(--color-accent)]/35"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] text-[var(--color-accent)]"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-display)] text-[13.5px] font-bold leading-tight tracking-[-0.01em] text-[var(--color-ink)]">
                  {title}
                </p>
                <p className="mt-1 text-[12.5px] leading-[1.5] text-[var(--color-muted)]">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tertiary credential row — Berkeley + roadmap context */}
      <div className="border-t border-[var(--color-border)]/70">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-dim)] sm:px-8">
          <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
            <Image
              src="/berkeley-rdi-logo.png"
              alt=""
              width={14}
              height={14}
              className="opacity-90"
              aria-hidden
            />
            UC Berkeley AgentBeats — 1st place, testing track
          </span>
          <span className="text-[var(--color-border-hi)]">·</span>
          <span>Python 3.10+ today</span>
          <span className="text-[var(--color-border-hi)]">·</span>
          <span>SOC2 Type I in progress · Type II Q3 2026</span>
        </div>
      </div>
    </section>
  );
}
