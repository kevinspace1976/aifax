import Link from "next/link";
import { brand, socialItems, footerNav, complianceBadges, sharedCtas } from "@/lib/site";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer>
      {/* Pre-footer CTA */}
      <section className="relative overflow-hidden" style={{ background: "rgba(18,22,42,0.6)" }}>
        <div className="glow-orb" style={{ width: 400, height: 400, top: -100, left: "50%", marginLeft: -200, background: "rgba(212,165,60,0.06)" }} aria-hidden="true" />
        <div className="section-shell relative py-20 text-center sm:py-24">
          <div className="gold-line mx-auto" />
          <h2 className="heading-display mx-auto mt-6 max-w-2xl text-3xl sm:text-4xl lg:text-[2.75rem]">
            Ready to transform your fax operations?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "var(--warm-gray)" }}>
            Join enterprise teams already processing 500K+ pages monthly with AI-powered summarization, routing, and compliance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={sharedCtas.primary.href} className="btn-primary">Get Started Free <ArrowRight className="h-4 w-4" /></Link>
            <Link href={sharedCtas.secondary.href} className="btn-secondary">See Plans</Link>
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* Main footer */}
      <div style={{ background: "rgba(5,8,16,0.9)" }}>
        <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold" style={{ color: "var(--warm-white)" }}>Ai<span style={{ color: "var(--gold-300)" }}>Fax</span></Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "var(--warm-muted)" }}>{brand.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {complianceBadges.map((b) => <span key={b} className="badge-compliance"><ShieldCheck className="h-3 w-3" />{b}</span>)}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--warm-muted)" }}>Product</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.product.map((i) => <li key={i.href}><Link href={i.href} className="text-sm transition-colors hover:text-[var(--warm-white)]" style={{ color: "var(--warm-gray)" }}>{i.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--warm-muted)" }}>Company</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.company.map((i) => <li key={i.href}><Link href={i.href} className="text-sm transition-colors hover:text-[var(--warm-white)]" style={{ color: "var(--warm-gray)" }}>{i.label}</Link></li>)}
              <li><span className="text-sm" style={{ color: "var(--warm-gray)" }}>Privacy Policy</span></li>
              <li><span className="text-sm" style={{ color: "var(--warm-gray)" }}>Terms &amp; Conditions</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--warm-muted)" }}>Connect</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialItems.map((i) => <Link key={i.label} href={i.href} target="_blank" rel="noreferrer" className="btn-secondary !min-h-[40px] !px-4 !text-xs">{i.label}</Link>)}
            </div>
          </div>
        </div>
        <div className="gold-divider" />
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row" style={{ color: "var(--warm-muted)" }}>
          <p>Copyright &copy; {new Date().getFullYear()} AI FAX. All rights reserved.</p>
          <p>Proud partner of eFax &middot; Enterprise Ready</p>
        </div>
      </div>
    </footer>
  );
}
