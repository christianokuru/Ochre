import { Logo } from "@/components/brand/logo";
import { Sky } from "@/components/brand/sky";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col px-6 py-6 sm:px-12">
        <Logo />
        <div className="flex flex-1 items-center py-12">
          <div className="mx-auto w-full max-w-sm">{children}</div>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Ochre Labs · This is a demo: nothing you type is sent anywhere.</p>
      </div>
      <Sky hour={18.4} className="hidden lg:block">
        <div className="flex min-h-svh flex-col justify-end p-12">
          <figure className="max-w-md rounded-xl border border-white/20 bg-white/80 p-6 backdrop-blur-md">
            <blockquote className="text-xl leading-snug tracking-[-0.01em]">
              “The first Friday I didn&apos;t spend invoicing, I went to the beach. It&apos;s been a lot of Fridays now.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">Inês Carvalho · Paper Moon Type, Lisbon</figcaption>
          </figure>
        </div>
      </Sky>
    </div>
  );
}
