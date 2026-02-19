"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { brand, navItems, sharedCtas } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-slate-950/90 shadow-lg shadow-slate-950/30 backdrop-blur-xl"
            : "bg-slate-950/60 backdrop-blur-md"
        }`}
      >
        <div className="section-shell flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
            aria-label={`${brand.name} — home`}
          >
            Ai
            <span className="text-orange-400 transition-colors group-hover:text-orange-300">
              Fax
            </span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 text-slate-200 transition-colors hover:border-white/30 hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex min-h-[44px] items-center rounded-lg px-3 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? "text-orange-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-1.5 left-3 right-3 h-px bg-orange-400/60" />
                  )}
                </Link>
              );
            })}
            <Link href={sharedCtas.primary.href} className="btn-primary ml-2">
              {sharedCtas.primary.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <>
          <div
            className="mobile-nav-overlay"
            onClick={close}
            aria-hidden="true"
          />
          <aside className="mobile-nav-drawer" role="dialog" aria-label="Mobile navigation">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Link href="/" className="text-xl font-bold text-white" onClick={close}>
                Ai<span className="text-orange-400">Fax</span>
              </Link>
              <button
                onClick={close}
                aria-label="Close menu"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 text-slate-300 transition hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-4 py-4" aria-label="Mobile primary">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`inline-flex min-h-[44px] items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                      active
                        ? "bg-orange-500/10 text-orange-300"
                        : "text-slate-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-4">
              <Link
                href={sharedCtas.primary.href}
                className="btn-primary w-full justify-center"
                onClick={close}
              >
                {sharedCtas.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={sharedCtas.secondary.href}
                className="btn-secondary mt-2 w-full justify-center"
                onClick={close}
              >
                {sharedCtas.secondary.label}
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
