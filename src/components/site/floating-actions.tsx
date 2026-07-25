"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 1.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-20 sm:bottom-6 z-30 flex flex-col items-end gap-2.5">
      <Button
        variant="outline"
        size="icon"
        className={`h-11 w-11 rounded-full bg-background/95 backdrop-blur-md shadow-lg border-border/70 transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <Icon name="chevronDown" className="h-5 w-5 rotate-180" />
      </Button>
    </div>
  );
}
