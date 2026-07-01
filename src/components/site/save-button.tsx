"use client";

import { toast } from "sonner";
import { Icon } from "./icon";
import { useWishlist } from "./use-wishlist";

interface SaveButtonProps {
  variant?: "ghost" | "solid" | "outline";
  className?: string;
  label?: string;
}

export function SaveButton({
  variant = "ghost",
  className = "",
  label = "Save",
}: SaveButtonProps) {
  const { saved, toggle, mounted } = useWishlist();

  const handleToggle = () => {
    const next = toggle();
    if (next.saved) {
      toast.success("Saved to wishlist ♥", {
        description: "We'll keep this property bookmarked for your next visit.",
      });
    } else {
      toast("Removed from wishlist", {
        description: "The property has been removed from your saved list.",
      });
    }
  };

  // Before hydration, render in the unsaved state to match SSR
  const isSaved = mounted && saved;

  const triggerClass =
    variant === "solid"
      ? `inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/20 text-xs sm:text-sm font-medium transition-colors ${className}`
      : variant === "outline"
        ? `inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-background hover:bg-secondary text-foreground text-xs sm:text-sm font-medium transition-colors ${className}`
        : `inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-foreground/80 hover:bg-secondary/70 hover:text-foreground text-xs sm:text-sm font-medium transition-colors ${className}`;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={triggerClass}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
    >
      <Icon
        name="heart"
        className={`h-4 w-4 transition-all duration-300 ${
          isSaved
            ? "fill-rose-500 text-rose-500 scale-110"
            : variant === "solid"
              ? "text-white"
              : "text-foreground/70"
        }`}
        strokeWidth={isSaved ? 0 : 2}
      />
      <span className="hidden sm:inline">{isSaved ? "Saved" : label}</span>
    </button>
  );
}
