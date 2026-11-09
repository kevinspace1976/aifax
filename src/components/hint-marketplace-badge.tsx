import { ArrowUpRight } from "lucide-react";
import { hintMarketplaceUrl } from "@/lib/site";

/**
 * The link Hint asks every Marketplace partner to carry on its website.
 * Text only: Hint's own logo goes here only once Hint sends its brand kit.
 */
export function HintMarketplaceBadge() {
  return (
    <a
      href={hintMarketplaceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Find AiFax in the Hint Marketplace (opens in a new tab)"
      className="inline-flex items-center gap-3 rounded-2xl border border-slate-300 bg-white py-2.5 pl-2.5 pr-4 text-left transition-colors duration-200 hover:border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/aifax-symbol.svg" alt="" width={40} height={40} className="h-10 w-10 flex-none" />
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Find AiFax in the</span>
        <span className="text-base font-semibold text-slate-900">Hint Marketplace</span>
      </span>
      <ArrowUpRight className="h-4 w-4 flex-none text-slate-500" aria-hidden="true" />
    </a>
  );
}
