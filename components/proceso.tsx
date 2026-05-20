"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { proceso } from "@/lib/content";
import { Reveal } from "./ui/reveal";

/**
 * Light-themed Proceso section.
 * Background is white. Text uses the dark ink (#0A0A0A) with a muted gray
 * (#0A0A0A at 55% opacity) for secondary copy. The gold accent (#C9A96E)
 * stays as the highlight color across both light and dark sections so the
 * brand reads consistently.
 */
export function Proceso() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observe which step is most visible; update sticky column to match.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActive(idx);
            }
          });
        },
        { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -20% 0px" },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const step = proceso.steps[active];

  return (
    <section
      id="proceso"
      className="relative border-t border-black/[0.08] bg-white text-[#0A0A0A]"
    >
      {/* Subtle gridded backdrop for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 85%)",
        }}
      />

      <Reveal>
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-8 px-5 pb-16 pt-24 md:grid-cols-2 md:gap-20 md:px-12">
          <div>
            <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
              <span className="h-px w-6 bg-accent" />
              <span>{t(proceso.tag)}</span>
            </div>
            <h2 className="text-[clamp(36px,4.5vw,64px)] font-extralight leading-[1.05] tracking-[-0.025em] text-[#0A0A0A]">
              {t(proceso.title)}
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#0A0A0A]/55">
            {t(proceso.intro)}
          </p>
        </div>
      </Reveal>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 px-5 md:grid-cols-2 md:px-12">
        {/* Sticky number column */}
        <div className="hidden border-r border-black/[0.08] pr-10 md:block">
          <div className="sticky top-0 flex h-[100vh] flex-col justify-center">
            <div className="relative min-h-[480px]">
              <div className="mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
                <span className="h-px w-7 bg-accent" />
                <span>
                  {t(proceso.steps[active].title)} ·{" "}
                  <span className="text-[#0A0A0A]/45">
                    {t({ es: "Paso", en: "Step" })} {step.num}
                  </span>
                </span>
              </div>

              <div className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.num}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative font-extrabold leading-[0.85] tracking-[-0.05em] text-[#0A0A0A] [font-feature-settings:'tnum']"
                    style={{ fontSize: "clamp(120px, 18vw, 260px)" }}
                  >
                    {step.num}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 translate-x-[10px] translate-y-[10px] font-extrabold text-transparent [font-feature-settings:'tnum']"
                      style={{
                        WebkitTextStroke: "1px rgba(201,169,110,0.4)",
                      }}
                    >
                      {step.num}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.num + "-meta"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mt-7 text-[clamp(24px,2.8vw,36px)] font-light leading-[1.15] tracking-[-0.015em] text-[#0A0A0A]">
                    {t(step.title)}
                  </div>
                  <div className="mt-2 text-[12px] uppercase tracking-[0.2em] text-[#0A0A0A]/55">
                    {t(step.sub)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scrolling content column */}
        <div className="md:pl-[60px]">
          {proceso.steps.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-step={i}
              className="flex min-h-[100vh] flex-col justify-center py-10 md:py-[60px]"
            >
              {/* Mobile-only number — sticky col is hidden on mobile */}
              <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent md:hidden">
                <span className="h-px w-6 bg-accent" />
                <span className="text-[#0A0A0A]">
                  {t({ es: "Paso", en: "Step" })} {s.num} · {t(s.title)}
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-sm border border-black/[0.08] bg-gradient-to-b from-black/[0.02] to-transparent p-9 shadow-[0_1px_0_rgba(10,10,10,0.02),0_30px_60px_-40px_rgba(10,10,10,0.18)] transition-colors duration-500 hover:border-black/[0.16]"
              >
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.3em] text-[#0A0A0A]/55">
                  <span>
                    {t({ es: "Paso", en: "Step" })} {s.num}
                  </span>
                  <span className="rounded-full border border-black/[0.10] px-2.5 py-1 text-[8px] tracking-[0.22em] text-[#0A0A0A]/70">
                    {t(s.eyebrowPill)}
                  </span>
                </div>

                <h3 className="mb-3.5 text-[clamp(20px,2vw,26px)] font-light leading-tight tracking-[-0.015em] text-[#0A0A0A]">
                  {t(s.heading)}
                </h3>
                <p className="mb-6 max-w-[460px] text-[14px] leading-[1.75] text-[#0A0A0A]/60">
                  {t(s.body)}
                </p>

                <ul className="space-y-0">
                  {s.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 border-b border-black/[0.08] py-3 text-[13px] text-[#0A0A0A] last:border-b-0"
                    >
                      <span className="relative inline-block h-3.5 w-3.5 flex-shrink-0 rounded-full border border-accent">
                        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                      </span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
