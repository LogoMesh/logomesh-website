"use client";

import { useLayoutEffect } from "react";

// Disables default scroll restoration on full reload (avoids the “bounce” back
// to a stale scroll position). Must not call scrollTo(0) when the URL has a
// hash — that would override the browser’s scroll-to-fragment and breaks
// `/#demo`, `/#features`, etc.
export function ScrollReset() {
  useLayoutEffect(() => {
    if (history.scrollRestoration) history.scrollRestoration = "manual";

    const raw = window.location.hash;
    if (raw.length > 1) {
      try {
        const id = decodeURIComponent(raw.slice(1));
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      } catch {
        /* ignore malformed hash */
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return null;
}
