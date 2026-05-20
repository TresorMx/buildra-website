import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const [k, v] of params.entries()) {
    if (k.startsWith("utm_") || k === "gclid" || k === "fbclid") out[k] = v;
  }
  return out;
}

export function buildWhatsAppUrl(opts: {
  number: string;
  text: string;
}): string {
  const cleaned = opts.number.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(opts.text)}`;
}
