import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";

import { PricingPlans, RoiCalculator } from "@/components/marketing/pricing";
import { Eyebrow } from "@/components/marketing/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { COMPARISON, FAQS, PLANS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple plans for solo creatives, small teams and established studios. 0% on bank transfers.",
};

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-16 pb-24 md:pt-24">
        <div className="text-center">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
            Simple pricing. <span className="font-serif whitespace-nowrap italic">No cut</span> of your work.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Thirty days free on every plan. Bank transfers are always 0%. Change plans whenever the studio does.
          </p>
        </div>
        <div className="mt-12">
          <PricingPlans />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pb-24 md:pb-32">
        <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow n="01">The maths</Eyebrow>
            <h2 className="mt-5 max-w-xl text-heading-lg">What is your time actually worth?</h2>
          </div>
          <p className="max-w-xs text-muted-foreground">Drag the sliders. We promise not to email you about it.</p>
        </div>
        <RoiCalculator />
      </section>

      <section className="border-y border-border bg-card py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-4">
          <Eyebrow n="02">Compare plans</Eyebrow>
          <h2 className="mt-5 text-heading-lg">Every detail, side by side.</h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="w-[40%] py-4 font-normal text-muted-foreground">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className="py-4 text-label-bold">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              {COMPARISON.map((g) => (
                <tbody key={g.group}>
                  <tr>
                    <th colSpan={4} scope="colgroup" className="pt-10 pb-3 font-mono text-xs font-normal tracking-widest text-ochre uppercase">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label} className="border-b border-border">
                      <th scope="row" className="py-3.5 font-normal">
                        {r.label}
                      </th>
                      {r.v.map((v, i) => (
                        <td key={i} className="py-3.5">
                          {v === true ? (
                            <Check className="size-4 text-good" aria-label="Included" />
                          ) : v === false ? (
                            <Minus className="size-4 text-ink/25" aria-label="Not included" />
                          ) : (
                            <span className="font-mono text-sm">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 py-24 md:py-32 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow n="03">Questions</Eyebrow>
          <h2 className="mt-5 text-heading-lg">
            Asked by real studios, <span className="font-serif italic">answered</span> by real people.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Still curious? Write to <a href="mailto:hello@ochre.studio" className="link">hello@ochre.studio</a>. A human replies within the day.
          </p>
        </div>
        <Accordion defaultValue={[FAQS[0].q]} className="border-t border-ink">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-b border-border">
              <AccordionTrigger className="py-5 text-label-bold font-[460] hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
