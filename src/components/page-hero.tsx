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
        <p className="kicker">Enterprise AI Fax Platform</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">{description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={sharedCtas.primary.href} className="btn-primary">
            {sharedCtas.primary.label}
          </Link>
          <Link href={sharedCtas.secondary.href} className="btn-secondary">
            {sharedCtas.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
