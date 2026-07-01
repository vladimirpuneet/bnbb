"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current vertical scroll position (in pixels).
 * Uses a passive scroll listener and requestAnimationFrame for performance.
 *
 * Useful for parallax effects, scroll-triggered animations, etc.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return scrollY;
}
