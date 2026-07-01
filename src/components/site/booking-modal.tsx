"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { DateCalendar } from "./date-calendar";
import { useBooking } from "./use-booking";
import { property } from "@/lib/property";

function formatINR(n: number) {
  return `${property.pricing.currency}${n.toLocaleString("en-IN")}`;
}

export function BookingModal() {
  const {
    isOpen,
    close,
    checkIn,
    checkOut,
    guests,
    name,
    quote,
    quoteError,
    setCheckIn,
    setCheckOut,
    setGuests,
    setName,
    getBookingUrl,
  } = useBooking();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const url = getBookingUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    close();
    // Confirmation toast — reassures the user after redirect
    toast.success("Booking enquiry sent! ✅", {
      description: `WhatsApp opened for ${property.host.name}. They usually respond within an hour. Tip: check your WhatsApp tab to complete the message.`,
      duration: 6000,
    });
  };

  const handleQuickBook = () => {
    const url = useBooking.getState().quickBook();
    window.open(url, "_blank", "noopener,noreferrer");
    close();
    toast("Opening WhatsApp… 💬", {
      description: `Send the pre-filled message to ${property.whatsappDisplay} and ${property.host.name} will get back to you shortly.`,
      duration: 6000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden gap-0 max-h-[92vh] overflow-y-auto scrollbar-thin">
        {/* Header banner */}
        <div className="relative h-32 sm:h-40 overflow-hidden shrink-0">
          <img
            src="/images/img-03.jpeg"
            alt="Valley view"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/15" />
          <DialogHeader className="relative p-5 sm:p-6 pb-0">
            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-primary-foreground drop-shadow-md">
              Book your stay
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/90 mt-1">
              {property.name} · {property.location}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Visual date calendar */}
          <DateCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />

          {/* Guests + name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="guests" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon name="users" className="inline h-3.5 w-3.5 mr-1" />
                Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={property.houseRules.maxGuests}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon name="users" className="inline h-3.5 w-3.5 mr-1" />
                Your name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Optional"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          {/* Live quote panel */}
          {quoteError ? (
            <div className="rounded-xl border border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 p-3.5 flex items-start gap-2.5">
              <Icon name="quote" className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">{quoteError}</div>
            </div>
          ) : quote ? (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Estimated quote
                  </span>
                </div>
                <Badge variant="secondary" className="rounded-full text-[10px] font-normal">
                  {quote.seasonalName}
                </Badge>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-foreground/80">
                  <span>
                    {quote.currency}{property.pricing.weekdayNightly.toLocaleString("en-IN")} × {quote.weekdayNights} weekday night{quote.weekdayNights !== 1 ? "s" : ""}
                  </span>
                  <span className="tabular-nums">{formatINR(quote.weekdayNights * property.pricing.weekdayNightly)}</span>
                </div>
                {quote.weekendNights > 0 && (
                  <div className="flex justify-between text-foreground/80">
                    <span>
                      {quote.currency}{property.pricing.weekendNightly.toLocaleString("en-IN")} × {quote.weekendNights} weekend night{quote.weekendNights !== 1 ? "s" : ""}
                    </span>
                    <span className="tabular-nums">{formatINR(quote.weekendNights * property.pricing.weekendNightly)}</span>
                  </div>
                )}
                {quote.seasonalMultiplier > 1 && (
                  <div className="flex justify-between text-amber-700 dark:text-amber-400 text-xs">
                    <span>Seasonal adjustment ({Math.round((quote.seasonalMultiplier - 1) * 100)}% {quote.seasonalName})</span>
                    <span className="tabular-nums">+{formatINR(Math.round(quote.nightlySubtotal * (quote.seasonalMultiplier - 1)))}</span>
                  </div>
                )}
                {quote.longStayDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>{quote.longStayLabel}</span>
                    <span className="tabular-nums">−{formatINR(quote.longStayDiscount)}</span>
                  </div>
                )}
                {quote.extraGuestFee > 0 && (
                  <div className="flex justify-between text-foreground/80">
                    <span>Extra guests</span>
                    <span className="tabular-nums">+{formatINR(quote.extraGuestFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground/80">
                  <span>Cleaning fee</span>
                  <span className="tabular-nums">{quote.cleaningFee === 0 ? "Free" : formatINR(quote.cleaningFee)}</span>
                </div>
                <div className="flex justify-between text-foreground/80">
                  <span>Service fee</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Waived (direct booking)</span>
                </div>
              </div>

              <div className="border-t border-primary/15 pt-3 flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Total</div>
                  <div className="text-xs text-muted-foreground">{quote.nights} night{quote.nights !== 1 ? "s" : ""}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-primary tabular-nums">
                    {formatINR(quote.total)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ≈ {formatINR(quote.perNight)} / night
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-4 text-center">
              <Icon name="calendar" className="h-5 w-5 text-muted-foreground mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground">
                Select check-in &amp; check-out dates to see an instant price estimate.
              </p>
            </div>
          )}

          {/* Info banner */}
          <div className="rounded-lg bg-accent/60 border border-accent-foreground/10 p-3 flex items-start gap-2.5">
            <Icon name="message" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-accent-foreground/90 leading-relaxed">
              Booking is confirmed directly with the host via WhatsApp. Tapping <strong>Request booking</strong> opens WhatsApp with a pre-filled enquiry — including your estimated quote — to <strong>{property.whatsappDisplay}</strong>.
            </div>
          </div>

          {/* Max guests hint */}
          <div className="flex items-center justify-between text-xs">
            <Badge variant="secondary" className="rounded-full font-normal">
              Max {property.houseRules.maxGuests} guests · Min {property.pricing.minNights} nights
            </Badge>
            <span className="text-muted-foreground">
              <Icon name="clock" className="inline h-3 w-3 mr-1" />
              Responds within an hour
            </span>
          </div>
        </div>

        <DialogFooter className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex-col sm:flex-col gap-2 items-stretch">
          <Button
            size="lg"
            className="w-full h-12 bg-[#25D366] hover:bg-[#1da851] text-white font-medium shadow-md shadow-[#25D366]/20"
            onClick={handleSubmit}
          >
            <Icon name="message" className="h-5 w-5 mr-2" strokeWidth={2} />
            {quote ? `Request booking · ${formatINR(quote.total)}` : "Request booking on WhatsApp"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={handleQuickBook}
          >
            Skip form &amp; chat directly →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
