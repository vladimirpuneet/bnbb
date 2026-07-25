"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { BlurImage } from "./blur-image";
import { openLightbox } from "./lightbox";
import { t } from "./use-i18n";
import { property } from "@/lib/property";
import { trackEvent } from "@/lib/tracking";

export function Gallery() {
  const visible = property.gallery.slice(0, 9);


  return (
    <section id="gallery" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-2">
                {t("section.gallery.eyebrow")}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
                {t("section.gallery.title")}
              </h2>
              <p className="mt-2 text-muted-foreground max-w-xl text-pretty">
                {t("section.gallery.desc")}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-full shrink-0"
              onClick={() => {
                trackEvent("view_gallery", { source: "gallery_primary" });
                openLightbox(0);
              }}
            >
              <Icon name="camera" className="h-4 w-4 mr-2" />
              {t("section.gallery.showAll")}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
            {visible.map((img, i) => (
              <button
                key={img.src}
                onClick={() => {
                  trackEvent("view_gallery", { source: "gallery_secondary", image_index: property.allImages.indexOf(img.src) });
                  openLightbox(property.allImages.indexOf(img.src));
                }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 break-inside-avoid mb-2 sm:mb-3 w-full"
              >
                <BlurImage
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium">
                    <Icon name="camera" className="h-3.5 w-3.5" />
                    {img.caption}
                  </div>
                </div>
                <div className="absolute top-2.5 right-2.5 grid place-items-center h-7 w-7 rounded-full bg-white/15 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 sm:hidden">
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={() => {
              trackEvent("view_gallery", { source: "gallery_button" });
              openLightbox(0);
            }}
          >
            <Icon name="camera" className="h-4 w-4 mr-2" />
            {t("section.gallery.showAll")} {property.allImages.length} {t("hero.photos")}
          </Button>
        </div>
      </div>
    </section>
  );
}
