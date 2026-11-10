"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ClientAvatar, StatusBadge } from "@/components/app/bits";
import { INVOICES, clientById, type InvoiceStatus } from "@/lib/app-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

const TABS: ("all" | InvoiceStatus)[] = ["all", "draft", "sent", "viewed", "overdue", "paid"];

export function InvoiceTable() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return INVOICES.filter((i) => tab === "all" || i.status === tab).filter((i) => {
      if (!query) return true;
      const c = clientById(i.client);
      return [i.number, c.name, i.project].some((s) => s.toLowerCase().includes(query));
    });
  }, [tab, q]);

  return (
    <div className="rounded-xl bg-card ring-1 ring-border">
      <div className="flex flex-col gap-3 border-b border-border p-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filter by status" className="no-scrollbar flex gap-1 overflow-x-auto">
          {TABS.map((t) => {
            const n = t === "all" ? INVOICES.length : INVOICES.filter((i) => i.status === t).length;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-sm capitalize transition-colors",
                  tab === t ? "bg-secondary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t} <span className="ml-0.5 font-mono text-xs opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative md:w-64">
          <span className="sr-only">Search invoices</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Client, project or number"
            className="h-9 w-full rounded-lg border border-border bg-background pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-normal">Invoice</th>
              <th className="px-4 py-3 font-normal">Client</th>
              <th className="px-4 py-3 font-normal">Type</th>
              <th className="px-4 py-3 font-normal">Issued</th>
              <th className="px-4 py-3 font-normal">Due</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 text-right font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => {
              const c = clientById(i.client);
              return (
                <tr
                  key={i.id}
                  onClick={() => router.push(`/app/invoices/${i.id}`)}
                  className={cn(
                    "cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-muted/50",
                    i.status === "overdue" && "bg-[#fdecea]/40",
                  )}
                >
                  <td className="px-4 py-3">
                    <Link href={`/app/invoices/${i.id}`} className="font-mono hover:underline" onClick={(e) => e.stopPropagation()}>
                      {i.number}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3">
                      <ClientAvatar client={c} className="size-8 text-[10px]" />
                      <span className="min-w-0">
                        <span className="block font-[460]">{c.name}</span>
                        <span className="block max-w-[220px] truncate text-xs text-muted-foreground">{i.project}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{i.kind}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.issued}</td>
                  <td className={cn("px-4 py-3", i.status === "overdue" ? "font-[460] text-critical" : "text-muted-foreground")}>{i.due}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={i.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{money(i.amount)}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center text-muted-foreground">
                  Nothing matches “{q}”. <span className="font-script text-xl text-violet">the books are clean.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
