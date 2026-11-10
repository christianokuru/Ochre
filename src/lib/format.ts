const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** $12,400 */
export const money = (n: number) => usd.format(n);
/** $12,400.00 */
export const moneyCents = (n: number) => usdCents.format(n);
/** $12.4K */
export const moneyCompact = (n: number) => `$${compact.format(n)}`;
/** 12.4K */
export const num = (n: number) => compact.format(n);

/** 17.7 -> "17:42" */
export function clock(hour: number) {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour - Math.floor(hour)) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
