import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Announcement() {
  return (
    <Link
      href="/changelog"
      className="group flex items-center justify-center gap-2.5 bg-wine px-4 py-2.5 text-center text-[13px] text-white sm:text-sm"
    >
      <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase">
        New
      </span>
      <span>
        Ochre Payouts: next-day money in 38 currencies
      </span>
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
