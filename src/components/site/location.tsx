"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";

const nearby = [
  { icon: "mountain", name: "Mussoorie", distance: "40 min drive", note: "Queen of the Hills", category: "Hill station" },
  { icon: "leaf", name: "Robber's Cave", distance: "~25 min", note: "River cave & picnic spot", category: "Nature" },
  { icon: "drop", name: "Sahastradhara", distance: "~30 min", note: "Sulphur springs", category: "Nature" },
  { icon: "sun", name: "Forest Research Institute", distance: "~20 min", note: "Heritage architecture", category: "Heritage" },
  { icon: "valley", name: "Malsi Deer Park", distance: "~15 min", note: "Nature & wildlife", category: "Nature" },
  { icon: "sparkles", name: "Paltan Bazaar", distance: "~20 min", note: "Local markets & food", category: "Market" },
];

// Curated attractions with images from the property's downloaded gallery
// (these images represent the kind of valley/nature views guests will experience)
const attractions = [
  {
    name: "Mussoorie — The Queen of Hills",
    image: "/images/img-14.jpeg",
    distance: "40 min drive",
    duration: "Full day",
    description: "Mall Road, Kempty Falls, Gun Hill point and colonial-era cafes perched at 2,005m.",
    tags: ["Hill station", "Day trip", "Views"],
  },
  {
    name: "Robber's Cave (Guchhupani)",
    image: "/images/img-03.jpeg",
    distance: "~25 min",
    duration: "2-3 hrs",
    description: "A natural river cave formation where you can wade through knee-deep water between limestone walls.",
    tags: ["Nature", "Adventure", "Family"],
  },
  {
    name: "Sahastradhara Springs",
    image: "/images/img-13.jpeg",
    distance: "~30 min",
    duration: "Half day",
    description: "Thousand-fold sulphur springs known for therapeutic properties, with ropeway & eco gardens.",
    tags: ["Springs", "Wellness"],
  },
  {
    name: "Forest Research Institute",
    image: "/images/img-09.jpeg",
    distance: "~20 min",
    duration: "1-2 hrs",
    description: "A Greco-Roman architectural marvel with six museums showcasing India's forest heritage.",
    tags: ["Heritage", "Architecture"],
  },
  {
    name: "Mindrolling Monastery",
    image: "/images/img-15.jpeg",
    distance: "~35 min",
    duration: "2 hrs",
    description: "One of India's largest Buddhist centres with a 60m Great Stupa and beautifully manicured gardens.",
    tags: ["Spiritual", "Peaceful"],
  },
  {
    name: "Paltan Bazaar",
    image: "/images/img-16.jpeg",
    distance: "~20 min",
    duration: "2 hrs",
    description: "Dehradun's iconic market for local handicrafts, basmati rice, bakery treats and street food.",
    tags: ["Shopping", "Food"],
  },
];

export function Location() {
  const { t } = useI18n();
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
                {/* Stylised map placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary to-accent/30" />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(56, 110, 80, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 110, 80, 0.18) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
                {/* Contour-like wavy lines */}
                <svg
                  className="absolute inset-0 h-full w-full text-primary/30"
                  viewBox="0 0 800 450"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0,120 Q200,80 400,140 T800,120" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0,180 Q220,140 420,200 T800,180" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0,240 Q180,200 380,260 T800,240" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0,300 Q200,260 400,320 T800,300" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0,360 Q220,320 420,380 T800,360" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {/* Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="relative flex flex-col items-center">
                    <div className="absolute -inset-3 rounded-full bg-primary/20 animate-ping" />
                    <div className="relative grid place-items-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/40 border-2 border-background">
                      <Icon name="mountain" className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="mt-1 h-2 w-1 bg-primary/40" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-md px-4 py-2 shadow-md">
                    <Icon name="mapPin" className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{property.location}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{property.locationDetail}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Exact location shared after booking. Quiet residential area with greenery all around.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      property.location,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline shrink-0"
                  >
                    Open in Maps
                    <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
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
