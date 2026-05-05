import { test, expect } from "@playwright/test";

test.describe("landing — content & assets", () => {
  test("why section shows replay-not-guess framing", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const why = page.locator("#why");
    await expect(why).toBeVisible();
    await expect(why.getByRole("heading", { name: /Replay, not a guess/i })).toBeVisible();
    await expect(why.getByText(/No LLM in the evidence path/i).first()).toBeVisible();
  });

  test("how-it-works section lists four steps and security block", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const how = page.locator("#how-it-works");
    await expect(how).toBeVisible();
    await expect(how.getByRole("heading", { name: /Four steps\. One quick run/i })).toBeVisible();
    await expect(how.getByText(/Your error monitor fires/i)).toBeVisible();
    await expect(how.getByText(/paste the crash URL/i)).toBeVisible();
    await expect(
      how.getByRole("heading", { name: /Hardened, scoped, and out of your database/i }),
    ).toBeVisible();
  });

  test("FAQ section is present with accordion", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const faq = page.locator("#faq");
    await expect(faq).toBeVisible();
    await expect(faq.getByRole("heading", { name: /Questions engineers ask/i })).toBeVisible();
    await expect(faq.getByRole("button", { name: /agents that try to reproduce crashes/i })).toBeVisible();
  });

  test("proof section shows fintech scope and stat grid", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const proof = page.locator("#proof");
    await expect(proof).toBeVisible();
    await expect(proof.getByRole("heading", { name: /Built for billing bugs/i })).toBeVisible();
    await expect(proof.getByText(/Repro time/i).first()).toBeVisible();
  });

  test("hero headline and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#hero").getByRole("heading", { level: 1 })).toContainText(/Reproduce the/);
    await expect(page.locator("#hero").getByRole("heading", { level: 1 })).toContainText(/before you fix it/);

    const docsLinks = page.locator('a[href="/docs"]');
    await expect(docsLinks.first()).toBeVisible();
    expect(await docsLinks.count()).toBeGreaterThanOrEqual(1);
  });
});
