"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "./icon";
import { getBookedDates } from "@/lib/property";
import { cn } from "@/lib/utils";
import { type Matcher } from "react-day-picker";

interface DateCalendarProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (v: string) => void;
  onCheckOutChange: (v: string) => void;
}

function iso(d: Date | undefined): string {
  if (!d) return "";
  return d.toISOString().split("T")[0];
}

function parse(isoStr: string): Date | undefined {
  if (!isoStr) return undefined;
  const d = new Date(isoStr + "T00:00:00");
  return isNaN(d.getTime()) ? undefined : d;
}

/**
 * Two-popover date range picker — visual month calendars that show
 * booked dates as disabled. Enforces the minimum-nights rule and
 * prevents selecting a range that overlaps any booked date.
 */
export function DateCalendar({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateCalendarProps) {
  const [openIn, setOpenIn] = useState(false);
  const [openOut, setOpenOut] = useState(false);

  const bookedDates = useMemo(() => getBookedDates(), []);
  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);
  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Disable booked dates + past dates + today (check-in starts tomorrow)
  const disabledDays = useMemo(
    () => [
      (date: Date) => date.getTime() < todayStart.getTime(),
      ...bookedDates.map((d) => parse(d)!).filter(Boolean),
    ],
    [bookedDates, todayStart],
  );

  const checkInDate = parse(checkIn);
  const checkOutDate = parse(checkOut);

  const checkoutDisabled = useMemo(() => {
    const base = [...disabledDays] as Matcher[];
    if (checkInDate) {
      const earliest = new Date(checkInDate);
      earliest.setDate(earliest.getDate() + 1);
      base.push({ before: earliest });
    } else {
      base.push({ before: new Date() });
    }
    return base;
  }, [disabledDays, checkInDate]);

  /** Check if any booked date falls inside the [start, end) range */
  const rangeOverlapsBooking = (start: Date, end: Date): boolean => {
    const cursor = new Date(start);
    while (cursor < end) {
      if (bookedSet.has(iso(cursor))) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  };

  const openOutTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(openOutTimer.current);
  }, []);

  const handleCheckInSelect = (day: Date) => {
    onCheckInChange(iso(day));
    // Auto-set checkout to next day
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    onCheckOutChange(iso(nextDay));
    setOpenIn(false);
    // Auto-open checkout popover for a smooth flow
    clearTimeout(openOutTimer.current);
    openOutTimer.current = setTimeout(() => setOpenOut(true), 150);
  };

  const handleCheckOutSelect = (day: Date) => {
    if (!checkInDate) return;
    // Reject if range overlaps a booking
    if (rangeOverlapsBooking(checkInDate, day)) {
      return;
    }
    onCheckOutChange(iso(day));
    setOpenOut(false);
  };

  const fmtDisplay = (isoStr: string) => {
    const d = parse(isoStr);
    if (!d) return "Add date";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Check-in */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Icon name="calendar" className="inline h-3.5 w-3.5 mr-1" />
          Check-in
        </Label>
        <Popover open={openIn} onOpenChange={setOpenIn}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-10 bg-background hover:bg-secondary",
                !checkIn && "text-muted-foreground",
              )}
            >
              <Icon name="calendar" className="h-4 w-4 mr-2 text-primary" />
              {checkIn ? fmtDisplay(checkIn) : "Add date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={(d) => d && handleCheckInSelect(d)}
              disabled={disabledDays}
              numberOfMonths={1}
              showOutsideDays={false}
              className="rounded-lg border-0"
            />
            <div className="border-t border-border/60 p-3 text-xs text-muted-foreground text-center">
              Pick any available date
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Icon name="calendar" className="inline h-3.5 w-3.5 mr-1" />
          Check-out
        </Label>
        <Popover open={openOut} onOpenChange={setOpenOut}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={!checkIn}
              className={cn(
                "w-full justify-start text-left font-normal h-10 bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed",
                !checkOut && "text-muted-foreground",
              )}
            >
              <Icon name="calendar" className="h-4 w-4 mr-2 text-primary" />
              {checkOut ? fmtDisplay(checkOut) : "Add date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: checkInDate, to: checkOutDate }}
              onSelect={(range) => {
                if (!range?.to || !checkInDate) return;
                handleCheckOutSelect(range.to);
              }}
              disabled={checkoutDisabled}
              numberOfMonths={1}
              showOutsideDays={false}
              defaultMonth={checkInDate ? new Date(checkInDate.getTime() + 86400000) : new Date()}
              className="rounded-lg border-0"
            />
            <div className="border-t border-border/60 p-3 text-xs text-muted-foreground">
              {checkIn ? (
                <span>
                  From <strong className="text-foreground">{fmtDisplay(checkIn)}</strong> · pick your check-out date
                </span>
              ) : (
                <span>Select a check-in date first</span>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
