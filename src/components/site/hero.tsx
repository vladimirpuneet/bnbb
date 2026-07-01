"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { StarRating } from "./star-rating";
import { Reveal } from "./reveal";
import { useBooking } from "./use-booking";
import { useI18n } from "./use-i18n";
import { openLightbox } from "./lightbox";
import { property } from "@/lib/property";

export function Hero() {
  const openBooking = useBooking((s) => s.open);
  const { t } = useI18n();

  return (
    <section id="top" className="relative -mt-16 sm:-mt-18 h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src={property.hero.image}
        alt="The Valley Gaze Penthouse — valley and mountain views in Dehradun"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      {/* Multi-layer overlay for legibility (stronger for WCAG contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />

      {/* Content */}
      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24 pt-24">
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/25 rounded-full px-3 py-1 shadow-lg shadow-black/20">
              <Icon name="medal" className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
              Superhost
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/25 rounded-full px-3 py-1 shadow-lg shadow-black/20">
              <Icon name="key" className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
              Self check-in
            </Badge>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-white/95 text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {t("hero.entirePenthouse")} · {property.locationDetail}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <h1 className="font-display text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[0.95] tracking-tight max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)] text-balance">
            The Valley Gaze
            <span className="block italic font-normal text-white mt-1 sm:mt-2">Penthouse</span>
          </h1>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-4 sm:mt-6 max-w-xl text-white/95 text-base sm:text-lg leading-relaxed text-pretty drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            A serene 3BHK retreat above the Doon valley — where misty mountains, fresh air and the
            songs of birds frame every morning. Just 40 minutes from Mussoorie.
          </p>
        </Reveal>

        {/* Stats inline */}
        <Reveal delay={0.45}>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/85 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="users" className="h-4 w-4" /> {property.stats[0].value} {t("hero.guests")}
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="door" className="h-4 w-4" /> {property.stats[1].value} {t("hero.bedrooms")}
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bed" className="h-4 w-4" /> {property.stats[2].value} {t("hero.beds")}
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bath" className="h-4 w-4" /> {property.stats[3].value} {t("hero.baths")}
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
              {t("hero.bookStay")}
              <Icon name="arrowRight" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Button>

            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-2 text-white/95 hover:text-white text-sm font-medium px-2 py-2 rounded-full transition-colors group"
            >
              <span className="grid place-items-center h-9 w-9 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-white/30 transition-colors">
                <Icon name="camera" className="h-4 w-4" />
              </span>
              {t("hero.viewPhotos")} {property.allImages.length} {t("hero.photos")}
            </button>

            <div className="hidden sm:flex sm:ml-auto items-center gap-3">
              {/* Starting price hint */}
              <div className="flex flex-col items-end px-3 py-1.5">
                <span className="text-[10px] uppercase tracking-wider text-white/70">{t("hero.from")}</span>
                <span className="font-display text-lg font-semibold text-white tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  ₹{property.pricing.weekdayNightly.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-white/70"> {t("hero.perNight")}</span>
                </span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25">
                <StarRating rating={property.hero.rating} size="sm" showValue={false} />
                <span className="text-white font-semibold text-sm tabular-nums">
                  {property.hero.rating}
                </span>
                <span className="text-white/80 text-sm">· {property.hero.reviewCount}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/70">
        <span className="text-[10px] uppercase tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{t("hero.scroll")}</span>
        <Icon name="chevronDown" className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
