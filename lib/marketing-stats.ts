import { HARNESS_AGGREGATE } from "@/lib/harness-public.generated";

/**
 * Cumulative stats from internal real-PR harness runs
 * (`logomesh-startup/results/real_prs_run_*.json`).
 *
 * Regenerate `lib/harness-public.generated.ts`:
 *   npm run sync:harness
 * (expects `../logomesh-startup/results` or set `LOGOMESH_RESULTS_DIR`)
 */
export const HARNESS_STATS = {
  /** Distinct batch outputs (real_prs_run_N.json files) */
  batchRuns: HARNESS_AGGREGATE.batchRunFiles,
  /** Unique (repo, PR number) pairs seen across harness */
  uniquePrs: HARNESS_AGGREGATE.uniquePullRequests,
  /** Distinct GitHub repos */
  reposRepresented: HARNESS_AGGREGATE.distinctRepos,
  /** Sum of confirmed_findings across per-file ok rows */
  confirmedFindings: HARNESS_AGGREGATE.confirmedFindingsSum,
  /** Per-file rows where a PR comment was produced */
  fileRowsWithComment: HARNESS_AGGREGATE.fileRowsWithPrComment,
} as const;
