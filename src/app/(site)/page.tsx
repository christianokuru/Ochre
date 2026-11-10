import Link from "next/link";
import { ArrowRight, BellRing, FolderOpen, Globe2 } from "lucide-react";

import { HeroSky } from "@/components/marketing/hero-sky";
import { Lifecycle } from "@/components/marketing/lifecycle";
import { Eyebrow, Scribble } from "@/components/marketing/section";
import { Testimonials } from "@/components/marketing/testimonials";
import { ProposalBuilder } from "@/components/proposal/proposal-builder";
import { Button } from "@/components/ui/button";
import { PAYMENTS, STUDIO_LOGOS } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <HeroSky />

      {/* Live payments ticker */}
      <section aria-label="Recent payouts" className="border-y border-border bg-card">
        <div className="flex items-center">
          <p className="hidden shrink-0 items-center gap-2 border-r border-border px-5 py-4 font-mono text-xs tracking-wider text-muted-foreground uppercase md:flex">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-good/60" />
              <span className="relative size-2 rounded-full bg-good" />
            </span>
            Paid through Ochre · last hour
          </p>
          <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[...PAYMENTS, ...PAYMENTS].map((p, i) => (
                <li key={i} aria-hidden={i >= PAYMENTS.length} className="flex items-center gap-2 px-6 py-4 text-sm whitespace-nowrap">
                  <span className="font-[460]">{p.studio}</span>
                  <span className="text-muted-foreground">{p.city}</span>
                  <span className="font-mono text-ochre">+{p.amount}</span>
                  <span aria-hidden className="ml-4 text-border">✦</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 md:py-20">
        <p className="text-center text-sm text-muted-foreground">
          14,000 studios in 61 countries send their best work, and their invoices, with Ochre
        </p>
        <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {STUDIO_LOGOS.map((l) => (
            <div key={l.name} className="flex h-24 items-center justify-center bg-card text-ink/80 transition-colors hover:text-ink">
              <span className={l.style}>{l.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lifecycle */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pb-24 md:pb-32">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow n="01">One thread</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-heading-lg md:text-display">
              From <span className="font-serif italic">hello</span> to paid, without a single copy-paste.
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground">
            Every document inherits from the one before it. Type a client&apos;s name once; Ochre carries it all the way to the bank.
          </p>
        </div>
        <div className="reveal">
          <Lifecycle />
        </div>
      </section>

      {/* Proposal demo */}
      <section className="relative border-y border-border bg-[#ebe7de] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="relative mb-12 max-w-2xl">
            <Eyebrow n="02">Try it as a client</Eyebrow>
            <h2 className="mt-5 text-heading-lg md:text-display">
              Go on, <span className="font-serif italic">sign it.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              This is a real Ochre proposal. Toggle a package, add a product shoot, type your name.
              Your client gets exactly this, on your domain, in your colours.
            </p>
            <Scribble className="absolute -right-4 bottom-0 hidden translate-x-full lg:inline-flex" arrow="down-right">
              clients love this bit
            </Scribble>
          </div>
          <div className="reveal">
            <ProposalBuilder />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Want the full experience?{" "}
            <Link href="/p/fernhill-coffee" className="link">
              Open the whole proposal as Fernhill Coffee
            </Link>
          </p>
        </div>
      </section>

      {/* Bento */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-24 md:py-32">
        <Eyebrow n="03">The quiet parts</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-heading-lg md:text-section">
          The jobs nobody went to art school for, done in the background.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {/* Reminders */}
          <article className="reveal flex flex-col rounded-xl bg-card p-6 ring-1 ring-border md:col-span-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BellRing className="size-4 text-ochre" /> Reminders
            </div>
            <h3 className="mt-3 text-heading-sm">Chasing payment, in your voice, on autopilot.</h3>
            <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
              <div className="max-w-sm self-start rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-[15px]">
                Hi Owen, hope the record&apos;s coming along! Just a friendly nudge that invoice #0144 was due last week. 🌿
                <span className="mt-1 block font-mono text-[11px] text-muted-foreground">Sent by Ochre · Day 3 · tone: warm</span>
              </div>
              <div className="max-w-sm self-end rounded-2xl rounded-br-md bg-wine px-4 py-3 text-[15px] text-white">
                Oh no, sorry! Paying now 🙏
                <span className="mt-1 block font-mono text-[11px] text-white/60">Owen Price · 4 min later</span>
              </div>
              <p className="self-center rounded-full bg-[#e3f1e8] px-3 py-1 text-xs text-good">
                ✓ $3,600 received · sequence stopped
              </p>
            </div>
          </article>

          {/* Currencies */}
          <article className="reveal relative overflow-hidden rounded-xl bg-lilac p-6 md:col-span-2">
            <div className="flex items-center gap-2 text-sm text-ink/70">
              <Globe2 className="size-4" /> Payouts
            </div>
            <h3 className="mt-3 text-heading-sm">38 currencies. Next-day money.</h3>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {["USD", "EUR", "GBP", "JPY", "DKK", "CAD", "AUD", "SEK", "NOK", "CHF", "MXN", "NGN", "INR", "KRW", "+24"].map((c) => (
                <span key={c} className="rounded-md bg-white/70 px-2 py-1 font-mono text-xs">{c}</span>
              ))}
            </div>
          </article>

          {/* Portal */}
          <article className="reveal rounded-xl bg-card p-6 ring-1 ring-border md:col-span-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderOpen className="size-4 text-ochre" /> Client portal
            </div>
            <h3 className="mt-3 text-heading-sm">One link for every file, invoice and signature.</h3>
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2">
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="size-2 rounded-full bg-ink/15" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">clients.imole.studio/fernhill</span>
              </div>
              <ul className="divide-y divide-border text-sm">
                {[
                  ["Brand book v3.pdf", "Approved", "text-good"],
                  ["Packaging dielines.zip", "New", "text-violet"],
                  ["Invoice #0148", "Due Nov 24", "text-muted-foreground"],
                ].map(([f, s, c]) => (
                  <li key={f} className="flex justify-between px-3 py-2.5">
                    <span>{f}</span>
                    <span className={c}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Profit */}
          <article className="reveal flex flex-col rounded-xl bg-ink p-6 text-white md:col-span-3">
            <p className="text-sm text-white/60">Project profit</p>
            <h3 className="mt-3 text-heading-sm">Know which projects pay for the studio.</h3>
            <div className="mt-6 flex flex-1 items-end gap-2" role="img" aria-label="Margin by project: Nordlys 52%, Verso 44%, Paloma 38%, Juniper 21%, Saltmarsh -6%">
              {[
                ["Nordlys", 52],
                ["Verso", 44],
                ["Paloma", 38],
                ["Juniper", 21],
                ["Saltmarsh", -6],
              ].map(([n, v]) => (
                <div key={n} className="flex flex-1 flex-col items-center gap-2">
                  <span className="font-mono text-xs text-white/70">{v}%</span>
                  <div
                    className={v as number > 0 ? "w-full rounded-t bg-[#c28232]" : "w-full rounded-b bg-[#f97066]"}
                    style={{ height: Math.max(6, Math.abs(v as number) * 2.2) }}
                  />
                  <span className="text-[11px] text-white/60">{n}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Dark feature band */}
      <section className="bg-lagoon text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="relative h-72 md:h-[26rem]" aria-hidden>
            <div className="absolute top-[6%] left-[2%] h-[55%] w-[58%] -rotate-3 rounded-sm bg-[#d4c7ff]/50" />
            <div className="absolute top-[28%] left-[30%] h-[52%] w-[52%] rotate-2 rounded-sm bg-[#8fb3ff]/45" />
            <div className="absolute top-[54%] left-[10%] h-[38%] w-[42%] rotate-6 rounded-sm bg-[#ffb3c7]/50" />
            <div className="absolute top-[18%] left-[62%] size-20 rounded-full bg-[radial-gradient(circle,#f2b25c,#b8742a)]" />
            <span className="absolute top-[12%] left-[34%] font-script text-3xl md:text-4xl">fewer spreadsheets,</span>
            <span className="absolute top-[70%] left-[44%] font-script text-3xl md:text-4xl">more sunsets</span>
          </div>
          <div>
            <Eyebrow className="text-white/60">By the numbers</Eyebrow>
            <h2 className="mt-5 text-heading-lg lg:text-display">Studios on Ochre get paid in days, not months.</h2>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/20 pt-8">
              {[
                ["$412M", "paid to studios this year"],
                ["9.2 days", "average time to paid"],
                ["0%", "fees on bank transfers"],
                ["64%", "median proposal win rate"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[2.5rem] leading-none tracking-[-0.03em]">{v}</dd>
                  <dd className="mt-2 text-sm text-white/75">{l}</dd>
                </div>
              ))}
            </dl>
            <Button
              variant="outline"
              className="mt-10 h-auto rounded-lg border-white bg-transparent px-5 py-2 text-base text-white hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<Link href="/customers" />}
            >
              Read the stories
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-24 md:py-32">
        <Eyebrow n="04">In their words</Eyebrow>
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-atmosphere">
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-10 px-4 py-24 md:flex-row md:items-end md:justify-between md:py-32">
          <h2 className="max-w-2xl text-heading-lg md:text-display">
            Your next invoice could be your <span className="font-serif italic">favourite</span> email.
          </h2>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              className="h-12 rounded-xl bg-white px-6 text-base text-foreground hover:bg-white/80"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              Start free <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-xl px-5 text-base hover:bg-white/40"
              nativeButton={false}
              render={<Link href="/pricing" />}
            >
              See pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
