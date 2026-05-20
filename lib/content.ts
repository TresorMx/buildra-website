/**
 * All bilingual copy lives here. Each piece is { es, en }.
 * Components import this and resolve via the i18n `t()` helper.
 */

export type Bi = { es: string; en: string };

export const site = {
  brand: "BUILDRA",
  tagline: { es: "Design & Build", en: "Design & Build" } as Bi,
  region: {
    es: "Cancún & Riviera Maya",
    en: "Cancún & Riviera Maya",
  } as Bi,
};

export const nav = {
  cta: { es: "Iniciar proyecto", en: "Start project" } as Bi,
};

export const hero = {
  tag: {
    es: "Built to Last · Cancún & Riviera Maya",
    en: "Built to Last · Cancún & Riviera Maya",
  } as Bi,
  headline: {
    es: ["Construimos lo que", "otros imaginan", "."],
    en: ["We build what", "others imagine", "."],
  },
  sub: {
    es: "3 décadas diseñando y construyendo proyectos residenciales y comerciales en Cancún y Riviera Maya, con procesos claros y atención real al detalle.",
    en: "Three decades designing and building residential and commercial projects in Cancún and Riviera Maya, with clear processes and obsessive attention to detail.",
  } as Bi,
  ctaPrimary: { es: "Iniciar mi proyecto", en: "Start my project" } as Bi,
  ctaSecondary: { es: "Cómo trabajamos", en: "How we work" } as Bi,
  stats: [
    {
      value: 30,
      prefix: "+",
      label: {
        es: "Años de experiencia",
        en: "Years of experience",
      } as Bi,
    },
    {
      value: 100,
      suffix: "%",
      label: {
        es: "Proyectos entregados",
        en: "Projects delivered",
      } as Bi,
    },
    {
      value: 48,
      suffix: "h",
      label: { es: "Primera propuesta", en: "First proposal" } as Bi,
    },
  ],
};

export const trust = {
  cities: ["Cancún", "Tulum", "Playa del Carmen", "Mérida"],
};

export const proceso = {
  tag: { es: "Cómo trabajamos", en: "How we work" } as Bi,
  title: {
    es: "Tu proyecto, en tres pasos claros.",
    en: "Your project, in three clear steps.",
  } as Bi,
  intro: {
    es: "Sin burocracia, sin sorpresas. Convertimos tu idea en realidad con un proceso transparente, ágil y medible en cada etapa.",
    en: "No red tape, no surprises. We turn your idea into reality with a transparent, fast, and measurable process at every stage.",
  } as Bi,
  ctaFooter: {
    es: "Iniciar mi proyecto",
    en: "Start my project",
  } as Bi,
  ctaNote: {
    es: "Respuesta en menos de 48 horas — sin costo.",
    en: "Reply in under 48 hours — no cost.",
  } as Bi,
  steps: [
    {
      num: "01",
      title: { es: "Tu idea", en: "Your idea" } as Bi,
      sub: { es: "Cuéntanoslo todo", en: "Tell us everything" } as Bi,
      eyebrowPill: { es: "Sin compromiso", en: "No commitment" } as Bi,
      heading: {
        es: "Analizamos visión, terreno, presupuesto y plazos.",
        en: "We analyze your vision, site, budget and timeline.",
      } as Bi,
      body: {
        es: "Una conversación honesta para entender qué quieres lograr. En 48 horas tienes una propuesta inicial con estimado de inversión.",
        en: "An honest conversation to understand what you want to achieve. Within 48 hours you get an initial proposal with investment estimate.",
      } as Bi,
      items: [
        {
          es: "Consulta gratuita y sin compromiso",
          en: "Free, no-strings consultation",
        },
        {
          es: "Análisis de viabilidad técnica",
          en: "Technical feasibility analysis",
        },
        {
          es: "Estimado preliminar de inversión",
          en: "Preliminary investment estimate",
        },
        { es: "Propuesta inicial en 48 horas", en: "Initial proposal in 48 hours" },
      ],
    },
    {
      num: "02",
      title: { es: "La trabajamos", en: "We design it" } as Bi,
      sub: { es: "Diseño y planificación", en: "Design & planning" } as Bi,
      eyebrowPill: {
        es: "Apruebas cada fase",
        en: "You approve each phase",
      } as Bi,
      heading: {
        es: "Arquitectura, ingeniería, permisos y cronograma.",
        en: "Architecture, engineering, permits and schedule.",
      } as Bi,
      body: {
        es: "Desarrollamos el proyecto completo. Tú revisas, comentas y apruebas antes de iniciar obra. Nada queda al azar, nada avanza sin tu visto bueno.",
        en: "We develop the complete project. You review, comment, and approve before construction starts. Nothing is left to chance.",
      } as Bi,
      items: [
        {
          es: "Anteproyecto y proyecto ejecutivo",
          en: "Preliminary & executive project",
        },
        { es: "Ingenierías complementarias", en: "Complementary engineering" },
        { es: "Gestión completa de permisos", en: "Full permit management" },
        {
          es: "Presupuesto detallado por partidas",
          en: "Detailed itemized budget",
        },
        {
          es: "Inicio de obra con cronograma claro",
          en: "Construction kickoff with clear timeline",
        },
      ],
    },
    {
      num: "03",
      title: { es: "La entregamos", en: "We deliver it" } as Bi,
      sub: {
        es: "Entrega y seguimiento",
        en: "Handover & follow-up",
      } as Bi,
      eyebrowPill: { es: "Con garantía", en: "With warranty" } as Bi,
      heading: {
        es: "Entrega con garantía y plan de mantenimiento.",
        en: "Handover with warranty and maintenance plan.",
      } as Bi,
      body: {
        es: "Tu proyecto terminado, con documentación completa, garantía estructural y de acabados, y opción de plan de mantenimiento anual para mantenerlo impecable.",
        en: "Your finished project, with complete documentation, structural and finish warranty, plus an optional annual maintenance plan.",
      } as Bi,
      items: [
        {
          es: "Entrega con garantía por contrato",
          en: "Contractual warranty on delivery",
        },
        {
          es: "Documentación técnica completa",
          en: "Complete technical documentation",
        },
        { es: "Plan de mantenimiento opcional", en: "Optional maintenance plan" },
        {
          es: "Soporte post-obra dedicado",
          en: "Dedicated post-construction support",
        },
      ],
    },
  ],
};

