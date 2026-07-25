"use client";

import { toast } from "sonner";
import { Icon } from "./icon";
import { property } from "@/lib/property";
import { trackEvent } from "@/lib/tracking";

interface ShareButtonProps {
  scrolled?: boolean;
  className?: string;
}

export function ShareButton({ scrolled = false, className = "" }: ShareButtonProps) {
  const shareText = `Check out ${property.name} in ${property.location} — a serene 3BHK penthouse with stunning valley views. ${property.hero.rating}★ on Airbnb.`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: property.name,
          text: shareText,
          url: window.location.href,
        });
        trackEvent("share_property", { method: "native" });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied!", {
          description: "Share it with your travel companions.",
        });
        trackEvent("share_property", { method: "clipboard" });
      } catch {
        toast.error("Couldn't copy", {
          description: "Please copy the URL from the address bar.",
        });
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-xs sm:text-sm font-medium transition-colors ${
        scrolled
          ? "bg-white/10 backdrop-blur-md text-black hover:bg-black/5 border border-black/10"
          : "bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/20"
      } ${className}`}
      aria-label="Share this listing"
    >
      <Icon name="share" className="h-4 w-4" strokeWidth={2} />
      <span className="hidden sm:inline">Share</span>
    </button>
  );
}
