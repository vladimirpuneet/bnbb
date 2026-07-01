import { Icon } from "./icon";
import { property } from "@/lib/property";

export function Footer() {
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
                View on Airbnb
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-background/80 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "#gallery", label: "Photo gallery" },
                { href: "#overview", label: "Overview" },
                { href: "#amenities", label: "Amenities" },
                { href: "#reviews", label: "Reviews" },
                { href: "#location", label: "Location" },
                { href: "#host", label: "Meet the host" },
                { href: "#rules", label: "House rules" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-background/75 hover:text-background hover:underline underline-offset-4 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property details */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-background/80 mb-4">
              Property details
            </h4>
            <ul className="space-y-2.5 text-sm text-background/75">
              <li className="flex items-center gap-2">
                <Icon name="users" className="h-4 w-4 text-background/50 shrink-0" />
                Up to {property.houseRules.maxGuests} guests
              </li>
              <li className="flex items-center gap-2">
                <Icon name="door" className="h-4 w-4 text-background/50 shrink-0" />
                3 bedrooms · 2.5 bathrooms
              </li>
              <li className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-background/50 shrink-0" />
                Check-in {property.houseRules.checkIn} · out {property.houseRules.checkOut}
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
                {property.hero.rating} · {property.hero.reviewCount} reviews
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/60">
          <p>
            © {new Date().getFullYear()} {property.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with
            <Icon name="heart" className="h-3 w-3 fill-[#ff5c5c] text-[#ff5c5c]" />
            in the Doon Valley
          </p>
        </div>
      </div>
    </footer>
  );
}
