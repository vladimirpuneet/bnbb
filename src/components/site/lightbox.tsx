"use client";

import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { property } from "@/lib/property";

interface LightboxState {
  open: boolean;
  index: number;
}

let openLightboxFn: ((index: number) => void) | null = null;

/** Imperatively open the lightbox from anywhere (server components included). */
export function openLightbox(index = 0) {
  openLightboxFn?.(index);
}

export function Lightbox() {
  const [state, setState] = useState<LightboxState>({ open: false, index: 0 });

  useEffect(() => {
    openLightboxFn = (index: number) => setState({ open: true, index });
    return () => {
      openLightboxFn = null;
    };
  }, []);

  const total = property.allImages.length;

  const go = useCallback(
    (delta: number) => {
      setState((s) => ({ ...s, index: (s.index + delta + total) % total }));
    },
    [total],
  );

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.open, go]);

  return (
    <Dialog open={state.open} onOpenChange={(o) => setState((s) => ({ ...s, open: o }))}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-[1100px] h-[88vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-0 overflow-hidden rounded-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Photo gallery</DialogTitle>
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="text-white text-sm font-medium px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
            {state.index + 1} / {total}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white rounded-full"
            onClick={() => setState((s) => ({ ...s, open: false }))}
            aria-label="Close gallery"
          >
            <Icon name="x" className="h-5 w-5" />
          </Button>
        </div>

        {/* Main image */}
        <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
          {property.allImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`The Valley Gaze Penthouse photo ${i + 1}`}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                i === state.index ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          ))}

          {/* Prev / Next */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            <Icon name="chevronLeft" className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            <Icon name="chevronRight" className="h-6 w-6" />
          </Button>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-thin py-1 px-1">
            {property.allImages.map((src, i) => (
              <button
                key={src}
                onClick={() => setState((s) => ({ ...s, index: i }))}
                className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 rounded-md overflow-hidden transition-all ${
                  i === state.index
                    ? "ring-2 ring-white ring-offset-1 ring-offset-transparent scale-95"
                    : "opacity-50 hover:opacity-90"
                }`}
                aria-label={`Show photo ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
