"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, FolderKanban, LayoutDashboard, Settings, Users } from "lucide-react";

import { cn } from "@/lib/utils";

export const APP_NAV = [
  { href: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/app/projects", label: "Projects", icon: FolderKanban, badge: "9" },
  { href: "/app/invoices", label: "Invoices", icon: FileText, badge: "2", alert: true },
  { href: "/app/clients", label: "Clients", icon: Users },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-0.5">
      {APP_NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] transition-colors",
                active ? "bg-sidebar-accent font-[460] text-foreground" : "text-foreground/70 hover:bg-sidebar-accent/50 hover:text-foreground",
              )}
            >
              <item.icon className={cn("size-[18px]", active && "text-wine")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 font-mono text-[11px] leading-5",
                    item.alert ? "bg-[#fdecea] text-critical" : "bg-ink/5 text-muted-foreground",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
