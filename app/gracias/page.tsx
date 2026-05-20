import type { Metadata } from "next";
import { ThankYouView } from "@/components/thank-you-view";

export const metadata: Metadata = {
  title: "Gracias — Tu proyecto está en marcha",
  description:
    "Recibimos tu información. Un miembro del equipo BUILDRA te contacta en menos de 48 horas.",
  robots: { index: false, follow: false }, // don't index the thank-you page
};

export default function GraciasPage() {
  return <ThankYouView />;
}
