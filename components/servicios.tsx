"use client";

import { useI18n } from "@/lib/i18n";
import { servicios } from "@/lib/content";
import { Reveal, RevealItem, RevealStagger } from "./ui/reveal";

const ICONS: Record<string, JSX.Element> = {
  "01": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 9h6M9 13h6M9 17h6" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3M9 3v3h6V3M9 11h6M9 15h6" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M12 10v4M10 14h4M12 18v3M9 21h6" />
    </svg>
  ),
  "05": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "06": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
    </svg>
  ),
};

export function Servicios() {
  const { t } = useI18n();

  return (
    <section
      id="servicios"
      className="relative border-t border-white/[0.08] bg-base px-5 pb-32 pt-24 md:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-16 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-20">
            <div>
              <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
                <span className="h-px w-6 bg-accent" />
                <span>{t(servicios.tag)}</span>
              </div>
              <h2 className="text-[clamp(36px,4.5vw,64px)] font-extralight leading-[1.05] tracking-[-0.025em]">
                {t(servicios.title)}
              </h2>
            </div>
            <p className="max-w-[440px] text-[15px] leading-[1.7] text-muted">
              {t(servicios.intro)}
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-px border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
          {servicios.items.map((s) => (
            <RevealItem
              key={s.num}
              className="group relative flex min-h-[280px] flex-col overflow-hidden bg-base p-9 transition-colors duration-500 hover:bg-surface"
            >
              {/* top accent bar on hover */}
              <span
                aria-hidden
                className="absolute left-0 right-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />

              {s.badge && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.22em] text-base">
                  {t(s.badge)}
                </span>
              )}

              <div className="mb-7 text-[11px] tracking-[0.32em] text-accent [font-feature-settings:'tnum']">
                {s.num}
              </div>

              <div className="mb-6 flex h-10 w-10 items-center justify-center border border-white/[0.16] text-accent transition-colors duration-500 group-hover:border-accent group-hover:text-accent-soft">
                <span className="h-[18px] w-[18px]">{ICONS[s.num]}</span>
              </div>

              <h3 className="mb-3 text-[22px] font-light leading-tight tracking-[-0.01em]">
                {t(s.title)}
              </h3>
              <p className="mb-6 flex-1 text-[13px] leading-[1.7] text-muted">
                {t(s.text)}
              </p>
              <div className="border-t border-white/[0.08] pt-4 text-[10px] uppercase tracking-[0.22em] text-muted">
                {t(s.tag)}
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
