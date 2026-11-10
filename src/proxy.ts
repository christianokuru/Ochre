import { NextResponse, type NextRequest } from "next/server";

import { INVOICES, PROPOSAL } from "@/lib/app-data";
import { STORIES } from "@/lib/site-data";

/**
 * Real 404s for unknown dynamic URLs.
 *
 * With Cache Components, these pages await `params` inside <Suspense>, so their shell starts
 * streaming with a 200 before the slug is known. Checking the slug here, before rendering,
 * keeps a true 404 status for unknown stories, proposals and invoices.
 * See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/loading.md#status-codes
 */
const KNOWN: Record<string, Set<string>> = {
  customers: new Set(STORIES.map((s) => s.slug)),
  p: new Set([PROPOSAL.slug]),
  invoices: new Set(INVOICES.map((i) => i.id)),
};

export function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  const [section, value] = parts[0] === "app" ? [parts[1], parts[2]] : [parts[0], parts[1]];
  const known = KNOWN[section];

  if (known && value && !known.has(decodeURIComponent(value))) {
    // Rewrite to a path no route matches: renders app/not-found.tsx with a 404 status.
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/customers/:slug", "/p/:slug", "/app/invoices/:id"],
};
