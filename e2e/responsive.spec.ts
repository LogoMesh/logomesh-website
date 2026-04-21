import { test, expect } from "@playwright/test";

/**
 * Responsive guarantees: every change should pass these on mobile / tablet / desktop.
 */

test.describe("responsive — home", () => {
  test("no horizontal overflow on document", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const { overflowX, vw } = await page.evaluate(() => ({
      overflowX:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      vw: window.innerWidth,
    }));

    expect(
      overflowX,
      `horizontal overflow ${overflowX}px at viewport ${vw}px`,
    ).toBeLessThanOrEqual(2);
  });

  test("no horizontal overflow at 360px width", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const { overflowX, vw } = await page.evaluate(() => ({
      overflowX:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      vw: window.innerWidth,
    }));

    expect(
      overflowX,
      `horizontal overflow ${overflowX}px at viewport ${vw}px`,
    ).toBeLessThanOrEqual(2);
  });

  test("sections fit viewport width", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const vw = page.viewportSize()?.width ?? 1280;

    for (const id of [
      "#hero",
      "#the-comment",
      "#proof",
      "#why",
      "#how-it-works",
      "#faq",
      "#cta",
    ]) {
      const section = page.locator(id).first();
      const count = await section.count();
      if (count === 0) continue;

      await expect(section).toBeVisible();
      const box = await section.boundingBox();
      expect(box, `${id} bounding box`).not.toBeNull();
      if (!box) continue;

      expect(box.x, `${id} left`).toBeGreaterThanOrEqual(-8);
      expect(box.x + box.width, `${id} right`).toBeLessThanOrEqual(vw + 12);
    }
  });

});