export const servicios = {
  tag: { es: "Lo que hacemos", en: "What we do" } as Bi,
  title: { es: "Servicios.", en: "Services." } as Bi,
  intro: {
    es: "De la idea al espacio terminado. Cubrimos cada etapa con un solo equipo responsable: sin intermediarios, sin sorpresas.",
    en: "From idea to finished space. We cover every stage with a single responsible team: no middlemen, no surprises.",
  } as Bi,
  items: [
    {
      num: "01",
      title: { es: "Arquitectura", en: "Architecture" } as Bi,
      text: {
        es: "Desarrollo de proyectos funcionales, contemporáneos y orientados a la correcta ejecución constructiva.",
        en: "Functional, contemporary projects designed for flawless on-site execution.",
      } as Bi,
      tag: {
        es: "Diseño · Planos · Renders",
        en: "Design · Plans · Renders",
      } as Bi,
    },
    {
      num: "02",
      title: { es: "Construcción", en: "Construction" } as Bi,
      text: {
        es: "Ejecución residencial y comercial con enfoque en calidad, control y detalle constructivo en cada etapa.",
        en: "Residential and commercial execution with focus on quality, control, and detail at every stage.",
      } as Bi,
      tag: {
        es: "Residencial · Comercial",
        en: "Residential · Commercial",
      } as Bi,
    },
    {
      num: "03",
      title: {
        es: "Dirección de obra",
        en: "Project management",
      } as Bi,
      text: {
        es: "Supervisión integral de procesos, tiempos, calidad y coordinación de todos los oficios en obra.",
        en: "Integral supervision of processes, timing, quality, and coordination of every trade on site.",
      } as Bi,
      tag: {
        es: "Supervisión · Coordinación",
        en: "Supervision · Coordination",
      } as Bi,
    },
    {
      num: "04",
      title: { es: "Llave en mano", en: "Turnkey" } as Bi,
      text: {
        es: "Soluciones integrales desde el diseño hasta la entrega final del proyecto. Sin intermediarios, sin sorpresas.",
        en: "End-to-end solutions from design to delivery. No middlemen, no surprises.",
      } as Bi,
      tag: { es: "Todo incluido", en: "All-inclusive" } as Bi,
    },
    {
      num: "05",
      title: { es: "Mantenimiento", en: "Maintenance" } as Bi,
      badge: { es: "Nuevo", en: "New" } as Bi,
      text: {
        es: "Mantenimiento preventivo y correctivo de inmuebles residenciales y comerciales. Tu propiedad, siempre en óptimas condiciones.",
        en: "Preventive and corrective maintenance for residential and commercial properties. Always pristine.",
      } as Bi,
      tag: {
        es: "Preventivo · Correctivo",
        en: "Preventive · Corrective",
      } as Bi,
    },
    {
      num: "06",
      title: { es: "Remodelación", en: "Renovation" } as Bi,
      text: {
        es: "Transformamos espacios existentes con los mismos estándares de calidad y precisión que una obra nueva.",
        en: "We transform existing spaces with the same quality and precision as new construction.",
      } as Bi,
      tag: {
        es: "Renovación · Ampliación",
        en: "Renovation · Expansion",
      } as Bi,
    },
  ],
};

