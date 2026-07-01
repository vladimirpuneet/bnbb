"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { useBooking } from "./use-booking";
import { toast } from "sonner";

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
}

const SHORTCUTS_LIST = [
  { key: "B", description: "Open booking modal" },
  { key: "G", description: "Jump to photo gallery" },
  { key: "P", description: "Jump to pricing estimator" },
  { key: "R", description: "Jump to reviews" },
  { key: "H", description: "Jump to host section" },
  { key: "F", description: "Jump to FAQ" },
  { key: "T", description: "Scroll back to top" },
  { key: "?", description: "Show this help" },
  { key: "Esc", description: "Close dialogs / help" },
] as const;

export function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false);
  const openBooking = useBooking((s) => s.open);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs, textareas, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      // Don't trigger if any modifier is pressed (Ctrl, Cmd, Alt, Meta)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();

      switch (key) {
        case "B":
          e.preventDefault();
          openBooking();
          toast("Booking modal opened", {
            description: "Keyboard shortcut: B",
            duration: 2000,
          });
          break;
        case "G":
          e.preventDefault();
          scrollToSection("gallery");
          break;
        case "P":
          e.preventDefault();
          scrollToSection("pricing");
          break;
        case "R":
          e.preventDefault();
          scrollToSection("reviews");
          break;
        case "H":
          e.preventDefault();
          scrollToSection("host");
          break;
        case "F":
          e.preventDefault();
          scrollToSection("faq");
          break;
        case "T":
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "?":
          e.preventDefault();
          setHelpOpen((v) => !v);
          break;
      }
    },
    [openBooking, scrollToSection],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Show a one-time hint toast on first visit
  useEffect(() => {
    const seen = typeof window !== "undefined" && localStorage.getItem("valley-gaze:kb-hint-seen");
    if (!seen) {
      const timer = setTimeout(() => {
        toast("💡 Keyboard shortcuts available", {
          description: "Press ? to see all shortcuts · Press B to book",
          duration: 6000,
        });
        try {
          localStorage.setItem("valley-gaze:kb-hint-seen", "1");
        } catch {
          /* ignore */
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold flex items-center gap-2">
            <Icon name="book" className="h-5 w-5 text-primary" />
            Keyboard shortcuts
          </DialogTitle>
          <DialogDescription>
            Navigate faster with these keyboard shortcuts. Press <kbd className="inline-block rounded border border-border bg-secondary px-1.5 py-0.5 text-xs font-mono">?</kbd> anytime to toggle this help.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5 py-2">
          {SHORTCUTS_LIST.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary/60 transition-colors"
            >
              <span className="text-sm text-foreground/85">{s.description}</span>
              <kbd className="inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-md border border-border bg-background text-xs font-mono font-semibold shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-border/60">
          <Badge variant="outline" className="rounded-full text-xs font-normal">
            <Icon name="sparkles" className="h-3 w-3 mr-1" />
            Shortcuts are disabled while typing in form fields
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}
