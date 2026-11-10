"use client";

import { useMemo, useState } from "react";
import { Check, Lock, PenLine, RotateCcw } from "lucide-react";

import { useAnimatedNumber } from "@/hooks/use-animated-number";
import { PROPOSAL } from "@/lib/app-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * The client side of an Ochre proposal: choose packages and add-ons, watch the total move,
 * type your name, sign. Used on the homepage demo and on /p/fernhill-coffee.
 */
export function ProposalBuilder({ className }: { className?: string }) {
  const p = PROPOSAL;
  const [pkgs, setPkgs] = useState<Set<string>>(() => new Set(p.packages.map((x) => x.id)));
  const [addons, setAddons] = useState<Set<string>>(() => new Set());
  const [name, setName] = useState("");
  const [signedAs, setSignedAs] = useState<string | null>(null);

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const { total, weeks } = useMemo(() => {
    const chosen = p.packages.filter((x) => pkgs.has(x.id));
    const extra = p.addons.filter((a) => addons.has(a.id));
    const total = chosen.reduce((s, x) => s + x.price, 0) + extra.reduce((s, a) => s + a.price, 0);
    const weeks = chosen.reduce((s, x) => s + x.weeks, 0) - (addons.has("rush") ? 2 : 0);
    return { total, weeks };
  }, [pkgs, addons, p]);

  const shownTotal = useAnimatedNumber(total);
  const deposit = Math.round(total * p.deposit);
  const signed = signedAs !== null;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_340px]", className)}>
      {/* Choices */}
      <div className="space-y-3">
        {p.packages.map((x) => {
          const on = pkgs.has(x.id);
          return (
            <button
              key={x.id}
              type="button"
              disabled={x.required || signed}
              onClick={() => setPkgs((s) => toggle(s, x.id))}
              aria-pressed={on}
              className={cn(
                "group flex w-full items-start gap-4 rounded-xl border bg-card p-4 text-left transition-[border-color,background-color] sm:p-5",
                on ? "border-ink/70" : "border-border hover:border-ink/30",
                (x.required || signed) && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                  on ? "border-wine bg-wine text-white" : "border-ink/25",
                )}
              >
                {x.required ? <Lock className="size-3" /> : on && <Check className="size-3.5" />}
              </span>
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-label-bold">{x.name}</span>
                  <span className="font-mono text-[15px]">{money(x.price)}</span>
                </span>
                <span className="mt-1 block text-[15px] text-muted-foreground">{x.desc}</span>
                <span className="mt-2 block font-mono text-xs text-muted-foreground">
                  {x.weeks} weeks{x.required ? " · included" : ""}
                </span>
              </span>
            </button>
          );
        })}

        <div className="rounded-xl border border-dashed border-ink/20 p-4 sm:p-5">
          <p className="text-sm font-semibold">Add-ons</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.addons.map((a) => {
              const on = addons.has(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  disabled={signed}
                  aria-pressed={on}
                  onClick={() => setAddons((s) => toggle(s, a.id))}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    on ? "border-ink bg-secondary" : "border-border bg-card hover:border-ink/40",
                  )}
                >
                  {on ? "✓ " : "+ "}
                  {a.name} <span className="font-mono text-muted-foreground">{money(a.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary + signature */}
      <aside className="relative h-fit overflow-hidden rounded-xl bg-paper p-5 ring-1 ring-border sm:p-6 lg:sticky lg:top-24">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Your total</p>
        <p className="mt-1 font-mono text-[2.75rem] leading-none tracking-tight tabular-nums">
          {money(Math.round(shownTotal))}
        </p>
        <dl className="mt-5 space-y-2 border-t border-dashed border-ink/20 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Deposit today ({p.deposit * 100}%)</dt>
            <dd className="font-mono">{money(deposit)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Timeline</dt>
            <dd className="font-mono">{weeks} weeks</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Valid until</dt>
            <dd>{p.validUntil}</dd>
          </div>
        </dl>

        {!signed ? (
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) setSignedAs(name.trim());
            }}
          >
            <label htmlFor="sign-name" className="text-sm font-[460]">
              Type your full name to sign
            </label>
            <input
              id="sign-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Theo Marsh"
              autoComplete="name"
              className="mt-2 h-11 w-full rounded-lg border border-input bg-card px-3 font-script text-2xl outline-none placeholder:text-ink/25 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-[460] text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <PenLine className="size-4" /> Accept & sign
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Signing creates a contract and a deposit invoice. No card needed yet.
            </p>
          </form>
        ) : (
          <div className="mt-6">
            <p className="animate-sign font-script text-5xl leading-tight text-ink">{signedAs}</p>
            <p className="border-t border-ink/30 pt-1 text-xs text-muted-foreground">
              Signed on behalf of {p.client} · just now
            </p>
            <p className="mt-4 rounded-lg bg-card p-3 text-sm ring-1 ring-border">
              Deposit invoice for <b className="font-semibold">{money(deposit)}</b> is on its way to
              theo@fernhill.coffee.
            </p>
            <button
              type="button"
              onClick={() => {
                setSignedAs(null);
                setName("");
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" /> Unsign (it&apos;s a demo)
            </button>
            <span
              aria-hidden
              className="absolute top-5 right-4 animate-stamp rounded-md border-2 border-good px-2 py-1 font-mono text-xs font-bold tracking-widest text-good uppercase"
            >
              Accepted
            </span>
          </div>
        )}
      </aside>
    </div>
  );
}
