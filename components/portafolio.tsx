"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { portafolio } from "@/lib/content";
import { Reveal, RevealItem, RevealStagger } from "./ui/reveal";
import { MagneticButton } from "./ui/magnetic-button";

function ProyectoCard({
  num,
  name,
  image,
  meta,
}: {
  num: string;
  name: string;
  image: string;
  meta: { es: string; en: string };
}) {
  const { t } = useI18n();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <RevealItem className="group relative block overflow-hidden border border-white/[0.08] bg-elevated transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-white/[0.16]">
      <a href="#form" className="block">
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a1a15 0%, #222218 50%, #14140f 100%)",
          }}
        >
          {/* base pattern */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 70%, rgba(201,169,110,0.08), transparent 70%)",
            }}
          />

          {/* photo (or fallback) */}
          {!imgFailed && (
            <motion.img
              src={image}
              alt={name}
              className="absolute inset-0 z-[1] h-full w-full object-cover"
              onError={() => setImgFailed(true)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {imgFailed && (
            <div
              aria-hidden
              className="absolute inset-0 z-0 flex items-center justify-center text-[72px] font-extrabold leading-none tracking-[-0.03em] text-accent/15"
            >
              {num}
            </div>
          )}

          {/* status pill */}
          <div className="absolute left-5 top-5 z-[3] rounded-full bg-ink/95 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.22em] text-base">
            {t(portafolio.status)}
          </div>

          {/* info overlay */}
          <div className="absolute inset-x-0 bottom-0 z-[2] w-full bg-gradient-to-t from-base/95 from-30% to-transparent p-6">
            <div className="mb-2 text-[10px] uppercase tracking-[0.32em] text-accent">
              {t(portafolio.tipoRes)}
            </div>
            <div className="mb-1.5 text-[22px] font-light tracking-[-0.01em]">
              {name}
            </div>
            <div className="text-[12px] tracking-[0.04em] text-muted">
              {t(meta)}
            </div>
          </div>
        </div>
      </a>
    </RevealItem>
  );
}

export function Portafolio() {
  const { t } = useI18n();

  return (
    <section
      id="portafolio"
      className="relative overflow-hidden border-t border-white/[0.08] bg-surface px-5 pb-32 pt-24 md:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
                <span className="h-px w-6 bg-accent" />
                <span>{t(portafolio.tag)}</span>
              </div>
              <h2 className="text-[clamp(36px,4.5vw,64px)] font-extralight leading-[1.05] tracking-[-0.025em]">
                {t(portafolio.title)}
              </h2>
              <p className="mt-4 max-w-[460px] text-[15px] leading-[1.7] text-muted">
                {t(portafolio.intro)}
              </p>
            </div>
            <MagneticButton href="#form" variant="ghost" strength={3}>
              {t(portafolio.ctaAll)}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </MagneticButton>
          </div>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {portafolio.items.map((p) => (
            <ProyectoCard
              key={p.num}
              num={p.num}
              name={p.name}
              image={p.image}
              meta={p.meta}
            />
          ))}
        </RevealStagger>

        {/* Marquee of project names */}
        <div className="mt-20 overflow-hidden border-y border-white/[0.08] py-6">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...portafolio.items, ...portafolio.items, ...portafolio.items].map(
              (p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted"
                >
                  <span className="text-accent">·</span>
                  <span>{p.name}</span>
                  <span className="text-dim">·</span>
                  <span>{t(p.meta)}</span>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
