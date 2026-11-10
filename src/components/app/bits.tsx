import { AlertCircle, CheckCircle2, Eye, PencilLine, Send } from "lucide-react";

import type { Client, InvoiceStatus } from "@/lib/app-data";
import { cn } from "@/lib/utils";

export function ClientAvatar({ client, className }: { client: Client; className?: string }) {
  const initials = client.name
    .replace("&", "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <span
      aria-hidden
      className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white", className)}
      style={{ background: `linear-gradient(135deg, ${client.hue[0]}, ${client.hue[1]})` }}
    >
      {initials}
    </span>
  );
}

const STATUS: Record<InvoiceStatus, { label: string; icon: typeof Send; cls: string }> = {
  draft: { label: "Draft", icon: PencilLine, cls: "bg-muted text-muted-foreground" },
  sent: { label: "Sent", icon: Send, cls: "bg-[#eeeae2] text-ink" },
  viewed: { label: "Viewed", icon: Eye, cls: "bg-lilac/60 text-ink" },
  overdue: { label: "Overdue", icon: AlertCircle, cls: "bg-[#fdecea] text-critical" },
  paid: { label: "Paid", icon: CheckCircle2, cls: "bg-[#e3f1e8] text-good" },
};

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  const s = STATUS[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-[460]", s.cls)}>
      <s.icon className="size-3.5" />
      {s.label}
    </span>
  );
}

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-heading-lg">{title}</h1>
        {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
      </div>
      {children}
    </div>
  );
}
