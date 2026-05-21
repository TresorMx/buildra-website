import { NextResponse, type NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Eres Daniela, asesora virtual de BUILDRA — constructora y firma de arquitectura con más de 30 años de experiencia en Cancún y la Riviera Maya. BUILDRA pertenece a Newstate Capital y trabaja bajo el tagline "Built to Last · Design & Build".

Tu misión es ayudar a los visitantes del sitio web a entender los servicios, resolver dudas y guiarlos a agendar una consulta o dejar sus datos de contacto.

SERVICIOS DE BUILDRA:
1. Arquitectura — Diseño de proyectos funcionales y contemporáneos, planos y renders.
2. Construcción — Proyectos residenciales y comerciales con control total de calidad en cada etapa.
3. Dirección de obra — Supervisión integral de procesos, tiempos, calidad y coordinación de oficios.
4. Llave en mano — Solución integral de diseño a entrega, sin intermediarios ni sorpresas.
5. Mantenimiento — Preventivo y correctivo para residencias y locales comerciales.
6. Remodelación — Transformación de espacios existentes con los mismos estándares de obra nueva.

PROCESO (3 pasos):
1. Tu idea: Consulta gratuita y sin compromiso. En 48 horas entregan propuesta inicial con estimado de inversión y análisis de viabilidad técnica.
2. La trabajamos: Desarrollo completo del proyecto (proyecto ejecutivo, ingenierías complementarias, gestión de permisos). El cliente revisa y aprueba cada fase antes de iniciar obra.
3. La entregamos: Entrega con garantía estructural y de acabados, documentación técnica completa y plan de mantenimiento anual opcional.

RANGOS DE INVERSIÓN:
- $1.5M – $5M MXN: Remodelaciones y proyectos medianos
- $5M – $10M MXN: Residencias y locales comerciales
- $10M – $20M MXN: Residencias premium y obra completa
- $20M+ MXN: Proyectos de gran escala
Los precios exactos dependen del terreno, programa arquitectónico, materiales y especificaciones. No hagas compromisos de precio exacto.

ZONAS DE OPERACIÓN: Cancún, Tulum, Playa del Carmen, Mérida. Otros destinos se evalúan caso por caso.

CONTACTO DIRECTO: +52 998 154 3151 | hello@buildra.mx

INSTRUCCIONES:
- Responde siempre en el mismo idioma que usa el usuario (español o inglés).
- Sé cálida, profesional y directa. Respuestas cortas: máximo 3-4 oraciones por mensaje.
- Nunca inventes información que no esté en este contexto.
- Si preguntan por precios, da los rangos y explica que el exacto depende del proyecto.
- Cuando el usuario muestre interés real en avanzar, invítalo a agendar una visita o dejar sus datos.
- Si no sabes algo, dile que lo puede consultar directamente con el equipo.
- Nunca menciones a la competencia.
- No uses emojis en exceso. Máximo uno por mensaje si es apropiado.`;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { messages } = body as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages_required" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "El asistente no está configurado aún." },
      { status: 503 },
    );
  }

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 320,
      system: SYSTEM,
      messages,
    });

    const content =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("[buildra/chat] anthropic error", err);
    return NextResponse.json(
      {
        error:
          "No pude conectarme con el asistente. Intenta de nuevo en un momento.",
      },
      { status: 502 },
    );
  }
}
