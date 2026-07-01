"use client";

import { useEffect } from "react";

/**
 * Registers the service worker on the client.
 * Only runs in production builds; skips in dev to avoid caching HMR assets.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // Skip in dev — SW caching interferes with HMR
    if (process.env.NODE_ENV === "development") return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.waiting) {
          // New version waiting — activate immediately
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      } catch {
        // SW registration failed — silently ignore (site still works without offline support)
      }
    };

    register();
  }, []);

  return null;
}
