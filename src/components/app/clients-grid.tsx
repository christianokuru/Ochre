"use client";

import { useMemo, useState } from "react";
import { Mail, MapPin, Search } from "lucide-react";

import { ClientAvatar } from "@/components/app/bits";
import { CLIENTS } from "@/lib/app-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

const SORTS = [
  ["ltv", "Lifetime value"],
  ["name", "Name"],
  ["projects", "Projects"],
] as const;

const HEALTH = {
  great: ["Thriving", "bg-[#e3f1e8] text-good"],
  ok: ["Steady", "bg-muted text-ink/70"],
  quiet: ["Gone quiet", "bg-[#fbeedd] text-warn"],
} as const;

export function ClientsGrid() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number][0]>("ltv");
  const maxLtv = Math.max(...CLIENTS.map((c) => c.ltv));

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CLIENTS.filter((c) => !query || [c.name, c.contact, c.city, c.industry].some((s) => s.toLowerCase().includes(query))).sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : sort === "ltv" ? b.ltv - a.ltv : b.projects - a.projects,
    );
  }, [q, sort]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative sm:w-72">
          <span className="sr-only">Search clients</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, city or industry"
            className="h-10 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
        </label>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort</span>
          <div className="flex rounded-lg bg-card p-0.5 ring-1 ring-border">
            {SORTS.map(([k, l]) => (
              <button
                key={k}
                aria-pressed={sort === k}
                onClick={() => setSort(k)}
                className={cn("rounded-md px-2.5 py-1.5", sort === k ? "bg-secondary" : "text-muted-foreground hover:text-foreground")}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => {
          const [hl, hc] = HEALTH[c.health];
          return (
            <li key={c.id} className="flex flex-col rounded-xl bg-card p-5 ring-1 ring-border transition-shadow hover:shadow-md">
              <div className="flex items-start gap-3">
                <ClientAvatar client={c} className="size-11 rounded-xl text-sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-[460]">{c.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {c.contact} · {c.industry}
                  </p>
                </div>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs", hc)}>{hl}</span>
              </div>
              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Lifetime value</span>
                  <span className="font-mono text-lg tabular-nums">{money(c.ltv)}</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-ochre" style={{ width: `${(c.ltv / maxLtv) * 100}%` }} />
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Projects</dt>
                  <dd>{c.projects}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Since</dt>
                  <dd>{c.since}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Last contact</dt>
                  <dd className="truncate">{c.lastContact}</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {c.city}
                </span>
                <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 hover:text-foreground">
                  <Mail className="size-3.5" /> Email
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      {list.length === 0 && (
        <p className="rounded-xl border border-dashed border-ink/20 p-12 text-center text-muted-foreground">No clients match “{q}”.</p>
      )}
    </div>
  );
}
