import Link from "next/link";
import { socialItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="section-shell grid gap-8 py-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm text-slate-300">Privacy | Terms & Conditions</p>
          <p className="mt-2 text-xs text-slate-400">Copyright © 2026 AI FAX | All Rights Reserved.</p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {socialItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-slate-200 hover:border-orange-400 hover:text-orange-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
