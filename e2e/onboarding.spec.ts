import { test, expect } from "@playwright/test";

/**
 * Onboarding wizard happy path. Run with NEXT_PUBLIC_USE_MOCK_BACKEND=1
 * so the in-memory mock seeds the runs table for the dashboard assertion.
 *
 * The wizard is desktop-only (lg: gate at 1024px); mobile and tablet
 * projects render the "Open on desktop" message instead of the wizard
 * chrome — skip the test there since there's no flow to walk.
 */
test.describe("onboarding — happy path", () => {
  test.skip(
    ({ viewport }) => (viewport?.width ?? 0) < 1024,
    "Wizard is desktop-only in v1.",
  );

  test("wizard → dashboard with mock backend", async ({ page }) => {
    await page.goto("/onboarding");
    await page.waitForLoadState("networkidle");

    // Step 1 — Welcome
    await expect(
      page.getByRole("heading", { name: /sealed crash reproduction/i }),
    ).toBeVisible();
    await page.getByRole("button", { name: /^get started/i }).click();

    // Step 2 — Create installation
    await expect(
      page.getByRole("heading", { name: /create your installation/i }),
    ).toBeVisible();
    await page.getByRole("button", { name: /^create installation/i }).click();

    // Webhook URL + client secret render after POST /api/installations
    await expect(page.getByText(/webhook url/i)).toBeVisible();
    await expect(page.getByText(/client secret/i)).toBeVisible();
    await expect(page.getByText(/won.?t be shown again/i)).toBeVisible();
    await expect(page.getByText(/api\.logomesh\.dev\/webhooks\/sentry\//)).toBeVisible();
    await expect(page.getByText(/lms_secret_/)).toBeVisible();

    await page
      .getByRole("button", { name: /i.?ve copied both/i })
      .click();

    // Step 3 — Sentry
    await expect(
      page.getByRole("heading", { name: /configure sentry/i }),
    ).toBeVisible();
    await page
      .getByPlaceholder(/sntrys_/i)
      .fill("sntrys_FAKE_TOKEN_FOR_E2E_TEST_LONG_ENOUGH");
    await page.getByRole("button", { name: /send test event/i }).click();
    await expect(page.getByText(/^test sent$/i)).toBeVisible({ timeout: 10_000 });

    const continueBtn = page.getByRole("button", { name: /^continue$/i });
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Step 4 — GitHub
    await expect(
      page.getByRole("heading", { name: /connect github/i }),
    ).toBeVisible();
    await page
      .getByPlaceholder(/ghp_.*github_pat_/i)
      .fill("ghp_e2e_FAKE_TOKEN_VALID_LOOKING_1234567890");
    await page.getByPlaceholder(/example\/billing/i).fill("example/billing");
    await page.getByRole("button", { name: /^connect github$/i }).click();

    // Step 5 — Slack (skip)
    await expect(
      page.getByRole("heading", { name: /slack notifications/i }),
    ).toBeVisible();
    await page.getByRole("button", { name: /skip for now/i }).click();

    // Step 6 — Done
    await expect(page.getByRole("heading", { name: /you.?re set/i })).toBeVisible();
    await expect(page.getByText(/pilot kickoff checklist/i)).toBeVisible();

    // Navigate to dashboard
    await page.getByRole("button", { name: /go to dashboard/i }).click();
    await page.waitForURL(/\/dashboard\/[a-f0-9-]+/);

    // Dashboard should load and the mock-seeded runs should populate the table.
    await expect(page.getByText(/recent runs/i)).toBeVisible();
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible({ timeout: 10_000 });
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
  });
});
