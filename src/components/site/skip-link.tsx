"use client";

/**
 * Accessible skip link — visually hidden until focused, allows keyboard
 * users to bypass the navbar and jump straight to the main content.
 *
 * Renders an anchor that becomes visible on focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-primary focus:text-primary-foreground focus:font-medium focus:text-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
