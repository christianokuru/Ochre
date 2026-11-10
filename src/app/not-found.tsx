import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Sky } from "@/components/brand/sky";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page has clocked off.",
};

export default function NotFound() {
  return (
    <Sky hour={23.2} className="min-h-svh">
      <div className="mx-auto flex min-h-svh w-full max-w-[1200px] flex-col px-4 py-6 text-white">
        <Logo tone="white" />
        <div className="flex flex-1 flex-col items-center justify-center pb-24 text-center">
          <p className="font-mono text-sm tracking-[0.3em] text-white/60">404</p>
          <h1 className="mt-6 text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.045em]">
            This page has <span className="font-serif italic">clocked off.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/75">
            It&apos;s late, the invoices are sent, and whatever you were looking for isn&apos;t here.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-base text-ink transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft className="size-4" /> Back to daylight
          </Link>
        </div>
      </div>
    </Sky>
  );
}
