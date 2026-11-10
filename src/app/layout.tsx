import type { Metadata } from "next";
import { Caveat, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

// Inter stands in for the design system's custom "Super Sans VF" (variable, so 460 renders).
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Editorial italic accents: one or two words per headline, never body copy.
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Tabular figures for money and data.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Handwritten margin notes.
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ochre: the back office for independent studios",
    template: "%s · Ochre",
  },
  description:
    "Proposals that close, contracts that sign themselves and invoices that actually get paid. Less admin, more golden hours.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
