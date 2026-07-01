"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";

export function Amenities() {
  const { t } = useI18n();
  // Group amenities by category for nicer presentation
  const categories = Array.from(new Set(property.amenities.map((a) => a.category)));
  const grouped = categories.map((cat) => ({
    category: cat,
    items: property.amenities.filter((a) => a.category === cat),
  }));

  return (
    <section id="amenities" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.amenities.eyebrow")}
          title={t("section.amenities.title")}
          description={t("section.amenities.desc")}
        />

        <div className="mt-10 sm:mt-14 grid gap-4 lg:grid-cols-3">
          {grouped.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.05}>
              <div className="rounded-2xl sm:rounded-3xl bg-secondary/50 border border-border/60 p-5 sm:p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold">{g.category}</h3>
                  <Badge variant="outline" className="rounded-full text-xs">
                    {g.items.length}
                  </Badge>
                </div>
                <ul className="space-y-3">
                  {g.items.map((a) => (
                    <li key={a.name} className="flex items-center gap-3 rounded-lg p-1 -m-1 transition-colors hover:bg-background/60">
                      <span className="grid place-items-center h-9 w-9 rounded-xl bg-background border border-border/70 text-primary shrink-0 transition-colors group-hover:border-primary/30">
                        <Icon name={a.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span className="text-sm text-foreground/90">{a.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom note: total amenities */}
        <Reveal delay={0.3}>
          <div className="mt-6 flex items-center justify-center">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="sparkles" className="h-4 w-4 text-primary" />
              Showing a selection — the full list includes 40+ amenities.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
