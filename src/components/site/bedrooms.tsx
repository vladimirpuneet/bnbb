"use client";

import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { openLightbox } from "./lightbox";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";
import { SectionHeader } from "./section-header";

export function Bedrooms() {
  const { t } = useI18n();
  return (
    <section id="bedrooms" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.bedrooms.eyebrow")}
          title={t("section.bedrooms.title")}
          description={t("section.bedrooms.desc")}
        />

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-3">
          {property.bedrooms.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border/70 hover:border-primary/30 transition-colors">
                <button
                  onClick={() => openLightbox(property.allImages.indexOf(b.image))}
                  className="relative block w-full aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={b.image}
                    alt={b.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/15 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="arrowUpRight" className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-xs font-medium mb-2">
                      <Icon name="bed" className="h-3.5 w-3.5" />
                      {b.bed}
                    </div>
                    <h3 className="font-display text-2xl font-semibold drop-shadow-sm">{b.name}</h3>
                  </div>
                </button>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {b.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Quick legend */}
        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bed" className="h-3.5 w-3.5" /> 3 king beds
            </span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bath" className="h-3.5 w-3.5" /> 2 attached washrooms
            </span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="door" className="h-3.5 w-3.5" /> 1 common washroom
            </span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="users" className="h-3.5 w-3.5" /> Sleeps up to 9
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
