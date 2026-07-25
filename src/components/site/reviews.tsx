"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import { SectionHeader } from "./section-header";
import { t } from "./use-i18n";
import { property } from "@/lib/property";

const TRAVELER_TYPES = [
  { value: "family", label: "Family", icon: "users" },
  { value: "couple", label: "Couple", icon: "heart" },
  { value: "friends", label: "Friends", icon: "users" },
  { value: "solo", label: "Solo", icon: "users" },
  { value: "business", label: "Business", icon: "laptop" },
] as const;

/** Top review highlights — extracted from actual review data */
const highlights = [
  { icon: "mountain", theme: "Valley & mountain views", count: 14, quote: "The valley views from the living room are breathtaking, especially at sunset.", author: "Rohan" },
  { icon: "sun", theme: "Terrace experience", count: 12, quote: "The terrace was the highlight of our stay — perfect for morning yoga and evening chai.", author: "Meera" },
  { icon: "medal", theme: "Responsive host", count: 11, quote: "Daksh was incredibly responsive and helped us plan a day trip to Mussoorie.", author: "Priya" },
  { icon: "key", theme: "Easy self check-in", count: 9, quote: "The self check-in made arriving late at night stress-free.", author: "Rohan" },
  { icon: "elevator", theme: "Spacious & comfortable", count: 10, quote: "We were a family of 6 and never felt cramped. Rooms are spacious and well-lit.", author: "Priya" },
  { icon: "utensils", theme: "Well-equipped kitchen", count: 8, quote: "The kitchen had everything we needed to cook meals.", author: "Priya" },
];

