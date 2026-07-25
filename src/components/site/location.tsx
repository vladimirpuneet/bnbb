"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { MapPin, Navigation } from "lucide-react";
import { property } from "@/lib/property";
import { trackEvent } from "@/lib/tracking";
import { t } from "./use-i18n";

const nearby = [
  { icon: "mountain", name: "Mussoorie", distance: "40 min drive", note: "Queen of the Hills", category: "Hill station" },
  { icon: "leaf", name: "Robber's Cave", distance: "~15 min", note: "River cave & picnic spot", category: "Nature" },
  { icon: "drop", name: "Sahastradhara", distance: "~25 min", note: "Sulphur springs", category: "Nature" },
  { icon: "sun", name: "Forest Research Institute", distance: "~20 min", note: "Heritage architecture", category: "Heritage" },
  { icon: "sparkles", name: "Malsi Deer Park", distance: "~15 min", note: "Mini zoo & walking trails", category: "Wildlife" },
  { icon: "sparkles", name: "Paltan Bazaar", distance: "~20 min", note: "Local markets & food", category: "Market" },
];

// Real attraction photos sourced from Wikimedia / Unsplash
const attractions = [
  {
    name: "Mussoorie — The Queen of Hills",
    image: "/images/attractions/mussoorie.webp",
    distance: "40 min drive",
    duration: "Full day",
    description: "Mall Road, Kempty Falls, Gun Hill point and colonial-era cafes perched at 2,005m.",
    tags: ["Hill station", "Day trip", "Views"],
  },
  {
    name: "Robber's Cave (Guchhupani)",
    image: "/images/attractions/robbers.webp",
    distance: "~15 min",
    duration: "2-3 hrs",
    description: "A natural river cave formation where you can wade through knee-deep water between limestone walls.",
    tags: ["Nature", "Adventure", "Family"],
  },
  {
    name: "Sahastradhara Springs",
    image: "/images/attractions/sahastradhara.webp",
    distance: "~25 min",
    duration: "Half day",
    description: "Thousand-fold sulphur springs known for therapeutic properties, with ropeway & eco gardens.",
    tags: ["Springs", "Wellness"],
  },
  {
    name: "Forest Research Institute",
    image: "/images/attractions/fri.webp",
    distance: "~20 min",
    duration: "1-2 hrs",
    description: "A Greco-Roman architectural marvel with six museums showcasing India's forest heritage.",
    tags: ["Heritage", "Architecture"],
  },
  {
    name: "Malsi Deer Park",
    image: "/images/attractions/malsi.webp",
    distance: "~15 min",
    duration: "1-2 hrs",
    description: "A serene mini-zoo nestled in the Shivalik foothills, home to spotted deer, peacocks and lush walking trails.",
    tags: ["Nature", "Wildlife"],
  },
  {
    name: "Paltan Bazaar",
    image: "/images/attractions/paltan.webp",
    distance: "~20 min",
    duration: "2 hrs",
    description: "Dehradun's iconic market for local handicrafts, basmati rice, bakery treats and street food.",
    tags: ["Shopping", "Food"],
  },
];

export function Location() {

  return (
    <section id="location" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.location.eyebrow")}
          title={t("section.location.title")}
          description={t("section.location.desc")}
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-start">
          {/* Map card */}
          <Reveal>
            <Card className="overflow-hidden border-border/70">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-secondary">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d78.0744786!3d30.4100031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d7000ad370e7%3A0x57b7cdc781d089d6!2sThe%20Valley%20Gaze%20Penthouse!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Valley Gaze Penthouse location on Google Maps"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Valley+Gaze+Penthouse,+Dehradun"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("get_directions", { source: "location_section" })}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  <Icon name="mapPin" className="h-4 w-4" />
                  Open in Google Maps
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </Reveal>

          {/* Nearby attractions — compact list */}
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-3">
                Nearby attractions
              </p>
              <ul className="space-y-2.5">
                {nearby.map((n) => (
                  <li
                    key={n.name}
                    className="flex items-center gap-3 rounded-2xl bg-card border border-border/70 p-3 sm:p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon name={n.icon} className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{n.name}</span>
                        <Badge variant="secondary" className="rounded-full text-xs font-normal">
                          {n.distance}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Local Attractions Gallery — richer photo grid */}
        <Reveal delay={0.2}>
          <div className="mt-12 sm:mt-16">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-1.5">
                  Explore the neighbourhood
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                  Worth the drive
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  Six hand-picked spots our guests love — all reachable within 40 minutes of the penthouse.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {attractions.map((a, i) => (
                <Reveal key={a.name} delay={i * 0.06}>
                  <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Distance badge */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-medium shadow-sm">
                        <Icon name="mapPin" className="h-3 w-3 text-primary" />
                        {a.distance}
                      </div>
                      {/* Duration badge */}
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white">
                        <Icon name="clock" className="h-3 w-3" />
                        {a.duration}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h4 className="font-display text-base sm:text-lg font-semibold leading-tight">
                        {a.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed flex-1 text-pretty">
                        {a.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="rounded-full text-[10px] font-normal py-0.5 border-primary/30 text-primary"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
