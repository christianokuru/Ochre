/**
 * The Ochre sky: a 24-hour model of sky colour, sun and moon position.
 * Pure functions, so the same sky renders on the server and the client.
 */

type Key = {
  h: number;
  top: string;
  mid: string;
  hor: string;
  far: string;
  near: string;
  front: string;
};

const KEYS: Key[] = [
  { h: 0, top: "#0a0f24", mid: "#161a36", hor: "#2a2948", far: "#1c1f3a", near: "#141730", front: "#0d1024" },
  { h: 4.5, top: "#141a3a", mid: "#2c2a52", hor: "#5a4366", far: "#2a2848", near: "#1e1d3a", front: "#15142b" },
  { h: 6, top: "#4a5590", mid: "#b98aa0", hor: "#f2b48a", far: "#8a7a9c", near: "#6a5b80", front: "#4a3f63" },
  { h: 8, top: "#8fb6e0", mid: "#d4dcec", hor: "#f5dcc0", far: "#a9b1c9", near: "#8892ad", front: "#6b7392" },
  { h: 12, top: "#7fb1e3", mid: "#c7def2", hor: "#eef0ea", far: "#a7bccd", near: "#8aa2b5", front: "#6d8599" },
  { h: 15.5, top: "#a3bde0", mid: "#e2dcd6", hor: "#f4d6b0", far: "#b5afbf", near: "#978ea6", front: "#776d88" },
  { h: 18, top: "#c9c0e6", mid: "#f0c8b0", hor: "#f2a25a", far: "#c08a8e", near: "#9a6a78", front: "#6f4a5c" },
  { h: 19.5, top: "#3f3d78", mid: "#b06a8a", hor: "#f08a55", far: "#7a4a6a", near: "#573656", front: "#3a2440" },
  { h: 21, top: "#161c40", mid: "#2d2a58", hor: "#4d3b66", far: "#2a2648", near: "#1f1c3a", front: "#15132a" },
  { h: 24, top: "#0a0f24", mid: "#161a36", hor: "#2a2948", far: "#1c1f3a", near: "#141730", front: "#0d1024" },
];

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};

const mix = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${c(r1, r2)} ${c(g1, g2)} ${c(b1, b2)})`;
};

const luminance = (rgb: string) => {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

export type SkyState = {
  top: string;
  mid: string;
  hor: string;
  far: string;
  near: string;
  front: string;
  /** true when ink text reads on this sky; false means use white text */
  light: boolean;
  sun: { x: number; y: number; visible: boolean; color: string; size: number };
  moon: { x: number; y: number; visible: boolean };
  /** 0 at midday, 1 at deep night */
  night: number;
};

export function skyAt(hour: number): SkyState {
  const h = ((hour % 24) + 24) % 24;
  let i = 0;
  while (i < KEYS.length - 2 && KEYS[i + 1].h <= h) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = (h - a.h) / (b.h - a.h);

  const state = {
    top: mix(a.top, b.top, t),
    mid: mix(a.mid, b.mid, t),
    hor: mix(a.hor, b.hor, t),
    far: mix(a.far, b.far, t),
    near: mix(a.near, b.near, t),
    front: mix(a.front, b.front, t),
  };

  // Sun arcs from 06:00 to 20:00.
  const st = (h - 6) / 14;
  const sunVisible = st > -0.03 && st < 1.03;
  const elevation = Math.sin(Math.max(0, Math.min(1, st)) * Math.PI);
  const sun = {
    x: 8 + st * 84,
    y: 82 - elevation * 62,
    visible: sunVisible,
    color: mix("#ff9a52", "#fff3d2", elevation),
    size: 120 - elevation * 40,
  };

  // Moon arcs from 20:30 to 05:30.
  const mt = (((h - 20.5 + 24) % 24) / 9);
  const moonVisible = mt >= 0 && mt <= 1;
  const moon = {
    x: 10 + mt * 80,
    y: 70 - Math.sin(Math.min(1, mt) * Math.PI) * 50,
    visible: moonVisible,
  };

  const lum = luminance(state.mid);
  // Round geometry so server- and client-rendered style strings are identical (no float noise).
  return {
    ...state,
    light: lum > 0.5,
    sun: { ...sun, x: r2(sun.x), y: r2(sun.y), size: r2(sun.size) },
    moon: { ...moon, x: r2(moon.x), y: r2(moon.y) },
    night: r2(Math.max(0, Math.min(1, (0.55 - lum) / 0.4))),
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** The whole day as one horizontal gradient: used for the time scrubber. */
export function dayGradient() {
  const stops: string[] = [];
  for (let h = 0; h <= 24; h += 1) {
    const s = skyAt(h);
    stops.push(`${s.hor} ${(h / 24) * 100}%`);
  }
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

/** Deterministic star field (no Math.random, so server and client agree). */
export const STARS = Array.from({ length: 46 }, (_, i) => {
  const x = r2((i * 73.13) % 100);
  const y = r2((i * 37.71) % 58);
  const r = i % 5 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7;
  return { x, y, r, d: (i % 7) * 0.4 };
});
