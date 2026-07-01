"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { StarRating } from "./star-rating";
import { Reveal } from "./reveal";
import { useBooking } from "./use-booking";
import { openLightbox } from "./lightbox";
import { property } from "@/lib/property";

export function Hero() {
  const openBooking = useBooking((s) => s.open);

  return (
    <section id="top" className="relative -mt-16 sm:-mt-18 h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src={property.hero.image}
        alt="The Valley Gaze Penthouse — valley and mountain views in Dehradun"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      {/* Multi-layer overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />

      {/* Content */}
      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24 pt-24">
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <Badge className="bg-white/15 backdrop-blur-md text-white border-white/25 hover:bg-white/20 rounded-full px-3 py-1">
              <Icon name="medal" className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
              Superhost
            </Badge>
            <Badge className="bg-white/15 backdrop-blur-md text-white border-white/25 hover:bg-white/20 rounded-full px-3 py-1">
              <Icon name="key" className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
              Self check-in
            </Badge>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-white/80 text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3 drop-shadow">
            Entire Penthouse · {property.locationDetail}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <h1 className="font-display text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[0.95] tracking-tight max-w-4xl drop-shadow-lg text-balance">
            The Valley Gaze
            <span className="block italic font-normal text-white/95 mt-1 sm:mt-2">Penthouse</span>
          </h1>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-4 sm:mt-6 max-w-xl text-white/90 text-base sm:text-lg leading-relaxed text-pretty">
            A serene 3BHK retreat above the Doon valley — where misty mountains, fresh air and the
            songs of birds frame every morning. Just 40 minutes from Mussoorie.
          </p>
        </Reveal>

        {/* Stats inline */}
        <Reveal delay={0.45}>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/85 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="users" className="h-4 w-4" /> {property.stats[0].value} guests
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="door" className="h-4 w-4" /> {property.stats[1].value} bedrooms
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bed" className="h-4 w-4" /> {property.stats[2].value} beds
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bath" className="h-4 w-4" /> {property.stats[3].value} baths
            </span>
          </div>
        </Reveal>

        {/* CTA + rating */}
        <Reveal delay={0.55}>
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <Button
              onClick={openBooking}
              size="lg"
              className="h-13 sm:h-14 px-6 sm:px-8 rounded-full bg-white text-primary hover:bg-white/90 font-semibold text-base shadow-2xl shadow-black/30 group"
            >
              <Icon name="calendar" className="h-5 w-5 mr-2" strokeWidth={2} />
              Book your stay
              <Icon name="arrowRight" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Button>

            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium px-2 py-2 rounded-full transition-colors group"
            >
              <span className="grid place-items-center h-9 w-9 rounded-full bg-white/15 backdrop-blur-md group-hover:bg-white/25 transition-colors">
                <Icon name="camera" className="h-4 w-4" />
              </span>
              View all {property.allImages.length} photos
            </button>

            <div className="hidden sm:block sm:ml-auto">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                <StarRating rating={property.hero.rating} size="sm" showValue={false} />
                <span className="text-white font-semibold text-sm tabular-nums">
                  {property.hero.rating}
                </span>
                <span className="text-white/70 text-sm">· {property.hero.reviewCount} reviews</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <Icon name="chevronDown" className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
