import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { StarRating } from "./star-rating";
import { SectionHeader } from "./section-header";
import { property } from "@/lib/property";

export function Reviews() {
  const { reviews } = property;

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

                {/* Star breakdown bars */}
                <div className="mt-6 space-y-2">
                  {reviews.breakdown.map((b) => (
                    <div key={b.stars} className="flex items-center gap-2.5">
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
                    </div>
                  ))}
                </div>

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
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 content-start">
            {reviews.items.map((r, i) => (
              <Reveal key={r.author + r.date} delay={i * 0.05}>
                <Card className="border-border/70 h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="grid place-items-center h-11 w-11 rounded-full bg-primary/10 text-primary font-display font-semibold text-lg shrink-0">
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
                    <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line flex-1">
                      {r.text}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
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
              Read all {reviews.total} reviews on Airbnb
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
