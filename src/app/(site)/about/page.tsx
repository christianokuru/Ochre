import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Sky } from "@/components/brand/sky";
import { Eyebrow, Scribble } from "@/components/marketing/section";
import { ROLES, TEAM } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Ochre is a small, profitable team building the back office we wished we had when we ran studios.",
};

const VALUES = [
  ["Admin is a tax on craft.", "Every feature has to give someone hours back, or it doesn't ship."],
  ["Beautiful is a feature.", "Clients judge a studio by its invoices. So we sweat them like a logo."],
  ["Money should be boring.", "No surprise fees, no hidden FX spread, no lock-in. Export everything, always."],
  ["Small on purpose.", "Thirty-one people, no investors to please, profitable since 2024."],
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-16 pb-20 md:pt-24">
        <Eyebrow>About Ochre</Eyebrow>
        <h1 className="mt-8 text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.02] tracking-[-0.035em] [text-wrap:pretty]">
          We ran studios for a decade. We loved the work and{" "}
          <span className="font-serif italic">hated the paperwork</span>. So we built the back office we wished someone had made for us:{" "}
          <span className="rounded-lg bg-lilac px-2 box-decoration-clone">calm, fair and quietly beautiful.</span>
        </h1>
        <div className="mt-10 flex justify-end">
          <Scribble arrow="left">— Ada & Tomás, founders</Scribble>
        </div>
      </section>

      <section className="px-4">
        <Sky hour={19.2} className="mx-auto min-h-[420px] max-w-[1200px] rounded-xl">
          <div className="grid min-h-[420px] content-end gap-px p-6 text-white sm:grid-cols-3 sm:p-10">
            {[
              ["2021", "Founded in a Lisbon studio, between client deadlines"],
              ["31", "people across 14 cities, mostly ex-studio folk"],
              ["$0", "raised. Customers pay for Ochre, so we answer to them"],
            ].map(([v, l]) => (
              <div key={v} className="py-4 sm:pr-8">
                <p className="text-[3.5rem] leading-none tracking-[-0.05em]">{v}</p>
                <p className="mt-2 max-w-[16rem] text-white/85">{l}</p>
              </div>
            ))}
          </div>
        </Sky>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-24 md:py-32">
        <Eyebrow n="01">What we believe</Eyebrow>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border md:grid-cols-2">
          {VALUES.map(([t, d], i) => (
            <li key={t} className="bg-card p-6 sm:p-10">
              <span className="font-mono text-sm text-ochre">0{i + 1}</span>
              <h2 className="mt-4 text-heading-sm">{t}</h2>
              <p className="mt-3 max-w-md text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pb-24 md:pb-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow n="02">The people</Eyebrow>
            <h2 className="mt-5 text-heading-lg">A few of the 31.</h2>
          </div>
          <p className="max-w-xs text-muted-foreground">Designers, engineers and one former accountant who has seen things.</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {TEAM.map((m, i) => (
            <li key={m.name} className="group">
              <div
                className="grain relative flex aspect-[4/5] items-end overflow-hidden rounded-xl p-4"
                style={{ background: `linear-gradient(${150 + i * 12}deg, ${m.hue[0]}, ${m.hue[1]})` }}
              >
                <span
                  aria-hidden
                  className="absolute -top-6 -right-2 font-serif text-[9rem] leading-none text-white/25 italic transition-transform duration-500 group-hover:-translate-y-2"
                >
                  {m.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span className="relative z-[2] rounded-full bg-white/80 px-2.5 py-1 text-xs backdrop-blur">{m.city}</span>
              </div>
              <p className="mt-3 font-[460]">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="careers" className="scroll-mt-20 border-t border-border bg-card py-24 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <Eyebrow n="03">Careers</Eyebrow>
            <h2 className="mt-5 text-heading-lg">
              Come build the <span className="font-serif italic">calm</span> part of creative work.
            </h2>
            <p className="mt-4 text-muted-foreground">Remote-first, four-day weeks in August, and a studio budget for your own side projects.</p>
          </div>
          <ul className="border-t border-ink">
            {ROLES.map((r) => (
              <li key={r.title} className="border-b border-border">
                <a href="#" className="group flex items-center gap-6 py-6">
                  <span className="flex-1">
                    <span className="block text-lg font-[460]">{r.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {r.team} · {r.place}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
