"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "./icon";
import { useI18n } from "./use-i18n";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  variant?: "ghost" | "solid" | "outline";
  className?: string;
}

export function LanguageToggle({
  variant = "ghost",
  className = "",
}: LanguageToggleProps) {
  const { locale, setLocale } = useI18n();
  // Track mounted state to avoid hydration mismatch (persisted locale)
  const [mounted, setMounted] = useState(false);
  if (!mounted) setMounted(true);

  const current = mounted ? locale : "en";

  const triggerClass =
    variant === "solid"
      ? `inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 border border-white/20 text-xs sm:text-sm font-medium transition-colors ${className}`
      : variant === "outline"
        ? `inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-background hover:bg-secondary text-foreground text-xs sm:text-sm font-medium transition-colors ${className}`
        : `inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-foreground/80 hover:bg-secondary/70 hover:text-foreground text-xs sm:text-sm font-medium transition-colors ${className}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(triggerClass, "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
        aria-label={`Change language, current: ${localeNames[current as Locale]}`}
      >
        <Icon name="sparkles" className="h-4 w-4" strokeWidth={2} />
        <span className="text-base leading-none">{current === "hi" ? "हि" : "EN"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-2 py-1.5">
          Language · भाषा
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className={cn(
              "cursor-pointer rounded-lg px-2 py-2 focus:bg-accent flex items-center justify-between",
              current === l && "bg-secondary",
            )}
          >
            <span className="text-sm font-medium">{localeNames[l]}</span>
            {current === l && (
              <Icon name="check" className="h-4 w-4 text-primary" strokeWidth={3} />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
