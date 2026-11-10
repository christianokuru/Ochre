import type { Metadata } from "next";
import { Rss } from "lucide-react";

import { Eyebrow } from "@/components/marketing/section";
import { CHANGELOG } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in Ochre. We ship something useful most weeks.",
};

const TAG: Record<string, string> = {
  New: "bg-lilac text-ink",
  Improved: "bg-[#f6e3c8] text-[#7a4a12]",
  Fixed: "bg-[#e3f1e8] text-good",
};

function Art({ kind }: { kind: string }) {
  switch (kind) {
    case "payouts":
      return (
        <div className="grain relative flex h-48 items-end gap-2 overflow-hidden rounded-xl bg-[linear-gradient(160deg,#421d24,#6f4a5c)] p-5">
          {["€", "£", "¥", "$", "kr", "₦", "₹"].map((c, i) => (
            <span
              key={c}
              className="relative z-[2] flex size-12 items-center justify-center rounded-full bg-white/90 font-mono text-lg text-wine"
              style={{ transform: `translateY(${-Math.sin(i * 0.9) * 28 - 20}px)` }}
            >
              {c}
            </span>
          ))}
        </div>
      );
    case "heatmap":
      return (
        <div className="grid h-48 grid-cols-12 gap-1 rounded-xl bg-card p-4 ring-1 ring-border" aria-hidden>
          {Array.from({ length: 72 }, (_, i) => {
            const v = (Math.sin(i * 1.7) + Math.cos(i * 0.6) + 2) / 4;
            return <span key={i} className="rounded-sm bg-ochre" style={{ opacity: 0.1 + v * 0.9 }} />;
          })}
        </div>
      );
    case "change":
      return (
        <div className="flex h-48 items-center justify-center gap-4 rounded-xl bg-[#ebe7de] p-5 font-mono">
          <span className="text-2xl text-ink/40 line-through">$14,300</span>
          <span className="text-ochre">→</span>
          <span className="text-4xl tracking-tight">$16,700</span>
        </div>
      );
    case "reminders":
      return (
        <div className="flex h-48 flex-col justify-center gap-2 rounded-xl bg-card p-5 ring-1 ring-border">
          {["warm", "neutral", "firm"].map((t, i) => (
            <span key={t} className={cn("w-fit rounded-2xl rounded-bl-md px-3 py-2 text-sm", i === 0 ? "bg-lilac" : "bg-muted")}>
              <span className="font-mono text-[11px] text-muted-foreground">{t} · </span>
              {["Hope the week is kind to you! A gentle nudge on #0144.", "A reminder that #0144 is now 7 days overdue.", "#0144 is 21 days overdue. Please arrange payment."][i]}
            </span>
          ))}
        </div>
      );
    case "speed":
      return (
        <div className="flex h-48 flex-col justify-center rounded-xl bg-lagoon p-6 text-white">
          <span className="text-[4rem] leading-none tracking-[-0.05em]">
            380<span className="text-2xl text-white/70">ms</span>
          </span>
          <span className="mt-2 text-sm text-white/70">p75 portal load, worldwide</span>
        </div>
      );
    default:
      return (
        <div className="grid h-48 grid-cols-5 gap-1.5 rounded-xl bg-card p-4 ring-1 ring-border" aria-hidden>
          {Array.from({ length: 25 }, (_, i) => (
            <span key={i} className={cn("rounded", i % 7 === 0 ? "bg-wine" : i % 3 === 0 ? "bg-lilac" : "bg-muted")} />
          ))}
        </div>
      );
  }
}

export default function ChangelogPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-16 pb-16 md:pt-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Changelog</Eyebrow>
            <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.9] tracking-[-0.045em]">
              Shipped, <span className="font-serif italic">lately.</span>
            </h1>
          </div>
          <a href="#" className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink md:self-auto">
            <Rss className="size-4 text-ochre" /> Subscribe via RSS
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pb-24 md:pb-32">
        <ol className="border-t border-ink">
          {CHANGELOG.map((c) => (
            <li key={c.version} className="grid gap-6 border-b border-border py-12 md:grid-cols-[200px_1fr] md:gap-12">
              <div className="md:sticky md:top-24 md:self-start">
                <time className="text-lg">{c.date}</time>
                <p className="mt-1 font-mono text-sm text-muted-foreground">v{c.version}</p>
              </div>
              <div className="reveal grid gap-8 lg:grid-cols-[1fr_340px]">
                <div>
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-[460]", TAG[c.tag])}>{c.tag}</span>
                  <h2 className="mt-4 text-heading-sm md:text-[2.25rem] md:leading-[1.05] md:tracking-[-0.025em]">{c.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{c.body}</p>
                  <ul className="mt-6 space-y-2 text-[15px]">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ochre" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <Art kind={c.art} />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
