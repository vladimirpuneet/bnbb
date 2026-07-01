import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { property } from "@/lib/property";

export function HouseRules() {
  const r = property.houseRules;

  return (
    <section id="rules" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Things to know"
          title="House rules & stay details"
          description="A few gentle guidelines that keep every guest's stay peaceful and pleasant."
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Check-in / out card */}
          <Reveal>
            <Card className="border-border/70 h-full overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Icon name="clock" className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">Check-in & out</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/60">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Check-in</div>
                      <div className="font-display text-2xl font-semibold mt-0.5">After {r.checkIn}</div>
                    </div>
                    <Icon name="key" className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/60">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Checkout</div>
                      <div className="font-display text-2xl font-semibold mt-0.5">Before {r.checkOut}</div>
                    </div>
                    <Icon name="door" className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="key" className="h-3.5 w-3.5" />
                  Self check-in with lockbox — arrive anytime after 3 PM.
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* House rules card */}
          <Reveal delay={0.1}>
            <Card className="border-border/70 h-full overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Icon name="book" className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">House rules</h3>
                </div>
                <ul className="space-y-3">
                  {r.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="grid place-items-center h-5 w-5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/85 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border/70 flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="users" className="h-3.5 w-3.5" />
                  Maximum {r.maxGuests} guests
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Safety card */}
          <Reveal delay={0.2}>
            <Card className="border-border/70 h-full overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                    <Icon name="shield" className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">Safety & property</h3>
                </div>
                <ul className="space-y-3">
                  {property.safety.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      <span className="grid place-items-center h-5 w-5 rounded-full bg-primary/10 text-primary shrink-0">
                        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/85">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border/70">
                  <Badge variant="outline" className="rounded-full text-xs">
                    <Icon name="camera" className="h-3 w-3 mr-1.5" />
                    Cameras monitor exterior only
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
