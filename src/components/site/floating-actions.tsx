"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { property, buildWhatsappLink, defaultBookingMessage } from "@/lib/property";

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
      {/* Back to top */}
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

      {/* WhatsApp float */}
      <a
        href={buildWhatsappLink(defaultBookingMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid place-items-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-105"
        aria-label={`Chat with host on WhatsApp at ${property.whatsappDisplay}`}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-0 transition-opacity" />
        <Icon name="message" className="relative h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with host
        </span>
      </a>
    </div>
  );
}
