"use client";

import { useState } from "react";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="absolute right-2 top-2 z-[2] rounded-md border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-muted)] transition-colors hover:border-[var(--color-border)] hover:text-[var(--color-ink)]"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
