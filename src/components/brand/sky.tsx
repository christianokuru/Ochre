import { cn } from "@/lib/utils";
import { STARS, skyAt } from "@/lib/sky";

/**
 * A painted landscape for a given hour: gradient sky, sun or moon, stars, three ridges, film grain.
 * Server-safe (no hooks). Pass a changing `hour` from a client parent to animate it.
 */
export function Sky({
  hour,
  className,
  children,
  ridges = true,
}: {
  hour: number;
  className?: string;
  children?: React.ReactNode;
  ridges?: boolean;
}) {
  const s = skyAt(hour);

  return (
    <div
      className={cn("grain relative overflow-hidden", className)}
      style={{
        backgroundImage: `linear-gradient(180deg, ${s.top} 0%, ${s.mid} 52%, ${s.hor} 82%)`,
      }}
      data-sky-light={s.light}
    >
      {/* Stars */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: s.night }}
      >
        {STARS.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.r * 2,
              height: st.r * 2,
              opacity: 0.4 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Sun with glow */}
      {s.sun.visible && (
        <div
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.sun.x}%`, top: `${s.sun.y}%` }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              width: Math.round(s.sun.size * 3.2),
              height: Math.round(s.sun.size * 3.2),
              background: `radial-gradient(circle, ${s.sun.color} 0%, transparent 65%)`,
              opacity: 0.7,
            }}
          />
          <div
            className="relative rounded-full"
            style={{
              width: s.sun.size,
              height: s.sun.size,
              background: `radial-gradient(circle at 40% 38%, #fffaf0 0%, ${s.sun.color} 70%)`,
            }}
          />
        </div>
      )}

      {/* Moon */}
      {s.moon.visible && (
        <div
          aria-hidden
          className="absolute size-16 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_60px_10px_rgb(255_255_255/0.15)]"
          style={{
            left: `${s.moon.x}%`,
            top: `${s.moon.y}%`,
            background: "radial-gradient(circle at 35% 35%, #fbf7ec 0%, #d9d4c6 70%)",
          }}
        >
          <span className="absolute top-3 left-6 size-3 rounded-full bg-black/10" />
          <span className="absolute top-8 left-3 size-2 rounded-full bg-black/10" />
        </div>
      )}

      {/* Ridges */}
      {ridges && (
        <svg
          aria-hidden
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[34%] w-full"
        >
          <path
            d="M0 170 C 140 120 260 150 380 120 C 520 85 640 140 760 112 C 900 80 1020 60 1150 98 C 1270 132 1360 110 1440 92 L1440 320 L0 320 Z"
            fill={s.far}
            opacity="0.85"
          />
          <path
            d="M0 210 C 160 170 300 205 450 182 C 600 160 690 205 840 190 C 990 175 1100 140 1240 165 C 1330 182 1390 175 1440 168 L1440 320 L0 320 Z"
            fill={s.near}
          />
          <path
            d="M0 262 C 200 236 330 268 520 252 C 700 238 820 270 1010 256 C 1180 244 1300 262 1440 250 L1440 320 L0 320 Z"
            fill={s.front}
          />
        </svg>
      )}

      {children && (
        <div className="relative z-[2] flex min-h-[inherit] flex-col">{children}</div>
      )}
    </div>
  );
}
