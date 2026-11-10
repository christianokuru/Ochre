"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAnimatedNumber } from "@/hooks/use-animated-number";
import { money } from "@/lib/format";
import { PLANS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function Price({ value }: { value: number }) {
  const v = useAnimatedNumber(value, 400);
  return <>{Math.round(v)}</>;
}

export function PricingPlans() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full border border-border bg-card p-1">
          {[
            [false, "Monthly"],
            [true, "Yearly"],
          ].map(([val, label]) => (
            <button
              key={label as string}
              type="button"
              role="radio"
              aria-checked={annual === val}
              onClick={() => setAnnual(val as boolean)}
              className={cn(
                "relative z-[1] rounded-full px-5 py-2 text-sm transition-colors",
                annual === val ? "bg-ink text-white" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {label as string}
              {val && (
                <span className={cn("ml-2 rounded-full px-1.5 py-0.5 font-mono text-[10px]", annual ? "bg-white/20" : "bg-secondary")}>
                  −20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <article
            key={p.id}
            className={cn(
              "relative flex flex-col rounded-xl p-6 md:p-5 lg:p-8",
              p.featured ? "bg-ink text-white" : "bg-card ring-1 ring-border",
            )}
          >
            {p.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-lilac px-3 py-1 text-xs font-[460] text-ink">
                What most studios pick
              </span>
            )}
            <div className="flex items-baseline justify-between">
              <h3 className="text-subheading">{p.name}</h3>
              <span className={cn("text-sm", p.featured ? "text-white/60" : "text-muted-foreground")}>{p.seats}</span>
            </div>
            <p className={cn("mt-2 min-h-12", p.featured ? "text-white/75" : "text-muted-foreground")}>{p.blurb}</p>
            <p className="mt-6 flex items-start">
              <span className="mt-2 text-xl">$</span>
              <span className="text-[4.5rem] leading-none tracking-[-0.05em] tabular-nums md:text-[3.5rem] lg:text-[4.5rem]">
                <Price value={annual ? p.annual : p.monthly} />
              </span>
              <span className={cn("mt-auto mb-2 ml-2 text-sm", p.featured ? "text-white/60" : "text-muted-foreground")}>
                / month
                <br />
                {annual ? `billed ${money(p.annual * 12)} yearly` : "billed monthly"}
              </span>
            </p>
            <Button
              className={cn(
                "mt-8 h-12 rounded-xl text-base",
                p.featured && "bg-lilac text-ink hover:bg-lilac/85",
              )}
              variant={p.featured ? "default" : "outline"}
              nativeButton={false}
              render={<Link href={p.id === "atelier" ? "/about" : `/signup?plan=${p.id}`} />}
            >
              {p.cta}
            </Button>
            <ul className="mt-8 space-y-3 text-[15px]">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className={cn("mt-0.5 size-4 shrink-0", p.featured ? "text-lilac" : "text-ochre")} />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function Range({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[15px]">
          {label}
        </label>
        <span className="font-mono text-lg tabular-nums">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-[#421d24] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-wine [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgb(41_40_39/0.2)]"
        style={{ background: `linear-gradient(90deg, var(--wine) ${pct}%, var(--muted) ${pct}%)` }}
      />
    </div>
  );
}

/** "What's your time worth?" Hours saved = proposals × 3h + invoices × 0.75h + late chases × 0.5h. */
export function RoiCalculator() {
  const [proposals, setProposals] = useState(6);
  const [invoices, setInvoices] = useState(14);
  const [rate, setRate] = useState(110);

  const hours = proposals * 3 + invoices * 0.75 + Math.round(invoices * 0.3) * 0.5;
  const value = hours * rate;
  const roi = value / 39;
  const shownHours = useAnimatedNumber(hours, 300);
  const shownValue = useAnimatedNumber(value, 300);

  return (
    <div className="grid overflow-hidden rounded-xl ring-1 ring-border lg:grid-cols-2">
      <div className="space-y-8 bg-card p-6 sm:p-10">
        <Range id="roi-p" label="Proposals you send a month" value={proposals} min={1} max={30} step={1} onChange={setProposals} format={(v) => `${v}`} />
        <Range id="roi-i" label="Invoices you send a month" value={invoices} min={1} max={60} step={1} onChange={setInvoices} format={(v) => `${v}`} />
        <Range id="roi-r" label="Your hourly rate" value={rate} min={30} max={300} step={5} onChange={setRate} format={(v) => `$${v}`} />
        <p className="text-xs text-muted-foreground">
          Based on median time saved by Studio-plan customers: 3h per proposal, 45 min per invoice, 30 min per late-payment chase.
        </p>
      </div>
      <div className="grain relative flex flex-col justify-between gap-10 overflow-hidden bg-[linear-gradient(160deg,#f0c8b0,#f2a25a_55%,#b8742a)] p-6 text-ink sm:p-10">
        <p className="relative z-[2] font-mono text-xs tracking-widest uppercase">Every month, you get back</p>
        <div className="relative z-[2]">
          <p className="text-[clamp(4rem,10vw,7rem)] leading-[0.85] tracking-[-0.05em] tabular-nums">
            {Math.round(shownHours)}
            <span className="font-serif text-[0.5em] tracking-normal italic"> hours</span>
          </p>
          <p className="mt-4 text-xl">
            worth <b className="font-semibold tabular-nums">{money(Math.round(shownValue))}</b> of your time.
          </p>
        </div>
        <p className="relative z-[2] rounded-lg bg-white/60 p-4 text-[15px] backdrop-blur">
          That&apos;s <b className="font-semibold">{Math.round(roi)}×</b> what the Studio plan costs. Or roughly{" "}
          <b className="font-semibold">{Math.max(1, Math.round(hours / 1.5))} golden hours</b> outside.
        </p>
      </div>
    </div>
  );
}
