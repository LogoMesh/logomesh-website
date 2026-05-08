import type {
  CreateInstallationResponse,
  InstallationSummary,
  RunsListResponse,
} from "./types";
import { readInstallationSecret } from "./use-installation";

export class ApiClientError extends Error {
  constructor(
    public status: number,
    public code: string,
    public detail?: string,
  ) {
    super(detail ?? code);
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { json?: unknown; auth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init?.headers as Record<string, string>) ?? {}),
  };
  // Auto-attach Bearer auth for endpoints scoped to a specific install.
  // POST /api/installations (create) is anonymous so callers pass auth: false.
  if (init?.auth !== false) {
    const secret = readInstallationSecret();
    if (secret && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${secret}`;
    }
  }
  const body = init?.json !== undefined ? JSON.stringify(init.json) : init?.body;

  let res: Response;
  try {
    res = await fetch(path, { ...init, headers, body });
  } catch {
    throw new ApiClientError(
      0,
      "network_unreachable",
      "Can't reach the LogoMesh backend. Is your network blocking it?",
    );
  }

  if (!res.ok) {
    let code = `http_${res.status}`;
    let detail: string | undefined;
    try {
      const data = (await res.json()) as { error?: string; detail?: string };
      if (typeof data.error === "string") code = data.error;
      if (typeof data.detail === "string") detail = data.detail;
    } catch {
      // Body wasn't JSON — keep default code.
    }
    if (res.status >= 500 && !detail) {
      detail = "Something went wrong on our end. We've been notified.";
    }
    throw new ApiClientError(res.status, code, detail);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  createInstallation: () =>
    request<CreateInstallationResponse>("/api/installations", {
      method: "POST",
      json: {},
      auth: false,
    }),
  getInstallation: (id: string) =>
    request<InstallationSummary>(`/api/installations/${id}`),
  setSentryToken: (id: string, token: string) =>
    request<{ configured: true }>(`/api/installations/${id}/sentry-token`, {
      method: "PUT",
      json: { token },
    }),
  setGithub: (id: string, token: string, repo: string) =>
    request<{ configured: true; repo: string }>(
      `/api/installations/${id}/github`,
      { method: "PUT", json: { token, repo } },
    ),
  setSlack: (id: string, webhookUrl: string) =>
    request<{ configured: true }>(`/api/installations/${id}/slack`, {
      method: "PUT",
      json: { webhook_url: webhookUrl },
    }),
  fireTest: (id: string) =>
    request<{ run_id: string }>(`/api/installations/${id}/test`, {
      method: "POST",
      json: {},
    }),
  listRuns: (id: string, limit = 20) =>
    request<RunsListResponse>(`/api/installations/${id}/runs?limit=${limit}`),
  artifactUrl: (id: string, runId: string) =>
    `/api/installations/${id}/runs/${runId}/artifact`,
};

/** Convert any thrown error into a sentence safe to show in a banner. */
export function humanError(e: unknown): string {
  if (e instanceof ApiClientError) {
    if (e.status === 0) {
      return "Can't reach the LogoMesh backend. Is your network blocking it?";
    }
    if (e.status >= 500) {
      return (
        e.detail ?? "Something went wrong on our end. We've been notified."
      );
    }
    if (e.detail) return e.detail;
    return `Request failed (${e.code}).`;
  }
  if (e instanceof Error && e.message) return e.message;
  return "An unexpected error occurred.";
}
