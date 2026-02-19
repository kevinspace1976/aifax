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
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Ai<span className="text-orange-400">Fax</span>
        </Link>

        <button
          aria-label="Toggle Menu"
          className="rounded-lg border border-white/20 p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active ? "text-orange-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={sharedCtas.primary.href}
            className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-400"
          >
            {sharedCtas.primary.label}
          </Link>
        </nav>
      </div>

      {open ? (
        <div className="section-shell border-t border-white/10 pb-4 md:hidden">
          <nav className="grid gap-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-200"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={sharedCtas.primary.href}
              className="mt-2 rounded-lg bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {sharedCtas.primary.label}
            </Link>
          </nav>
        </div>
      ) : null}
      <div className="sr-only">{brand.tagline}</div>
    </header>
  );
}
