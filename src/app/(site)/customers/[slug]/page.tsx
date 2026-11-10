import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { Sky } from "@/components/brand/sky";
import { STORIES } from "@/lib/site-data";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/customers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  return s ? { title: `${s.studio}`, description: s.headline } : {};
}

type Params = PageProps<"/customers/[slug]">["params"];

// Cache Components: URL data (params) is awaited inside <Suspense>, so the route keeps an
// instant App Shell. Known slugs are still fully prerendered via generateStaticParams;
// unknown slugs get a real 404 from src/proxy.ts before streaming starts.
export default function StoryPage({ params }: PageProps<"/customers/[slug]">) {
  return (
    <Suspense fallback={<StorySkeleton />}>
      <Story params={params} />
    </Suspense>
  );
}

function StorySkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading story">
      <Sky hour={17.5} className="min-h-[520px]">
        <div className="mx-auto flex min-h-[520px] w-full max-w-[1200px] flex-col px-4 pt-10 pb-28">
          <span className="h-8 w-28 rounded-full bg-white/60" />
          <div className="mt-auto max-w-3xl space-y-3">
            <span className="block h-5 w-40 rounded-full bg-white/50" />
            <span className="block h-14 w-full rounded-xl bg-white/45" />
            <span className="block h-14 w-2/3 rounded-xl bg-white/45" />
          </div>
        </div>
      </Sky>
      <div className="mx-auto max-w-[1200px] space-y-4 px-4 py-16">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block h-5 max-w-2xl animate-pulse rounded-full bg-muted" />
        ))}
      </div>
    </div>
  );
}

async function Story({ params }: { params: Params }) {
  const { slug } = await params;
  const i = STORIES.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const s = STORIES[i];
  const next = STORIES[(i + 1) % STORIES.length];

  return (
    <article>
      <Sky hour={s.hour} className="min-h-[520px]">
        <div className="mx-auto flex min-h-[520px] w-full max-w-[1200px] flex-col px-4 pt-10 pb-28">
          <Link
            href="/customers"
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/70 px-3 py-1.5 text-sm text-ink backdrop-blur hover:bg-white"
          >
            <ArrowLeft className="size-4" /> All stories
          </Link>
          <div className="mt-auto max-w-4xl">
            <p className="flex flex-wrap items-center gap-3 text-sm text-ink/80">
              <span className="rounded-full bg-white/70 px-2.5 py-1 backdrop-blur">{s.discipline}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" /> {s.city}
              </span>
            </p>
            <h1 className="mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-ink">{s.headline}</h1>
          </div>
        </div>
      </Sky>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1fr_340px]">
        <div className="max-w-2xl">
          <p className="text-[1.375rem] leading-[1.5] tracking-[-0.01em]">{s.intro}</p>
          <div className="mt-10 space-y-6 text-lg leading-[1.7] text-ink/85">
            {s.body.slice(0, 2).map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <figure className="my-14 border-l-2 border-ochre pl-6 sm:pl-10">
            <blockquote className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] italic">“{s.quote}”</blockquote>
            <figcaption className="mt-5 text-muted-foreground">
              {s.person}, {s.role}
            </figcaption>
          </figure>
          <div className="space-y-6 text-lg leading-[1.7] text-ink/85">
            {s.body.slice(2).map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-card p-6 ring-1 ring-border">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Results</p>
            <dl className="mt-4 divide-y divide-border">
              {s.stats.map((st) => (
                <div key={st.l} className="py-4 first:pt-0 last:pb-0">
                  <dd className="text-heading-sm">{st.v}</dd>
                  <dt className="mt-1 text-sm text-muted-foreground">{st.l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl bg-card p-6 ring-1 ring-border">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Uses</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.uses.map((u) => (
                <li key={u} className="rounded-full bg-secondary px-3 py-1 text-sm">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Link href={`/customers/${next.slug}`} className="group block border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Next story</p>
            <p className="mt-3 max-w-2xl text-heading-sm md:text-heading-lg">{next.headline}</p>
          </div>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
            <ArrowRight className="size-5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
