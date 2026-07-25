"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StarRating } from "./star-rating";
import { t } from "./use-i18n";
import { property } from "@/lib/property";

export function Host() {
  return (
    <section id="host" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.host.eyebrow")}
          title={t("section.host.title")}
          description={t("section.host.desc")}
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10 items-start">
          <Reveal>
            <Card className="overflow-hidden border-border/70 h-full">
              <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-2 ring-offset-background mb-4">
                  <img
                    src={property.host.image}
                    alt={property.host.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full mb-3">
                  <Icon name="medal" className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
                  Superhost
                </Badge>
                <h3 className="font-display text-2xl font-semibold">
                  {property.host.name}
                </h3>
                <div className="mt-2 flex items-center gap-1.5">
                  <StarRating rating={property.host.averageRating} size="sm" showValue={false} />
                  <span className="text-sm font-semibold">{property.host.averageRating.toFixed(2)}</span>
                  <span className="text-muted-foreground text-sm">average rating</span>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5">
              <Card className="border-border/70">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 text-primary shrink-0">
                      <Icon name="quote" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-1">A note from {property.host.name}</h3>
                      <p className="text-sm text-foreground/85 leading-relaxed text-pretty">
                        {property.host.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="book" className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Where I went to school
                    </span>
                  </div>
                  <p className="font-medium">{property.host.school}</p>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
