"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { TESTIMONIALS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d: number) => setI((x) => (x + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_380px]">
      <figure key={i} className="flex animate-rise flex-col justify-between rounded-xl bg-card p-6 ring-1 ring-border sm:p-10">
        <span aria-hidden className="font-serif text-8xl leading-[0.5] text-ochre">“</span>
        <blockquote className="mt-6 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.18] tracking-[-0.02em]">
          {t.quote}
        </blockquote>
        <figcaption className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-label-bold">{t.name}</p>
            <p className="text-muted-foreground">
              {t.role} · {t.city}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2 font-mono text-sm text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="flex size-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-ink"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </figcaption>
      </figure>

      <div
        key={`art-${i}`}
        className="grain relative flex min-h-80 animate-rise flex-col justify-between overflow-hidden rounded-xl p-6 text-white"
        style={{ background: `linear-gradient(160deg, ${t.hue[0]}, ${t.hue[1]})` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-20 font-serif text-[18rem] leading-none text-white/20 italic"
        >
          {t.name[0]}
        </span>
        <div className="relative z-[2] flex gap-1.5">
          {TESTIMONIALS.map((_, d) => (
            <button
              key={d}
              type="button"
              onClick={() => setI(d)}
              aria-label={`Show story ${d + 1}`}
              className={cn("h-1 rounded-full transition-all", d === i ? "w-8 bg-white" : "w-4 bg-white/45")}
            />
          ))}
        </div>
        <div className="relative z-[2]">
          <p className="text-[4.5rem] leading-none tracking-[-0.04em]">{t.stat}</p>
          <p className="mt-1 text-white/85">{t.statLabel}</p>
        </div>
      </div>
    </div>
  );
}
