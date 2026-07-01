import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { property } from "@/lib/property";

export function Overview() {
  return (
    <section id="overview" className="py-16 sm:py-24 bg-secondary/40 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: Description */}
          <div>
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-3">
                Welcome to your retreat
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
                Where the valley holds its breath,
                <span className="italic font-normal text-muted-foreground"> and so will you.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-foreground/85 text-base sm:text-lg leading-relaxed text-pretty">
                {property.description}
              </p>
            </Reveal>

            {/* Quick stats */}
            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {property.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-background border border-border/70 p-4 text-center shadow-sm"
                  >
                    <div className="grid place-items-center h-9 w-9 mx-auto rounded-full bg-primary/10 text-primary mb-2">
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </div>
                    <div className="font-display text-2xl font-semibold tabular-nums">{s.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Tags */}
            <Reveal delay={0.3}>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-full py-1.5 pl-2.5 pr-3 border-primary/30 text-primary">
                  <Icon name="mountain" className="h-3.5 w-3.5 mr-1.5" /> Mountain view
                </Badge>
                <Badge variant="outline" className="rounded-full py-1.5 pl-2.5 pr-3 border-primary/30 text-primary">
                  <Icon name="leaf" className="h-3.5 w-3.5 mr-1.5" /> Surrounded by greenery
                </Badge>
                <Badge variant="outline" className="rounded-full py-1.5 pl-2.5 pr-3 border-primary/30 text-primary">
                  <Icon name="sun" className="h-3.5 w-3.5 mr-1.5" /> Terrace access
                </Badge>
                <Badge variant="outline" className="rounded-full py-1.5 pl-2.5 pr-3 border-primary/30 text-primary">
                  <Icon name="elevator" className="h-3.5 w-3.5 mr-1.5" /> Lift + stairs
                </Badge>
              </div>
            </Reveal>
          </div>

          {/* Right: Highlights cards */}
          <div className="space-y-4">
            <Reveal delay={0.15}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-1">
                Listing highlights
              </p>
            </Reveal>
            {property.highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.2 + i * 0.08}>
                <Card className="overflow-hidden border-border/70 hover:border-primary/30 transition-colors group">
                  <CardContent className="p-0 flex">
                    <div className="grid place-items-center w-16 sm:w-20 bg-primary/8 group-hover:bg-primary/12 transition-colors shrink-0">
                      <Icon name={h.icon} className="h-7 w-7 text-primary" />
                    </div>
                    <div className="p-4 sm:p-5 flex-1">
                      <h3 className="font-display text-lg font-semibold leading-tight">{h.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
