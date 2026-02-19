import Link from "next/link";
import { brand, socialItems, footerNav, complianceBadges, sharedCtas } from "@/lib/site";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      {/* Pre-footer CTA band */}
      <div className="bg-gradient-to-b from-slate-900/80 to-slate-950/90">
        <div className="section-shell py-14 text-center sm:py-16">
          <p className="section-label">Ready to modernize?</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            Start automating your fax workflows with AI today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Join enterprise teams that have already eliminated manual fax processing and unlocked faster, more accurate operations.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={sharedCtas.primary.href} className="btn-primary">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={sharedCtas.secondary.href} className="btn-secondary">
              See Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-white/[0.06] bg-slate-950/95">
        <div className="section-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Ai<span className="text-orange-400">Fax</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              {brand.description}
            </p>
            {/* Compliance badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {complianceBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300"
                >
                  <ShieldCheck className="h-3 w-3" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-sm text-slate-300">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-slate-300">Terms &amp; Conditions</span>
              </li>
            </ul>
          </div>

          {/* Social / Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Connect
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-4 text-xs font-medium text-slate-300 transition-colors hover:border-orange-400/40 hover:text-orange-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
            <p>Copyright &copy; {new Date().getFullYear()} AI FAX. All rights reserved.</p>
            <p>Proud partner of eFax&ensp;&middot;&ensp;Enterprise Ready</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
