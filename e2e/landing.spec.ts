import { test, expect } from "@playwright/test";

test.describe("landing — content & assets", () => {
  test("why section shows proof-not-opinions framing", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const why = page.locator("#why");
    await expect(why).toBeVisible();
    await expect(why.getByRole("heading", { name: /Proof, not opinions/i })).toBeVisible();
    await expect(why.getByText(/Silent on clean PRs/i)).toBeVisible();
  });

  test("how-it-works section lists four vertical steps and security block", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const how = page.locator("#how-it-works");
    await expect(how).toBeVisible();
    await expect(how.getByRole("heading", { name: /Four steps/i })).toBeVisible();
    await expect(how.getByText(/Add it to the repo/i)).toBeVisible();
    await expect(how.getByText(/A Python PR opens or updates/i)).toBeVisible();
    await expect(how.getByRole("heading", { name: /Built for least privilege/i })).toBeVisible();
  });

  test("FAQ section is present with accordion", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const faq = page.locator("#faq");
    await expect(faq).toBeVisible();
    await expect(faq.getByRole("heading", { name: /Questions we get/i })).toBeVisible();
    await expect(faq.getByRole("button", { name: /different from CodeRabbit/i })).toBeVisible();
  });

  test("proof section shows aggregate stats and real PR table", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const proof = page.locator("#proof");
    await expect(proof).toBeVisible();
    await expect(proof.getByRole("heading", { name: /Real PRs\. Real bugs\. Real repos/i })).toBeVisible();
    await expect(proof.getByText(/Bugs caught/i).first()).toBeVisible();
  });

  test("hero headline and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#hero").getByRole("heading", { level: 1 })).toContainText(/Catch the/);
    await expect(page.locator("#hero").getByRole("heading", { level: 1 })).toContainText(/before it ships/);

    const installLinks = page.locator('a[href="https://github.com/apps/logomesh"]');
    await expect(installLinks.first()).toBeVisible();
    expect(await installLinks.count()).toBeGreaterThanOrEqual(1);
  });
});
