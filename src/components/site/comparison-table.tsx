"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { useI18n } from "./use-i18n";
import { property } from "@/lib/property";

interface ComparisonRow {
  feature: string;
  icon: string;
  valleyGaze: string | boolean;
  typicalHotel: string | boolean;
  typicalHomestay: string | boolean;
  highlight?: boolean;
}

const comparison: ComparisonRow[] = [
  {
    feature: "Price per night",
    icon: "medal",
    valleyGaze: "₹" + (6500).toLocaleString("en-IN") + " – ₹" + (8500).toLocaleString("en-IN"),
    typicalHotel: "₹" + (8000).toLocaleString("en-IN") + " – ₹" + (15000).toLocaleString("en-IN"),
    typicalHomestay: "₹" + (4000).toLocaleString("en-IN") + " – ₹" + (7000).toLocaleString("en-IN"),
    highlight: true,
  },
  {
    feature: "Guests",
    icon: "users",
    valleyGaze: "Up to 9",
    typicalHotel: "2–4 (extra charges)",
    typicalHomestay: "Up to 6",
  },
  {
    feature: "Bedrooms",
    icon: "door",
    valleyGaze: "3 private rooms",
    typicalHotel: "1–2 rooms",
    typicalHomestay: "2–3 shared",
  },
  {
    feature: "Valley & mountain view",
    icon: "mountain",
    valleyGaze: true,
    typicalHotel: false,
    typicalHomestay: "Partial",
  },
  {
    feature: "Private terrace",
    icon: "sun",
    valleyGaze: true,
    typicalHotel: false,
    typicalHomestay: false,
  },
  {
    feature: "Fully equipped kitchen",
    icon: "utensils",
    valleyGaze: true,
    typicalHotel: false,
    typicalHomestay: "Basic",
  },
  {
    feature: "Lift access",
    icon: "elevator",
    valleyGaze: true,
    typicalHotel: true,
    typicalHomestay: false,
  },
  {
    feature: "Self check-in",
    icon: "key",
    valleyGaze: true,
    typicalHotel: "Reception hours",
    typicalHomestay: "Host-dependent",
  },
  {
    feature: "Pet-friendly",
    icon: "paw",
    valleyGaze: true,
    typicalHotel: false,
    typicalHomestay: "Sometimes",
  },
  {
    feature: "Free parking",
    icon: "car",
    valleyGaze: true,
    typicalHotel: "₹200–500/day",
    typicalHomestay: "Street only",
  },
  {
    feature: "Service fees (direct booking)",
    icon: "sparkles",
    valleyGaze: "₹0 (waived)",
    typicalHotel: "₹1,000–2,000",
    typicalHomestay: "₹500–1,000",
    highlight: true,
  },
  {
    feature: "Distance to Mussoorie",
    icon: "mapPin",
    valleyGaze: "40 min",
    typicalHotel: "30–60 min",
    typicalHomestay: "45–90 min",
  },
];

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        className={`inline-flex items-center justify-center h-7 w-7 rounded-full ${
          highlight ? "bg-primary/15 text-primary" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon name="check" className="h-4 w-4" strokeWidth={3} />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground">
        <Icon name="x" className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className={`text-sm font-medium ${highlight ? "text-primary" : "text-foreground/85"}`}>
      {value}
    </span>
  );
}

export function ComparisonTable() {
  const { t } = useI18n();

  return (
    <section id="comparison" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why choose us"
          title={
            <>
              The Valley Gaze advantage —{" "}
              <span className="italic font-normal text-muted-foreground">compared</span>
            </>
          }
          description="See how The Valley Gaze Penthouse stacks up against typical hotels and homestays in Dehradun. More space, better views, and zero service fees on direct bookings."
        />

        <Reveal delay={0.1}>
          <Card className="mt-10 sm:mt-14 border-border/70 overflow-hidden">
            <CardContent className="p-0">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/70 bg-secondary/40">
                      <th className="text-left p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Feature
                      </th>
                      <th className="text-center p-4 sm:p-5 bg-primary/5 border-x border-primary/10">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-display text-base font-bold text-primary">
                            The Valley Gaze
                          </span>
                          <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 text-[10px]">
                            This property
                          </Badge>
                        </div>
                      </th>
                      <th className="text-center p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Typical Hotel
                      </th>
                      <th className="text-center p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Typical Homestay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-border/40 last:border-b-0 ${
                          row.highlight ? "bg-primary/3" : ""
                        } ${i % 2 === 0 ? "" : "bg-secondary/20"}`}
                      >
                        <td className="p-4 sm:p-5">
                          <div className="flex items-center gap-2.5">
                            <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary shrink-0">
                              <Icon name={row.icon} className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-medium text-foreground/90">
                              {row.feature}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 sm:p-5 text-center bg-primary/5 border-x border-primary/10">
                          <Cell value={row.valleyGaze} highlight={row.highlight} />
                        </td>
                        <td className="p-4 sm:p-5 text-center">
                          <Cell value={row.typicalHotel} />
                        </td>
                        <td className="p-4 sm:p-5 text-center">
                          <Cell value={row.typicalHomestay} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border/40">
                {comparison.map((row) => (
                  <div key={row.feature} className={`p-4 ${row.highlight ? "bg-primary/5" : ""}`}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon name={row.icon} className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-foreground">{row.feature}</span>
                      {row.highlight && (
                        <Badge className="ml-auto rounded-full bg-primary/10 text-primary border-primary/20 text-[10px]">
                          Key
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-primary/8 p-2">
                        <div className="text-[10px] uppercase tracking-wider text-primary/70 font-medium mb-1">
                          Valley Gaze
                        </div>
                        <Cell value={row.valleyGaze} highlight={row.highlight} />
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">
                          Hotel
                        </div>
                        <Cell value={row.typicalHotel} />
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">
                          Homestay
                        </div>
                        <Cell value={row.typicalHomestay} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Bottom summary */}
        <Reveal delay={0.2}>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center">
              <div className="font-display text-3xl font-bold text-primary tabular-nums">
                ₹0
              </div>
              <div className="text-xs text-muted-foreground mt-1">Service fees on direct booking</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5 text-center">
              <div className="font-display text-3xl font-bold tabular-nums">9</div>
              <div className="text-xs text-muted-foreground mt-1">Guests accommodated</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-secondary/40 p-5 text-center">
              <div className="font-display text-3xl font-bold tabular-nums">4.7★</div>
              <div className="text-xs text-muted-foreground mt-1">From 27 reviews</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
