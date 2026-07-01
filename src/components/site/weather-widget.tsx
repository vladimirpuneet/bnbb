"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { property } from "@/lib/property";

interface DayForecast {
  date: string;
  max: number;
  min: number;
  code: number;
}

interface WeatherState {
  loading: boolean;
  error: string | null;
  current: {
    temp: number;
    feelsLike: number;
    code: number;
    humidity: number;
    wind: number;
    isDay: boolean;
  } | null;
  forecast: DayForecast[];
}

/** WMO weather interpretation codes → label + lucide icon name */
const WMO: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "sun" },
  1: { label: "Mainly clear", icon: "sun" },
  2: { label: "Partly cloudy", icon: "sun" },
  3: { label: "Overcast", icon: "wind" },
  45: { label: "Fog", icon: "wind" },
  48: { label: "Rime fog", icon: "wind" },
  51: { label: "Light drizzle", icon: "drop" },
  53: { label: "Drizzle", icon: "drop" },
  55: { label: "Heavy drizzle", icon: "drop" },
  61: { label: "Light rain", icon: "drop" },
  63: { label: "Rain", icon: "drop" },
  65: { label: "Heavy rain", icon: "drop" },
  66: { label: "Freezing rain", icon: "snowflake" },
  67: { label: "Freezing rain", icon: "snowflake" },
  71: { label: "Light snow", icon: "snowflake" },
  73: { label: "Snow", icon: "snowflake" },
  75: { label: "Heavy snow", icon: "snowflake" },
  77: { label: "Snow grains", icon: "snowflake" },
  80: { label: "Rain showers", icon: "drop" },
  81: { label: "Rain showers", icon: "drop" },
  82: { label: "Violent showers", icon: "drop" },
  85: { label: "Snow showers", icon: "snowflake" },
  86: { label: "Heavy snow showers", icon: "snowflake" },
  95: { label: "Thunderstorm", icon: "flame" },
  96: { label: "Thunderstorm + hail", icon: "flame" },
  99: { label: "Severe thunderstorm", icon: "flame" },
};

function wmo(code: number) {
  return WMO[code] ?? { label: "—", icon: "wind" };
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function WeatherWidget() {
  const [state, setState] = useState<WeatherState>({
    loading: true,
    error: null,
    current: null,
    forecast: [],
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?` +
          `latitude=${property.geo.lat}&longitude=${property.geo.lng}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
          `&timezone=${encodeURIComponent(property.geo.timezone)}&forecast_days=4`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather service unavailable");
        const data = await res.json();
        if (cancelled) return;

        const forecast: DayForecast[] = (data.daily?.time || []).map((t: string, i: number) => ({
          date: t,
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weather_code[i],
        }));

        setState({
          loading: false,
          error: null,
          current: {
            temp: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
            code: data.current.weather_code,
            humidity: data.current.relative_humidity_2m,
            wind: Math.round(data.current.wind_speed_10m),
            isDay: data.current.is_day === 1,
          },
          forecast,
        });
      } catch (e) {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error: (e as Error).message }));
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="border-border/70 overflow-hidden h-full">
      <div className="relative bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-emerald-500/10 dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-emerald-950/20 p-5 sm:p-6">
        {/* Decorative cloud/sun */}
        <div className="absolute top-3 right-3 opacity-30">
          <Icon name={state.current ? wmo(state.current.code).icon : "sun"} className="h-16 w-16 text-sky-600 dark:text-sky-400" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-1">
            <Icon name="mapPin" className="h-3.5 w-3.5" />
            Dehradun weather
          </div>

          {state.loading ? (
            <div className="py-6">
              <div className="h-12 w-24 rounded-lg bg-foreground/10 animate-pulse mb-3" />
              <div className="h-4 w-32 rounded bg-foreground/10 animate-pulse" />
            </div>
          ) : state.error ? (
            <div className="py-6 text-sm text-muted-foreground">
              <Icon name="wind" className="h-6 w-6 mb-1.5" />
              Weather unavailable
              <p className="text-xs mt-0.5">Please check back later.</p>
            </div>
          ) : state.current ? (
            <>
              <div className="flex items-end gap-1">
                <span className="font-display text-5xl sm:text-6xl font-bold tabular-nums text-foreground leading-none">
                  {state.current.temp}°
                </span>
                <span className="text-sm text-muted-foreground mb-1.5">C</span>
              </div>
              <p className="text-sm font-medium text-foreground/85 mt-1">
                {wmo(state.current.code).label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Feels like {state.current.feelsLike}°C
                {state.current.isDay ? "" : " · Night"}
              </p>

              {/* Quick stats */}
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Icon name="drop" className="h-3.5 w-3.5" />
                  {state.current.humidity}% humidity
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="wind" className="h-3.5 w-3.5" />
                  {state.current.wind} km/h
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* 3-day forecast */}
      {state.forecast.length > 1 && (
        <CardContent className="p-4 grid grid-cols-3 gap-2 border-t border-border/50">
          {state.forecast.slice(1, 4).map((d) => {
            const date = new Date(d.date + "T00:00:00");
            const dayLabel = WEEKDAYS[date.getDay()];
            const w = wmo(d.code);
            return (
              <div
                key={d.date}
                className="rounded-xl bg-secondary/50 border border-border/40 p-3 text-center"
              >
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {dayLabel}
                </div>
                <div className="grid place-items-center my-1.5">
                  <Icon name={w.icon} className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-medium text-foreground/80 truncate" title={w.label}>
                  {w.label}
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-semibold text-foreground">{d.max}°</span>
                  <span className="text-muted-foreground mx-1">/</span>
                  <span className="text-muted-foreground">{d.min}°</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      )}

      <div className="px-5 sm:px-6 pb-4 -mt-1">
        <Badge variant="outline" className="rounded-full text-[10px] font-normal border-sky-500/30 text-sky-700 dark:text-sky-400">
          <Icon name="sparkles" className="h-3 w-3 mr-1" />
          Best time: Oct–Mar · 15–25°C
        </Badge>
      </div>
    </Card>
  );
}

export function WeatherSection() {
  return (
    <section id="weather" className="py-16 sm:py-24 bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
          <Reveal>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-3">
                Plan your visit
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
                Pleasant weather,
                <span className="italic font-normal text-muted-foreground"> year-round.</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed text-pretty max-w-xl">
                Dehradun sits in the Doon valley at 640m elevation, enjoying a temperate climate.
                Winters (Oct–Mar) are crisp and clear with daytime highs of 15–25°C — perfect for
                the terrace and valley views. Summers are warm but pleasant compared to the plains,
                and the monsoon (Jul–Sep) paints the surrounding hills vivid green.
              </p>

              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Winter (Oct–Mar)", value: "8–22°C", icon: "snowflake", note: "Crisp & clear" },
                  { label: "Summer (Apr–Jun)", value: "22–38°C", icon: "sun", note: "Warm days" },
                  { label: "Monsoon (Jul–Sep)", value: "20–30°C", icon: "drop", note: "Lush & green" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border/60 bg-secondary/40 p-4"
                  >
                    <div className="grid place-items-center h-9 w-9 rounded-full bg-primary/10 text-primary mb-2">
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="font-display text-lg font-semibold mt-0.5">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <WeatherWidget />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
