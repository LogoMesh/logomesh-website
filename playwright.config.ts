import { defineConfig, devices } from "@playwright/test";

/** Viewports aligned with Tailwind-ish breakpoints — catch broken responsive layouts */
const VIEWPORTS = {
  mobile: { width: 390, height: 844 }, // ~iPhone 13
  tablet: { width: 834, height: 1112 }, // ~iPad landscape-ish width
  desktop: { width: 1280, height: 720 },
} as const;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
    deviceScaleFactor: 1,
    colorScheme: "dark",
  },
  projects: [
    {
      name: "mobile-chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: VIEWPORTS.mobile,
      },
    },
    {
      name: "tablet-chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: VIEWPORTS.tablet,
      },
    },
    {
      name: "desktop-chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: VIEWPORTS.desktop,
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
