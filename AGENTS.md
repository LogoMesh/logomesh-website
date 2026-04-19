<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## QA before merge

After UI or layout changes: run **`npm run verify`** (runs **`next build`** then Playwright on **mobile / tablet / desktop** viewports). Fix failures before merging.

For faster iteration while `npm run dev` is running: **`npm run test:e2e`** (reuse server; still runs all viewports).

