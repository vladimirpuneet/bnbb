"use client";

import { Icon } from "./icon";
import { property } from "@/lib/property";

export function Footer() {

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src="/images/logo.jpg"
              alt="The Valley Gaze Penthouse"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-background/20"
            />
            <div>
              <div className="font-display text-xl font-semibold leading-tight">
                {property.name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-background/60 mt-0.5">
                {property.tagline} · Dehradun
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-background/75 leading-relaxed max-w-md text-pretty">
            A serene 3BHK penthouse retreat above the Doon valley with sweeping mountain views,
            terrace access and a fully equipped kitchen — your perfect Uttarakhand getaway.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-background/15 flex justify-center text-xs text-background/60">
          <p className="flex items-center gap-1.5">
            Crafted by <a href="mailto:vladimirpuneet@icloud.com" className="font-semibold hover:underline underline-offset-4 transition-colors">Vladimirpuneet</a> with
            <Icon name="heart" className="h-3 w-3 fill-[#ff5c5c] text-[#ff5c5c]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
