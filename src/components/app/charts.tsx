"use client";

import { useState } from "react";

import { money, moneyCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

const HATCH =
  "repeating-linear-gradient(135deg, var(--ochre) 0 2px, transparent 2px 6px)";

/** Single-series sparkline with a hover crosshair and value readout. */
export function Sparkline({
  data,
  label,
  prefix = "",
  suffix = "",
  labels,
}: {
  data: number[];
  label: string;
  prefix?: string;
  suffix?: string;
  labels?: string[];
}) {
  const format = (v: number) => `${prefix}${v}${suffix}`;
  const [hover, setHover] = useState<number | null>(null);
  const W = 160;
  const H = 44;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - 4 - ((v - min) / (max - min || 1)) * (H - 8);
  const d = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const i = hover ?? data.length - 1;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-11 w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${label}: from ${format(data[0])} to ${format(data[data.length - 1])}`}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(Math.round(((e.clientX - r.left) / r.width) * (data.length - 1)));
        }}
        onMouseLeave={() => setHover(null)}
      >
        <path d={`${d} L${W} ${H} L0 ${H} Z`} fill="var(--ochre)" opacity="0.08" />
        <path d={d} fill="none" stroke="var(--ochre)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {hover != null && <line x1={x(i)} x2={x(i)} y1="0" y2={H} stroke="var(--ink)" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />}
      </svg>
      <span
        className="pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ochre ring-2 ring-card"
        style={{ left: `${(x(i) / W) * 100}%`, top: `${(y(data[i]) / H) * 100}%` }}
      />
      {hover != null && (
        <span
          className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-white"
          style={{ left: `${(x(i) / W) * 100}%` }}
        >
          {labels?.[i] ? `${labels[i]} · ` : ""}
          {format(data[i])}
        </span>
      )}
    </div>
  );
}

type Month = { m: string; paid: number; expected?: number };

/** Monthly revenue: paid bars (solid ochre) + this month's expected remainder (hatched). */
export function RevenueChart({ data }: { data: Month[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [view, setView] = useState<"chart" | "table">("chart");
  const max = 45000;
  const ticks = [45000, 30000, 15000, 0];
  const total = data.reduce((s, d) => s + d.paid, 0);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] text-muted-foreground">Revenue, last 12 months</h2>
          <p className="mt-1 text-heading-sm tabular-nums">{money(total)}</p>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4 text-xs text-muted-foreground" aria-label="Legend">
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px] bg-ochre" /> Paid
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px] ring-1 ring-ochre" style={{ backgroundImage: HATCH }} /> Expected
            </li>
          </ul>
          <div className="flex rounded-lg bg-muted p-0.5 text-xs" role="tablist" aria-label="View">
            {(["chart", "table"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={cn("rounded-md px-2.5 py-1 capitalize", view === v ? "bg-card shadow-sm" : "text-muted-foreground")}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "chart" ? (
        <div className="relative mt-6 h-64 pl-10">
          {ticks.map((t) => (
            <div key={t} className="absolute right-0 left-10 flex items-center" style={{ top: `${(1 - t / max) * 100}%` }}>
              <span className="absolute -left-10 w-8 -translate-y-1/2 text-right font-mono text-[10px] text-muted-foreground">
                {t === 0 ? "0" : moneyCompact(t)}
              </span>
              <span className={cn("h-px w-full", t === 0 ? "bg-ink/40" : "bg-border")} />
            </div>
          ))}
          <div className="absolute inset-0 left-10 flex items-end gap-1.5 sm:gap-2.5" onMouseLeave={() => setHover(null)}>
            {data.map((d, i) => {
              const paidH = (d.paid / max) * 100;
              const expH = ((d.expected ?? 0) / max) * 100;
              const dim = hover != null && hover !== i;
              const last = i === data.length - 1;
              return (
                <button
                  key={d.m}
                  type="button"
                  className="group relative flex h-full flex-1 flex-col justify-end outline-none"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  aria-label={`${d.m}: paid ${money(d.paid)}${d.expected ? `, expected ${money(d.expected)} more` : ""}`}
                >
                  {d.expected ? (
                    <span
                      className={cn("mb-0.5 block w-full rounded-t-[4px] ring-1 ring-ochre ring-inset transition-opacity", dim && "opacity-40")}
                      style={{ height: `${expH}%`, backgroundImage: HATCH }}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "block w-full bg-ochre transition-opacity group-focus-visible:ring-2 group-focus-visible:ring-ring",
                      d.expected ? "" : "rounded-t-[4px]",
                      dim && "opacity-40",
                    )}
                    style={{ height: `${paidH}%` }}
                  />
                  <span className={cn("absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px]", last ? "font-semibold" : "text-muted-foreground")}>
                    {d.m}
                  </span>
                  {hover === i && (
                    <span
                      className={cn(
                        "pointer-events-none absolute z-10 w-max rounded-lg bg-ink px-3 py-2 text-left text-xs text-white shadow-lg",
                        // Edge-aware: never spill past the card on the first/last bars.
                        i <= 1 ? "left-0" : i >= data.length - 2 ? "right-0" : "left-1/2 -translate-x-1/2",
                      )}
                      style={{ bottom: `calc(${paidH + expH}% + 10px)` }}
                    >
                      <span className="block font-semibold">{d.m} {d.m === "Dec" ? "2025" : "2026"}</span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="size-2 rounded-sm bg-ochre" /> Paid <b className="ml-auto pl-3 font-mono font-normal">{money(d.paid)}</b>
                      </span>
                      {d.expected ? (
                        <span className="mt-0.5 flex items-center gap-2">
                          <span className="size-2 rounded-sm ring-1 ring-[#e0a458]" style={{ backgroundImage: HATCH }} /> Expected
                          <b className="ml-auto pl-3 font-mono font-normal">{money(d.expected)}</b>
                        </span>
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-6 max-h-72 overflow-auto rounded-lg ring-1 ring-border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-normal">Month</th>
                <th className="px-3 py-2 text-right font-normal">Paid</th>
                <th className="px-3 py-2 text-right font-normal">Expected</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.m} className="border-t border-border">
                  <td className="px-3 py-2">{d.m}</td>
                  <td className="px-3 py-2 text-right font-mono">{money(d.paid)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{d.expected ? money(d.expected) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "chart" && <div className="h-6" />}
    </div>
  );
}
