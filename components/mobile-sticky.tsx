"use client";

import { useI18n } from "@/lib/i18n";
import { mobileCta } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/utils";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "529981543151";
const PHONE_E164 = process.env.NEXT_PUBLIC_PHONE_E164 ?? "+529981543151";

export function MobileSticky() {
  const { lang, t } = useI18n();
  const waText =
    lang === "es"
      ? "Hola, me interesa hablar con BUILDRA sobre un proyecto."
      : "Hi, I'd like to talk to BUILDRA about a project.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/[0.08] bg-base/90 p-3 backdrop-blur-xl md:hidden">
      <a
        href={`tel:${PHONE_E164}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 text-[12px] font-medium text-base"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M3 4c0 5 4 9 9 9l1-3-3-1-1 1c-1 0-3-2-3-3l1-1-1-3-3 1z" />
        </svg>
        {t(mobileCta.call)}
      </a>
      <a
        href={buildWhatsAppUrl({ number: WHATSAPP, text: waText })}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[12px] font-medium text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3" />
        </svg>
        WhatsApp
      </a>
      <a
        href="#form"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-[12px] font-medium text-base"
      >
        {t(mobileCta.start)}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
    </div>
  );
}
