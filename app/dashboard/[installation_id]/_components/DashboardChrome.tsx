"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { LogoMark } from "@/components/LogoMark";
import { useInstallationId } from "@/lib/use-installation";

export function DashboardChrome() {
  const router = useRouter();
  const { id, hydrated, clear } = useInstallationId();

  const signOut = useCallback(() => {
    clear();
    router.push("/");
  }, [clear, router]);

  return (
    <header
      className="sticky top-0 z-30 border-b border-[var(--color-border)]/80 bg-[var(--color-canvas)]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <LogoMark size={26} />
            <span
              className="font-mono text-[15px] font-semibold leading-none"
              style={{ letterSpacing: "-0.03em" }}
            >
              <span
                className="text-[var(--color-accent)]"
                style={{
                  textShadow:
                    "0 0 12px rgba(196,255,0,0.36), 0 0 6px rgba(196,255,0,0.15)",
                }}
              >
                logo
              </span>
              <span className="text-[var(--color-muted)]">mesh</span>
            </span>
          </Link>
          {hydrated && id ? (
            <Link
              href={`/dashboard/${id}`}
              className="font-[family-name:var(--font-mono)] text-[12.5px] uppercase tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              Dashboard
            </Link>
          ) : null}
        </div>
        <button
          type="button"
          onClick={signOut}
          className="rounded-lg border border-[var(--color-border-hi)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
