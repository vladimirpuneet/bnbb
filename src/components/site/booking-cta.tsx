"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import { useBooking } from "./use-booking";
import { property, buildWhatsappLink, defaultBookingMessage } from "@/lib/property";

export function BookingCta() {
  const openBooking = useBooking((s) => s.open);

  const quickBook = () => {
    window.open(buildWhatsappLink(defaultBookingMessage()), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="book" className="py-16 sm:py-24 bg-primary scroll-mt-16 relative overflow-hidden">
      {/* Decorative image strip */}
      <div className="absolute inset-0 opacity-15">
        <img
          src="/images/img-14.jpeg"
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
              Book your valley escape today
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-primary-foreground/85 text-base sm:text-lg leading-relaxed text-pretty">
              Skip the platform fees. Reserve directly with {property.host.name} via WhatsApp —
              instant responses, best rates, and a personal touch.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                onClick={openBooking}
                size="lg"
                className="h-13 sm:h-14 px-7 sm:px-9 rounded-full bg-white text-primary hover:bg-white/90 font-semibold text-base shadow-2xl shadow-black/20 group"
              >
                <Icon name="calendar" className="h-5 w-5 mr-2" strokeWidth={2} />
                Book Now
                <Icon name="arrowRight" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Button>
              <Button
                onClick={quickBook}
                size="lg"
                variant="outline"
                className="h-13 sm:h-14 px-6 sm:px-8 rounded-full bg-transparent border-white/40 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground hover:border-white/60 font-medium"
              >
                <Icon name="message" className="h-5 w-5 mr-2 text-[#25D366]" strokeWidth={2} />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-primary-foreground/85 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <StarRating rating={property.hero.rating} size="sm" showValue={false} />
                <span className="font-semibold">{property.hero.rating}</span>
                <span className="opacity-75">({property.hero.reviewCount} reviews)</span>
              </span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="medal" className="h-4 w-4" />
                Superhost
              </span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-4 w-4" />
                Responds within an hour
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