export const portafolio = {
  tag: { es: "Portafolio", en: "Portfolio" } as Bi,
  title: {
    es: "Últimos proyectos.",
    en: "Latest projects.",
  } as Bi,
  intro: {
    es: "Cada proyecto comienza con confianza. Construimos relaciones tanto como espacios.",
    en: "Every project starts with trust. We build relationships as much as spaces.",
  } as Bi,
  ctaAll: { es: "Ver todos", en: "View all" } as Bi,
  status: { es: "Entregado 100%", en: "Delivered 100%" } as Bi,
  tipoRes: { es: "Residencial", en: "Residential" } as Bi,
  items: [
    {
      num: "01",
      name: "Tzalam 13",
      image: "/tzalam.jpg",
      meta: {
        es: "Residencial Arbolada · Cancún",
        en: "Residencial Arbolada · Cancún",
      } as Bi,
    },
    {
      num: "02",
      name: "Laksmil 12",
      image: "/laksmi.jpg",
      meta: { es: "Aldea Ha · Tulum", en: "Aldea Ha · Tulum" } as Bi,
    },
    {
      num: "03",
      name: "Lluvia de Oro 11",
      image: "/lluviadeoro11.jpg",
      meta: {
        es: "Residencial Arbolada · Cancún",
        en: "Residencial Arbolada · Cancún",
      } as Bi,
    },
  ],
};

