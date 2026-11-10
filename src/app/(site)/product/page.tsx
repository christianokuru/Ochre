import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Check, CreditCard, Eye, Landmark, Smartphone, Timer, Zap } from "lucide-react";

import { Eyebrow, Scribble } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Product",
  description: "Proposals, contracts, invoices, a client portal, time tracking and automations, in one calm place.",
};

const FEATURES = [
  {
    id: "proposals",
    title: "Proposals",
    lede: "Interactive, on your domain, and you know exactly what they read.",
    points: ["Packages, add-ons and optional extras", "Live totals and timelines", "Section-by-section read analytics", "Templates that learn your pricing"],
    Mock: ProposalMock,
  },
  {
    id: "contracts",
    title: "Contracts",
    lede: "Your own terms, filled in from the proposal, signed in a click.",
    points: ["Bring your existing contracts", "Variables fill themselves", "Legally binding e-signatures", "Change orders that inherit terms"],
    Mock: ContractMock,
  },
  {
    id: "invoices",
    title: "Invoices & payouts",
    lede: "Deposits, milestones and retainers that send themselves.",
    points: ["Card, bank, Apple & Google Pay", "0% on bank transfers", "38 payout currencies", "Next-day payouts"],
    Mock: InvoiceMock,
  },
  {
    id: "portal",
    title: "Client portal",
    lede: "One link per client for files, approvals, invoices and signatures.",
    points: ["Your domain and colours", "Magic-link sign-in, no passwords", "File approvals with comments", "Works beautifully on phones"],
    Mock: PortalMock,
  },
  {
    id: "time",
    title: "Time & profit",
    lede: "See margin while there's still time to do something about it.",
    points: ["One-click timers or weekly sheets", "Hours tied to fee stages", "Live project margin", "Capacity view for the team"],
    Mock: TimeMock,
  },
  {
    id: "automations",
    title: "Automations",
    lede: "The admin happens. You just don't have to do it.",
    points: ["Triggers for every step", "Reminders in your tone of voice", "Slack & email notifications", "Zapier for everything else"],
    Mock: AutomationMock,
  },
];

const INTEGRATIONS = ["Xero", "QuickBooks", "FreeAgent", "Stripe", "Wise", "Slack", "Notion", "Figma", "Google Calendar", "Zapier", "Dropbox", "Linear"];

