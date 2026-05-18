import Link from "next/link";
import { getInstallationServer, ServerFetchError } from "@/lib/api-server";
import type { InstallationSummary } from "@/lib/types";
import { CompliancePanel } from "./_components/CompliancePanel";
import { ConfigPanel } from "./_components/ConfigPanel";
import { HeroStrip } from "./_components/HeroStrip";
import { RunsTable } from "./_components/RunsTable";
import { SendTestPanel } from "./_components/SendTestPanel";

type Params = Promise<{ installation_id: string }>;

export default async function DashboardPage({ params }: { params: Params }) {
  const { installation_id } = await params;

  let summary: InstallationSummary | null = null;
  let errorMessage: string | null = null;
  try {
    summary = await getInstallationServer(installation_id);
  } catch (e) {
    if (e instanceof ServerFetchError && e.status === 404) {
      errorMessage =
        "We couldn't find that installation. The id in the URL may be stale.";
    } else if (e instanceof Error) {
      errorMessage =
        "Couldn't load this installation. The logomesh backend may be unreachable.";
    } else {
      errorMessage = "Unexpected error loading the installation.";
    }
  }

  if (!summary) {
    return (
      <main className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 px-6 py-16">
        <div className="rounded-2xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/8 p-6">
          <p className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-danger)]">
            Couldn&rsquo;t load installation
          </p>
          <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-ink)]">
            {errorMessage}
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/onboarding"
              className="inline-flex min-h-[42px] items-center rounded-xl bg-[var(--color-accent)] px-5 py-2 text-black font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em]"
            >
              Start a new installation
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[42px] items-center rounded-xl border border-[var(--color-border-hi)] px-5 py-2 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-10">
      <HeroStrip summary={summary} />
      <SendTestPanel installationId={summary.id} />
      <RunsTable installationId={summary.id} />
      <ConfigPanel installationId={summary.id} initial={summary} />
      <CompliancePanel />
    </main>
  );
}
