"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "./icon";
import { property } from "@/lib/property";

interface ShareButtonProps {
  variant?: "ghost" | "solid" | "outline";
  className?: string;
  label?: string;
}

export function ShareButton({
  variant = "ghost",
  className = "",
  label = "Share",
}: ShareButtonProps) {
  // Lazily read browser-only APIs once on first client render
  const [url] = useState(() =>
    typeof window !== "undefined" ? window.location.href : property.airbnbUrl,
  );
  const [canShare] = useState(
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
  );

  const shareText = `Check out ${property.name} in ${property.location} — a serene 3BHK penthouse with stunning valley views. ${property.hero.rating}★ on Airbnb.`;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: property.name,
        text: shareText,
        url,
      });
    } catch {
      /* user cancelled */
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!", {
        description: "Share it with your travel companions.",
      });
    } catch {
      toast.error("Couldn't copy", {
        description: "Please copy the URL from the address bar.",
      });
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: "message",
      color: "text-[#25D366]",
      href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`,
    },
    {
      name: "X / Twitter",
      icon: "share",
      color: "text-foreground",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: "users",
      color: "text-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Email",
      icon: "message",
      color: "text-foreground",
      href: `mailto:?subject=${encodeURIComponent(property.name + " · " + property.location)}&body=${encodeURIComponent(shareText + "\n\n" + url)}`,
    },
  ];

  const triggerClass =
    variant === "solid"
      ? `inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/20 text-xs sm:text-sm font-medium transition-colors ${className}`
      : variant === "outline"
        ? `inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-background hover:bg-secondary text-foreground text-xs sm:text-sm font-medium transition-colors ${className}`
        : `inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-foreground/80 hover:bg-secondary/70 hover:text-foreground text-xs sm:text-sm font-medium transition-colors ${className}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClass} aria-label="Share this listing">
        <Icon name="share" className="h-4 w-4" strokeWidth={2} />
        <span className="hidden sm:inline">{label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Share this stay
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />

        {canShare && (
          <DropdownMenuItem
            onClick={handleNativeShare}
            className="cursor-pointer rounded-lg px-2 py-2 focus:bg-accent"
          >
            <Icon name="share" className="h-4 w-4 mr-2.5 text-primary" />
            <span className="text-sm font-medium">Share…</span>
            <span className="ml-auto text-[10px] text-muted-foreground">System</span>
          </DropdownMenuItem>
        )}

        {socialLinks.map((s) => (
          <DropdownMenuItem
            key={s.name}
            asChild
            className="cursor-pointer rounded-lg px-2 py-2 focus:bg-accent"
          >
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              <Icon name={s.icon} className={`h-4 w-4 mr-2.5 ${s.color}`} />
              <span className="text-sm font-medium">{s.name}</span>
            </a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={handleCopy}
          className="cursor-pointer rounded-lg px-2 py-2 focus:bg-accent"
        >
          <Icon name="arrowRight" className="h-4 w-4 mr-2.5 text-primary rotate-[-45deg]" />
          <span className="text-sm font-medium">Copy link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