export default function ProductPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <Eyebrow>Product</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.9] tracking-[-0.045em]">
            Everything a studio needs. <span className="font-serif italic">Nothing</span> it doesn&apos;t.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Six tools that share one client record, so nothing gets typed twice and nothing falls through a gap between apps.
          </p>
        </div>
        <nav aria-label="Features" className="border-t border-ink">
          <ol>
            {FEATURES.map((f, i) => (
              <li key={f.id} className="border-b border-border">
                <a href={`#${f.id}`} className="group flex items-center gap-4 py-3.5">
                  <span className="font-mono text-xs text-ochre">0{i + 1}</span>
                  <span className="flex-1 text-lg transition-transform group-hover:translate-x-1">{f.title}</span>
                  <ArrowDownRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {FEATURES.map((f, i) => (
        <section
          key={f.id}
          id={f.id}
          className={i % 2 === 0 ? "scroll-mt-20 border-t border-border" : "scroll-mt-20 border-t border-border bg-[#ebe7de]"}
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[5rem] leading-none tracking-[-0.06em] text-ochre/90">0{i + 1}</p>
              <h2 className="mt-4 text-heading-lg">{f.title}</h2>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">{f.lede}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px]">
                    <Check className="mt-0.5 size-4 shrink-0 text-ochre" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal min-w-0">
              <f.Mock />
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border bg-card py-24 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Eyebrow>Plays well with</Eyebrow>
              <h2 className="mt-5 max-w-xl text-heading-lg">Keeps your accountant, and your tools, happy.</h2>
            </div>
            <Scribble arrow="down-left" className="hidden md:inline-flex">and 2,000 more via Zapier</Scribble>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {INTEGRATIONS.map((n) => (
              <li key={n} className="flex h-20 items-center justify-center bg-card text-[15px] font-[460] text-ink/80">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-24">
        <div className="grain relative flex flex-col items-start gap-8 overflow-hidden rounded-xl bg-wine p-8 text-white sm:p-14 md:flex-row md:items-end md:justify-between">
          <div className="absolute -top-24 -right-24 size-80 rounded-full bg-[radial-gradient(circle,#f2b25c,transparent_65%)] opacity-60" />
          <h2 className="relative z-[2] max-w-xl text-heading-lg">See it with real-looking data, before you sign up.</h2>
          <Button
            className="relative z-[2] h-12 rounded-xl bg-white px-6 text-base text-wine hover:bg-white/85"
            nativeButton={false}
            render={<Link href="/app" />}
          >
            Open the demo studio <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </>
  );
}

/* ---------- Mocks ---------- */

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}

function ProposalMock() {
  const sections = [
    ["Hello", 0.4],
    ["Our approach", 1.8],
    ["Brand identity", 2.6],
    ["Packaging system", 9.4],
    ["Café signage", 1.1],
    ["Timeline", 3.2],
    ["Terms", 0.9],
  ] as const;
  const max = 9.4;
  return (
    <Frame label="imole.studio/p/fernhill-coffee · analytics">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-label-bold">Where Theo spent his time</p>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="size-4" /> 6 visits
          </span>
        </div>
        <ul className="mt-5 space-y-2.5" aria-label="Minutes read per section">
          {sections.map(([s, m]) => (
            <li key={s} className="grid grid-cols-[7rem_minmax(0,1fr)_2.5rem] items-center gap-3 text-sm sm:grid-cols-[8.5rem_minmax(0,1fr)_3rem]">
              <span className="truncate">{s}</span>
              <span className="h-3 rounded-r bg-muted">
                <span className="block h-full rounded-r bg-ochre" style={{ width: `${(m / max) * 100}%` }} />
              </span>
              <span className="text-right font-mono text-xs text-muted-foreground">{m}m</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-lg bg-lilac/50 p-3 text-sm">
          <b className="font-semibold">Tip from Ochre:</b> Theo keeps returning to Packaging. Lead the follow-up call with the tin designs.
        </p>
      </div>
    </Frame>
  );
}

function ContractMock() {
  return (
    <div className="relative">
      <div className="absolute -top-4 -right-2 z-[1] rotate-6 rounded-lg bg-lilac px-3 py-2 text-sm shadow-sm">
        <span className="font-mono text-xs">{"{{client.name}}"}</span> → Fernhill Coffee
      </div>
      <div className="rounded-xl bg-paper p-6 ring-1 ring-border sm:p-8">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Clause 4 · Payment</p>
        <p className="mt-3 text-[15px] leading-7">
          The Client shall pay a deposit of <mark className="rounded bg-lilac/60 px-1">30%</mark> of the Total Fee (
          <mark className="rounded bg-lilac/60 px-1">$4,290</mark>) on signature. The balance is due in{" "}
          <mark className="rounded bg-lilac/60 px-1">two</mark> instalments on the milestones set out in Schedule A. Invoices are payable within{" "}
          <mark className="rounded bg-lilac/60 px-1">14 days</mark>.
        </p>
        <p className="mt-6 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">Clause 7 · Usage rights</p>
        <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
          On receipt of full payment, the Studio grants the Client an exclusive, perpetual licence to use the final deliverables…
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Kill fee", "Usage rights", "Revisions (2 rounds)", "Late payment interest", "Portfolio use"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-xs">
              + {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvoiceMock() {
  return (
    <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
      <div className="rounded-xl bg-paper p-6 ring-1 ring-border">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold tracking-tight">Imole Studio</p>
            <p className="text-xs text-muted-foreground">14 Bourdillon Road, Ikoyi, Lagos</p>
          </div>
          <p className="font-mono text-xs">#0148</p>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Billed to</p>
        <p className="font-[460]">Fernhill Coffee</p>
        <table className="mt-6 w-full text-sm">
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2">Deposit · Rebrand & packaging</td>
              <td className="py-2 text-right font-mono">$4,890</td>
            </tr>
            <tr>
              <td className="pt-3 font-semibold">Due Nov 24</td>
              <td className="pt-3 text-right font-mono text-lg">$4,890.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-ink p-5 text-white">
        <p className="text-sm text-white/60">Pay with</p>
        {[
          [CreditCard, "Card", "2.7%"],
          [Landmark, "Bank transfer", "Free"],
          [Smartphone, "Apple Pay", "2.7%"],
        ].map(([Icon, l, f]) => {
          const I = Icon as typeof CreditCard;
          return (
            <span key={l as string} className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-3 text-sm">
              <I className="size-4" />
              <span className="flex-1">{l as string}</span>
              <span className="font-mono text-xs text-white/60">{f as string}</span>
            </span>
          );
        })}
        <span className="mt-auto pt-4 text-xs text-white/60">Payout: tomorrow · NGN</span>
      </div>
    </div>
  );
}

function PortalMock() {
  return (
    <Frame label="clients.imole.studio/fernhill">
      <div className="grid sm:grid-cols-[10rem_1fr]">
        <ul className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border p-3 text-sm whitespace-nowrap sm:flex-col sm:overflow-visible sm:border-r sm:border-b-0">
          {["Overview", "Files", "Approvals", "Invoices", "Messages"].map((t, i) => (
            <li key={t} className={i === 2 ? "rounded-md bg-secondary px-2.5 py-1.5" : "px-2.5 py-1.5 text-muted-foreground"}>
              {t}
            </li>
          ))}
        </ul>
        <div className="space-y-3 p-4 sm:p-5">
          {[
            ["Logo suite · round 2", "Waiting for you", "bg-lilac/60"],
            ["Colour palette", "Approved Nov 4", "bg-[#e3f1e8] text-good"],
            ["Bag dieline v1", "Changes requested", "bg-[#fdecea] text-critical"],
          ].map(([f, s, c]) => (
            <div key={f} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <span className="size-10 shrink-0 rounded-md bg-[linear-gradient(135deg,#f2a25a,#6f4a5c)]" />
              <span className="flex-1 text-sm font-[460]">{f}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${c}`}>{s}</span>
            </div>
          ))}
          <div className="rounded-lg bg-muted p-3 text-sm">
            <span className="font-semibold">Theo:</span> Love round 2. Can we try the sun a touch warmer?
          </div>
        </div>
      </div>
    </Frame>
  );
}

function TimeMock() {
  const days = [
    ["Mon", 6.5],
    ["Tue", 7.25],
    ["Wed", 5],
    ["Thu", 8],
    ["Fri", 4.5],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
      <div className="rounded-xl bg-card p-5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <p className="text-label-bold">This week</p>
          <span className="flex items-center gap-1.5 rounded-full bg-[#fdecea] px-2.5 py-1 font-mono text-xs text-critical">
            <Timer className="size-3.5" /> 01:24:07
          </span>
        </div>
        <ul className="mt-5 space-y-3">
          {days.map(([d, h]) => (
            <li key={d} className="grid grid-cols-[2.5rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="text-muted-foreground">{d}</span>
              <span className="h-6 rounded bg-muted">
                <span className="block h-full rounded bg-ochre" style={{ width: `${(h / 8) * 100}%` }} />
              </span>
              <span className="text-right font-mono text-xs">{h}h</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-lagoon p-5 text-white">
        <p className="text-sm text-white/70">Nordlys · phase 2 margin</p>
        <p className="text-[4rem] leading-none tracking-[-0.05em]">52%</p>
        <div>
          <div className="h-2 rounded-full bg-white/15">
            <div className="h-full w-[66%] rounded-full bg-white" />
          </div>
          <p className="mt-2 text-xs text-white/70">118 of 180 budgeted hours · on track</p>
        </div>
      </div>
    </div>
  );
}

function AutomationMock() {
  const steps = [
    ["When", "Proposal is signed", "bg-wine text-white"],
    ["Then", "Create contract from template", "bg-card"],
    ["Then", "Send 30% deposit invoice", "bg-card"],
    ["Wait", "Until deposit is paid", "bg-lilac/60"],
    ["Then", "Create project, notify #studio in Slack", "bg-card"],
  ];
  return (
    <ol className="relative mx-auto max-w-md space-y-3 before:absolute before:top-4 before:bottom-4 before:left-6 before:w-px before:bg-ink/20">
      {steps.map(([k, l, c], i) => (
        <li key={i} className={`relative flex items-center gap-4 rounded-xl p-4 ring-1 ring-border ${c}`}>
          <span className="relative z-[1] flex size-5 items-center justify-center rounded-full bg-background ring-1 ring-ink/30">
            <Zap className="size-3 text-ochre" />
          </span>
          <span className="w-10 font-mono text-xs uppercase opacity-70">{k}</span>
          <span className="text-[15px] font-[460]">{l}</span>
        </li>
      ))}
    </ol>
  );
}
