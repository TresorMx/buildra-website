"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { nav as navCopy } from "@/lib/content";
import { BuildraLogo } from "./ui/buildra-logo";
import { cn } from "@/lib/utils";

export function Nav() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-[background,border-color] duration-500 md:px-12",
        "bg-base/60 backdrop-blur-xl backdrop-saturate-150",
        scrolled ? "border-b border-white/[0.08] bg-base/85" : "border-b border-transparent",
      )}
    >
      <a href="#hero" aria-label="BUILDRA" className="inline-flex items-center">
        <BuildraLogo mode="static" className="h-[30px]" />
      </a>

      <div className="flex items-center gap-4">
        <div className="flex gap-1 rounded-full border border-white/[0.08] p-1 text-[8px] tracking-[0.12em]">
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn(
                "rounded-full px-2.5 py-1.5 text-[8px] font-medium tracking-[0.12em] transition-colors duration-300",
                lang === l
                  ? "bg-ink text-[#0A0A0A]"
                  : "text-muted hover:text-ink",
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <a
          href="#form"
          className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[8px] font-medium uppercase tracking-[0.18em] text-[#0A0A0A] transition-all duration-300 hover:-translate-y-px hover:bg-accent md:inline-flex"
        >
          <span>{t(navCopy.cta)}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-2.5 w-2.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
