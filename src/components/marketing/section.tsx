import { cn } from "@/lib/utils";

/** Numbered mono eyebrow: "02 — One thread". */
export function Eyebrow({ n, children, className }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase", className)}>
      {n && <span className="text-ochre">{n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-40" />}
      {children}
    </p>
  );
}

/** Handwritten margin note with a hand-drawn arrow. */
export function Scribble({
  children,
  className,
  arrow = "down-left",
}: {
  children: React.ReactNode;
  className?: string;
  arrow?: "down-left" | "down-right" | "left";
}) {
  const paths = {
    "down-left": "M70 6 C 60 30, 40 44, 10 52 M10 52 L 22 42 M10 52 L 24 56",
    "down-right": "M6 6 C 16 30, 36 44, 66 52 M66 52 L 54 42 M66 52 L 52 56",
    left: "M74 22 C 54 18, 30 20, 8 28 M8 28 L 20 18 M8 28 L 20 36",
  };
  return (
    <span className={cn("pointer-events-none inline-flex items-start gap-1 font-script text-2xl leading-none text-violet", className)}>
      <svg aria-hidden viewBox="0 0 80 60" className="h-10 w-14 shrink-0 fill-none stroke-current stroke-[2.2] [stroke-linecap:round]">
        <path d={paths[arrow]} />
      </svg>
      <span className="-rotate-3">{children}</span>
    </span>
  );
}
