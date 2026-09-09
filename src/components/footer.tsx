import Link from "next/link";
import { navItems, phone, socialItems, supportEmail } from "@/lib/site";

const linkClass = "text-sm text-slate-700 transition hover:text-orange-500";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section-shell flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-xl font-extrabold tracking-tight text-slate-900">
            Ai<span className="text-orange-500">Fax</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">HIPAA-compliant AI fax for healthcare. Healthcare Utilization Consultants LLC.</p>
          <p className="mt-1 text-xs text-slate-500">Copyright 2026 AiFax. All rights reserved.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms &amp; Conditions
            </Link>
            {socialItems.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className={linkClass}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${supportEmail}`} className={linkClass}>
              {supportEmail}
            </a>
            <a href={phone.href} className={linkClass}>
              {phone.display}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
