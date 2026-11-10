"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PLANS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

// ?plan=… is read in the browser only, so the form stays in the static prerendered shell
// (no Suspense/streaming needed, unlike useSearchParams under Cache Components).
const noSubscribe = () => () => {};
const planFromUrl = () => new URLSearchParams(window.location.search).get("plan");

/** Demo auth: validates locally, then routes to the demo workspace. No backend. */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const urlPlan = useSyncExternalStore(noSubscribe, planFromUrl, () => null);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const plan = picked ?? (PLANS.some((p) => p.id === urlPlan) ? urlPlan! : "studio");
  const setPlan = setPicked;
  const signup = mode === "signup";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        setTimeout(() => router.push("/app"), 700);
      }}
      className="animate-rise"
    >
      <h1 className="text-heading-lg">{signup ? "Start your studio" : "Welcome back"}</h1>
      <p className="mt-2 text-muted-foreground">
        {signup ? "30 days free. No card needed." : "Good to see you. The invoices missed you less."}
      </p>

      <button
        type="button"
        onClick={() => router.push("/app")}
        className="mt-8 flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-border bg-card text-[15px] transition-colors hover:border-ink/40"
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7Z" />
          <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.8-3.8h-4v3.1A12 12 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
          <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-4">
        {signup && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" required placeholder="Tolu Adeyemi" autoComplete="name" className="h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="studio">Studio</Label>
              <Input id="studio" required placeholder="Imole Studio" autoComplete="organization" className="h-11" />
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="you@studio.com" autoComplete="email" className="h-11" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="password">Password</Label>
            {!signup && (
              <a href="#" className="text-sm text-violet hover:underline">
                Forgot it?
              </a>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              required
              minLength={8}
              placeholder={signup ? "At least 8 characters" : "••••••••"}
              autoComplete={signup ? "new-password" : "current-password"}
              className="h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {signup && (
          <fieldset>
            <legend className="text-sm font-medium">Plan (you can change it any time)</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {PLANS.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "cursor-pointer rounded-lg border p-3 text-center transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/40",
                    plan === p.id ? "border-ink bg-secondary" : "border-border bg-card hover:border-ink/40",
                  )}
                >
                  <input type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} className="sr-only" />
                  <span className="block text-sm font-[460]">{p.name}</span>
                  <span className="block font-mono text-xs text-muted-foreground">${p.annual}/mo</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <Button type="submit" disabled={busy} className="mt-6 h-12 w-full rounded-xl text-base">
        {busy ? <Loader2 className="animate-spin" /> : null}
        {busy ? "Opening your studio…" : signup ? "Create my studio" : "Log in"}
        {!busy && <ArrowRight data-icon="inline-end" />}
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {signup ? "Already have a studio? " : "New to Ochre? "}
        <Link href={signup ? "/login" : "/signup"} className="link">
          {signup ? "Log in" : "Start free"}
        </Link>
      </p>
    </form>
  );
}
