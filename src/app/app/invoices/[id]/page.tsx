import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, CreditCard, Landmark, Smartphone } from "lucide-react";

import { ClientAvatar, StatusBadge } from "@/components/app/bits";
import { InvoiceActions } from "@/components/app/invoice-actions";
import { INVOICES, STUDIO, clientById, invoiceById } from "@/lib/app-data";
import { moneyCents } from "@/lib/format";

export function generateStaticParams() {
  return INVOICES.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: PageProps<"/app/invoices/[id]">): Promise<Metadata> {
  const { id } = await params;
  const inv = invoiceById(id);
  return { title: inv ? `Invoice ${inv.number}` : "Invoice" };
}

type Params = PageProps<"/app/invoices/[id]">["params"];

// Cache Components: the back link renders in the instant App Shell; everything that depends on
// the URL is awaited inside <Suspense>. Unknown ids get a real 404 from src/proxy.ts.
export default function InvoicePage({ params }: PageProps<"/app/invoices/[id]">) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <Link href="/app/invoices" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Invoices
      </Link>
      <Suspense fallback={<InvoiceSkeleton />}>
        <InvoiceDetail params={params} />
      </Suspense>
    </div>
  );
}

function InvoiceSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading invoice">
      <span className="mt-4 mb-8 block h-12 w-48 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="h-[640px] animate-pulse rounded-xl bg-paper ring-1 ring-border" />
        <div className="h-64 animate-pulse rounded-xl bg-card ring-1 ring-border" />
      </div>
    </div>
  );
}

async function InvoiceDetail({ params }: { params: Params }) {
  const { id } = await params;
  const inv = invoiceById(id);
  if (!inv) notFound();
  const c = clientById(inv.client);

  return (
    <>
      <div className="mt-4 mb-8 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-heading-lg tracking-[-0.04em]">{inv.number}</h1>
        <StatusBadge status={inv.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* The invoice as the client sees it */}
        <article className="relative overflow-hidden rounded-xl bg-paper p-6 ring-1 ring-border sm:p-12">
          {inv.status === "paid" && (
            <span className="absolute top-10 right-8 -rotate-12 rounded-lg border-[3px] border-good px-4 py-1.5 font-mono text-2xl font-bold tracking-[0.2em] text-good/80 uppercase">
              Paid
            </span>
          )}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-bold tracking-[0.3em]">IMOLE</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {STUDIO.name}
                <br />
                14 Bourdillon Road, Ikoyi, Lagos
                <br />
                RC 1847291
              </p>
            </div>
            <div className="text-right">
              <p className="text-subheading">Invoice</p>
              <p className="font-mono text-sm text-muted-foreground">{inv.number}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs tracking-wider text-muted-foreground uppercase">Billed to</p>
              <p className="mt-2 font-[460]">{c.name}</p>
              <p className="text-sm text-muted-foreground">
                {c.contact}
                <br />
                {c.city}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-wider text-muted-foreground uppercase">Issued</p>
              <p className="mt-2">{inv.issued === "—" ? "Not sent yet" : `${inv.issued}, 2026`}</p>
            </div>
            <div>
              <p className="text-xs tracking-wider text-muted-foreground uppercase">Due</p>
              <p className="mt-2">{inv.due === "—" ? "14 days after sending" : `${inv.due}, 2026`}</p>
            </div>
          </div>

          <table className="mt-12 w-full text-sm">
            <thead>
              <tr className="border-b border-ink text-left text-xs tracking-wider text-muted-foreground uppercase">
                <th className="py-3 font-normal">Description</th>
                <th className="py-3 text-right font-normal">Qty</th>
                <th className="py-3 text-right font-normal">Rate</th>
                <th className="py-3 text-right font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.lines.map((l) => (
                <tr key={l.d} className="border-b border-border">
                  <td className="py-4 pr-4">{l.d}</td>
                  <td className="py-4 text-right font-mono">{l.q}</td>
                  <td className="py-4 text-right font-mono">{moneyCents(l.r)}</td>
                  <td className="py-4 text-right font-mono">{moneyCents(l.q * l.r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="mt-6 ml-auto max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-mono">{moneyCents(inv.amount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">VAT (exported service)</dt>
              <dd className="font-mono">$0.00</dd>
            </div>
            <div className="flex justify-between border-t border-ink pt-3 text-base">
              <dt className="font-semibold">Total due</dt>
              <dd className="font-mono text-xl">{moneyCents(inv.amount)}</dd>
            </div>
          </dl>

          <div className="mt-12 grid gap-2 sm:grid-cols-3">
            {[
              [CreditCard, "Card"],
              [Landmark, "Bank transfer · free"],
              [Smartphone, "Apple / Google Pay"],
            ].map(([Icon, l]) => {
              const I = Icon as typeof CreditCard;
              return (
                <span key={l as string} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
                  <I className="size-4 text-ochre" /> {l as string}
                </span>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Thank you. It was a pleasure working on this together. — Tolu</p>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-card p-5 ring-1 ring-border">
            <div className="flex items-center gap-3">
              <ClientAvatar client={c} />
              <div>
                <p className="font-[460]">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.email}</p>
              </div>
            </div>
            <div className="mt-5">
              <InvoiceActions status={inv.status} number={inv.number} />
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 ring-1 ring-border">
            <h2 className="text-label-bold">History</h2>
            <ol className="relative mt-4 space-y-4 before:absolute before:top-1.5 before:bottom-1.5 before:left-[5px] before:w-px before:bg-border">
              {inv.events.map((e, i) => (
                <li key={i} className="relative flex gap-3 text-sm">
                  <span className={`relative z-[1] mt-1 size-[11px] shrink-0 rounded-full ring-4 ring-card ${i === inv.events.length - 1 ? "bg-ochre" : "bg-ink/25"}`} />
                  <span>
                    {e.e}
                    <span className="block font-mono text-xs text-muted-foreground">{e.t}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}
