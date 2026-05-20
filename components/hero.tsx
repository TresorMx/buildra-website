"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { hero, site } from "@/lib/content";
import { BuildraLogo } from "./ui/buildra-logo";
import { MagneticButton } from "./ui/magnetic-button";
import { NumberCounter } from "./ui/number-counter";
import { WordReveal } from "./ui/reveal";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement | null>(null);

  // Subtle parallax for the background photo.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28"
    >
      {/* Base gradient layer */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 70% 20%, rgba(201,169,110,0.08), transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(255,255,255,0.02), transparent 60%), linear-gradient(180deg, #0A0A0A 0%, #0D0D0B 100%)",
        }}
      />

      {/* Photo layer (B&W, 25% opacity, with subtle parallax) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: photoY, scale: photoScale }}
      >
        <Image
          src="/herosectionLaksmi.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            filter: "grayscale(100%) contrast(1.05)",
            opacity: 0.25,
          }}
        />
        {/* gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.20) 0%, rgba(10,10,10,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-muted"
        >
          <span className="h-px w-7 bg-accent" />
          <span>{t(hero.tag)}</span>
        </motion.div>

        <div className="mt-10 flex flex-col items-start md:mt-14">
          <BuildraLogo
            mode="hero"
            className="w-[clamp(260px,62vw,820px)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.4,
            }}
            className="mt-3.5 pl-2 text-[clamp(11px,1.3vw,14px)] uppercase tracking-[0.45em] text-muted md:pl-3"
          >
            {t(site.tagline)}
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 2,
            }}
            className="max-w-[520px]"
          >
            <h1 className="mb-3.5 whitespace-normal text-[clamp(22px,2.4vw,34px)] font-light leading-[1.15] tracking-[-0.02em] md:whitespace-nowrap">
              <WordReveal
                text={t(hero.headline) as string[]}
                highlight
                highlightClassName="text-accent"
                delay={2.2}
              />
            </h1>
            <p className="mb-6 max-w-[440px] text-[14px] leading-[1.65] text-muted">
              {t(hero.sub)}
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="#form" variant="primary">
                {t(hero.ctaPrimary)}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#proceso" variant="ghost" strength={3}>
                {t(hero.ctaSecondary)}
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 2.3,
            }}
            className="flex flex-row flex-wrap gap-6 text-left md:flex-col md:gap-4 md:text-right"
          >
            {hero.stats.map((s, i) => (
              <div key={i}>
                <div className="text-[clamp(28px,3vw,40px)] font-extralight leading-none text-accent">
                  <NumberCounter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-muted">
                  {t(s.label)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
