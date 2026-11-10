"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, Plus, Search } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { AppNav, APP_NAV } from "@/components/app/app-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ME, STUDIO } from "@/lib/app-data";

export function AppTopbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current =
    [...APP_NAV].reverse().find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))?.label ?? "Overview";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" />}>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar p-4">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo href="/app" className="px-2 py-2" />
          <p className="px-3 pt-2 pb-4 text-sm text-muted-foreground">{STUDIO.name}</p>
          <AppNav onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <p className="text-[15px] font-[460] lg:hidden">{current}</p>

      <label className="relative hidden max-w-md flex-1 md:block">
        <span className="sr-only">Search</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search clients, invoices, projects…"
          className="h-10 w-full rounded-lg border border-border bg-card pr-14 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        />
        <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-border bg-muted px-1.5 font-mono text-[11px] text-muted-foreground">
          ⌘K
        </kbd>
      </label>

      <div className="ml-auto flex items-center gap-1.5">
        <Button className="h-9 gap-1.5 rounded-lg px-3" nativeButton={false} render={<Link href="/p/fernhill-coffee" />}>
          <Plus /> <span className="hidden sm:inline">New proposal</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications, 3 unread">
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-ochre ring-2 ring-background" />
        </Button>
        <span
          className="ml-1 flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f2a25a,#6f4a5c)] text-xs font-semibold text-white"
          title={ME.name}
        >
          {ME.initials}
        </span>
      </div>
    </header>
  );
}