export const form = {
  tag: { es: "Comencemos", en: "Let's start" } as Bi,
  title: {
    es: "Cuéntanos sobre tu proyecto.",
    en: "Tell us about your project.",
  } as Bi,
  intro: {
    es: "Te contactamos en menos de 48 horas con una propuesta inicial. Sin compromiso, sin costo.",
    en: "We'll get back to you within 48 hours with an initial proposal. No commitment, no cost.",
  } as Bi,
  progress: {
    of: { es: "de", en: "of" } as Bi,
    step: { es: "Paso", en: "Step" } as Bi,
  },
  back: { es: "Atrás", en: "Back" } as Bi,
  next: { es: "Siguiente", en: "Next" } as Bi,
  submit: { es: "Enviar mi proyecto", en: "Submit my project" } as Bi,
  sending: { es: "Enviando…", en: "Sending…" } as Bi,
  errorTitle: { es: "Algo falló.", en: "Something went wrong." } as Bi,
  errorBody: {
    es: "Intenta de nuevo en un momento, o contáctanos por WhatsApp.",
    en: "Try again in a moment, or reach us on WhatsApp.",
  } as Bi,
  successTitle: {
    es: "Recibimos tu información.",
    en: "We got your information.",
  } as Bi,
  successBody: {
    es: "Un miembro del equipo te contacta en menos de 48 horas con una propuesta inicial. Mientras tanto, puedes adelantar el contacto por WhatsApp.",
    en: "Someone from the team will reach out within 48 hours with an initial proposal. In the meantime, you can fast-track via WhatsApp.",
  } as Bi,
  successCta: {
    es: "Continuar por WhatsApp",
    en: "Continue on WhatsApp",
  } as Bi,
  steps: {
    projectType: {
      label: { es: "Tipo de proyecto", en: "Project type" } as Bi,
      question: {
        es: "¿Qué tipo de proyecto tienes en mente?",
        en: "What kind of project do you have in mind?",
      } as Bi,
      helper: {
        es: "Elige el que más se acerque. Si dudas, está bien — lo afinamos juntos.",
        en: "Pick the closest one. If unsure, that's fine — we'll refine it together.",
      } as Bi,
      options: [
        {
          value: "casa-nueva",
          label: { es: "Casa nueva", en: "New home" } as Bi,
          sub: {
            es: "Construcción desde cero",
            en: "From the ground up",
          } as Bi,
        },
        {
          value: "remodelacion",
          label: { es: "Remodelación", en: "Renovation" } as Bi,
          sub: {
            es: "Transformar un espacio existente",
            en: "Transform an existing space",
          } as Bi,
        },
        {
          value: "comercial",
          label: { es: "Comercial", en: "Commercial" } as Bi,
          sub: {
            es: "Oficinas, retail, hospitalidad",
            en: "Offices, retail, hospitality",
          } as Bi,
        },
        {
          value: "llave-en-mano",
          label: { es: "Llave en mano", en: "Turnkey" } as Bi,
          sub: { es: "De diseño a entrega", en: "Design to delivery" } as Bi,
        },
        {
          value: "mantenimiento",
          label: { es: "Mantenimiento", en: "Maintenance" } as Bi,
          sub: {
            es: "Preventivo o correctivo",
            en: "Preventive or corrective",
          } as Bi,
        },
        {
          value: "no-seguro",
          label: { es: "No estoy seguro", en: "Not sure yet" } as Bi,
          sub: {
            es: "Quiero asesoría primero",
            en: "I want advice first",
          } as Bi,
        },
      ],
    },
    location: {
      label: { es: "Ubicación", en: "Location" } as Bi,
      question: {
        es: "¿Dónde está ubicado tu proyecto?",
        en: "Where is your project located?",
      } as Bi,
      helper: {
        es: "Operamos en Cancún, Riviera Maya y Mérida. Si está en otra zona, también podemos ayudarte.",
        en: "We operate in Cancún, Riviera Maya and Mérida. If it's elsewhere, we may still be able to help.",
      } as Bi,
      options: [
        { value: "cancun", label: { es: "Cancún", en: "Cancún" } as Bi },
        { value: "tulum", label: { es: "Tulum", en: "Tulum" } as Bi },
        {
          value: "playa",
          label: { es: "Playa del Carmen", en: "Playa del Carmen" } as Bi,
        },
        { value: "merida", label: { es: "Mérida", en: "Mérida" } as Bi },
        { value: "otro", label: { es: "Otra ubicación", en: "Other" } as Bi },
        {
          value: "aun-no",
          label: {
            es: "Aún no tengo terreno",
            en: "I don't have land yet",
          } as Bi,
        },
      ],
    },
    budget: {
      label: { es: "Presupuesto", en: "Budget" } as Bi,
      question: {
        es: "¿Cuál es tu presupuesto aproximado?",
        en: "What is your approximate budget?",
      } as Bi,
      helper: {
        es: "Esto nos ayuda a proponer la mejor solución desde el principio. La info se mantiene privada.",
        en: "This helps us tailor the best solution from the start. Information stays private.",
      } as Bi,
      options: [
        {
          value: "1.5-5M",
          label: { es: "$1.5M – $5M MXN", en: "$1.5M – $5M MXN" } as Bi,
          sub: {
            es: "Remodelaciones y proyectos medianos",
            en: "Renovations and mid-size projects",
          } as Bi,
        },
        {
          value: "5-10M",
          label: { es: "$5M – $10M MXN", en: "$5M – $10M MXN" } as Bi,
          sub: {
            es: "Residencias y locales comerciales",
            en: "Residences and commercial spaces",
          } as Bi,
        },
        {
          value: "10-20M",
          label: { es: "$10M – $20M MXN", en: "$10M – $20M MXN" } as Bi,
          sub: {
            es: "Residencias premium y obra completa",
            en: "Premium residences and full build",
          } as Bi,
        },
        {
          value: "20M+",
          label: { es: "$20M+ MXN", en: "$20M+ MXN" } as Bi,
          sub: {
            es: "Proyectos de gran escala",
            en: "Large-scale projects",
          } as Bi,
        },
        {
          value: "hablemos",
          label: {
            es: "Prefiero hablar primero",
            en: "I'd rather talk first",
          } as Bi,
          sub: {
            es: "Necesito orientación antes de definir",
            en: "I need guidance before defining",
          } as Bi,
        },
      ],
    },
    timing: {
      label: { es: "Tiempos", en: "Timeline" } as Bi,
      question: {
        es: "¿Cuándo te gustaría empezar?",
        en: "When would you like to start?",
      } as Bi,
      helper: {
        es: "No te preocupes si todavía no es seguro — siempre puedes ajustarlo.",
        en: "No worries if it's not certain yet — you can always adjust this later.",
      } as Bi,
      options: [
        {
          value: "inmediato",
          label: { es: "Inmediatamente", en: "Immediately" } as Bi,
          sub: { es: "Listo para arrancar", en: "Ready to start" } as Bi,
        },
        {
          value: "1-3",
          label: { es: "1 – 3 meses", en: "1 – 3 months" } as Bi,
        },
        {
          value: "3-6",
          label: { es: "3 – 6 meses", en: "3 – 6 months" } as Bi,
        },
        {
          value: "explorando",
          label: { es: "Solo explorando", en: "Just exploring" } as Bi,
          sub: {
            es: "Pidiendo info preliminar",
            en: "Gathering early info",
          } as Bi,
        },
      ],
    },
    message: {
      label: { es: "Detalles", en: "Details" } as Bi,
      question: {
        es: "Cuéntanos un poco más.",
        en: "Tell us a bit more.",
      } as Bi,
      helper: {
        es: "Cualquier detalle ayuda: superficie, número de habitaciones, estilo, referencias. Opcional.",
        en: "Any detail helps: square meters, rooms, style, references. Optional.",
      } as Bi,
      fieldLabel: {
        es: "Tu visión, en tus palabras",
        en: "Your vision, in your words",
      } as Bi,
      placeholder: {
        es: "Ej. Casa de 300 m² en Aldea Zamá, estilo contemporáneo, 3 recámaras…",
        en: "e.g. 300 m² house in Aldea Zamá, contemporary style, 3 bedrooms…",
      } as Bi,
    },
    contact: {
      label: { es: "Datos de contacto", en: "Contact info" } as Bi,
      question: {
        es: "Último paso. ¿Cómo te contactamos?",
        en: "Last step. How do we reach you?",
      } as Bi,
      helper: {
        es: "Te responde alguien del equipo, no un bot. Tus datos no se comparten.",
        en: "Someone from the team will reply, not a bot. Your data is never shared.",
      } as Bi,
      name: { es: "Nombre completo", en: "Full name" } as Bi,
      namePlaceholder: { es: "María García", en: "Maria Garcia" } as Bi,
      email: { es: "Email", en: "Email" } as Bi,
      emailPlaceholder: {
        es: "tucorreo@dominio.com",
        en: "you@domain.com",
      } as Bi,
      phone: { es: "WhatsApp / Teléfono", en: "WhatsApp / Phone" } as Bi,
      phonePlaceholder: { es: "998 123 4567", en: "998 123 4567" } as Bi,
      privacy: {
        es: "Acepto el tratamiento de mis datos para que Buildra me contacte. No spam, no compartimos info con terceros.",
        en: "I agree to my data being used so Buildra can contact me. No spam, no sharing with third parties.",
      } as Bi,
      errors: {
        name: { es: "Por favor escribe tu nombre.", en: "Please enter your name." } as Bi,
        email: { es: "Email no válido.", en: "Invalid email." } as Bi,
        phone: { es: "Teléfono no válido.", en: "Invalid phone." } as Bi,
        privacy: {
          es: "Acepta el aviso de privacidad para continuar.",
          en: "Please accept the privacy notice to continue.",
        } as Bi,
      },
    },
  },
};

