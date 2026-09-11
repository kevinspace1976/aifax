"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { brand, headerCtas, loginCta, navItems, phone } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section-shell flex items-center justify-between py-3">
        <Link href="/" className="mr-8 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          Ai<span className="text-orange-500">Fax</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <a href={loginCta.href} className="btn-light min-h-10 px-4 text-sm">
            {loginCta.label}
          </a>
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-800"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-11 items-center whitespace-nowrap text-xs font-bold uppercase tracking-[0.1em] transition lg:text-sm lg:tracking-[0.08em] ${
                  active ? "text-orange-500" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={phone.href}
            className="hidden min-h-11 items-center gap-1.5 whitespace-nowrap text-sm font-bold text-slate-900 transition hover:text-orange-500 xl:inline-flex"
            aria-label={`Call AiFax at ${phone.display}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phone.display}
          </a>
          {headerCtas.map((cta, index) => (
            <a key={cta.href} href={cta.href} className={`${index === 0 ? "btn-primary" : "btn-accent"} whitespace-nowrap`}>
              {cta.label}
            </a>
          ))}
          <a href={loginCta.href} className="btn-light whitespace-nowrap">
            {loginCta.label}
          </a>
        </nav>
      </div>

      {open ? (
        <div className="section-shell border-t border-slate-200 pb-4 md:hidden">
          <nav className="grid gap-2 pt-4" aria-label="Mobile Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={phone.href}
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-900"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4 text-orange-500" aria-hidden="true" />
              Call {phone.display}
            </a>
            {headerCtas.map((cta, index) => (
              <a
                key={cta.href}
                href={cta.href}
                className={`${index === 0 ? "btn-primary" : "btn-accent"} mt-2`}
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
      <div className="sr-only">{brand.tagline}</div>
    </header>
  );
}
