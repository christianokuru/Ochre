"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Sky } from "@/components/brand/sky";
import { STORIES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Branding", "Photography", "Architecture", "Motion", "Illustration"] as const;

export function CustomerGrid() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const list = STORIES.slice(1).filter((s) => f === "All" || s.discipline === f);

  return (
    <div>
      <div role="toolbar" aria-label="Filter by discipline" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {FILTERS.map((x) => {
          const count = x === "All" ? STORIES.length - 1 : STORIES.slice(1).filter((s) => s.discipline === x).length;
          return (
            <button
              key={x}
              type="button"
              aria-pressed={f === x}
              onClick={() => setF(x)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                f === x ? "border-ink bg-ink text-white" : "border-border bg-card hover:border-ink/40",
              )}
            >
              {x} <span className="ml-1 font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-ink/20 p-10 text-center text-muted-foreground">
          No {f.toLowerCase()} stories yet. <span className="font-script text-2xl text-violet">yours could be first?</span>
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <li key={s.slug} className="animate-rise">
              <Link
                href={`/customers/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow hover:ring-ink/40"
              >
                <Sky hour={s.hour} className="h-44">
                  <div className="flex h-44 flex-col justify-between p-4">
                    <span className="self-start rounded-full bg-white/80 px-2.5 py-1 text-xs backdrop-blur">{s.discipline}</span>
                    <span className="self-end text-[3rem] leading-none tracking-[-0.05em] text-white drop-shadow-[0_1px_12px_rgb(0_0_0/0.25)]">
                      {s.metric}
                    </span>
                  </div>
                </Sky>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-muted-foreground">
                    {s.studio} · {s.city}
                  </p>
                  <h3 className="mt-2 flex-1 text-lg leading-snug font-[460]">{s.headline}</h3>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-violet">
                    Read story <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
