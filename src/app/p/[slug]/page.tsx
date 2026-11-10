import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Download, MessageCircle } from "lucide-react";

import { OchreMark } from "@/components/brand/logo";
import { Sky } from "@/components/brand/sky";
import { ProposalBuilder } from "@/components/proposal/proposal-builder";
import { PROPOSAL } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Proposal for Fernhill Coffee",
  robots: { index: false },
};

export function generateStaticParams() {
  return [{ slug: PROPOSAL.slug }];
}

const TOC = [
  ["hello", "Hello"],
  ["approach", "Our approach"],
  ["scope", "Scope & price"],
  ["timeline", "Timeline"],
  ["terms", "Terms"],
];

const PHASES = [
  { name: "Discovery & strategy", start: 0, len: 2, tone: "bg-wine" },
  { name: "Identity design", start: 2, len: 4, tone: "bg-ochre" },
  { name: "Packaging system", start: 5, len: 4, tone: "bg-violet" },
  { name: "Café signage", start: 8, len: 2, tone: "bg-lagoon" },
  { name: "Handover & brand book", start: 10, len: 2, tone: "bg-ink" },
];

// Cache Components: the proposal itself doesn't depend on the URL, so it all renders in the
// instant App Shell. Only the slug check awaits params, inside <Suspense>. src/proxy.ts already
// returns a real 404 for unknown slugs; this guard is a fallback.
async function SlugGuard({ params }: { params: PageProps<"/p/[slug]">["params"] }) {
  const { slug } = await params;
  if (slug !== PROPOSAL.slug) notFound();
  return null;
}

export default function ProposalPage({ params }: PageProps<"/p/[slug]">) {
  const p = PROPOSAL;

  return (
    <div className="bg-background">
      <Suspense fallback={null}>
        <SlugGuard params={params} />
      </Suspense>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-4">
          <span className="text-sm font-bold tracking-[0.3em]">IMOLE</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">Proposal for {p.client}</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden h-9 items-center gap-2 rounded-lg px-3 text-sm hover:bg-muted sm:inline-flex">
              <MessageCircle className="size-4" /> Ask a question
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm hover:border-ink/40">
              <Download className="size-4" /> PDF
            </button>
          </div>
        </div>
      </header>

      <Sky hour={6.9} className="min-h-[70svh]">
        <div className="mx-auto flex min-h-[70svh] w-full max-w-[1200px] flex-col justify-end px-4 pt-16 pb-28">
          <p className="font-mono text-xs tracking-[0.2em] text-ink/70 uppercase">Proposal · {p.date}</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] tracking-[-0.045em] text-ink">
            A brand that tastes like the <span className="font-serif italic">first cup.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/80">
            Prepared for Theo Marsh, {p.client} · by {p.studio}
          </p>
        </div>
      </Sky>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:py-24 lg:grid-cols-[200px_1fr]">
        <nav aria-label="Proposal sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 border-l border-border">
            {TOC.map(([id, l], i) => (
              <li key={id}>
                <a href={`#${id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground hover:border-ink hover:text-foreground">
                  <span className="mr-2 font-mono text-xs text-ochre">0{i + 1}</span>
                  {l}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-24">
          <section id="hello" className="max-w-2xl scroll-mt-24">
            <p className="text-[1.5rem] leading-[1.45] tracking-[-0.01em]">Dear Theo,</p>
            <div className="mt-6 space-y-5 text-lg leading-[1.7] text-ink/85">
              <p>
                Thank you for walking us through the roastery on that video call, and for describing a cortado so well we could almost taste it from Lagos. You told us Fernhill&apos;s coffee
                tastes like the first cup of the morning, and that your bags look like everyone else&apos;s. We think we can fix the second part.
              </p>
              <p>
                Below is how we&apos;d approach it. Pick the scope that suits you; the price and timeline update as you go. When it feels right, sign at
                the bottom and we&apos;ll book the kickoff.
              </p>
            </div>
            <p className="mt-8 font-script text-4xl">Tolu</p>
            <p className="text-sm text-muted-foreground">Tolu Adeyemi, Founder · {p.studio}</p>
          </section>

          <section id="approach" className="scroll-mt-24">
            <h2 className="text-heading-lg">Our approach</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Start at the roaster", "Two days with your team, your suppliers and your regulars before we draw anything."],
                ["One idea, many surfaces", "A single visual idea, morning light, that flexes from a 12oz bag to a 4-metre sign."],
                ["Built to last, built to hand over", "A system your team can extend without calling us, with a brand book to prove it."],
              ].map(([t, d], i) => (
                <li key={t} className="rounded-xl bg-card p-6 ring-1 ring-border">
                  <span className="font-mono text-sm text-ochre">0{i + 1}</span>
                  <h3 className="mt-3 text-label-bold">{t}</h3>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="scope" className="scroll-mt-24">
            <h2 className="text-heading-lg">Scope & price</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Brand identity is the foundation and is always included. Everything else is up to you.</p>
            <div className="mt-8">
              <ProposalBuilder />
            </div>
          </section>

          <section id="timeline" className="scroll-mt-24">
            <h2 className="text-heading-lg">Timeline</h2>
            <p className="mt-3 text-muted-foreground">Twelve weeks from kickoff for the full scope, starting the first week of January.</p>
            <div className="mt-8 overflow-x-auto rounded-xl bg-card p-5 ring-1 ring-border">
              <div className="min-w-[620px]">
                <div className="ml-48 grid grid-cols-12 border-b border-border pb-2 font-mono text-[11px] text-muted-foreground">
                  {Array.from({ length: 12 }, (_, w) => (
                    <span key={w}>W{w + 1}</span>
                  ))}
                </div>
                <ul className="mt-3 space-y-2.5">
                  {PHASES.map((ph) => (
                    <li key={ph.name} className="flex items-center">
                      <span className="w-48 shrink-0 pr-4 text-sm">{ph.name}</span>
                      <span className="relative h-7 flex-1">
                        <span
                          className={`absolute inset-y-0 rounded-md ${ph.tone}`}
                          style={{ left: `${(ph.start / 12) * 100}%`, width: `calc(${(ph.len / 12) * 100}% - 4px)` }}
                          title={`${ph.name}: weeks ${ph.start + 1}–${ph.start + ph.len}`}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="terms" className="max-w-2xl scroll-mt-24">
            <h2 className="text-heading-lg">Terms, briefly</h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {[
                ["Payment", "30% deposit on signature, 40% at identity sign-off, 30% on handover. Invoices due in 14 days."],
                ["Revisions", "Two rounds per deliverable. Extra rounds at our day rate, always agreed first."],
                ["Rights", "Full ownership of final artwork transfers to Fernhill on final payment."],
                ["Validity", `This proposal is valid until ${p.validUntil}.`],
              ].map(([t, d]) => (
                <div key={t} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr]">
                  <dt className="font-[460]">{t}</dt>
                  <dd className="text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row">
          <span>Questions? Reply to tolu@imole.studio or call +234 803 555 0142</span>
          <Link href="/" className="inline-flex items-center gap-2 hover:text-foreground">
            <OchreMark className="size-5" /> Sent with Ochre
          </Link>
        </div>
      </footer>
    </div>
  );
}
