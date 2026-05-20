"use client";

import { trust } from "@/lib/content";

export function TrustStrip() {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] bg-base/60 px-5 py-5 text-[11px] uppercase tracking-[0.18em] text-muted md:gap-8 md:px-12">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
        {trust.cities.map((c) => (
          <div key={c} className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span>{c}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 text-ink">
        <img
          src="/newstatecapitalwhite.svg"
          alt="Newstate Capital"
          className="block h-[22px] w-auto opacity-95 transition-opacity duration-300 hover:opacity-100"
        />
      </div>
    </div>
  );
}
