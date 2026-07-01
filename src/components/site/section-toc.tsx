"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "gallery", label: "Photos", icon: "camera" },
  { id: "overview", label: "Overview", icon: "sparkles" },
  { id: "pricing", label: "Pricing", icon: "medal" },
  { id: "space", label: "The space", icon: "sofa" },
  { id: "bedrooms", label: "Bedrooms", icon: "bed" },
  { id: "amenities", label: "Amenities", icon: "utensils" },
  { id: "weather", label: "Weather", icon: "sun" },
  { id: "reviews", label: "Reviews", icon: "star" },
  { id: "location", label: "Location", icon: "mapPin" },
  { id: "host", label: "Host", icon: "users" },
  { id: "rules", label: "Rules", icon: "shield" },
  { id: "faq", label: "FAQ", icon: "quote" },
] as const;

/**
 * Floating mini table-of-contents fixed to the right edge of the viewport
 * on large screens. Highlights the section currently in view and lets
 * the user jump to any section with one click.
 *
 * Hidden on small screens (the navbar mobile menu serves that role).
 */
export function SectionToc() {
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that's currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Trigger when section's top crosses ~30% of viewport height
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-1.5"
      aria-label="Section navigation"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        const isHovered = hovered === s.id;
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex items-center justify-end gap-2 h-7 transition-all"
            aria-label={`Jump to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label tooltip */}
            <span
              className={cn(
                "absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground/90 text-background px-2.5 py-1 text-xs font-medium shadow-md transition-all duration-200",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none",
              )}
            >
              {s.label}
            </span>
            {/* Dot indicator */}
            <span
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "h-2.5 w-2.5 bg-primary ring-4 ring-primary/15"
                  : "h-2 w-2 bg-foreground/25 group-hover:bg-foreground/50",
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
