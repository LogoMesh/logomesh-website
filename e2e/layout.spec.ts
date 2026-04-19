import { test, expect } from "@playwright/test";

function parseRgb(rgb: string): [number, number, number] | null {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

test.describe("chrome & background", () => {
  test("html/body/root paint near-black canvas (no transparent strip / wrong chrome)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const metrics = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const root = document.querySelector(".page-root-shell");
      return {
        htmlBg: getComputedStyle(html).backgroundColor,
        bodyBg: getComputedStyle(body).backgroundColor,
        rootBg: root ? getComputedStyle(root).backgroundColor : "",
        scrollH: html.scrollHeight,
        innerH: window.innerHeight,
      };
    });

    expect(metrics.scrollH).toBeGreaterThan(metrics.innerH * 0.5);

    const htmlRgb = parseRgb(metrics.htmlBg);
    const bodyRgb = parseRgb(metrics.bodyBg);
    expect(htmlRgb).not.toBeNull();
    expect(bodyRgb).not.toBeNull();

    if (htmlRgb && bodyRgb) {
      expect(Math.abs(htmlRgb[0] - bodyRgb[0])).toBeLessThan(18);
      expect(Math.abs(htmlRgb[1] - bodyRgb[1])).toBeLessThan(18);
      expect(Math.abs(htmlRgb[2] - bodyRgb[2])).toBeLessThan(18);
      expect(htmlRgb.every((c) => c < 28)).toBeTruthy();
    }

    if (metrics.rootBg) {
      const rootRgb = parseRgb(metrics.rootBg);
      if (rootRgb && htmlRgb) {
        expect(Math.abs(rootRgb[0] - htmlRgb[0])).toBeLessThan(22);
      }
    }
  });

  test("hero heading is visible and aligned in viewport", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();

    const box = await hero.locator("h1").boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.y).toBeGreaterThanOrEqual(-2);
      expect(box.y).toBeLessThan(520);
      const vw = page.viewportSize()?.width ?? 1280;
      /* lg+: hero is two columns — headline stays in left column (~half width minus gap) */
      const minExpected =
        vw >= 1024 ? vw * 0.34 : vw * 0.68;
      expect(box.width).toBeGreaterThan(minExpected - 48);
      expect(box.x).toBeGreaterThanOrEqual(-4);
      expect(box.x + box.width).toBeLessThanOrEqual(vw + 8);
    }
  });

  test("nav shell visible and spans expected width", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const vw = page.viewportSize()?.width ?? 1280;
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
    const navBox = await nav.boundingBox();
    expect(navBox).not.toBeNull();
    if (navBox) {
      expect(navBox.width).toBeGreaterThan(Math.min(240, vw * 0.55));
      expect(navBox.x).toBeGreaterThanOrEqual(-2);
      expect(navBox.x + navBox.width).toBeLessThanOrEqual(vw + 4);
      expect(navBox.y).toBeGreaterThanOrEqual(0);
    }
  });
});
