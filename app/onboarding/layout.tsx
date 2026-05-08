import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Set up LogoMesh · 4-minute pilot install",
  description:
    "Connect Sentry, GitHub, and (optionally) Slack to your LogoMesh installation. Sealed evidence, no LLM in the evidence path.",
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-dvh w-full overflow-hidden bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(78 100% 50% / 0.06) 0%, transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
