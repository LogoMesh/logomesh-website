export type LineKind = "cmd" | "step-done" | "step-run" | "crash" | "crash-detail" | "success";

export type Line = {
  kind: LineKind;
  text: string;
};

export type Scenario = {
  id: string;
  label: string;
  prNumber: string;
  repo: string;
  lines: Line[];
};

// Three scenarios. Each tells a complete caught to fixed story in ~6 lines.
// Lines animate in with staggered reveals; final line posts the proof + fix.

export const SCENARIOS: Scenario[] = [
  {
    id: "flask",
    label: "Flask",
    prNumber: "#47",
    repo: "checkout-service",
    lines: [
      { kind: "cmd", text: "$ logomesh, PR #47, checkout-service" },
      { kind: "step-done", text: "▸ fetching changed files... ✓" },
      { kind: "step-done", text: "▸ locking in what should hold... ✓" },
      { kind: "step-run", text: "▸ stress-testing applyCoupon()..." },
      { kind: "crash", text: '✗ CRASH on input { coupon: "EXPIRED", retry: 2 }' },
      { kind: "crash-detail", text: "   → customer charged twice" },
      { kind: "success", text: "✓ proof + fix posted to PR #47" },
    ],
  },
  {
    id: "stripe",
    label: "Stripe",
    prNumber: "#92",
    repo: "stripe-payments",
    lines: [
      { kind: "cmd", text: "$ logomesh, PR #92, stripe-payments" },
      { kind: "step-done", text: "▸ fetching changed files... ✓" },
      { kind: "step-done", text: "▸ locking in what should hold... ✓" },
      { kind: "step-run", text: "▸ stress-testing refund_customer()..." },
      { kind: "crash", text: '✗ CRASH on input { amount: -50.00, currency: "USD" }' },
      { kind: "crash-detail", text: "   → negative refund bypasses dispute check" },
      { kind: "success", text: "✓ proof + fix posted to PR #92" },
    ],
  },
  {
    id: "django",
    label: "Django",
    prNumber: "#13",
    repo: "django-auth",
    lines: [
      { kind: "cmd", text: "$ logomesh, PR #13, django-auth" },
      { kind: "step-done", text: "▸ fetching changed files... ✓" },
      { kind: "step-done", text: "▸ locking in what should hold... ✓" },
      { kind: "step-run", text: "▸ stress-testing validate_token()..." },
      { kind: "crash", text: '✗ CRASH on input { token: "", user: "admin" }' },
      { kind: "crash-detail", text: "   → empty token authenticates admin session" },
      { kind: "success", text: "✓ proof + fix posted to PR #13" },
    ],
  },
];
