"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "logomesh.installation_id";

export function useInstallationId() {
  const [id, setId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {
      // localStorage may be unavailable (private browsing, sandboxed iframe).
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration boundary
    setHydrated(true);
    if (stored) {
      setId(stored);
    }
  }, []);

  const save = useCallback((value: string) => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {}
    setId(value);
  }, []);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY);
    } catch {}
    setId(null);
  }, []);

  return { id, hydrated, save, clear };
}
