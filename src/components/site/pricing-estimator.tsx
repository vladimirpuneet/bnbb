"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { DateCalendar } from "./date-calendar";
import { t } from "./use-i18n";
import { property } from "@/lib/property";
import { useBooking } from "./use-booking";

import { sendGAEvent } from "@next/third-parties/google";

export function PricingEstimator() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const fmt = (d: Date) => d.toISOString().split("T")[0];
    setCheckIn(fmt(today));
    setCheckOut(fmt(tomorrow));
  }, []);


  const prefillAndOpen = useBooking((s) => s.prefillAndOpen);

  const handleRequestQuote = () => {
    sendGAEvent({ event: "whatsapp_enquiry", send_to: "AW-7868293897" });
    prefillAndOpen({ checkIn, checkOut, guests });
  };

  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(checkOut + "T00:00:00").getTime() -
            new Date(checkIn + "T00:00:00").getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("section.pricing.eyebrow")}
          title={
            <>
              {t("section.pricing.title")}{" "}
              <span className="italic font-normal text-muted-foreground">{t("section.pricing.titleSuffix")}</span>
            </>
          }
          description={t("section.pricing.desc")}
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start">
          {/* Date picker + guest selector */}
          <Reveal>
            <Card className="border-border/70 overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-5">
                <DateCalendar
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onCheckInChange={setCheckIn}
                  onCheckOutChange={setCheckOut}
                />

                <div className="space-y-1.5">
                  <Label htmlFor="est-guests" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Icon name="users" className="inline h-3.5 w-3.5 mr-1" />
                    Guests
                  </Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 rounded-full shrink-0"
                      onClick={() => setGuests(String(Math.max(1, parseInt(guests || "1", 10) - 1)))}
                      aria-label="Decrease guests"
                    >
                      −
                    </Button>
                    <Input
                      id="est-guests"
                      type="number"
                      min={1}
                      max={property.houseRules.maxGuests}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="bg-background text-center font-medium"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 rounded-full shrink-0"
                      onClick={() => setGuests(String(Math.min(property.houseRules.maxGuests, parseInt(guests || "1", 10) + 1)))}
                      aria-label="Increase guests"
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Up to {property.houseRules.maxGuests} guests
                  </p>
                </div>

                {nights >= property.pricing.minNights && (
                  <p className="text-sm text-muted-foreground text-center">
                    {nights} night{nights !== 1 ? "s" : ""} · {guests} guest{guests !== "1" ? "s" : ""}
                  </p>
                )}

                <Button
                  onClick={handleRequestQuote}
                  size="lg"
                  className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-medium shadow-md shadow-[#25D366]/20 group"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.79 0-3.46-.46-4.91-1.27l-.35-.21-2.87.85.85-2.87-.21-.35A7.963 7.963 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  Get a quote on WhatsApp
                  <Icon name="arrowRight" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </Button>

                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  Final pricing is confirmed by the host on WhatsApp. Direct bookings skip platform service fees.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Why book direct */}
          <Reveal delay={0.1}>
            <Card className="border-border/70 overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-2">
                    Why book direct
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold">
                    Best rates, zero fees
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon name="sparkles" className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">No service fees</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Platforms charge ₹1,000–2,000 per booking. Book direct and save.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon name="message" className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Personal communication</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Chat directly with Daksh on WhatsApp. Get answers within an hour.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon name="check" className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Flexible arrangements</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Customise your stay — early check-in, special requests, longer stays.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon name="medal" className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Superhost guarantee</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                      4.7★ rating · 99% response rate, replies within an hour.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
