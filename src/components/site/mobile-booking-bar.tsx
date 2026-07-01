"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { useBooking } from "./use-booking";
import { useI18n } from "./use-i18n";
import { property, buildWhatsappLink, defaultBookingMessage } from "@/lib/property";

/**
 * Sticky bottom booking bar shown on mobile only.
 * Appears after the user has scrolled past the hero.
 */
export function MobileBookingBar() {
  const [visible, setVisible] = useState(false);
  const openBooking = useBooking((s) => s.open);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-background/95 backdrop-blur-xl border-t border-border/80 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15)] px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-semibold leading-none">
                ₹ On request
              </span>
              <span className="text-[11px] text-muted-foreground leading-none">/ night</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
              <Icon name="star" className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="font-medium text-foreground/80">{property.hero.rating}</span>
              <span>· {property.hero.reviewCount} {t("hero.reviews")}</span>
            </div>
          </div>
          <Button
            onClick={openBooking}
            size="sm"
            className="h-11 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md shadow-primary/20"
          >
            {t("nav.bookNow")}
          </Button>
          <Button
            onClick={() =>
              window.open(buildWhatsappLink(defaultBookingMessage()), "_blank", "noopener,noreferrer")
            }
            size="icon"
            variant="outline"
            className="h-11 w-11 rounded-xl shrink-0 border-[#25D366]/40 text-[#1da851] hover:bg-[#25D366]/10"
            aria-label="Chat on WhatsApp"
          >
            <Icon name="message" className="h-5 w-5" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
}
