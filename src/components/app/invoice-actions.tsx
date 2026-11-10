"use client";

import { useState } from "react";
import { BellRing, Check, Copy, Download, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { InvoiceStatus } from "@/lib/app-data";

export function InvoiceActions({ status, number }: { status: InvoiceStatus; number: string }) {
  const [reminded, setReminded] = useState(false);
  const [copied, setCopied] = useState(false);
  const unpaid = status !== "paid" && status !== "draft";

  return (
    <div className="flex flex-col gap-2">
      {status === "draft" ? (
        <Button className="h-11 rounded-xl text-base">Send invoice {number}</Button>
      ) : unpaid ? (
        <Button className="h-11 rounded-xl text-base" disabled={reminded} onClick={() => setReminded(true)}>
          {reminded ? <Check /> : <BellRing />}
          {reminded ? "Reminder sent, warmly" : "Send a reminder now"}
        </Button>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="h-10"
          onClick={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
        >
          {copied ? <Copy /> : <Link2 />}
          {copied ? "Copied" : "Pay link"}
        </Button>
        <Button variant="outline" className="h-10">
          <Download /> PDF
        </Button>
      </div>
    </div>
  );
}
