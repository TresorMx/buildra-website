import { z } from "zod";

export const leadSchema = z.object({
  projectType: z.enum([
    "casa-nueva",
    "remodelacion",
    "comercial",
    "llave-en-mano",
    "mantenimiento",
    "no-seguro",
  ]),
  location: z.enum([
    "cancun",
    "tulum",
    "playa",
    "merida",
    "otro",
    "aun-no",
  ]),
  budget: z.enum(["1.5-5M", "5-10M", "10-20M", "20M+", "hablemos"]),
  timing: z.enum(["inmediato", "1-3", "3-6", "explorando"]),
  message: z.string().max(2000).optional().default(""),
  name: z.string().trim().min(2, "name").max(120),
  email: z.string().trim().email("email"),
  countryCode: z.string().regex(/^\+\d{1,4}$/),
  phone: z
    .string()
    .trim()
    .min(7, "phone")
    .max(20)
    .regex(/^[\d\s()-]+$/, "phone"),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "privacy" }),
  }),
  lang: z.enum(["es", "en"]).default("es"),
  utm: z.record(z.string()).optional().default({}),
  page: z.string().url().optional(),
  userAgent: z.string().max(500).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadStepKey =
  | "projectType"
  | "location"
  | "budget"
  | "timing"
  | "message"
  | "contact";

export const STEP_ORDER: LeadStepKey[] = [
  "projectType",
  "location",
  "budget",
  "timing",
  "message",
  "contact",
];
