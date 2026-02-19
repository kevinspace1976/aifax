import Link from "next/link";
import { sharedCtas } from "@/lib/site";

type PageHeroProps = {
  title: string;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b border-white/10 bg-slate-900/60">
      <div className="section-shell py-14 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Enterprise AI Fax Platform</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">{description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={sharedCtas.primary.href} className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white">
            {sharedCtas.primary.label}
          </Link>
          <Link
            href={sharedCtas.secondary.href}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-slate-100"
          >
            {sharedCtas.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
