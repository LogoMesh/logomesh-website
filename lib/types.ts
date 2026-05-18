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

// Structured investigation report for non-reproducible cases.
// Advisory only — never in the sealed evidence path.

export type CrashClass =
  | "race_condition_write_write"
  | "race_condition_optimistic_lock"
  | "race_condition_read_after_write"
  | "fk_ordering"
  | "timing_dependent"
  | "external_state_required"
  | "framework_bootstrap_required"
  | "input_validation"
  | "unknown";

export type ReproDifficulty =
  | "deterministic_local"
  | "needs_threads"
  | "needs_real_db"
  | "needs_framework_bootstrap"
  | "timing_sensitive_unreproducible";

export interface EvidenceLine {
  source: "breadcrumb" | "audit" | "frame_local" | "code_ast" | "error_message";
  text: string;
}

export interface Invariant {
  statement: string;
  confidence: number;
}

export interface Hypothesis {
  rank: number;
  confidence: number;
  description: string;
  evidence_refs: string[];
  repro_difficulty: ReproDifficulty;
}

export interface HypothesisReport {
  crash_class: CrashClass;
  confidence: number;
  one_line_summary: string;
  hypotheses: Hypothesis[];
  violated_invariants: Invariant[];
  evidence: EvidenceLine[];
  suggested_repro_approach: string;
  suggested_fix_pattern: string;
  related_files: string[];
  out_of_scope_reason: string;
  in_evidence_path: false;
}
