"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { DateCalendar } from "./date-calendar";
import { useBooking } from "./use-booking";
import { property, calculateQuote } from "@/lib/property";

function formatINR(n: number) {
  return `${property.pricing.currency}${n.toLocaleString("en-IN")}`;
}

function defaultDates() {
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 7);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 2);
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  return { checkIn: fmt(checkIn), checkOut: fmt(checkOut) };
}

export function PricingEstimator() {
  const defaults = useMemo(() => defaultDates(), []);
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState("2");

  const quote = useMemo(
    () => calculateQuote({ checkIn, checkOut, guests: parseInt(guests || "1", 10) }),
    [checkIn, checkOut, guests],
  );

  const openBooking = useBooking((s) => s.open);
  const setBookingCheckIn = useBooking((s) => s.setCheckIn);
  const setBookingCheckOut = useBooking((s) => s.setCheckOut);
  const setBookingGuests = useBooking((s) => s.setGuests);

  const handleBookNow = () => {
    setBookingCheckIn(checkIn);
    setBookingCheckOut(checkOut);
    setBookingGuests(guests);
    openBooking();
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Transparent pricing"
          title={
            <>
              Estimate your stay —{" "}
              <span className="italic font-normal text-muted-foreground">no hidden fees</span>
            </>
          }
          description="Pick your dates and guest count for an instant, transparent quote. Final pricing is confirmed by your host on WhatsApp — and direct bookings skip platform service fees."
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start">
          {/* Estimator inputs */}
          <Reveal>
            <Card className="border-border/70 overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-5">
                {/* Visual date calendar (same as booking modal) */}
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
                    Up to {property.houseRules.maxGuests} guests · extra guest fee applies above {property.pricing.extraGuestThreshold}
                  </p>
                </div>

                {/* Rate card legend */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="rounded-xl bg-secondary/60 border border-border/60 p-3 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Weekday</div>
                    <div className="font-display font-semibold text-sm mt-0.5">{formatINR(property.pricing.weekdayNightly)}</div>
                    <div className="text-[10px] text-muted-foreground">Sun–Thu</div>
                  </div>
                  <div className="rounded-xl bg-secondary/60 border border-border/60 p-3 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Weekend</div>
                    <div className="font-display font-semibold text-sm mt-0.5">{formatINR(property.pricing.weekendNightly)}</div>
                    <div className="text-[10px] text-muted-foreground">Fri–Sat</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 p-3 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Service fee</div>
                    <div className="font-display font-semibold text-sm mt-0.5 text-emerald-700 dark:text-emerald-400">₹0</div>
                    <div className="text-[10px] text-muted-foreground">Direct only</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Quote output */}
          <Reveal delay={0.1}>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                {quote ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                          Your estimate
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {quote.nights} night{quote.nights !== 1 ? "s" : ""} · {guests} guest{guests !== "1" ? "s" : ""}
                        </p>
                      </div>
                      <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                        {quote.seasonalName}
                      </Badge>
                    </div>

                    <div className="font-display text-5xl sm:text-6xl font-bold text-primary tabular-nums leading-none">
                      {formatINR(quote.total)}
                    </div>
                    <p className="text-sm text-muted-foreground -mt-2">
                      ≈ {formatINR(quote.perNight)} per night · all-inclusive
                    </p>

                    {/* Breakdown */}
                    <div className="rounded-xl bg-background/60 border border-border/50 p-4 space-y-2 text-sm">
                      <div className="flex justify-between text-foreground/85">
                        <span>
                          {quote.weekdayNights} weekday × {formatINR(property.pricing.weekdayNightly)}
                        </span>
                        <span className="tabular-nums">{formatINR(quote.weekdayNights * property.pricing.weekdayNightly)}</span>
                      </div>
                      {quote.weekendNights > 0 && (
                        <div className="flex justify-between text-foreground/85">
                          <span>
                            {quote.weekendNights} weekend × {formatINR(property.pricing.weekendNightly)}
                          </span>
                          <span className="tabular-nums">{formatINR(quote.weekendNights * property.pricing.weekendNightly)}</span>
                        </div>
                      )}
                      {quote.seasonalMultiplier > 1 && (
                        <div className="flex justify-between text-amber-700 dark:text-amber-400 text-xs">
                          <span>Seasonal adjustment ({quote.seasonalName})</span>
                          <span className="tabular-nums">+{formatINR(Math.round(quote.nightlySubtotal * (quote.seasonalMultiplier - 1)))}</span>
                        </div>
                      )}
                      {quote.longStayDiscount > 0 && (
                        <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                          <span className="flex items-center gap-1.5">
                            <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                            {quote.longStayLabel}
                          </span>
                          <span className="tabular-nums">−{formatINR(quote.longStayDiscount)}</span>
                        </div>
                      )}
                      {quote.extraGuestFee > 0 && (
                        <div className="flex justify-between text-foreground/85">
                          <span>Extra guest fee</span>
                          <span className="tabular-nums">+{formatINR(quote.extraGuestFee)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-foreground/85">
                        <span>Cleaning fee</span>
                        <span className="tabular-nums">{quote.cleaningFee === 0 ? "Free" : formatINR(quote.cleaningFee)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                        <span>Service fee</span>
                        <span className="font-medium">Waived</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleBookNow}
                      size="lg"
                      className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md shadow-primary/20 group"
                    >
                      <Icon name="calendar" className="h-5 w-5 mr-2" strokeWidth={2} />
                      Book these dates
                      <Icon name="arrowRight" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                    </Button>

                    <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                      {property.pricing.note}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="calendar" className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Pick valid dates (minimum {property.pricing.minNights} nights) to see your estimate.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Seasonal rates table */}
        <Reveal delay={0.2}>
          <div className="mt-8 sm:mt-10 grid sm:grid-cols-3 gap-3">
            {property.pricing.seasons.map((s) => (
              <div
                key={s.name}
                className={`rounded-2xl border p-4 sm:p-5 ${
                  s.multiplier >= 1.3
                    ? "border-amber-500/30 bg-amber-50 dark:bg-amber-950/20"
                    : s.multiplier >= 1.1
                      ? "border-primary/20 bg-primary/5"
                      : "border-border/60 bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-display text-base font-semibold">{s.name}</h3>
                  <Badge
                    variant="outline"
                    className={`rounded-full text-xs ${
                      s.multiplier >= 1.3
                        ? "border-amber-500/40 text-amber-700 dark:text-amber-400"
                        : "border-primary/30 text-primary"
                    }`}
                  >
                    ×{s.multiplier.toFixed(2)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{s.months}</p>
                <p className="text-xs text-foreground/70 mt-1.5">{s.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
