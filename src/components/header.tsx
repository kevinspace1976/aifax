"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { brand, headerCtas, loginCta, navItems } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-3">
        <Link href="/" className="mr-8 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Ai<span className="text-orange-400">Fax</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={loginCta.href}
            className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-slate-100 transition hover:text-orange-400"
          >
            {loginCta.label}
          </a>
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/20 text-slate-200"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="hidden items-center gap-4 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-11 items-center whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active ? "text-orange-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="tel:+19548721918"
            className="hidden min-h-11 items-center gap-1.5 whitespace-nowrap text-sm font-bold text-slate-100 transition hover:text-orange-400 xl:inline-flex"
            aria-label="Call AiFax at 954-872-1918"
          >
            <Phone className="h-4 w-4 text-orange-400" aria-hidden="true" />
            954-872-1918
          </a>
          {headerCtas.map((cta, index) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`${index === 0 ? "btn-primary" : "btn-accent"} whitespace-nowrap`}
            >
              {cta.label}
            </a>
          ))}
          <a href={loginCta.href} className="btn-secondary whitespace-nowrap">
            {loginCta.label}
          </a>
        </nav>
      </div>

      {open ? (
        <div className="section-shell border-t border-white/10 pb-4 md:hidden">
          <nav className="grid gap-2 pt-4" aria-label="Mobile Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-lg border border-white/10 px-3 text-sm font-medium text-slate-200"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+19548721918"
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-bold text-slate-100"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4 text-orange-400" aria-hidden="true" />
              Call 954-872-1918
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
