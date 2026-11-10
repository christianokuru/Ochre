import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronsUpDown } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { AppNav } from "@/components/app/app-nav";
import { AppTopbar } from "@/components/app/app-topbar";
import { ME, STUDIO } from "@/lib/app-data";

export const metadata: Metadata = {
  title: { default: "Overview", template: "%s · Imole Studio · Ochre" },
  robots: { index: false },
};

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex min-h-svh">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <Logo href="/app" className="px-2 py-1" />

        <button className="mt-6 flex items-center gap-3 rounded-xl bg-card p-2.5 text-left ring-1 ring-sidebar-border transition-colors hover:ring-ink/30">
          <span className="flex size-9 items-center justify-center rounded-lg bg-ink text-[10px] font-bold tracking-[0.2em] text-white">IML</span>
          <span className="flex-1">
            <span className="block text-sm font-[460]">{STUDIO.name}</span>
            <span className="block text-xs text-muted-foreground">
              {STUDIO.plan} plan · {STUDIO.city}
            </span>
          </span>
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </button>

        <nav aria-label="Workspace" className="mt-6">
          <AppNav />
        </nav>

        <div className="mt-auto space-y-3">
          <div className="grain relative overflow-hidden rounded-xl bg-[linear-gradient(160deg,#c9c0e6,#f0c8b0_55%,#f2a25a)] p-4">
            <p className="relative z-[2] text-sm font-semibold">You saved 31 hours</p>
            <p className="relative z-[2] mt-1 text-xs text-ink/75">this month on proposals, invoices and chasing.</p>
            <Link href="/" className="relative z-[2] mt-3 inline-flex items-center gap-1 text-xs font-[460] text-wine">
              Back to ochre.studio <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <div className="flex items-center gap-3 px-1">
            <span className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f2a25a,#6f4a5c)] text-[11px] font-semibold text-white">
              {ME.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-[460]">{ME.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{ME.email}</span>
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
