"use client";

import { useState } from "react";
import { Check, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ACCENTS = [
  ["Wine", "#421d24"],
  ["Lagoon", "#0c4243"],
  ["Ochre", "#b8742a"],
  ["Violet", "#714cb6"],
  ["Ink", "#292827"],
];

const NOTIFS = [
  ["proposal", "A client opens a proposal", true],
  ["signed", "A proposal or contract is signed", true],
  ["paid", "A payment lands", true],
  ["overdue", "An invoice becomes overdue", true],
  ["digest", "Morning digest at 07:30", false],
] as const;

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 lg:grid-cols-[280px_1fr]">
      <div>
        <h2 className="text-label-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
      <div className="rounded-xl bg-card p-5 ring-1 ring-border sm:p-6">{children}</div>
    </section>
  );
}

export function SettingsForm() {
  const [accent, setAccent] = useState("#421d24");
  const [studio, setStudio] = useState("Imole Studio");
  const [notifs, setNotifs] = useState<Record<string, boolean>>(() => Object.fromEntries(NOTIFS.map(([k, , v]) => [k, v])));
  const [saved, setSaved] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}
    >
      <Section title="Studio profile" sub="Shown on proposals, contracts and invoices.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="s-name">Studio name</Label>
            <Input id="s-name" value={studio} onChange={(e) => setStudio(e.target.value)} className="h-10" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-domain">Portal domain</Label>
            <Input id="s-domain" defaultValue="clients.imole.studio" className="h-10 font-mono text-sm" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="s-address">Address</Label>
            <Textarea id="s-address" defaultValue={"14 Bourdillon Road, Ikoyi\nLagos, Nigeria"} rows={2} />
          </div>
        </div>
      </Section>

      <Section title="Brand" sub="Your clients see this, not ours. Ochre stays in the background.">
        <fieldset>
          <legend className="text-sm font-medium">Accent colour</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {ACCENTS.map(([n, c]) => (
              <label key={c} className="cursor-pointer has-[:focus-visible]:rounded-full has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
                <input type="radio" name="accent" value={c} checked={accent === c} onChange={() => setAccent(c)} className="sr-only" />
                <span
                  className={cn("flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-sm", accent === c ? "border-ink" : "border-border")}
                >
                  <span className="flex size-6 items-center justify-center rounded-full text-white" style={{ background: c }}>
                    {accent === c && <Check className="size-3.5" />}
                  </span>
                  {n}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-border" aria-label="Preview">
          <div className="flex items-center justify-between px-5 py-4 text-white transition-colors" style={{ background: accent }}>
            <span className="text-sm font-bold tracking-[0.3em] uppercase">{studio.trim().split(/\s+/)[0] || "Studio"}</span>
            <span className="font-mono text-xs opacity-80">Invoice #0148</span>
          </div>
          <div className="flex items-center justify-between bg-paper px-5 py-4 text-sm">
            <span className="text-muted-foreground">Total due</span>
            <span className="flex items-center gap-3">
              <span className="font-mono">$4,890.00</span>
              <span className="rounded-md px-3 py-1.5 text-xs text-white transition-colors" style={{ background: accent }}>
                Pay now
              </span>
            </span>
          </div>
        </div>
      </Section>

      <Section title="Payouts" sub="Where your money lands. Next business day on the Studio plan.">
        <div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted p-4">
          <span className="flex size-10 items-center justify-center rounded-lg bg-card ring-1 ring-border">
            <Landmark className="size-5 text-ochre" />
          </span>
          <span className="flex-1">
            <span className="block font-[460]">GTBank ••4417</span>
            <span className="block text-sm text-muted-foreground">NGN · verified Mar 2024</span>
          </span>
          <Button variant="outline" type="button" className="h-9">
            Change
          </Button>
        </div>
      </Section>

      <Section title="Notifications" sub="We'd rather you heard less from us, not more.">
        <ul className="divide-y divide-border">
          {NOTIFS.map(([k, l]) => (
            <li key={k} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <label htmlFor={`n-${k}`} className="text-[15px]">
                {l}
              </label>
              <Switch id={`n-${k}`} checked={notifs[k]} onCheckedChange={(v) => setNotifs((s) => ({ ...s, [k]: v }))} />
            </li>
          ))}
        </ul>
      </Section>

      <div className="sticky bottom-4 z-10 mt-4 flex justify-end">
        <Button type="submit" className="h-11 rounded-xl px-6 text-base shadow-lg">
          {saved ? <Check /> : null}
          {saved ? "Saved" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
