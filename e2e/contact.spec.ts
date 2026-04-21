import { test, expect } from "@playwright/test";

test.describe("contact page", () => {
  test("renders hero, form labels, and aside", async ({ page }) => {
    await page.goto("/contact");

    await expect(
      page.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeVisible();

    await expect(page.getByRole("heading", { name: "Send a message" })).toBeVisible();

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Work email")).toBeVisible();
    await expect(page.getByLabel("What should we know?")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Send message" }),
    ).toBeVisible();

    await expect(page.getByText("Other ways to reach us")).toBeVisible();
    await expect(page.getByRole("link", { name: /GitHub App/i })).toBeVisible();
  });

  test("footer Contact links to contact page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
