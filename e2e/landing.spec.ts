import { test, expect } from "@playwright/test";

test.describe("landing — content & assets", () => {
  test("product overview explains GitHub app and shows stats", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const overview = page.locator("#overview");
    await expect(overview).toBeVisible();
    await expect(
      overview.getByRole("heading", { name: /Checks that execute your Python diff on GitHub/i }),
    ).toBeVisible();
    await expect(overview.getByText(/It.s a GitHub App/i)).toBeVisible();
    await expect(overview.getByText(/GitHub App/i).first()).toBeVisible();
    await expect(overview.getByText(/Repositories represented/i)).toBeVisible();
  });

  test("how-it-works section lists four steps", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const how = page.locator("#how-it-works");
    await expect(how).toBeVisible();
    await expect(
      how.getByRole("heading", { name: /Four steps/i }),
    ).toBeVisible();
    await expect(how.getByText(/Add it to the repo/i)).toBeVisible();
    await expect(how.getByText(/You see it on the PR/i)).toBeVisible();
  });

  test("FAQ section is present with accordion", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const faq = page.locator("#faq");
    await expect(faq).toBeVisible();
    await expect(
      faq.getByRole("heading", { name: /Questions we get/i }),
    ).toBeVisible();
    await expect(faq.getByRole("button", { name: /What is LogoMesh/i })).toBeVisible();
  });

  test("real OSS harness section shows aggregate stats", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const harness = page.locator("#harness");
    await expect(harness).toBeVisible();
    await expect(
      harness.getByRole("heading", { name: /Real open source PRs/i }),
    ).toBeVisible();
    await expect(harness.getByText(/Harness batches/i)).toBeVisible();
  });

  test("hero headline and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.locator("#hero").getByRole("heading", { level: 1 }),
    ).toContainText(/Catch the/);
    await expect(
      page.locator("#hero").getByRole("heading", { level: 1 }),
    ).toContainText(/production/);

    const installLinks = page.locator('a[href="https://github.com/apps/logomesh"]');
    await expect(installLinks.first()).toBeVisible();
    expect(await installLinks.count()).toBeGreaterThanOrEqual(1);
  });
});
