"use client";

import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import { useBooking } from "./use-booking";
import { t } from "./use-i18n";
import { property } from "@/lib/property";

export function BookingCta() {
  const openBooking = useBooking((s) => s.open);

  return (
    <section id="book" className="py-16 sm:py-24 bg-primary scroll-mt-16 relative overflow-hidden">
      {/* Decorative image strip */}
      <div className="absolute inset-0 opacity-15">
        <img
          src="/images/terrace/gallery-03.webp"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground/80 mb-4">
              Ready when you are
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground tracking-tight text-balance">
              {t("section.book.title")}
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-primary-foreground/85 text-base sm:text-lg leading-relaxed text-pretty">
              {t("section.book.desc")}
            </p>

            <div className="mt-8 flex items-center justify-center">
              <button
                onClick={openBooking}
                className="inline-flex items-center h-13 sm:h-14 px-7 sm:px-9 rounded-full bg-white text-primary hover:bg-white/90 font-semibold text-base shadow-2xl shadow-black/20 group transition-all"
              >
                <Icon name="calendar" className="h-5 w-5 mr-2" strokeWidth={2} />
                {t("nav.bookNow")}
                <Icon name="arrowRight" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-primary-foreground/85 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <StarRating rating={property.hero.rating} size="sm" showValue={false} />
                <span className="font-semibold">{property.hero.rating}</span>
              </span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="medal" className="h-4 w-4" />
                Superhost
              </span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-4 w-4" />
                {t("booking.responds")}
              </span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="phone" className="h-4 w-4" />
                {property.whatsappDisplay}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
