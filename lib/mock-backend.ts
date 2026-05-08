import { randomUUID } from "node:crypto";
import type {
  CreateInstallationResponse,
  InstallationSummary,
  Run,
  RunsListResponse,
} from "./types";

interface MockInstallation {
  id: string;
  client_secret: string;
  webhook_url: string;
  created_at: string;
  sentry: { configured: boolean; last_event_at: string | null };
  github: { configured: boolean; repo: string | null };
  slack: { configured: boolean };
  runs: Run[];
}

// Module-level state. Stash on globalThis so HMR / Turbopack reloads don't drop
// the in-memory installations during a dev session.
const STATE_KEY = "__logomesh_mock_state__";
type GlobalWithMock = typeof globalThis & {
  [STATE_KEY]?: { installations: Map<string, MockInstallation> };
};
const g = globalThis as GlobalWithMock;
if (!g[STATE_KEY]) g[STATE_KEY] = { installations: new Map() };
const installations = g[STATE_KEY]!.installations;

const PUBLIC_HOST =
  process.env.NEXT_PUBLIC_PUBLIC_HOST ?? "https://api.logomesh.dev";

function delay() {
  const ms = 300 + Math.floor(Math.random() * 500);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public detail?: string,
  ) {
    super(message);
  }
}

const notFound = () =>
  new HttpError(404, "installation_not_found", "No installation with that id.");

function makeWebhookUrl(id: string) {
  return `${PUBLIC_HOST}/webhooks/sentry/${id}`;
}

function summary(inst: MockInstallation): InstallationSummary {
  return {
    id: inst.id,
    created_at: inst.created_at,
    sentry: inst.sentry,
    github: inst.github,
    slack: inst.slack,
    runs_count: inst.runs.length,
  };
}

function seedRuns(): Run[] {
  const now = Date.now();
  const ts = (mins: number) => new Date(now - mins * 60_000).toISOString();
  return [
    {
      id: randomUUID(),
      created_at: ts(2),
      sentry_issue_id: "SENTRY-4012",
      status: "shipped",
      verified_exception_match: true,
      sandbox_exception_type: "ValueError",
      expected_exception_type: "ValueError",
      duration_s: 38.4,
      pr_url: "https://github.com/example/billing/pull/124",
      sentry_comment_url:
        "https://sentry.io/organizations/example/issues/4012/comments/9/",
      test_sha256_first16: "9f3a1c0e4d72b81a",
    },
    {
      id: randomUUID(),
      created_at: ts(11),
      sentry_issue_id: "SENTRY-4011",
      status: "human_review",
      verified_exception_match: false,
      sandbox_exception_type: "TypeError",
      expected_exception_type: "ValueError",
      duration_s: 42.7,
      pr_url: null,
      sentry_comment_url:
        "https://sentry.io/organizations/example/issues/4011/comments/8/",
      test_sha256_first16: "1a8c4d2e7f0b3a9d",
    },
    {
      id: randomUUID(),
      created_at: ts(22),
      sentry_issue_id: "SENTRY-4007",
      status: "in_progress",
      verified_exception_match: null,
      sandbox_exception_type: null,
      expected_exception_type: "DecimalException",
      duration_s: null,
      pr_url: null,
      sentry_comment_url: null,
      test_sha256_first16: null,
    },
    {
      id: randomUUID(),
      created_at: ts(45),
      sentry_issue_id: "SENTRY-3998",
      status: "error",
      verified_exception_match: null,
      sandbox_exception_type: null,
      expected_exception_type: "KeyError",
      duration_s: null,
      pr_url: null,
      sentry_comment_url: null,
      test_sha256_first16: null,
    },
    {
      id: randomUUID(),
      created_at: ts(110),
      sentry_issue_id: "SENTRY-3987",
      status: "shipped",
      verified_exception_match: false,
      sandbox_exception_type: "AssertionError",
      expected_exception_type: "ValueError",
      duration_s: 51.2,
      pr_url: null,
      sentry_comment_url:
        "https://sentry.io/organizations/example/issues/3987/comments/3/",
      test_sha256_first16: "3f7d2c0a8e1b5f99",
    },
  ];
}

