import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardChrome } from "./_components/DashboardChrome";

export const metadata: Metadata = {
  title: "LogoMesh · Installation dashboard",
  description: "Runs, configuration, and compliance status for your LogoMesh installation.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-dvh w-full bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <DashboardChrome />
      {children}
    </div>
  );
}
