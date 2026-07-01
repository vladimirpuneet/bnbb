"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StarRating } from "./star-rating";
import { useBooking } from "./use-booking";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";

export function Host() {
  const openBooking = useBooking((s) => s.open);
  const { t } = useI18n();

  return (
    <section id="host" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.host.eyebrow")}
          title={t("section.host.title")}
          description={t("section.host.desc")}
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10 items-start">
          {/* Host portrait card */}
          <Reveal>
            <Card className="overflow-hidden border-border/70 h-full">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden">
                <img
                  src={property.host.image}
                  alt={property.host.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/15 backdrop-blur-md text-white border-white/25 hover:bg-white/20 rounded-full">
                    <Icon name="medal" className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
                    Superhost
                  </Badge>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                  <h3 className="font-display text-3xl font-semibold drop-shadow-md">
                    {property.host.name}
                  </h3>
                  <p className="text-white/85 text-sm mt-0.5">
                    {property.host.yearsHosting} year hosting · {property.host.totalReviews} reviews
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <StarRating rating={property.host.averageRating} size="sm" showValue={false} />
                    <span className="text-sm font-semibold">{property.host.averageRating.toFixed(2)}</span>
                    <span className="text-white/70 text-sm">average rating</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Response rate</div>
                    <div className="font-display text-2xl font-semibold mt-0.5">{property.host.responseRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Responds</div>
                    <div className="font-display text-2xl font-semibold mt-0.5">{property.host.responseTime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Host bio + details */}
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

              <div className="grid sm:grid-cols-2 gap-4">
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
                <Card className="border-border/70">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="sparkles" className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        My work
                      </span>
                    </div>
                    <p className="font-medium italic">"{property.host.work}"</p>
                  </CardContent>
                </Card>
              </div>

              {/* Highlights strip */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "medal", label: "Superhost", value: "Verified" },
                  { icon: "shield", label: "Identity", value: "Verified" },
                  { icon: "message", label: "Response", value: "Within 1 hr" },
                ].map((h) => (
                  <div
                    key={h.label}
                    className="rounded-2xl bg-secondary/60 border border-border/60 p-4 text-center"
                  >
                    <div className="grid place-items-center h-9 w-9 mx-auto rounded-full bg-primary/10 text-primary mb-1.5">
                      <Icon name={h.icon} className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-xs text-muted-foreground">{h.label}</div>
                    <div className="text-sm font-semibold">{h.value}</div>
                  </div>
                ))}
              </div>

              <Button
                onClick={openBooking}
                size="lg"
                className="w-full h-12 sm:h-13 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md shadow-primary/20"
              >
                <Icon name="message" className="h-5 w-5 mr-2" strokeWidth={2} />
                Message the host
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
