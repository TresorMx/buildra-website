"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { proceso } from "@/lib/content";
import { MagneticButton } from "./ui/magnetic-button";

/**
 * Full-bleed banner under the Proceso section.
 * - Fixed height of 420px (responsive-tightened on mobile)
 * - Architectural background photo, B&W with overlay so the CTA stays legible
 * - Subtle parallax on scroll for depth
 *
 * Drop the background at `public/ctabanner.jpg`. If the file isn't there
 * the dark gradient fallback shows on its own.
 */
export function CtaBanner() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative h-[420px] w-full overflow-hidden border-y border-white/[0.08] bg-base max-md:h-[360px]"
    >
      {/* Base dark gradient (fallback when image missing) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,0.10), transparent 70%), linear-gradient(180deg, #0A0A0A 0%, #141410 100%)",
        }}
      />

      {/* Background photo + parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          y: photoY,
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 100%), url('/ctabanner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) contrast(1.05)",
          opacity: 0.45,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 90%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[2] mx-auto flex h-full max-w-[1400px] flex-col items-start justify-center gap-6 px-5 md:px-12"
      >
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
          <span className="h-px w-7 bg-accent" />
          <span>{t({ es: "Listos cuando tú lo estés", en: "Ready when you are" })}</span>
        </div>
        <h3 className="max-w-[720px] text-[clamp(28px,3.6vw,52px)] font-extralight leading-[1.1] tracking-[-0.02em] text-ink">
          {t({
            es: "Tu próximo proyecto empieza con una conversación.",
            en: "Your next project starts with a conversation.",
          })}
        </h3>
        <div className="flex flex-wrap items-center gap-5">
          <MagneticButton href="#form" variant="primary">
            {t(proceso.ctaFooter)}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3.5 w-3.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </MagneticButton>
          <span className="text-[12px] tracking-[0.06em] text-muted">
            {t(proceso.ctaNote)}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
