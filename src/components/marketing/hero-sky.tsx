"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Bell, Clock3, Pause, Play } from "lucide-react";

import { Sky } from "@/components/brand/sky";
import { Button } from "@/components/ui/button";
import { clock } from "@/lib/format";
import { dayGradient, skyAt } from "@/lib/sky";
import { HERO_EVENTS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const PERIODS: [number, string][] = [
  [5, "Night"],
  [7, "Dawn"],
  [11, "Morning"],
  [14, "Midday"],
  [17, "Afternoon"],
  [19.3, "Golden hour"],
  [21, "Dusk"],
  [24, "Night"],
];
const periodOf = (h: number) => PERIODS.find(([end]) => h < end)?.[1] ?? "Night";

function eventsAround(h: number) {
  const sorted = [...HERO_EVENTS].sort((a, b) => a.h - b.h);
  const past = [...sorted].reverse().find((e) => e.h <= h) ?? sorted[sorted.length - 1];
  const next = sorted.find((e) => e.h > h) ?? sorted[0];
  const until = (((next.h - h) % 24) + 24) % 24;
  return { past, next, until };
}

const DAY = dayGradient();

/** Hero: a live sky you can scrub through 24 hours. Ochre's events follow the clock. */
export function HeroSky() {
  const [hour, setHour] = useState(17.7);
  const [playing, setPlaying] = useState(false);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = (now: number) => {
      if (last.current != null) {
        const dt = (now - last.current) / 1000;
        setHour((h) => (h + dt * 1.2) % 24);
      }
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      last.current = null;
    };
  }, [playing]);

  const s = skyAt(hour);
  const { past, next, until } = useMemo(() => eventsAround(hour), [hour]);
  const ink = s.light ? "text-ink" : "text-white";

  const jumpToNow = () => {
    const d = new Date();
    setPlaying(false);
    setHour(d.getHours() + d.getMinutes() / 60);
  };

  return (
    <Sky hour={hour} className="min-h-[max(640px,calc(100svh-104px))]">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 pt-14 pb-40 md:pt-16">
        <div className={cn("flex flex-col items-center text-center transition-colors duration-500", ink)}>
          <span
            className={cn(
              "animate-rise rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase backdrop-blur-sm",
              s.light ? "border-ink/15 bg-white/40" : "border-white/25 bg-white/10",
            )}
          >
            <span className="sm:hidden">For independent studios</span>
            <span className="hidden sm:inline">The back office for independent studios</span>
          </span>
          <h1 className="mt-7 animate-rise text-[clamp(3rem,8.4vw,7rem)] leading-[0.88] tracking-[-0.045em] [animation-delay:80ms]">
            Less admin.
            <br />
            More <span className="font-serif tracking-[-0.02em] italic">golden hours.</span>
          </h1>
          <p
            className={cn(
              "mt-6 max-w-lg animate-rise text-lg [animation-delay:160ms]",
              s.light ? "text-ink/80" : "text-white/80",
            )}
          >
            Proposals that close, contracts that sign themselves and invoices that actually get
            paid. So the hours you get back are yours.
          </p>
          <div className="mt-8 flex animate-rise flex-wrap justify-center gap-3 [animation-delay:240ms]">
            <Button
              className={cn("h-12 rounded-xl px-5 text-base", !s.light && "ring-1 ring-white/40")}
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Start free for 30 days <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-12 rounded-xl px-5 text-base backdrop-blur-sm",
                s.light
                  ? "border-ink/20 bg-white/50 hover:bg-white/80"
                  : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
              )}
              nativeButton={false}
              render={<Link href="/app" />}
            >
              Walk the demo studio
            </Button>
          </div>

          {/* Phones: one compact glass pill instead of the floating cards */}
          <p
            key={`pill-${past.h}`}
            className="mt-8 flex max-w-full animate-rise items-center gap-2 rounded-full border border-white/30 bg-white/80 py-1.5 pr-3.5 pl-1.5 text-left text-[13px] text-ink backdrop-blur-md md:hidden"
          >
            <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 font-mono text-[11px] text-white">{clock(past.h)}</span>
            <span className="truncate">
              <b className="font-semibold">{past.title}</b> · {past.body}
            </span>
          </p>
        </div>

        {/* Floating glass cards: what Ochre did at this hour, and what's next */}
        <div
          key={`past-${past.h}`}
          className="pointer-events-none absolute top-[58%] left-4 hidden w-72 animate-rise rounded-xl border border-white/20 bg-white/85 p-4 text-ink backdrop-blur-md md:block xl:left-0"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase">
              <Bell className="size-3.5" /> Ochre
            </span>
            <span className="rounded-md bg-ink/5 px-1.5 py-0.5 font-mono text-[11px]">{clock(past.h)}</span>
          </div>
          <p className="mt-2 text-[15px] font-semibold">{past.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{past.body}</p>
        </div>
        <div
          key={`next-${next.h}`}
          className="pointer-events-none absolute top-[6%] right-4 hidden w-64 animate-rise rounded-xl border border-white/20 bg-white/75 p-4 text-ink backdrop-blur-md lg:block xl:right-0"
        >
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <Clock3 className="size-3.5" /> in {Math.floor(until)}h {Math.round((until % 1) * 60)}m
          </span>
          <p className="mt-1.5 text-[15px] font-semibold">{next.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{next.body}</p>
        </div>
      </div>

      {/* Time scrubber */}
      <div className="absolute inset-x-0 bottom-5 z-[3] px-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-white/25 bg-black/25 p-2.5 pr-3 text-white backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause the day" : "Play the day"}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-ink transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-white/50 focus-visible:outline-none"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
          </button>
          <div className="w-[4.5rem] shrink-0">
            <div className="font-mono text-lg leading-none tabular-nums">{clock(hour)}</div>
            <div className="mt-1 text-[11px] text-white/75">{periodOf(hour)}</div>
          </div>
          <div className="relative h-10 flex-1 rounded-lg ring-1 ring-white/30 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white">
            <div className="absolute inset-0 rounded-lg" style={{ backgroundImage: DAY }} />
            <div
              aria-hidden
              className="absolute top-1/2 h-12 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgb(0_0_0/0.25)]"
              style={{ left: `${(hour / 24) * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={23.99}
              step={0.05}
              value={hour}
              onChange={(e) => {
                setPlaying(false);
                setHour(Number(e.target.value));
              }}
              aria-label="Time of day"
              aria-valuetext={`${clock(hour)}, ${periodOf(hour)}`}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <button
            type="button"
            onClick={jumpToNow}
            className="hidden shrink-0 rounded-lg px-2.5 py-2 text-sm text-white/90 transition-colors hover:bg-white/15 sm:block"
          >
            Your now
          </button>
        </div>
      </div>
    </Sky>
  );
}
