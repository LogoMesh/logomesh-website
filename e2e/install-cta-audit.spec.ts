import { test, expect } from "@playwright/test";

/**
 * Documents every link to the GitHub App listing so we don't stack redundant primary CTAs.
 * Run: npx playwright test e2e/install-cta-audit.spec.ts --project=desktop-chrome
 */
test.describe("install CTA audit (desktop)", () => {
  test("lists each GitHub App link with visible label", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const links = page.locator('a[href="https://github.com/apps/logomesh"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const rows: { index: number; label: string; tag: string }[] = [];
    for (let i = 0; i < count; i++) {
      const loc = links.nth(i);
      const label = (await loc.innerText()).replace(/\s+/g, " ").trim();
      const tag = await loc.evaluate((el) => el.tagName.toLowerCase());
      rows.push({ index: i, label, tag });
    }

    // Printed in test output for humans / CI logs
    // eslint-disable-next-line no-console
    console.log(`GitHub App links on /: ${count}`);
    for (const r of rows) {
      // eslint-disable-next-line no-console
      console.log(`  [${r.index}] <${r.tag}> ${r.label.slice(0, 120)}`);
    }

    expect(count).toBe(3);
  });
});
