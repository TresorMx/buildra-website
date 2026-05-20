"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { footer } from "@/lib/content";

const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+52 998 154 3151";
const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_E164 ?? "+529981543151";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "hello@buildra.mx";

// Set real URLs in your env (NEXT_PUBLIC_*) if you want them dynamic.
// For now these are buildra.mx placeholders that you can swap.
const SOCIALS = [
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/company/buildra",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.4v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/buildra.mx",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[15px] w-[15px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/buildra.mx",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692V11.08h3.128V8.413c0-3.1 1.893-4.787 4.659-4.787 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.626h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-base px-5 pb-16 pt-24 md:px-12 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 border-b border-white/[0.08] pb-16">
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-6 bg-accent" />
            <span>{t(footer.tag)}</span>
          </div>
          <h2 className="max-w-[740px] text-[clamp(36px,4.5vw,64px)] font-extralight leading-[1.05] tracking-[-0.025em]">
            {t(footer.title)}
          </h2>

          <motion.a
            href={`tel:${PHONE_E164}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 block text-[clamp(40px,8vw,120px)] font-bold leading-none tracking-[-0.03em] text-ink transition-colors duration-500 hover:text-accent [font-feature-settings:'tnum']"
          >
            {PHONE_DISPLAY}
          </motion.a>
        </div>

        <div className="mt-10 grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
              {t(footer.contactHeading)}
            </h4>
            <a
              href={`mailto:${EMAIL}`}
              className="block text-[14px] text-ink transition-colors duration-300 hover:text-accent"
            >
              {EMAIL}
            </a>
            <a
              href={`tel:${PHONE_E164}`}
              className="block text-[14px] text-ink transition-colors duration-300 hover:text-accent"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-2 text-[14px] leading-[1.7] text-muted">
              Cancún · Tulum · Playa del Carmen · Mérida
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] text-muted transition-all duration-300 hover:-translate-y-px hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="text-left md:text-right">
            <h4 className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
              {t(footer.groupHeading)}
            </h4>
            <img
              src="/newstatecapitalwhite.svg"
              alt="Newstate Capital"
              className="block h-[30px] w-auto opacity-90 md:ml-auto"
            />
            <p className="mt-3 text-[12px] tracking-[0.1em] text-muted">
              {t(footer.groupCaption)}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-[11px] tracking-[0.06em] text-dim">
          <div>
            © {new Date().getFullYear()} BUILDRA — {t(footer.rights)}
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent">
              {t(footer.privacy)}
            </a>
            <span>·</span>
            <a href="#" className="hover:text-accent">
              {t(footer.terms)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
