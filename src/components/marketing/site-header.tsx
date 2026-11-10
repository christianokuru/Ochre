"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** Sticky header: 12px blur, border fades in after scroll, active page marked with a lilac pill. */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color] duration-300",
        scrolled ? "border-border bg-background/75" : "border-transparent bg-background/0",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4">
        <Logo />

        <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-full px-4 py-1.5 text-[15px] transition-colors",
                  isActive(item.href)
                    ? "bg-secondary text-foreground"
                    : "text-foreground/75 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            className="hidden text-[15px] sm:inline-flex"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Log in
          </Button>
          <Button
            variant="secondary"
            className="h-9 rounded-lg border border-foreground px-4 text-[15px]"
            nativeButton={false}
            render={<Link href="/signup" />}
          >
            Start free
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] bg-background p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-16 items-center border-b border-border px-5">
                <Logo />
              </div>
              <ul className="flex flex-col px-3 py-4">
                {NAV.map((item, i) => (
                  <li key={item.href}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-baseline gap-4 rounded-xl px-3 py-3 text-heading-sm",
                            isActive(item.href) && "bg-secondary",
                          )}
                        />
                      }
                    >
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      {item.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 border-t border-border p-5">
                <Button
                  variant="outline"
                  className="h-11 text-base"
                  nativeButton={false}
                  render={<Link href="/login" />}
                >
                  Log in
                </Button>
                <Button
                  className="h-11 rounded-xl text-base"
                  nativeButton={false}
                  render={<Link href="/app" />}
                >
                  Open the demo workspace <ArrowUpRight data-icon="inline-end" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
