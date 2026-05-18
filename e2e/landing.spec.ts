import { test, expect } from "@playwright/test";

test.describe("landing — content & assets", () => {
  test("why section articulates the logomesh differentiator", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const why = page.locator("#why");
    await expect(why).toBeVisible();
    await expect(why.getByRole("heading", { name: /Why teams choose logomesh/i })).toBeVisible();
    await expect(why.getByText(/Debug from facts/i).first()).toBeVisible();
  });

  test("how-it-works section walks the four-step webhook flow", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const how = page.locator("#how-it-works");
    await expect(how).toBeVisible();
    await expect(how.getByRole("heading", { name: /How logomesh works/i })).toBeVisible();
    await expect(how.getByText(/A production crash fires in Sentry/i)).toBeVisible();
    await expect(how.getByText(/Sentry calls your logomesh webhook/i)).toBeVisible();
    await expect(
      how.getByRole("heading", { name: /Built with security boundaries/i }),
    ).toBeVisible();
  });

  test("FAQ section is present with accordion", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const faq = page.locator("#faq");
    await expect(faq).toBeVisible();
    await expect(faq.getByRole("heading", { name: /Common questions/i })).toBeVisible();
    await expect(faq.getByRole("button", { name: /What does logomesh actually do/i })).toBeVisible();
  });

  test("proof section shows scope + stat grid", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const proof = page.locator("#proof");
    await expect(proof).toBeVisible();
    await expect(proof.getByRole("heading", { name: /Best for high-impact backend incidents/i })).toBeVisible();
    await expect(proof.getByText(/Repro time/i).first()).toBeVisible();
  });

  test("hero headline and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#hero").getByRole("heading", { level: 1 })).toContainText(/Reproduce production/);
    await expect(page.locator("#hero").getByRole("heading", { level: 1 })).toContainText(/in 60 seconds/);

    // Primary CTA drives activation, not docs.
    const startLink = page.locator("#hero a[href='/docs/quickstart']");
    await expect(startLink.first()).toBeVisible();

    // Docs is still accessible as a secondary link.
    const docsLinks = page.locator("#hero a[href='/docs']");
    await expect(docsLinks.first()).toBeVisible();
  });
});
