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
            ? "shadow-[0_1px_24px_rgba(5,8,16,0.5)]"
            : ""
        }`}
        style={{
          borderBottom: scrolled ? "1px solid rgba(245,240,232,0.06)" : "1px solid transparent",
          background: scrolled ? "rgba(8,11,23,0.92)" : "rgba(8,11,23,0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)"
        }}
      >
        <div className="section-shell flex items-center justify-between py-3.5">
          <Link
            href="/"
            className="group flex items-baseline gap-0.5"
            aria-label={`${brand.name} — home`}
          >
            <span className="text-xl font-bold tracking-tight sm:text-2xl" style={{ color: "var(--warm-white)" }}>Ai</span>
            <span className="text-xl font-bold tracking-tight sm:text-2xl" style={{ color: "var(--gold-300)" }}>Fax</span>
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl md:hidden"
            style={{ border: "1px solid rgba(245,240,232,0.1)", color: "var(--warm-gray)" }}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative inline-flex min-h-[44px] items-center rounded-lg px-3 text-[13px] font-medium transition-colors"
                  style={{ color: active ? "var(--gold-300)" : "var(--warm-gray)" }}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-2 left-3 right-3 h-[2px] rounded-full" style={{ background: "var(--gold-400)" }} />
                  )}
                </Link>
              );
            })}
            <Link href={sharedCtas.primary.href} className="btn-primary ml-3">
              {sharedCtas.primary.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {open && (
        <>
          <div className="mobile-nav-overlay" onClick={close} aria-hidden="true" />
          <aside className="mobile-nav-drawer" role="dialog" aria-label="Mobile navigation">
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(245,240,232,0.06)" }}>
              <Link href="/" className="text-xl font-bold" style={{ color: "var(--warm-white)" }} onClick={close}>
                Ai<span style={{ color: "var(--gold-300)" }}>Fax</span>
              </Link>
              <button onClick={close} aria-label="Close menu" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl" style={{ border: "1px solid rgba(245,240,232,0.1)", color: "var(--warm-gray)" }}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-4 py-4" aria-label="Mobile primary">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={close} className="inline-flex min-h-[44px] items-center rounded-xl px-4 text-sm font-medium" style={{ background: active ? "rgba(212,165,60,0.08)" : "transparent", color: active ? "var(--gold-300)" : "var(--warm-gray)" }}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4" style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}>
              <Link href={sharedCtas.primary.href} className="btn-primary w-full justify-center" onClick={close}>
                {sharedCtas.primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={sharedCtas.secondary.href} className="btn-secondary mt-2 w-full justify-center" onClick={close}>
                {sharedCtas.secondary.label}
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
