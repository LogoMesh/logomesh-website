// Server-only helpers for fetching backend data inside server components.
// Mirrors lib/api.ts but doesn't go through the local /api proxy — it talks
// to the mock or backend directly so it works during SSR (where there's no
// origin to fetch from).

import { isMockEnabled, mockBackend } from "./mock-backend";
import type { InstallationSummary } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getInstallationServer(
  id: string,
): Promise<InstallationSummary> {
  if (isMockEnabled()) {
    return mockBackend.getInstallation(id);
  }
  const res = await fetch(`${BASE}/api/installations/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    let detail: string | undefined;
    try {
      const data = (await res.json()) as { error?: string; detail?: string };
      detail = data.detail ?? data.error;
    } catch {
      // Body wasn't JSON — fall through with status-only message.
    }
    throw new ServerFetchError(res.status, detail ?? `backend ${res.status}`);
  }
  return (await res.json()) as InstallationSummary;
}

export class ServerFetchError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
