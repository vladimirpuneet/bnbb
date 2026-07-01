"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { ShareButton } from "./share-button";
import { SaveButton } from "./save-button";
import { useBooking } from "./use-booking";
import { property, buildWhatsappLink, defaultBookingMessage } from "@/lib/property";

const NAV_LINKS = [
  { href: "#gallery", label: "Photos" },
  { href: "#pricing", label: "Pricing" },
  { href: "#amenities", label: "Amenities" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openBooking = useBooking((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quickBook = () => {
    window.open(buildWhatsappLink(defaultBookingMessage()), "_blank", "noopener,noreferrer");
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <span
              className={`grid place-items-center h-10 w-10 rounded-full transition-colors ${
                scrolled ? "bg-primary text-primary-foreground" : "bg-white/15 backdrop-blur-md text-white ring-1 ring-white/30"
              }`}
            >
              <Icon name="mountain" className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="flex flex-col leading-tight">
              <span
                className={`font-display text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                  scrolled ? "text-foreground" : "text-white drop-shadow-sm"
                }`}
              >
                The Valley Gaze
              </span>
              <span
                className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Penthouse · Dehradun
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-secondary/70"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                scrolled
                  ? "text-foreground/80 hover:bg-secondary/70"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              <Icon name="star" className="h-3.5 w-3.5 fill-current" />
              <span className="font-semibold">{property.hero.rating}</span>
              <span className="opacity-70">·</span>
              <span className="opacity-70">Airbnb</span>
              <Icon name="arrowUpRight" className="h-3.5 w-3.5 opacity-70" />
            </a>

            <div className="hidden sm:block">
              <ShareButton variant={scrolled ? "outline" : "solid"} />
            </div>

            <div className="hidden sm:block">
              <SaveButton variant={scrolled ? "outline" : "solid"} />
            </div>

            <Button
              onClick={openBooking}
              size="sm"
              className={`h-10 sm:h-11 px-4 sm:px-5 rounded-full font-medium shadow-md transition-all ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
                  : "bg-white text-primary hover:bg-white/90 shadow-black/20"
              }`}
            >
              <Icon name="calendar" className="h-4 w-4 mr-1.5" strokeWidth={2} />
              Book Now
            </Button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`lg:hidden grid place-items-center h-10 w-10 rounded-full transition-colors ${
                scrolled ? "text-foreground hover:bg-secondary/70" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <Icon name={mobileOpen ? "x" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 pt-1 border-t border-border/60 bg-background/95 backdrop-blur-xl -mx-4 sm:-mx-6 px-4 sm:px-6 mt-0">
            <nav className="flex flex-col gap-1 pt-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/85 hover:bg-secondary/70"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-2 px-3 py-2 mt-1">
                <Badge variant="secondary" className="rounded-full">
                  <Icon name="star" className="h-3 w-3 mr-1 fill-current" />
                  {property.hero.rating} · {property.hero.reviewCount} reviews
                </Badge>
              </div>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  quickBook();
                }}
                variant="outline"
                size="sm"
                className="mt-2 w-full justify-center"
              >
                <Icon name="message" className="h-4 w-4 mr-2 text-[#25D366]" strokeWidth={2} />
                Chat instantly on WhatsApp
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
