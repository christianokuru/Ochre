import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleDollarSign, Eye, Inbox, Send, Zap } from "lucide-react";

import { ClientAvatar } from "@/components/app/bits";
import { RevenueChart, Sparkline } from "@/components/app/charts";
import { TaskList, WelcomeSky } from "@/components/app/dashboard-widgets";
import { ACTIVITY, KPIS, PROJECTS, REVENUE, STAGES, UPCOMING, clientById } from "@/lib/app-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

const MONTHS = REVENUE.slice(0, 11).map((r) => r.m);
const ACT_ICON = { view: Eye, paid: CircleDollarSign, auto: Zap, new: Inbox, sent: Send };

export default function OverviewPage() {
  const pipeline = STAGES.filter((s) => s.id !== "done").map((s) => ({
    ...s,
    value: PROJECTS.filter((p) => p.stage === s.id).reduce((a, p) => a + p.value, 0),
    count: PROJECTS.filter((p) => p.stage === s.id).length,
  }));
  const maxPipe = Math.max(...pipeline.map((p) => p.value));

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <WelcomeSky />

      {/* KPI tiles */}
      <section aria-label="Key numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <article key={k.label} className="rounded-xl bg-card p-5 ring-1 ring-border">
            <p className="text-sm text-muted-foreground">{k.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-[2rem] leading-none tracking-[-0.03em] tabular-nums">{k.value}</p>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 font-mono text-[11px]",
                  k.up === true ? "bg-[#e3f1e8] text-good" : "bg-muted text-muted-foreground",
                )}
              >
                {k.up === true ? "▲ " : ""}
                {k.delta}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{k.note}</p>
            <div className="mt-4">
              <Sparkline data={k.spark} label={k.label} labels={MONTHS} prefix={k.prefix} suffix={k.suffix} />
            </div>
          </article>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-xl bg-card p-5 ring-1 ring-border sm:p-6">
          <RevenueChart data={REVENUE} />
        </section>

        <section className="rounded-xl bg-card p-5 ring-1 ring-border sm:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-label-bold">Money on its way</h2>
            <Link href="/app/invoices" className="link text-sm">
              All
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {UPCOMING.map((u) => {
              const c = clientById(u.client);
              return (
                <li key={u.number} className="flex items-center gap-3 py-3">
                  <ClientAvatar client={c} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px]">{c.name}</span>
                    <span className="block font-mono text-xs text-muted-foreground">
                      {u.number} · {u.when}
                    </span>
                  </span>
                  <span className="font-mono text-[15px] tabular-nums">{money(u.amount)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
            <span className="font-semibold">{money(UPCOMING.reduce((s, u) => s + u.amount, 0))}</span> expected in the next 14 days.
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <section className="rounded-xl bg-card p-5 ring-1 ring-border sm:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-label-bold">Pipeline</h2>
            <Link href="/app/projects" className="link text-sm">
              Board
            </Link>
          </div>
          <ul className="mt-5 space-y-4" aria-label="Open project value by stage">
            {pipeline.map((p) => (
              <li key={p.id}>
                <div className="flex justify-between text-sm">
                  <span>
                    {p.label} <span className="text-muted-foreground">· {p.count}</span>
                  </span>
                  <span className="font-mono">{money(p.value)}</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-r bg-muted">
                  <div className="h-full rounded-r bg-ochre" style={{ width: `${(p.value / maxPipe) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/p/fernhill-coffee"
            className="mt-6 flex items-center gap-3 rounded-lg bg-lilac/50 p-3 text-sm transition-colors hover:bg-lilac/70"
          >
            <Eye className="size-4 shrink-0" />
            <span className="flex-1">Theo is reading the Fernhill proposal now. Preview what he sees</span>
            <ArrowUpRight className="size-4 shrink-0" />
          </Link>
        </section>

        <section className="rounded-xl bg-card p-5 ring-1 ring-border sm:p-6">
          <TaskList />
        </section>

        <section className="rounded-xl bg-card p-5 ring-1 ring-border sm:p-6 lg:col-span-2 xl:col-span-1">
          <h2 className="text-label-bold">Activity</h2>
          <ol className="relative mt-4 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-border">
            {ACTIVITY.map((a, i) => {
              const Icon = ACT_ICON[a.kind as keyof typeof ACT_ICON];
              return (
                <li key={i} className="relative flex gap-3">
                  <span
                    className={cn(
                      "relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card",
                      a.kind === "paid" ? "bg-[#e3f1e8] text-good" : a.kind === "auto" ? "bg-lilac text-ink" : "bg-muted text-ink/70",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <p className="pt-1 text-sm">
                    <span className="font-[460]">{a.who}</span> {a.what} <span className="font-[460]">{a.obj}</span>
                    <span className="block text-xs text-muted-foreground">{a.t}</span>
                  </p>
                </li>
              );
            })}
          </ol>
          <Link href="/app/invoices" className="mt-5 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            See everything <ArrowRight className="size-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
