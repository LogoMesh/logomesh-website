import { test, expect } from "@playwright/test";

/**
 * Documents every /docs link on the landing page so we don't stack redundant
 * docs CTAs again. Current design funnels /docs as a secondary reference, not
 * a primary CTA; activation CTAs point to /onboarding.
 * Run: npx playwright test e2e/install-cta-audit.spec.ts --project=desktop-chrome
 */
test.describe("docs CTA audit (desktop)", () => {
  test("lists each /docs link with visible label", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const links = page.locator('a[href="/docs"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const rows: { index: number; label: string; tag: string }[] = [];
    for (let i = 0; i < count; i++) {
      const loc = links.nth(i);
      const label = (await loc.innerText()).replace(/\s+/g, " ").trim();
      const tag = await loc.evaluate((el) => el.tagName.toLowerCase());
      rows.push({ index: i, label, tag });
    }

    // eslint-disable-next-line no-console
    console.log(`/docs links on /: ${count}`);
    for (const r of rows) {
      // eslint-disable-next-line no-console
      console.log(`  [${r.index}] <${r.tag}> ${r.label.slice(0, 120)}`);
    }

    // Hero secondary link, Nav ghost button, Footer link.
    // CTASection intentionally points to /onboarding + /pricing only.
    expect(count).toBe(3);
  });
});
