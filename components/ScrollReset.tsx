"use client";

import { useEffect } from "react";

// Disables browser scroll restoration so the page always starts at the top
export function ScrollReset() {
  useEffect(() => {
    if (history.scrollRestoration) history.scrollRestoration = "manual";
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
}
