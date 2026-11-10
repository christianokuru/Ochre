"use client";

import { useState } from "react";
import { AlertTriangle, Columns3, List, Plus } from "lucide-react";

import { ClientAvatar } from "@/components/app/bits";
import { PROJECTS, STAGES, clientById, type Project } from "@/lib/app-data";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

function Team({ team }: { team: string[] }) {
  if (!team.length) return <span className="text-xs text-muted-foreground">Unassigned</span>;
  return (
    <span className="flex -space-x-1.5">
      {team.map((t, i) => (
        <span
          key={t}
          title={t}
          className="flex size-6 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-2 ring-card"
          style={{ background: ["#421d24", "#714cb6", "#0c4243", "#b8742a"][i % 4] }}
        >
          {t}
        </span>
      ))}
    </span>
  );
}

function Budget({ p }: { p: Project }) {
  if (!p.budgetHours) return null;
  const pct = Math.min(100, (p.hours / p.budgetHours) * 100);
  const over = p.hours > p.budgetHours;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {p.hours}h of {p.budgetHours}h
        </span>
        {over ? (
          <span className="inline-flex items-center gap-1 text-critical">
            <AlertTriangle className="size-3" /> Over budget
          </span>
        ) : (
          <span>{p.progress}% done</span>
        )}
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", over ? "bg-critical" : "bg-ochre")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ProjectBoard() {
  const [view, setView] = useState<"board" | "list">("board");

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex rounded-lg bg-card p-0.5 ring-1 ring-border" role="tablist" aria-label="Layout">
          {([
            ["board", Columns3, "Board"],
            ["list", List, "List"],
          ] as const).map(([v, Icon, l]) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm", view === v ? "bg-secondary" : "text-muted-foreground hover:text-foreground")}
            >
              <Icon className="size-4" /> {l}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {money(PROJECTS.filter((p) => p.stage !== "done").reduce((s, p) => s + p.value, 0))} in open work
        </p>
      </div>

      {view === "board" ? (
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {STAGES.map((s) => {
            const items = PROJECTS.filter((p) => p.stage === s.id);
            return (
              <section key={s.id} className="flex w-[290px] shrink-0 flex-col rounded-xl bg-[#ebe7de] p-2.5" aria-label={s.label}>
                <header className="flex items-center justify-between px-2 py-1.5">
                  <h2 className="text-sm font-semibold">
                    {s.label} <span className="ml-1 font-mono text-xs font-normal text-muted-foreground">{items.length}</span>
                  </h2>
                  <span className="font-mono text-xs text-muted-foreground">{money(items.reduce((a, p) => a + p.value, 0))}</span>
                </header>
                <ul className="mt-1 flex flex-col gap-2">
                  {items.map((p) => {
                    const c = clientById(p.client);
                    return (
                      <li key={p.id}>
                        <article
                          tabIndex={0}
                          className="cursor-grab rounded-lg bg-card p-3.5 ring-1 ring-border transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <ClientAvatar client={c} className="size-7 rounded-md text-[10px]" />
                            <span className="truncate text-xs text-muted-foreground">{c.name}</span>
                          </div>
                          <h3 className="mt-2.5 text-[15px] font-[460]">{p.name}</h3>
                          {p.note && (
                            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-lilac/50 px-2 py-0.5 text-xs">
                              <span className="size-1.5 animate-pulse rounded-full bg-violet" /> {p.note}
                            </p>
                          )}
                          <Budget p={p} />
                          <div className="mt-3 flex items-center justify-between">
                            <Team team={p.team} />
                            <span className="text-right">
                              <span className="block font-mono text-sm">{money(p.value)}</span>
                              <span className="block text-[11px] text-muted-foreground">{p.due}</span>
                            </span>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                  <li>
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-ink/20 py-2.5 text-sm text-muted-foreground hover:border-ink/40 hover:text-foreground">
                      <Plus className="size-4" /> Add
                    </button>
                  </li>
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-card ring-1 ring-border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-normal">Project</th>
                <th className="px-4 py-3 font-normal">Stage</th>
                <th className="px-4 py-3 font-normal">Hours</th>
                <th className="px-4 py-3 font-normal">Team</th>
                <th className="px-4 py-3 text-right font-normal">Value</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => {
                const c = clientById(p.client);
                return (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-3">
                        <ClientAvatar client={c} className="size-8 text-[10px]" />
                        <span>
                          <span className="block font-[460]">{p.name}</span>
                          <span className="block text-xs text-muted-foreground">{c.name}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3">{STAGES.find((s) => s.id === p.stage)?.label}</td>
                    <td className={cn("px-4 py-3 font-mono", p.hours > p.budgetHours && p.budgetHours ? "text-critical" : "")}>
                      {p.budgetHours ? `${p.hours}/${p.budgetHours}h` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Team team={p.team} />
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{money(p.value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