export function Reviews() {
  const { reviews } = property;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<number | null>(null);
  const [travelerFilter, setTravelerFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = [...reviews.items];
    if (filter !== null) items = items.filter((r) => r.rating === filter);
    if (travelerFilter !== null) items = items.filter((r) => r.travelerType === travelerFilter);
    // Best reviews first: highest rating, then most recent
    items.sort((a, b) => b.rating - a.rating);
    return items;
  }, [filter, travelerFilter, reviews.items]);

  const current = filtered[currentIndex];

  const handleFilter = (stars: number | null) => {
    setFilter(stars);
    setCurrentIndex(0);
  };

  const handleTravelerFilter = (type: string | null) => {
    setTravelerFilter(type);
    setCurrentIndex(0);
  };

  const filterCounts = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.items.forEach((r) => { counts[r.rating] = (counts[r.rating] || 0) + 1; });
    return counts;
  }, [reviews.items]);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved by guests"
          title={
            <>
              {t("section.reviews.title")}
            </>
          }
          description={t("section.reviews.desc")}
        />

        {/* Top highlights strip */}
        <Reveal delay={0.05}>
          <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {highlights.map((h, i) => (
              <div
                key={h.theme}
                className="rounded-2xl border border-border/60 bg-card p-4 text-center hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary mx-auto mb-2">
                  <Icon name={h.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-sm leading-tight">{h.theme}</h3>
                <Badge variant="secondary" className="rounded-full text-[10px] font-normal mt-1.5">
                  {h.count} mentions
                </Badge>
                <p className="text-xs text-muted-foreground mt-2 italic line-clamp-2 leading-relaxed">
                  &ldquo;{h.quote}&rdquo;
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">— {h.author}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[0.85fr_1.5fr] gap-6 lg:gap-10">
          {/* Rating summary */}
          <Reveal>
            <Card className="border-border/70 h-full overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-end gap-3">
                  <div className="font-display text-6xl font-semibold tabular-nums leading-none">
                    {reviews.overall.toFixed(1)}
                  </div>
                  <div className="pb-1">
                    <StarRating rating={reviews.overall} size="md" showValue={false} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("section.reviews.outOf5")}
                    </p>
                  </div>
                </div>

                {/* Star breakdown bars */}
                <div className="mt-6 space-y-2">
                  {reviews.breakdown.map((b) => (
                    <button
                      key={b.stars}
                      onClick={() => handleFilter(filter === b.stars ? null : b.stars)}
                      className={`flex items-center gap-2.5 w-full text-left rounded-md p-1 -m-1 transition-colors hover:bg-secondary ${
                        filter === b.stars ? "bg-secondary" : ""
                      }`}
                      aria-pressed={filter === b.stars}
                      aria-label={`Filter to ${b.stars}-star reviews`}
                    >
                      <span className="text-xs font-medium w-3 tabular-nums">{b.stars}</span>
                      <Icon name="star" className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${b.percentage}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">{b.percentage}%</span>
                    </button>
                  ))}
                </div>

                {/* Active filter indicator */}
                {filter !== null && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full gap-1.5">
                      <Icon name="star" className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {filter} star{filter > 1 ? "s" : ""}
                      <button onClick={() => handleFilter(null)} className="ml-1 hover:text-foreground" aria-label="Clear filter">
                        <Icon name="x" className="h-3 w-3" />
                      </button>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {filterCounts[filter] || 0} review{(filterCounts[filter] || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {/* Traveler type filter */}
                {travelerFilter !== null && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full gap-1.5">
                      <Icon name="users" className="h-3 w-3" />
                      {TRAVELER_TYPES.find((tt) => tt.value === travelerFilter)?.label}
                      <button onClick={() => handleTravelerFilter(null)} className="ml-1 hover:text-foreground" aria-label="Clear traveler filter">
                        <Icon name="x" className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                )}

                {/* Category ratings */}
                <div className="mt-6 pt-6 border-t border-border/70">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Category ratings</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {reviews.categoryRatings.map((c) => (
                      <div key={c.label} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-foreground/85">{c.label}</span>
                        <span className="text-sm font-semibold tabular-nums">{c.score.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Review cards */}
          <div>
            {/* Traveler type filter chips */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mr-1">Traveler type:</span>
              <button
                onClick={() => handleTravelerFilter(null)}
                className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                  travelerFilter === null ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                }`}
              >
                All
              </button>
              {TRAVELER_TYPES.map((tt) => {
                const count = reviews.items.filter((r) => r.travelerType === tt.value).length;
                if (count === 0) return null;
                return (
                  <button
                    key={tt.value}
                    onClick={() => handleTravelerFilter(travelerFilter === tt.value ? null : tt.value)}
                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                      travelerFilter === tt.value ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/80 hover:bg-secondary/70"
                    }`}
                  >
                    <Icon name={tt.icon} className="h-3.5 w-3.5" />
                    {tt.label}
                    <span className="ml-0.5 opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Single review card with chevron navigation */}
            {filtered.length > 0 && current ? (
              <div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="shrink-0 grid place-items-center h-10 w-10 rounded-full border border-border/60 bg-card hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous review"
                  >
                    <Icon name="chevronLeft" className="h-5 w-5" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <Card className="border-border/70 h-[320px]">
                          <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="grid place-items-center h-11 w-11 rounded-full bg-gradient-to-br from-primary/15 to-accent/30 text-primary font-display font-semibold text-lg shrink-0 ring-1 ring-primary/10">
                                {current.avatar}
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-foreground truncate">{current.author}</div>
                                <div className="text-xs text-muted-foreground">{current.date}</div>
                              </div>
                              <div className="ml-auto shrink-0">
                                <StarRating rating={current.rating} size="sm" showValue={false} />
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 shrink-0">
                              <Icon name="calendar" className="h-3.5 w-3.5" />
                              {current.date}
                              {current.travelerType && (
                                <Badge variant="outline" className="ml-1 rounded-full text-[10px] font-normal py-0 px-2 border-primary/30 text-primary">
                                  {TRAVELER_TYPES.find((tt) => tt.value === current.travelerType)?.label || current.travelerType}
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto">
                              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                                {current.text}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setCurrentIndex((i) => Math.min(filtered.length - 1, i + 1))}
                    disabled={currentIndex === filtered.length - 1}
                    className="shrink-0 grid place-items-center h-10 w-10 rounded-full border border-border/60 bg-card hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Next review"
                  >
                    <Icon name="chevronRight" className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation footer */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <span className="text-xs text-muted-foreground">
                    Showing {currentIndex + 1} of {filtered.length}
                    {filter !== null ? ` (${filter}★)` : ""}
                  </span>
                  <span className="text-xs text-muted-foreground/30 hidden sm:inline">|</span>
                  <span className="text-xs text-muted-foreground">More reviews on</span>
                  <a href={property.airbnbUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
                    Airbnb <Icon name="arrowUpRight" className="h-3 w-3" />
                  </a>
                  <span className="text-muted-foreground/30">·</span>
                  <a href={property.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
                    Google <Icon name="arrowUpRight" className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl border border-dashed border-border/60">
                <Icon name="quote" className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No reviews match this filter.</p>
                <Button variant="link" size="sm" className="mt-2" onClick={() => { handleFilter(null); handleTravelerFilter(null); }}>
                  Show all reviews
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
