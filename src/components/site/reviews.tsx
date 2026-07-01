"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import { SectionHeader } from "./section-header";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";

const PAGE_SIZE = 4;

export function Reviews() {
  const { reviews } = property;
  const { t } = useI18n();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState<number | null>(null); // null = all

  const filtered = useMemo(() => {
    if (filter === null) return reviews.items;
    return reviews.items.filter((r) => r.rating === filter);
  }, [filter, reviews.items]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleShowMore = () => {
    setVisibleCount((c) => c + PAGE_SIZE);
  };

  const handleFilter = (stars: number | null) => {
    setFilter(stars);
    setVisibleCount(PAGE_SIZE);
  };

  const filterCounts = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.items.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
    });
    return counts;
  }, [reviews.items]);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Guest experiences"
          title={
            <>
              Loved by guests —{" "}
              <span className="italic font-normal text-muted-foreground">
                {reviews.total} reviews
              </span>
            </>
          }
          description="Real feedback from travellers who've stayed at The Valley Gaze Penthouse."
        />

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
                      out of 5 · {reviews.total} reviews
                    </p>
                  </div>
                </div>

                {/* Star breakdown bars — clickable filters */}
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
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all"
                          style={{ width: `${b.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
                        {b.percentage}%
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active filter indicator */}
                {filter !== null && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full gap-1.5">
                      <Icon name="star" className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {filter} star{filter > 1 ? "s" : ""}
                      <button
                        onClick={() => handleFilter(null)}
                        className="ml-1 hover:text-foreground"
                        aria-label="Clear filter"
                      >
                        <Icon name="x" className="h-3 w-3" />
                      </button>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {filterCounts[filter] || 0} review{(filterCounts[filter] || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {/* Category ratings */}
                <div className="mt-6 pt-6 border-t border-border/70">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    Category ratings
                  </p>
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
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 content-start">
              {visible.map((r, i) => (
                <Reveal key={r.author + r.date} delay={Math.min(i, 4) * 0.05}>
                  <Card className="border-border/70 h-full hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                    <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="grid place-items-center h-11 w-11 rounded-full bg-gradient-to-br from-primary/15 to-accent/30 text-primary font-display font-semibold text-lg shrink-0 ring-1 ring-primary/10">
                          {r.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground truncate">{r.author}</div>
                          <div className="text-xs text-muted-foreground">{r.yearsOnAirbnb}</div>
                        </div>
                        <div className="ml-auto shrink-0">
                          <StarRating rating={r.rating} size="sm" showValue={false} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Icon name="calendar" className="h-3.5 w-3.5" />
                        {r.date}
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line flex-1 line-clamp-[12]">
                        {r.text}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>

            {/* Empty state when filter has no matches */}
            {visible.length === 0 && (
              <div className="text-center py-16 rounded-2xl border border-dashed border-border/60">
                <Icon name="quote" className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No {filter}-star reviews match this filter.
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleFilter(null)}
                >
                  Show all reviews
                </Button>
              </div>
            )}

            {/* Show more / pagination controls */}
            {hasMore && visible.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleShowMore}
                  className="rounded-full gap-2 group"
                >
                  {t("section.reviews.showMore")}
                  <Icon
                    name="chevronDown"
                    className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {t("section.reviews.showing")} {visible.length} {t("section.reviews.of")} {filtered.length}{" "}
                  {filter !== null ? `(${filter}★)` : ""}
                </span>
              </div>
            )}

            {!hasMore && visible.length > PAGE_SIZE && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setVisibleCount(PAGE_SIZE);
                    document.querySelector("#reviews")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-muted-foreground"
                >
                  {t("section.reviews.showFewer")}
                  <Icon name="chevronDown" className="h-4 w-4 ml-1 rotate-180" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* External link to Airbnb reviews */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex items-center justify-center">
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              {t("section.reviews.readAll")} {reviews.total} {t("section.reviews.reviewsOnAirbnb")}
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
