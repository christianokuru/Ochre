import type { Metadata } from "next";
import { AlertCircle, CheckCircle2, Clock, PencilLine } from "lucide-react";

import { PageTitle } from "@/components/app/bits";
import { InvoiceTable } from "@/components/app/invoice-table";
import { Button } from "@/components/ui/button";
import { INVOICES } from "@/lib/app-data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Invoices" };

export default function InvoicesPage() {
  const sum = (f: (s: string) => boolean) => INVOICES.filter((i) => f(i.status)).reduce((a, i) => a + i.amount, 0);
  const count = (f: (s: string) => boolean) => INVOICES.filter((i) => f(i.status)).length;
  const summary = [
    { l: "Outstanding", v: sum((s) => ["sent", "viewed", "overdue"].includes(s)), n: count((s) => ["sent", "viewed", "overdue"].includes(s)), icon: Clock, cls: "text-ink" },
    { l: "Overdue", v: sum((s) => s === "overdue"), n: count((s) => s === "overdue"), icon: AlertCircle, cls: "text-critical" },
    { l: "Paid · last 45 days", v: sum((s) => s === "paid"), n: count((s) => s === "paid"), icon: CheckCircle2, cls: "text-good" },
    { l: "Drafts", v: sum((s) => s === "draft"), n: count((s) => s === "draft"), icon: PencilLine, cls: "text-muted-foreground" },
  ];

  return (
    <div className="mx-auto max-w-[1280px]">
      <PageTitle title="Invoices" sub="Reminders are on. Ochre chases on day 1, 7 and 14, warmly.">
        <Button variant="outline" className="h-9">
          Export CSV
        </Button>
      </PageTitle>

      <section aria-label="Summary" className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.l} className="bg-card p-5">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <s.icon className={`size-4 ${s.cls}`} /> {s.l}
            </p>
            <p className="mt-2 text-[1.75rem] leading-none tracking-[-0.03em] tabular-nums">{money(s.v)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.n} invoices</p>
          </div>
        ))}
      </section>

      <InvoiceTable />
    </div>
  );
}
