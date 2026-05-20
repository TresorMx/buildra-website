"use client";

import { useI18n } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/utils";

const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "529981543151";

export function WhatsAppFloat() {
  const { lang } = useI18n();
  const text =
    lang === "es"
      ? "Hola, me interesa hablar con BUILDRA sobre un proyecto."
      : "Hi, I'd like to talk to BUILDRA about a project.";

  return (
    <a
      href={buildWhatsAppUrl({ number: WHATSAPP, text })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-[1.08] md:bottom-6 max-md:bottom-20 animate-float"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[26px] w-[26px]">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 22c-1.7 0-3.4-.5-4.9-1.3L3 22l1.4-4c-1-1.6-1.5-3.4-1.5-5.3C2.9 7.4 7 3 12 3s9.1 4.1 9.1 9.1c0 5-4.1 9.1-9.1 9.1m0-20C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.3L2 22l4.9-1.3c1.5.8 3.3 1.3 5.1 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    </a>
  );
}
