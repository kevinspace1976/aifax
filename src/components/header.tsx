"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { brand, navItems, sharedCtas } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Ai<span className="text-orange-400">Fax</span>
        </Link>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/20 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active ? "text-orange-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href={sharedCtas.primary.href} className="btn-primary">
            {sharedCtas.primary.label}
          </Link>
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
            <Link href={sharedCtas.primary.href} className="btn-primary mt-2" onClick={() => setOpen(false)}>
              {sharedCtas.primary.label}
            </Link>
          </nav>
        </div>
      ) : null}
      <div className="sr-only">{brand.tagline}</div>
    </header>
  );
}
