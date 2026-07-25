"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./icon";
import { ShareButton } from "./share-button";
import { useBooking } from "./use-booking";
import { property } from "@/lib/property";
import { trackEvent } from "@/lib/tracking";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { href: "#gallery", label: "Photos" },
  { href: "#pricing", label: "Pricing" },
  { href: "#amenities", label: "Amenities" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

const PLATFORMS = [
  {
    name: "Airbnb",
    url: property.airbnbUrl,
    logo: "/images/otas/airbnb.svg",
  },
  {
    name: "MakeMyTrip",
    url: "https://www.makemytrip.com/hotels/the_valley_gaze-details-dehradun.html",
    logo: "/images/otas/makemytrip.svg",
  },
  {
    name: "Agoda",
    url: "https://www.agoda.com/the-valley-gaze-penthouse-3bhk/hotel/dehradun-in.html",
    logo: "/images/otas/agoda.svg",
  },
  {
    name: "Goibibo",
    url: "https://www.goibibo.com/hotels/the_valley_gaze-hotel-in-dehradun-5012049437049719014/",
    logo: "/images/otas/goibibo.svg",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openBooking = useBooking((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {/* Brand — image logo */}
          <a href="#top" className="flex items-center shrink-0">
            <img
              src="/images/logo.jpg"
              alt="The Valley Gaze Penthouse"
              className={`h-10 w-10 rounded-full object-cover transition-opacity ${scrolled ? "opacity-100" : "opacity-90"}`}
            />
          </a>

          {/* Desktop right side */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            {/* Also on — OTAs dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full transition-all bg-white text-black hover:bg-white/90 shadow-lg shadow-black/10`}
              >
                <span className="font-[family-name:var(--font-dm-sans)] font-medium tracking-wide">Also book on</span>
                <Icon name="arrowUpRight" className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 p-2">
                <div className="px-2 py-1.5 mb-1">
                  <p className="text-[11px] text-muted-foreground font-medium">Also Available on</p>
                </div>
                {PLATFORMS.map((p) => (
                  <DropdownMenuItem key={p.name} asChild className="cursor-pointer rounded-lg px-2 py-2 focus:bg-accent">
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center w-full"
                      onClick={() => trackEvent("outbound_ota_click", { platform: p.name.toLowerCase(), source: "navbar_desktop_dropdown" })}
                    >
                      <img src={p.logo} alt={p.name} className="h-4 w-auto" />
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/the_valley_gaze_penthouse/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors ${
                scrolled
                  ? "text-white hover:bg-[#E4405F]/90 bg-[#E4405F] shadow-sm shadow-[#E4405F]/20"
                  : "text-white/90 hover:bg-[#E4405F]/80 bg-[#E4405F]/70 border border-white/20"
              }`}
              aria-label="Follow on Instagram"
              onClick={() => trackEvent("outbound_social_click", { platform: "instagram", source: "navbar" })}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <ShareButton scrolled={scrolled} />

            {/* Get Discount — primary CTA */}
            <button
              onClick={() => {
                trackEvent("begin_booking", { source: "navbar_desktop" });
                openBooking();
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all bg-amber-700 text-white hover:bg-amber-600"
            >
              <Icon name="percent" className="h-4 w-4" strokeWidth={2.5} />
              Get Discount
            </button>
          </div>

          {/* Mobile right side */}
          <div className="sm:hidden flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                trackEvent("begin_booking", { source: "navbar_mobile" });
                openBooking();
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all bg-amber-700 text-white hover:bg-amber-600"
            >
              <Icon name="percent" className="h-4 w-4" strokeWidth={2.5} />
              Get Discount
            </button>
            <a
              href="https://www.instagram.com/the_valley_gaze_penthouse/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors ${
                scrolled
                  ? "text-white hover:bg-[#E4405F]/90 bg-[#E4405F] shadow-sm shadow-[#E4405F]/20"
                  : "text-white/90 hover:bg-[#E4405F]/80 bg-[#E4405F]/70 border border-white/20"
              }`}
              aria-label="Follow on Instagram"
              onClick={() => trackEvent("outbound_social_click", { platform: "instagram", source: "navbar" })}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <ShareButton scrolled={scrolled} />
          </div>

          {/* Hamburger menu */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`lg:hidden relative grid place-items-center h-10 w-10 rounded-full transition-colors ${
              scrolled ? "text-foreground hover:bg-secondary/70" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="relative h-5 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  menuOpen
                    ? "top-1/2 w-5 -translate-y-1/2 rotate-45"
                    : "top-[3px] w-5"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-y-1/2 ${
                  menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  menuOpen
                    ? "bottom-1/2 w-5 translate-y-1/2 -rotate-45"
                    : "bottom-[3px] w-5"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Menu dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl -mx-4 sm:-mx-6 px-4 sm:px-6"
            >
              <div className="pb-4 pt-1">
                <nav className="flex flex-col gap-1 pt-3">
                  {NAV_LINKS.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.25 }}
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/85 hover:bg-secondary/70"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="mt-3 pt-3 border-t border-border/50"
                >
                  <p className="px-3 mb-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Have a coupon? Also available on
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {PLATFORMS.map((p) => (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackEvent("outbound_ota_click", { platform: p.name.toLowerCase(), source: "navbar_mobile_menu" });
                          setMenuOpen(false);
                        }}
                        className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-foreground/75 hover:bg-secondary/70"
                      >
                        <img src={p.logo} alt={p.name} className="h-4 w-auto" />
                      </a>
                    ))}
                  </div>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  onClick={() => { 
                    trackEvent("begin_booking", { source: "navbar_mobile_menu_cta" });
                    openBooking(); 
                    setMenuOpen(false); 
                  }}
                  className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-md shadow-[#25D366]/20"
                >
                  <Icon name="calendar" className="h-5 w-5" strokeWidth={2} />
                  Check Availability
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
