"use client";

import { useState, useSyncExternalStore } from "react";
import { Check } from "lucide-react";

import { Sky } from "@/components/brand/sky";
import { ME, TASKS } from "@/lib/app-data";
import { cn } from "@/lib/utils";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
const getHour = () => {
  const d = new Date();
  return Math.round((d.getHours() + d.getMinutes() / 60) * 4) / 4;
};

/** The dashboard's welcome card: the sky outside the user's window, right now. */
export function WelcomeSky() {
  const hour = useSyncExternalStore(subscribe, getHour, () => 17.75);
  const greeting = hour < 5 ? "Working late" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : hour < 21 ? "Good evening" : "Working late";
  const dark = hour < 6 || hour > 19.6;

  return (
    <Sky hour={hour} className="rounded-xl ring-1 ring-border">
      <div className={cn("flex min-h-[220px] flex-col justify-between gap-8 p-6 sm:p-8", dark ? "text-white" : "text-ink")}>
        <p className="font-mono text-xs tracking-[0.18em] uppercase opacity-75">Tuesday, November 10</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.035em]">
              {greeting}, <span className="font-serif italic">{ME.first}.</span>
            </h1>
            <p className={cn("mt-3 max-w-md", dark ? "text-white/80" : "text-ink/80")}>
              $14,800 has landed this month and $23,800 more is on its way. Fernhill is reading your proposal right now.
            </p>
          </div>
          <div className="flex gap-2">
            {[
              ["3", "need you"],
              ["31h", "saved"],
            ].map(([v, l]) => (
              <span key={l} className="rounded-xl border border-white/30 bg-white/70 px-4 py-2.5 text-ink backdrop-blur-md">
                <span className="block text-xl leading-none tracking-tight">{v}</span>
                <span className="text-xs text-muted-foreground">{l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Sky>
  );
}

export function TaskList() {
  const [done, setDone] = useState<Set<string>>(() => new Set(TASKS.filter((t) => t.done).map((t) => t.id)));
  const left = TASKS.length - done.size;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-label-bold">Today</h2>
        <span className="text-sm text-muted-foreground">{left === 0 ? "All done. Go outside." : `${left} left`}</span>
      </div>
      <ul className="mt-4 space-y-1">
        {TASKS.map((t) => {
          const on = done.has(t.id);
          return (
            <li key={t.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted/60 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/40">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() =>
                    setDone((s) => {
                      const n = new Set(s);
                      if (n.has(t.id)) n.delete(t.id);
                      else n.add(t.id);
                      return n;
                    })
                  }
                />
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    on ? "border-good bg-good text-white" : "border-ink/25",
                  )}
                >
                  {on && <Check className="size-3.5" />}
                </span>
                <span className={cn("flex-1 text-[15px] transition-colors", on && "text-muted-foreground line-through")}>{t.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{t.due}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
