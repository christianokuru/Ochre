import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Sky } from "@/components/brand/sky";
import { CustomerGrid } from "@/components/marketing/customer-grid";
import { Eyebrow } from "@/components/marketing/section";
import { STORIES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Customers",
  description: "Branding studios, photographers, architects and animators who got their evenings back.",
};

export default function CustomersPage() {
  const featured = STORIES[0];
  return (
    <>
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-16 pb-12 md:pt-24">
        <Eyebrow>Customers</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.9] tracking-[-0.045em]">
          Studios that got their <span className="font-serif italic">evenings</span> back.
        </h1>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4">
        <Link href={`/customers/${featured.slug}`} className="group block overflow-hidden rounded-xl ring-1 ring-border">
          <Sky hour={featured.hour} className="min-h-[460px]">
            <div className="grid min-h-[460px] gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="self-start lg:self-end">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs backdrop-blur">Featured · {featured.discipline}</span>
                <p className="mt-6 max-w-2xl text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.03em] text-ink">
                  “{featured.quote}”
                </p>
                <p className="mt-4 text-ink/80">
                  {featured.person}, {featured.role} · {featured.studio}, {featured.city}
                </p>
              </div>
              <div className="w-full rounded-xl border border-white/20 bg-white/85 p-5 backdrop-blur-md lg:w-72">
                <p className="text-[3.5rem] leading-none tracking-[-0.05em]">{featured.metric}</p>
                <p className="mt-1 text-muted-foreground">{featured.metricLabel}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-[460] text-violet">
                  Read the story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Sky>
        </Link>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pt-16 pb-24 md:pb-32">
        <CustomerGrid />
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-[1200px] gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["14,000", "studios"],
            ["61", "countries"],
            ["4.9/5", "average rating, 3,100 reviews"],
            ["93%", "still with us after a year"],
          ].map(([v, l]) => (
            <div key={l} className="bg-card px-4 py-10 sm:px-8">
              <p className="text-heading-lg">{v}</p>
              <p className="mt-1 text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
