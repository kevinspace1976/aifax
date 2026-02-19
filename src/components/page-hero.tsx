import Link from "next/link";
import { sharedCtas } from "@/lib/site";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  description: string;
  kicker?: string;
};

export function PageHero({ title, description, kicker = "Enterprise AI Fax Platform" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-orb" style={{ width: 600, height: 400, top: -120, left: "50%", marginLeft: -300, background: "rgba(212,165,60,0.05)" }} aria-hidden="true" />
      <div className="section-shell relative py-20 sm:py-24 lg:py-28">
        <p className="kicker">{kicker}</p>
        <h1 className="heading-display mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem]">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--warm-gray)" }}>{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={sharedCtas.primary.href} className="btn-primary">{sharedCtas.primary.label} <ArrowRight className="h-4 w-4" /></Link>
          <Link href={sharedCtas.secondary.href} className="btn-secondary">{sharedCtas.secondary.label}</Link>
        </div>
      </div>
      <div className="gold-divider" />
    </section>
  );
}
