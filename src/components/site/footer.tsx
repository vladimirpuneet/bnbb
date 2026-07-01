"use client";

import { Icon } from "./icon";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";
import type { TranslationKey } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center h-11 w-11 rounded-full bg-background/10 text-background">
                <Icon name="mountain" className="h-5 w-5" strokeWidth={2} />
              </span>
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

            {/* Contact row */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={`https://wa.me/${property.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#5ff58a] border border-[#25D366]/30 px-4 py-2 text-sm font-medium transition-colors"
              >
                <Icon name="message" className="h-4 w-4" strokeWidth={2} />
                WhatsApp · {property.whatsappDisplay}
              </a>
              <a
                href={property.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-background/10 hover:bg-background/15 border border-background/20 px-4 py-2 text-sm font-medium transition-colors"
              >
                <Icon name="arrowUpRight" className="h-4 w-4" />
                {t("nav.airbnb")}
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-background/80 mb-4">
              {t("footer.explore")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {([
                { href: "#gallery", label: "nav.photos" },
                { href: "#overview", label: "section.overview.eyebrow" },
                { href: "#pricing", label: "nav.pricing" },
                { href: "#amenities", label: "nav.amenities" },
                { href: "#weather", label: "Weather" },
                { href: "#reviews", label: "nav.reviews" },
                { href: "#location", label: "nav.location" },
                { href: "#host", label: "Host" },
                { href: "#faq", label: "nav.faq" },
                { href: "#rules", label: "House rules" },
              ] as { href: string; label: TranslationKey | string }[]).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-background/75 hover:text-background hover:underline underline-offset-4 transition-colors"
                  >
                    {/* If the label is a translation key, translate it; otherwise render as-is */}
                    {(t(l.label as TranslationKey)) === l.label ? l.label : t(l.label as TranslationKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property details */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-background/80 mb-4">
              {t("footer.details")}
            </h4>
            <ul className="space-y-2.5 text-sm text-background/75">
              <li className="flex items-center gap-2">
                <Icon name="users" className="h-4 w-4 text-background/50 shrink-0" />
                Up to {property.houseRules.maxGuests} {t("hero.guests")}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="door" className="h-4 w-4 text-background/50 shrink-0" />
                3 {t("hero.bedrooms")} · 2.5 {t("hero.baths")}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-background/50 shrink-0" />
                {t("booking.checkin")} {property.houseRules.checkIn} · {t("booking.checkout")} {property.houseRules.checkOut}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="key" className="h-4 w-4 text-background/50 shrink-0" />
                Self check-in (lockbox)
              </li>
              <li className="flex items-center gap-2">
                <Icon name="mapPin" className="h-4 w-4 text-background/50 shrink-0" />
                {property.location}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="star" className="h-4 w-4 text-background/50 shrink-0 fill-current" />
                {property.hero.rating} · {property.hero.reviewCount} {t("hero.reviews")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/60">
          <p>
            © {new Date().getFullYear()} {property.name}. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5">
            {t("footer.crafted")}
            <Icon name="heart" className="h-3 w-3 fill-[#ff5c5c] text-[#ff5c5c]" />
            {t("footer.inDoon")}
          </p>
        </div>
      </div>
    </footer>
  );
}
