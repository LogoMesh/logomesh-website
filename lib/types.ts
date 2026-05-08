export type RunStatus = "shipped" | "human_review" | "error" | "in_progress";

export interface Run {
  id: string;
  created_at: string;
  sentry_issue_id: string;
  status: RunStatus;
  verified_exception_match: boolean | null;
  sandbox_exception_type: string | null;
  expected_exception_type: string | null;
  duration_s: number | null;
  pr_url: string | null;
  sentry_comment_url: string | null;
  test_sha256_first16: string | null;
}

export interface InstallationSummary {
  id: string;
  created_at: string;
  sentry: { configured: boolean; last_event_at: string | null };
  github: { configured: boolean; repo: string | null };
  slack: { configured: boolean };
  runs_count: number;
}

export interface CreateInstallationResponse {
  id: string;
  client_secret: string;
  webhook_url: string;
  created_at: string;
}

export interface RunsListResponse {
  runs: Run[];
}

export interface ApiErrorBody {
  error: string;
  detail?: string;
}
