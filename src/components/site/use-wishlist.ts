"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "valley-gaze:wishlist";

interface WishlistState {
  saved: boolean;
  savedAt: number | null;
}

const DEFAULT_STATE: WishlistState = { saved: false, savedAt: null };

function readStorage(): WishlistState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return JSON.parse(raw) as WishlistState;
  } catch {
    return DEFAULT_STATE;
  }
}

/**
 * Persisted wishlist — uses localStorage so the user's "saved" state
 * survives across visits on the same device/browser.
 *
 * Uses a mounted flag to avoid SSR hydration mismatch — the saved state
 * is only read after the component mounts on the client.
 */
export function useWishlist() {
  // Lazy initializer reads from localStorage on first client render
  const [state, setState] = useState<WishlistState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  // Read once after mount — safe, effect-free
  if (!mounted && typeof window !== "undefined") {
    setMounted(true);
    setState(readStorage());
  }

  const toggle = useCallback(() => {
    const next = state.saved
      ? DEFAULT_STATE
      : { saved: true, savedAt: Date.now() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota errors */
    }
    setState(next);
    return next;
  }, [state]);

  return { saved: state.saved, savedAt: state.savedAt, toggle, mounted };
}
