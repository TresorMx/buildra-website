import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { Proceso } from "@/components/proceso";
import { CtaBanner } from "@/components/cta-banner";
import { Servicios } from "@/components/servicios";
import { Portafolio } from "@/components/portafolio";
import { LeadForm } from "@/components/form/lead-form";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MobileSticky } from "@/components/mobile-sticky";
import { AdvisorChat } from "@/components/advisor-chat";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Proceso />
        <CtaBanner />
        <Servicios />
        <Portafolio />
        <LeadForm />
        <Footer />
      </main>
      <WhatsAppFloat />
      <MobileSticky />
      <AdvisorChat />
    </>
  );
}
