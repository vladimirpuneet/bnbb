"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { t } from "./use-i18n";
import { property } from "@/lib/property";

export function Amenities() {

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

        <div className="mt-10 sm:mt-14 columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 sm:gap-4">
          {grouped.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.05}>
              <div className="break-inside-avoid mb-3 sm:mb-4 rounded-xl border border-border/60 bg-secondary/40 p-3.5 sm:p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="font-display text-sm font-semibold leading-tight">{g.category}</h3>
                  <Badge variant="outline" className="rounded-full text-[10px] h-5 px-2 shrink-0 ml-2">
                    {g.items.length}
                  </Badge>
                </div>
                <ul className="space-y-1.5">
                  {g.items.map((a) => (
                    <li key={a.name} className="flex items-center gap-2 rounded-md p-1 -mx-1 transition-colors hover:bg-background/60">
                      <span className="grid place-items-center h-7 w-7 rounded-lg bg-background border border-border/70 text-primary shrink-0">
                        <Icon name={a.icon} className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs text-foreground/90 leading-tight">{a.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>


      </div>
    </section>
  );
}
