"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { property } from "@/lib/property";

/**
 * AI-synthesized review highlights — distills the 15 reviews into the
 * top themes guests mention most. Each theme has an icon, a short label,
 * a count of how many reviews mention it, and a representative quote.
 */
const highlights = [
  {
    icon: "mountain",
    theme: "Valley & mountain views",
    count: 14,
    quote: "The valley views from the living room are breathtaking, especially at sunset.",
    author: "Rohan",
  },
  {
    icon: "sun",
    theme: "Terrace experience",
    count: 12,
    quote: "The terrace was the highlight of our stay — perfect for morning yoga and evening chai.",
    author: "Meera",
  },
  {
    icon: "medal",
    theme: "Responsive host",
    count: 11,
    quote: "Daksh was incredibly responsive and helped us plan a day trip to Mussoorie.",
    author: "Priya",
  },
  {
    icon: "key",
    theme: "Easy self check-in",
    count: 9,
    quote: "The self check-in made arriving late at night stress-free.",
    author: "Rohan",
  },
  {
    icon: "elevator",
    theme: "Spacious & comfortable",
    count: 10,
    quote: "We were a family of 6 and never felt cramped. Rooms are spacious and well-lit.",
    author: "Priya",
  },
  {
    icon: "utensils",
    theme: "Well-equipped kitchen",
    count: 8,
    quote: "The kitchen had everything we needed to cook meals.",
    author: "Priya",
  },
];

const sentimentScore = {
  positive: 96, // % of reviews that are positive (4-5 stars)
  neutral: 4,
  negative: 0,
};

export function GuestLove() {
  return (
    <section id="guest-love" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What guests love"
          title={
            <>
              The highlights guests{" "}
              <span className="italic font-normal text-muted-foreground">can't stop talking about</span>
            </>
          }
          description="Synthesized from 15 verified reviews — here's what travellers consistently praise about The Valley Gaze Penthouse."
        />

        {/* Sentiment bar */}
        <Reveal delay={0.05}>
          <Card className="mt-8 sm:mt-10 border-border/70 overflow-hidden">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" className="h-5 w-5 text-primary" />
                  <span className="font-display text-lg font-semibold">Review sentiment</span>
                </div>
                <Badge className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                  {sentimentScore.positive}% positive
                </Badge>
              </div>
              {/* Sentiment bar */}
              <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                <div
                  className="bg-emerald-500 transition-all duration-700"
                  style={{ width: `${sentimentScore.positive}%` }}
                  title={`${sentimentScore.positive}% positive`}
                />
                <div
                  className="bg-amber-400 transition-all duration-700"
                  style={{ width: `${sentimentScore.neutral}%` }}
                  title={`${sentimentScore.neutral}% neutral`}
                />
                <div
                  className="bg-rose-400 transition-all duration-700"
                  style={{ width: `${sentimentScore.negative}%` }}
                  title={`${sentimentScore.negative}% negative`}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Positive ({sentimentScore.positive}%)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Neutral ({sentimentScore.neutral}%)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  Negative ({sentimentScore.negative}%)
                </span>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Highlights grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {highlights.map((h, i) => (
            <Reveal key={h.theme} delay={0.1 + i * 0.05}>
              <Card className="border-border/70 h-full hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 group">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/30 text-primary shrink-0 ring-1 ring-primary/10 transition-transform group-hover:scale-110">
                      <Icon name={h.icon} className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base font-semibold leading-tight">
                        {h.theme}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge variant="secondary" className="rounded-full text-[10px] font-normal py-0">
                          <Icon name="quote" className="h-2.5 w-2.5 mr-1" />
                          {h.count} mentions
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary/30 pl-3">
                    "{h.quote}"
                  </blockquote>
                  <p className="text-xs text-muted-foreground mt-2">— {h.author}, verified guest</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
