import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { LenisProvider } from "@/components/lenis-provider";
import { JsonLd } from "@/components/seo/json-ld";

// The `geist` package self-hosts the variable fonts and exposes them as
// `--font-geist-sans` / `--font-geist-mono`. We re-map to our shorter token
// names so the rest of the app references `--font-geist` and `--font-geist-mono`.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildra.mx";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "BUILDRA — Constructora y Arquitectos en Cancún · Diseño y Construcción",
    template: "%s · BUILDRA",
  },
  description:
    "Constructora y arquitectos en Cancún con 30 años de experiencia. Diseño, construcción y dirección de obra residencial y comercial en Cancún, Tulum, Playa del Carmen y Mérida. Llave en mano, sin sorpresas.",
  applicationName: "BUILDRA",
  keywords: [
    "constructora cancun",
    "constructora Cancún",
    "arquitectos cancun",
    "arquitectos Cancún",
    "construcción Cancún",
    "construccion riviera maya",
    "construcción Tulum",
    "construcción Playa del Carmen",
    "constructora residencial Cancún",
    "constructora comercial Cancún",
    "llave en mano Cancún",
    "remodelación Cancún",
    "dirección de obra Cancún",
    "BUILDRA",
    "Newstate Capital",
  ],
  authors: [{ name: "BUILDRA" }],
  creator: "BUILDRA",
  publisher: "BUILDRA",
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/", "en-US": "/?lang=en" },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title:
      "BUILDRA — Constructora y Arquitectos en Cancún · Diseño y Construcción",
    description:
      "Constructora y arquitectos en Cancún con 30 años de experiencia. Diseño, construcción y dirección de obra residencial y comercial en Cancún, Tulum, Playa del Carmen y Mérida.",
    url: SITE_URL,
    siteName: "BUILDRA",
    // Next will automatically pick up app/opengraph-image.jpg if present.
  },
  twitter: {
    card: "summary_large_image",
    title:
      "BUILDRA — Constructora y Arquitectos en Cancún · Diseño y Construcción",
    description:
      "Constructora y arquitectos en Cancún con 30 años de experiencia. Diseño, construcción y dirección de obra residencial y comercial en Cancún, Tulum, Playa del Carmen y Mérida.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "construction",
  // Telephone numbers in iOS Safari auto-link; we want the styled markup, not
  // a system link.
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={
        {
          "--font-geist": "var(--font-geist-sans)",
        } as React.CSSProperties
      }
    >
      <body>
        <JsonLd />
        <I18nProvider>
          <LenisProvider>{children}</LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
