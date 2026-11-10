"use client";

import { useState } from "react";
import { Check, Eye, FileSignature, Landmark, Mail, Sparkles } from "lucide-react";

import { LIFECYCLE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Key = (typeof LIFECYCLE)[number]["key"];

/** "One thread from hello to paid": five stages that auto-advance; hover pauses, click jumps. */
export function Lifecycle() {
  const [active, setActive] = useState(0);
  const stage = LIFECYCLE[active];

  return (
    <div className="group/life grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <ol className="flex flex-col">
        {LIFECYCLE.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.key} className="border-t border-border last:border-b">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "step" : undefined}
                className="group relative flex w-full items-start gap-5 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-mono text-sm transition-colors",
                    on ? "text-ochre" : "text-muted-foreground",
                  )}
                >
                  {s.n}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-heading-sm transition-colors",
                      on ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/80",
                    )}
                  >
                    {s.title}
                  </span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-muted-foreground">{s.line}</span>
                    </span>
                  </span>
                </span>
                {on && (
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={() => setActive((a) => (a + 1) % LIFECYCLE.length)}
                    className="absolute -top-px left-0 h-0.5 w-full origin-left animate-[grow_6s_linear_both] bg-ochre group-hover/life:[animation-play-state:paused]"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-border bg-[#ebe7de] p-5 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgb(242_162_90/0.25),transparent)]" />
        <div key={stage.key} className="relative animate-rise">
          <Mock k={stage.key} />
        </div>
        <span className="absolute right-5 bottom-4 font-mono text-[11px] text-muted-foreground">
          {stage.n} / 05<span className="hidden [@media(hover:hover)]:inline"> · hover to pause</span>
        </span>
      </div>
    </div>
  );
}

function Mock({ k }: { k: Key }) {
  switch (k) {
    case "inquiry":
      return (
        <div className="mx-auto max-w-md rounded-xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3.5" /> New inquiry · imole.studio/start
            <span className="ml-auto rounded-full bg-[#e3f1e8] px-2 py-0.5 font-[460] text-good">Good fit</span>
          </div>
          <p className="mt-3 text-label-bold">Fernhill Coffee</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {[
              ["Looking for", "Rebrand + packaging"],
              ["Budget", "$12k – $18k"],
              ["Start", "January"],
              ["Found you via", "Juniper & Rye"],
            ].map(([d, v]) => (
              <div key={d}>
                <dt className="text-muted-foreground">{d}</dt>
                <dd className="font-[460]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-lg bg-muted p-3 text-sm leading-relaxed">
            “We roast in small batches and our bags look like everyone else&apos;s. Help.”
          </p>
          <button className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm text-primary-foreground">
            <Sparkles className="size-4" /> Draft proposal from template
          </button>
        </div>
      );
    case "proposal":
      return (
        <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-paper ring-1 ring-border">
          <div className="h-20 bg-[linear-gradient(180deg,#c9c0e6,#f0c8b0_60%,#f2a25a)]" />
          <div className="p-5">
            <p className="text-xs text-muted-foreground">Proposal for Fernhill Coffee</p>
            <p className="mt-1 text-subheading">A brand that tastes like the first cup</p>
            <div className="mt-4 space-y-2">
              {[
                ["Brand identity", "$8,500", 30],
                ["Packaging system", "$5,800", 92],
                ["Café signage", "$2,000", 18],
              ].map(([n, p, heat]) => (
                <div key={n as string} className="relative overflow-hidden rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
                  <div className="absolute inset-y-0 left-0 bg-ochre/15" style={{ width: `${heat}%` }} />
                  <div className="relative flex justify-between">
                    <span>{n}</span>
                    <span className="font-mono">{p}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <Eye className="size-4 text-ochre" /> Theo has read <b className="font-semibold">Packaging</b> 6 times
            </p>
          </div>
        </div>
      );
    case "contract":
      return (
        <div className="mx-auto max-w-md rounded-xl bg-paper p-6 ring-1 ring-border">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Services agreement</p>
          <p className="mt-3 text-sm leading-7">
            This agreement is between <mark className="rounded bg-lilac/60 px-1">Imole Studio</mark> and{" "}
            <mark className="rounded bg-lilac/60 px-1">Fernhill Coffee</mark> for{" "}
            <mark className="rounded bg-lilac/60 px-1">Brand identity, Packaging system</mark> at a total fee
            of <mark className="rounded bg-lilac/60 px-1">$14,300</mark>, with a{" "}
            <mark className="rounded bg-lilac/60 px-1">30%</mark> deposit due on signature.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-script text-3xl leading-none text-ink">Tolu Adeyemi</p>
              <p className="mt-1 border-t border-ink/30 pt-1 text-xs text-muted-foreground">Studio · Nov 6</p>
            </div>
            <div>
              <p className="animate-sign font-script text-3xl leading-none text-ink">Theo Marsh</p>
              <p className="mt-1 border-t border-ink/30 pt-1 text-xs text-muted-foreground">Client · just now</p>
            </div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-good">
            <FileSignature className="size-4" /> Signed by both parties · copy sent
          </p>
        </div>
      );
    case "invoice":
      return (
        <div className="mx-auto max-w-md rounded-xl bg-card p-5 ring-1 ring-border">
          <div className="flex items-baseline justify-between">
            <p className="text-label-bold">Payment schedule</p>
            <p className="font-mono text-sm">$14,300</p>
          </div>
          <ol className="mt-4 space-y-3">
            {[
              ["Deposit · on signature", "$4,290", "Paid", "good"],
              ["Milestone · identity approved", "$5,720", "Scheduled", "muted"],
              ["Final · files delivered", "$4,290", "Scheduled", "muted"],
            ].map(([l, a, s, tone], i) => (
              <li key={l} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full font-mono text-xs",
                    tone === "good" ? "bg-good text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {tone === "good" ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="flex-1 text-sm">{l}</span>
                <span className="font-mono text-sm">{a}</span>
                <span className={cn("w-20 text-right text-xs", tone === "good" ? "text-good" : "text-muted-foreground")}>{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[30%] rounded-full bg-ochre" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">30% collected · next invoice sends itself when you mark the milestone done</p>
        </div>
      );
    case "paid":
      return (
        <div className="mx-auto max-w-md">
          <div className="relative overflow-hidden rounded-xl bg-wine p-6 text-white">
            <div className="absolute -top-16 -right-16 size-56 rounded-full bg-[radial-gradient(circle,#f2b25c,transparent_65%)] opacity-60" />
            <p className="relative text-xs tracking-widest text-white/70 uppercase">Payout</p>
            <p className="relative mt-2 font-mono text-5xl tracking-tight">$4,290.00</p>
            <p className="relative mt-2 text-sm text-white/80">Arrives tomorrow, Nov 11, in naira, in your GTBank ••4417</p>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-card p-4 text-sm ring-1 ring-border">
            <Landmark className="size-5 text-ochre" />
            <span className="flex-1">Fernhill paid by card in 3 minutes</span>
            <span className="font-script text-2xl text-violet">nice.</span>
          </div>
        </div>
      );
  }
}
