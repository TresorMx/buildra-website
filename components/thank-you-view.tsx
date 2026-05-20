"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { BuildraLogo } from "./ui/buildra-logo";
import { MagneticButton } from "./ui/magnetic-button";
import { buildWhatsAppUrl } from "@/lib/utils";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "529981543151";
const BROCHURE_PATH = "/brochure-buildra.pdf";

type StoredLead = {
  name?: string;
  email?: string;
  projectType?: string;
  location?: string;
};

export function ThankYouView() {
  const { lang, setLang, t } = useI18n();
  const [lead, setLead] = useState<StoredLead | null>(null);
  const [mounted, setMounted] = useState(false);

  // Pull the lead's first name from sessionStorage so we can greet them.
  // We don't trust this data (already submitted server-side), it's just for UI.
  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem("buildra-lead-submitted");
      if (raw) setLead(JSON.parse(raw) as StoredLead);
    } catch {
      /* noop */
    }
  }, []);

  const firstName = (lead?.name ?? "").trim().split(" ")[0] ?? "";

  const waText =
    lang === "es"
      ? firstName
        ? `Hola, soy ${firstName}. Acabo de enviar info de un proyecto, me gustaría continuar la conversación por aquí.`
        : `Hola, acabo de enviar info de un proyecto a BUILDRA.`
      : firstName
        ? `Hi, I'm ${firstName}. I just submitted a project to BUILDRA — I'd like to continue here.`
        : `Hi, I just submitted a project to BUILDRA.`;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-base text-ink">
      {/* Blueprint-style background: lines drawing in */}
      <Blueprint />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 90%)",
        }}
      />

      {/* Minimal nav: logo left, lang toggle right */}
      <nav className="relative z-20 flex items-center justify-between px-5 py-5 md:px-12 md:py-6">
        <Link href="/" aria-label="BUILDRA" className="inline-flex items-center">
          <BuildraLogo mode="static" className="h-[30px]" />
        </Link>
        <div className="flex gap-1 rounded-full border border-white/[0.08] p-1">
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={
                "rounded-full px-2.5 py-1.5 text-[8px] font-medium tracking-[0.12em] transition-colors duration-300 " +
                (lang === l
                  ? "bg-ink text-[#0A0A0A]"
                  : "text-muted hover:text-ink")
              }
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-5 pb-32 pt-16 text-center md:px-12 md:pt-24">
        {/* Animated checkmark — stroke draws in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <svg viewBox="0 0 120 120" className="h-[88px] w-[88px] md:h-[120px] md:w-[120px]">
            <motion.circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="1"
              strokeOpacity="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={mounted ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={mounted ? { pathLength: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            />
            <motion.path
              d="M40 62 L54 76 L82 46"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={mounted ? { pathLength: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
            />
          </svg>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent"
        >
          <span className="h-px w-7 bg-accent" />
          <span>{lang === "es" ? "Recibido" : "Received"}</span>
          <span className="h-px w-7 bg-accent" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[820px] text-[clamp(32px,5vw,68px)] font-extralight leading-[1.05] tracking-[-0.025em]"
        >
          {lang === "es" ? (
            firstName ? (
              <>
                Gracias, <span className="text-accent">{firstName}</span>.<br />
                Tu proyecto está en marcha.
              </>
            ) : (
              <>
                Gracias.<br />
                Tu proyecto está en marcha.
              </>
            )
          ) : firstName ? (
            <>
              Thank you, <span className="text-accent">{firstName}</span>.<br />
              Your project is on the way.
            </>
          ) : (
            <>
              Thank you.<br />
              Your project is on the way.
            </>
          )}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[560px] text-[15px] leading-[1.7] text-muted md:text-[16px]"
        >
          {lang === "es"
            ? "Un miembro del equipo te contacta en menos de 48 horas con una propuesta inicial. Mientras tanto, llévate nuestro brochure — todo lo que somos y hacemos en un solo PDF."
            : "A team member will reach out within 48 hours with an initial proposal. In the meantime, take our brochure with you — everything we are and do in a single PDF."}
        </motion.p>

        {/* Primary CTA: download brochure */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href={BROCHURE_PATH} variant="primary" className="!px-7 !py-4">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M8 2v10M3 8l5 5 5-5M2 14h12" />
            </svg>
            {lang === "es" ? "Descargar nuestro brochure" : "Download our brochure"}
          </MagneticButton>
          <a
            href={buildWhatsAppUrl({ number: WHATSAPP, text: waText })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#1FB957]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 22c-1.7 0-3.4-.5-4.9-1.3L3 22l1.4-4c-1-1.6-1.5-3.4-1.5-5.3C2.9 7.4 7 3 12 3s9.1 4.1 9.1 9.1c0 5-4.1 9.1-9.1 9.1m0-20C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.3L2 22l4.9-1.3c1.5.8 3.3 1.3 5.1 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            {lang === "es" ? "WhatsApp" : "WhatsApp"}
          </a>
        </motion.div>

        {/* Timeline of what's next */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 w-full max-w-[920px]"
        >
          <div className="mb-8 text-[11px] uppercase tracking-[0.32em] text-muted">
            {lang === "es" ? "Qué sigue" : "What's next"}
          </div>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {[
              {
                num: "01",
                title: { es: "Revisamos tu info", en: "We review your info" },
                body: {
                  es: "Equipo de Buildra analiza tu proyecto y prepara una propuesta inicial.",
                  en: "The Buildra team reviews your project and drafts an initial proposal.",
                },
                meta: { es: "Hoy", en: "Today" },
                active: true,
              },
              {
                num: "02",
                title: { es: "Te contactamos", en: "We get in touch" },
                body: {
                  es: "Llamada o WhatsApp para confirmar detalles, en menos de 48 horas.",
                  en: "Call or WhatsApp to confirm details, within 48 hours.",
                },
                meta: { es: "< 48 horas", en: "< 48 hours" },
                active: false,
              },
              {
                num: "03",
                title: { es: "Propuesta y siguiente paso", en: "Proposal & next step" },
                body: {
                  es: "Te enviamos la propuesta inicial con estimado de inversión y plazos.",
                  en: "We send the initial proposal with investment estimate and timeline.",
                },
                meta: { es: "Esta semana", en: "This week" },
                active: false,
              },
            ].map((s) => (
              <li
                key={s.num}
                className="relative flex flex-col gap-3 bg-base p-7 text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-accent">
                    {s.num}
                  </span>
                  <span
                    className={
                      "rounded-full px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.22em] " +
                      (s.active
                        ? "bg-accent text-base"
                        : "border border-white/[0.10] text-muted")
                    }
                  >
                    {t(s.meta)}
                  </span>
                </div>
                <div className="text-[18px] font-light leading-[1.2] tracking-[-0.01em]">
                  {t(s.title)}
                </div>
                <div className="text-[13px] leading-[1.6] text-muted">
                  {t(s.body)}
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Back home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-ink"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
              <path d="M13 8H3M7 12L3 8l4-4" />
            </svg>
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

/* Blueprint background — architectural lines that draw themselves in. */
function Blueprint() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="bp-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9A96E" stopOpacity="0.7" />
          <stop offset="1" stopColor="#C9A96E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Floor plan-ish shapes */}
      {[
        "M 80 700 L 80 360 L 380 360 L 380 220 L 700 220 L 700 360 L 980 360 L 980 700 Z",
        "M 1080 800 L 1080 480 L 1320 480 L 1320 680 L 1240 680 L 1240 800 Z",
        "M 140 760 L 920 760",
        "M 300 360 L 300 700",
        "M 540 360 L 540 700",
        "M 800 360 L 800 700",
        "M 700 220 L 700 80",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#bp-fade)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 + i * 0.18,
          }}
        />
      ))}
    </svg>
  );
}