export const footer = {
  tag: { es: "Comienza ahora", en: "Start now" } as Bi,
  title: {
    es: "Llámanos o envíanos un WhatsApp.",
    en: "Call us or send us a WhatsApp.",
  } as Bi,
  contactHeading: { es: "Contacto", en: "Contact" } as Bi,
  groupHeading: { es: "Grupo", en: "Group" } as Bi,
  groupCaption: {
    es: "Constructora · Real Estate",
    en: "Construction · Real Estate",
  } as Bi,
  rights: {
    es: "Todos los derechos reservados",
    en: "All rights reserved",
  } as Bi,
  privacy: { es: "Aviso de Privacidad", en: "Privacy Policy" } as Bi,
  terms: { es: "Términos", en: "Terms" } as Bi,
};

export const mobileCta = {
  call: { es: "Llamar", en: "Call" } as Bi,
  start: { es: "Iniciar", en: "Start" } as Bi,
};

export const COUNTRY_CODES: { value: string; flag: string }[] = [
  { value: "+52", flag: "🇲🇽" },
  { value: "+1", flag: "🇺🇸" },
  { value: "+34", flag: "🇪🇸" },
  { value: "+57", flag: "🇨🇴" },
  { value: "+54", flag: "🇦🇷" },
  { value: "+56", flag: "🇨🇱" },
];
