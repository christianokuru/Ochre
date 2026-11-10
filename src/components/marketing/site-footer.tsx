import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OchreMark } from "@/components/brand/logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      ["Proposals", "/product#proposals"],
      ["Contracts", "/product#contracts"],
      ["Invoices & payouts", "/product#invoices"],
      ["Client portal", "/product#portal"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    heading: "Studios",
    links: [
      ["Customer stories", "/customers"],
      ["Branding studios", "/customers"],
      ["Photographers", "/customers"],
      ["Architects", "/customers"],
      ["Demo workspace", "/app"],
    ],
  },
  {
    heading: "Company",
    links: [
      ["About", "/about"],
      ["Changelog", "/changelog"],
      ["Careers", "/about#careers"],
      ["Press kit", "/about"],
      ["Contact", "/about"],
    ],
  },
  {
    heading: "Legal",
    links: [
      ["Privacy", "/about"],
      ["Terms", "/about"],
      ["Security", "/about"],
      ["Cookies", "/about"],
      ["DPA", "/about"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-wine text-white">
      <div className="mx-auto max-w-[1200px] px-4 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <OchreMark className="size-10" />
            <p className="mt-6 text-heading-sm">
              Less admin. <span className="font-serif italic">More golden hours.</span>
            </p>
            <form className="mt-6 flex gap-2" action="/signup">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="you@studio.com"
                className="h-11 min-w-0 flex-1 rounded-lg border border-white/25 bg-white/5 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-white focus-visible:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-white px-4 text-sm font-[460] text-wine transition-colors hover:bg-white/85"
              >
                Start free <ArrowRight className="size-4" />
              </button>
            </form>
            <p className="mt-3 text-xs text-white/55">30 days free. No card. Cancel in two clicks.</p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-bold">{col.heading}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm font-[460] text-white/70 transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row">
          <span>© 2026 Ochre Labs ApS · Made by people who used to invoice from spreadsheets</span>
          <span className="font-mono">All systems normal · 99.99% uptime</span>
        </div>
      </div>

      {/* Oversized cropped wordmark */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.22em] text-center text-[27vw] leading-[0.8] font-semibold tracking-[-0.07em] text-white/[0.07] select-none"
      >
        ochre
      </div>
    </footer>
  );
}
