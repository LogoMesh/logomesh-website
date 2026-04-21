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
      "#integrate",
      "#harness",
      "#overview",
      "#how-it-works",
      "#demo",
      "#faq",
      "#cta",
      "#security",
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

  test("demo section copy stays within viewport", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const vw = page.viewportSize()?.width ?? 1280;
    const demo = page.locator("#demo");
    await expect(demo).toBeVisible();

    const heading = demo.locator("h2").first();
    await expect(heading).toBeVisible();
    const hBox = await heading.boundingBox();
    expect(hBox).not.toBeNull();
    if (hBox) {
      expect(hBox.x).toBeGreaterThanOrEqual(-8);
      expect(hBox.x + hBox.width).toBeLessThanOrEqual(vw + 12);
    }

    const bodyCopy = demo
      .getByText(/Add LogoMesh to a repo, open or update a Python PR/i)
      .first();
    await expect(bodyCopy).toBeVisible();
    const pBox = await bodyCopy.boundingBox();
    expect(pBox).not.toBeNull();
    if (pBox) {
      expect(pBox.x).toBeGreaterThanOrEqual(-8);
      expect(pBox.x + pBox.width).toBeLessThanOrEqual(vw + 12);
    }
  });

  test("demo browser frame scales without clipping controls", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const vw = page.viewportSize()?.width ?? 1280;
    const frame = page.locator("#demo div.overflow-hidden").first();
    await expect(frame).toBeVisible();
    const box = await frame.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(Math.min(vw - 32, 280));
      expect(box.x).toBeGreaterThanOrEqual(-4);
      expect(box.x + box.width).toBeLessThanOrEqual(vw + 8);
    }
  });
});
