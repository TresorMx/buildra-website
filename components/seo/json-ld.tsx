/**
 * Structured data for SEO.
 *
 * We declare three @types nested in a single @graph:
 *
 *  - Organization (the parent brand: BUILDRA / Newstate Capital)
 *  - LocalBusiness (the operating entity in Cancún) — what Google uses for
 *    "Constructora Cancún" / "Arquitectos Cancún" local search ranking.
 *  - WebSite (with SearchAction so Google shows a sitelinks search box).
 *
 * Plus a list of Services so each offering is independently indexable.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildra.mx";
const PHONE = process.env.NEXT_PUBLIC_PHONE_E164 ?? "+529981543151";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "hello@buildra.mx";

const SOCIAL_URLS = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/company/buildra",
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/buildra.mx",
  process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/buildra.mx",
];

const SERVICES = [
  {
    name: "Arquitectura",
    description:
      "Desarrollo de proyectos arquitectónicos funcionales y contemporáneos en Cancún y Riviera Maya.",
  },
  {
    name: "Construcción residencial y comercial",
    description:
      "Construcción residencial y comercial en Cancún, Tulum, Playa del Carmen y Mérida, con calidad y control en cada etapa.",
  },
  {
    name: "Dirección de obra",
    description:
      "Supervisión integral de procesos, tiempos, calidad y coordinación de todos los oficios en obra.",
  },
  {
    name: "Llave en mano",
    description:
      "Soluciones integrales desde el diseño hasta la entrega final del proyecto. Sin intermediarios, sin sorpresas.",
  },
  {
    name: "Mantenimiento de inmuebles",
    description:
      "Mantenimiento preventivo y correctivo de inmuebles residenciales y comerciales.",
  },
  {
    name: "Remodelación",
    description:
      "Transformación de espacios existentes con los mismos estándares de calidad y precisión que una obra nueva.",
  },
];

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "BUILDRA",
        url: SITE_URL,
        logo: `${SITE_URL}/logoblurbuildra.svg`,
        email: EMAIL,
        telephone: PHONE,
        sameAs: SOCIAL_URLS,
        parentOrganization: {
          "@type": "Organization",
          name: "Newstate Capital",
        },
      },
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": `${SITE_URL}/#business`,
        name: "BUILDRA — Constructora y Arquitectos en Cancún",
        alternateName: ["Buildra", "Constructora Buildra"],
        description:
          "Constructora y arquitectos en Cancún con 30 años de experiencia. Diseño, construcción y dirección de obra residencial y comercial en Cancún, Tulum, Playa del Carmen y Mérida.",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.jpg`,
        logo: `${SITE_URL}/logoblurbuildra.svg`,
        telephone: PHONE,
        email: EMAIL,
        priceRange: "$$$",
        slogan: "Built to Last",
        foundingDate: "1994",
        sameAs: SOCIAL_URLS,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cancún",
          addressRegion: "Quintana Roo",
          addressCountry: "MX",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 21.1619,
          longitude: -86.8515,
        },
        areaServed: [
          { "@type": "City", name: "Cancún" },
          { "@type": "City", name: "Tulum" },
          { "@type": "City", name: "Playa del Carmen" },
          { "@type": "City", name: "Mérida" },
          { "@type": "AdministrativeArea", name: "Riviera Maya" },
          { "@type": "AdministrativeArea", name: "Quintana Roo" },
          { "@type": "AdministrativeArea", name: "Yucatán" },
        ],
        knowsAbout: [
          "Constructora Cancún",
          "Arquitectos Cancún",
          "Construcción residencial",
          "Construcción comercial",
          "Dirección de obra",
          "Llave en mano",
          "Remodelación",
          "Diseño arquitectónico",
        ],
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            areaServed: "Cancún, Tulum, Playa del Carmen, Mérida",
            provider: { "@id": `${SITE_URL}/#business` },
          },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios BUILDRA",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
            },
          })),
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE,
            contactType: "customer service",
            areaServed: "MX",
            availableLanguage: ["Spanish", "English"],
            email: EMAIL,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "BUILDRA",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["es-MX", "en-US"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
