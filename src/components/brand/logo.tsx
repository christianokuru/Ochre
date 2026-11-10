import Link from "next/link";

import { cn } from "@/lib/utils";

/** Ochre mark: a sun setting into a horizon line. */
export function OchreMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7", className)}>
      <defs>
        <linearGradient id="ochre-sun" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f2b25c" />
          <stop offset="1" stopColor="#b8742a" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="#421d24" />
      <path d="M7 20a9 9 0 0 1 18 0Z" fill="url(#ochre-sun)" />
      <rect x="5" y="21.5" width="22" height="1.6" rx=".8" fill="#f2f0eb" />
      <rect x="9" y="25" width="14" height="1.6" rx=".8" fill="#f2f0eb" opacity=".55" />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
  tone = "ink",
}: {
  className?: string;
  href?: string;
  tone?: "ink" | "white";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-[1.35rem] font-semibold tracking-[-0.04em]",
        tone === "white" ? "text-white" : "text-foreground",
        className,
      )}
      aria-label="Ochre home"
    >
      <OchreMark />
      ochre
    </Link>
  );
}
