# Ochre
Ochre: the back office for independent creative studios. Interactive proposals, contracts, invoices and payouts, built as a Next.js 16 + shadcn/ui frontend with a live time-of-day sky, an editorial "golden hour" design system and a fully working demo studio.

**Less admin. More golden hours.**

## What's inside

- **Marketing site:** home (with a sky you can scrub through 24 hours), product, pricing (with a time-saved calculator), customers and six customer stories, changelog and about.
- **Demo app:** the workspace of *Imole Studio*, a fictional branding studio in Ikoyi, Lagos. Overview dashboard with revenue charts, a projects board, invoices (with a page per invoice), clients and settings.
- **Client proposal:** `/p/fernhill-coffee` is what a client receives. Pick packages, watch the price change, type your name and sign.

All companies, people and numbers are fictional.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Logging in

There are no real accounts yet, so there are no credentials. On `/login`, enter **any email** and **any password of 8 or more characters**, then press **Log in**. You can also use "Continue with Google" (demo only) or go straight to `/app`. Nothing you type is stored or sent anywhere.

## Tech

- Next.js 16 (App Router, Cache Components, Partial Prefetching)
- React 19 and TypeScript
- Tailwind CSS v4 and shadcn/ui (Base UI)
- Inter, Instrument Serif and Caveat fonts; Lucide icons

## Project structure

| Path | What's there |
|---|---|
| `src/app/(site)` | Marketing pages |
| `src/app/(auth)` | Demo log-in and sign-up |
| `src/app/app` | The studio app |
| `src/app/p/[slug]` | Client-facing proposal |
| `src/lib/site-data.ts`, `src/lib/app-data.ts` | All hardcoded content and demo data |
| `src/proxy.ts` | Returns real 404s for unknown stories, proposals and invoices |
| `docs/DESIGN.md` | The design reference the theme is built on |

## Status

Frontend only. The planned backend is Supabase (database, accounts, storage) with Stripe Connect and Paystack for payments.
