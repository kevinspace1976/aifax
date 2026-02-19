import Link from "next/link";
import { sharedCtas } from "@/lib/site";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  description: string;
  kicker?: string;
};

export function PageHero({
  title,
  description,
  kicker = "Enterprise AI Fax Platform"
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Subtle gradient accent */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(103 232 249 / 0.12) 0%, transparent 70%)"
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative py-16 sm:py-20 lg:py-24">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={sharedCtas.primary.href} className="btn-primary">
            {sharedCtas.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={sharedCtas.secondary.href} className="btn-secondary">
            {sharedCtas.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
