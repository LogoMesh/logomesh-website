"use client";

import { useCallback, useEffect, useState } from "react";

const KEY_ID = "logomesh.installation_id";
const KEY_SECRET = "logomesh.installation_secret";

/**
 * Persist the installation id + per-install client_secret across page
 * reloads. The secret doubles as the wizard's bearer token (the same
 * value is also pasted into Sentry's Custom Integration form for HMAC
 * signing). It is shown to the user exactly once at create time and
 * cannot be re-fetched, so we keep it in localStorage.
 */
export function useInstallationId() {
  const [id, setId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY_ID);
    } catch {
      // localStorage may be unavailable (private browsing, sandboxed iframe).
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration boundary
    setHydrated(true);
    if (stored) {
      setId(stored);
    }
  }, []);

  const save = useCallback((value: string, secret?: string) => {
    try {
      window.localStorage.setItem(KEY_ID, value);
      if (secret) {
        window.localStorage.setItem(KEY_SECRET, secret);
      }
    } catch {}
    setId(value);
  }, []);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY_ID);
      window.localStorage.removeItem(KEY_SECRET);
    } catch {}
    setId(null);
  }, []);

  return { id, hydrated, save, clear };
}

/** Read the stored client_secret. Returns null on the server. */
export function readInstallationSecret(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY_SECRET);
  } catch {
    return null;
  }
}