export const mockBackend = {
  async createInstallation(): Promise<CreateInstallationResponse> {
    await delay();
    const id = randomUUID();
    const inst: MockInstallation = {
      id,
      client_secret: `lms_secret_${randomUUID().replace(/-/g, "")}`,
      webhook_url: makeWebhookUrl(id),
      created_at: new Date().toISOString(),
      sentry: { configured: false, last_event_at: null },
      github: { configured: false, repo: null },
      slack: { configured: false },
      runs: seedRuns(),
    };
    installations.set(id, inst);
    return {
      id: inst.id,
      client_secret: inst.client_secret,
      webhook_url: inst.webhook_url,
      created_at: inst.created_at,
    };
  },

  async getInstallation(id: string): Promise<InstallationSummary> {
    await delay();
    const inst = installations.get(id);
    if (!inst) throw notFound();
    return summary(inst);
  },

  async setSentryToken(id: string, token: string): Promise<{ configured: true }> {
    await delay();
    if (!token || token.length < 8) {
      throw new HttpError(400, "invalid_token", "Sentry auth token looks too short.");
    }
    const inst = installations.get(id);
    if (!inst) throw notFound();
    inst.sentry = { configured: true, last_event_at: new Date().toISOString() };
    return { configured: true };
  },

  async setGithub(
    id: string,
    token: string,
    repo: string,
  ): Promise<{ configured: true; repo: string }> {
    await delay();
    if (!/^(ghp_|github_pat_)/.test(token)) {
      throw new HttpError(
        400,
        "invalid_token",
        "GitHub PAT must start with ghp_ or github_pat_.",
      );
    }
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
      throw new HttpError(400, "invalid_repo", "Repository must be owner/name.");
    }
    const inst = installations.get(id);
    if (!inst) throw notFound();
    inst.github = { configured: true, repo };
    return { configured: true, repo };
  },

  async setSlack(
    id: string,
    webhookUrl: string,
  ): Promise<{ configured: true }> {
    await delay();
    if (!webhookUrl.startsWith("https://hooks.slack.com/")) {
      throw new HttpError(
        400,
        "invalid_webhook",
        "Slack webhook URL must start with https://hooks.slack.com/.",
      );
    }
    const inst = installations.get(id);
    if (!inst) throw notFound();
    inst.slack = { configured: true };
    return { configured: true };
  },

  async fireTest(id: string): Promise<{ run_id: string }> {
    await delay();
    const inst = installations.get(id);
    if (!inst) throw notFound();
    const run_id = randomUUID();
    const run: Run = {
      id: run_id,
      created_at: new Date().toISOString(),
      sentry_issue_id: `SENTRY-TEST-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "in_progress",
      verified_exception_match: null,
      sandbox_exception_type: null,
      expected_exception_type: "ValueError",
      duration_s: null,
      pr_url: null,
      sentry_comment_url: null,
      test_sha256_first16: null,
    };
    inst.runs.unshift(run);
    // Resolve to "shipped" after a few seconds — simulates async pipeline.
    setTimeout(() => {
      const target = inst.runs.find((r) => r.id === run_id);
      if (!target) return;
      target.status = "shipped";
      target.verified_exception_match = true;
      target.sandbox_exception_type = "ValueError";
      target.duration_s = 36.8;
      target.pr_url = `https://github.com/example/billing/pull/${
        100 + Math.floor(Math.random() * 900)
      }`;
      target.sentry_comment_url = `https://sentry.io/organizations/example/issues/${target.sentry_issue_id}/comments/1/`;
      target.test_sha256_first16 = randomUUID().replace(/-/g, "").slice(0, 16);
    }, 5_000);
    return { run_id };
  },

  async listRuns(id: string, limit: number): Promise<RunsListResponse> {
    await delay();
    const inst = installations.get(id);
    if (!inst) throw notFound();
    return { runs: inst.runs.slice(0, limit) };
  },

  async getArtifact(id: string, runId: string): Promise<unknown> {
    await delay();
    const inst = installations.get(id);
    if (!inst) throw notFound();
    const run = inst.runs.find((r) => r.id === runId);
    if (!run) throw new HttpError(404, "run_not_found");
    return {
      schema_version: "1.0",
      installation_id: id,
      run_id: runId,
      sentry_issue_id: run.sentry_issue_id,
      created_at: run.created_at,
      status: run.status,
      verified_exception_match: run.verified_exception_match,
      sandbox_exception_type: run.sandbox_exception_type,
      expected_exception_type: run.expected_exception_type,
      duration_s: run.duration_s,
      control_mappings: ["PCI DSS 6.3.2", "SOC2 CC8.1"],
      evidence_path_seal: {
        llm_in_evidence_path: false,
        sealed_at: run.created_at,
        synthesizer_version: "v2",
      },
      pr_url: run.pr_url,
      sentry_comment_url: run.sentry_comment_url,
      test_sha256_first16: run.test_sha256_first16,
    };
  },
};

export function isMockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === "1";
}
