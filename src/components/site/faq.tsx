"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { useBooking } from "./use-booking";
import { useI18n } from "./use-i18n";
import { property, buildWhatsappLink, defaultBookingMessage } from "@/lib/property";

export function Faq() {
  const openBooking = useBooking((s) => s.open);
  const { t } = useI18n();

  return (
    <section id="faq" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.faq.eyebrow")}
          title={t("section.faq.title")}
          description="Everything you need to know before booking. Can't find an answer? Tap any Book Now button to chat directly with the host."
          align="center"
        />

        <Reveal delay={0.1}>
          <Card className="mt-10 border-border/70 overflow-hidden">
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
              {property.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className={`px-5 sm:px-7 ${i === 0 ? "" : "border-t border-border/60"}`}
                >
                  <AccordionTrigger className="py-5 sm:py-6 hover:no-underline text-left group">
                    <span className="flex items-start gap-3 font-display text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-left">
                      <span className="grid place-items-center h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 sm:pb-6 pl-10 sm:pl-[3.25rem] pr-2 text-sm sm:text-base text-foreground/80 leading-relaxed text-pretty">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Reveal>

        {/* Still have questions CTA */}
        <Reveal delay={0.2}>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="grid place-items-center h-12 w-12 rounded-full bg-primary/10 text-primary shrink-0">
              <Icon name="message" className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Chat directly with {property.host.name} on WhatsApp — usually responds within an hour.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={openBooking}
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors flex-1 sm:flex-initial"
              >
                <Icon name="calendar" className="h-4 w-4" strokeWidth={2} />
                {t("nav.bookNow")}
              </button>
              <a
                href={buildWhatsappLink(defaultBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-medium transition-colors flex-1 sm:flex-initial"
              >
                <Icon name="message" className="h-4 w-4" strokeWidth={2} />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
