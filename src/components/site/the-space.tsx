"use client";

import { Card } from "@/components/ui/card";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { openLightbox } from "./lightbox";
import { t } from "./use-i18n";
import { property } from "@/lib/property";
import { SectionHeader } from "./section-header";

const blocks = [
  {
    icon: "sofa",
    title: "The space",
    body: property.theSpace,
    image: "/images/hall/gallery-01.webp",
    accent: "Living area",
  },
  {
    icon: "sun",
    title: "Guest access",
    body: property.guestAccess,
    image: "/images/terrace/hero.webp",
    accent: "Terrace & lift",
  },
  {
    icon: "quote",
    title: "Other things to note",
    body: property.otherNotes,
    image: "/images/kitchen/gallery-01.webp",
    accent: "House etiquette",
  },
];

export function TheSpace() {

  return (
    <section id="space" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.space.eyebrow")}
          title={t("section.space.title")}
          description={t("section.space.desc")}
        />

        <div className="mt-10 sm:mt-14 grid gap-5 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <Card className="overflow-hidden h-full border-border/70 hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300">
                <button
                  onClick={() => openLightbox(property.allImages.indexOf(b.image))}
                  className="relative block w-full aspect-[4/3] overflow-hidden group"
                >
                  <img
                    src={b.image}
                    alt={b.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-foreground">
                    <Icon name={b.icon} className="h-3.5 w-3.5 text-primary" />
                    {b.accent}
                  </div>
                </button>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="grid place-items-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                      <Icon name={b.icon} className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty whitespace-pre-line">
                    {b.body}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
