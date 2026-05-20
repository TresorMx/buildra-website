"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { COUNTRY_CODES, form as copy } from "@/lib/content";
import { leadSchema, type LeadInput, STEP_ORDER } from "@/lib/validations";
import { getUtmParams, cn } from "@/lib/utils";

const STORAGE_KEY = "buildra-lead";
const SUBMITTED_KEY = "buildra-lead-submitted";

type State = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const { lang, t } = useI18n();
  const router = useRouter();
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: {
      message: "",
      countryCode: "+52",
      lang,
      utm: {},
    },
  });

  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>("idle");
  const total = STEP_ORDER.length;

  // Restore from localStorage once
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.entries(parsed).forEach(([k, v]) => {
          // @ts-expect-error — runtime restore
          if (v !== undefined && v !== null) form.setValue(k, v);
        });
      }
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change
  useEffect(() => {
    const sub = form.watch((values) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch {
        /* noop */
      }
    });
    return () => sub.unsubscribe();
  }, [form]);

  // Keep `lang` in the form payload synced
  useEffect(() => {
    form.setValue("lang", lang);
  }, [lang, form]);

  const fieldsByStep: Record<number, (keyof LeadInput)[]> = useMemo(
    () => ({
      0: ["projectType"],
      1: ["location"],
      2: ["budget"],
      3: ["timing"],
      4: [],
      5: ["name", "email", "countryCode", "phone", "privacy"],
    }),
    [],
  );

  async function goNext() {
    const fields = fieldsByStep[step] ?? [];
    const ok = fields.length === 0 ? true : await form.trigger(fields as never);
    if (!ok) return;
    if (step === total - 1) return submit();
    setStep((s) => s + 1);
  }
  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit() {
    if (state === "submitting") return;
    setState("submitting");

    const values = form.getValues();
    const utm =
      typeof window !== "undefined" ? getUtmParams() : ({} as Record<string, string>);
    const payload: LeadInput = {
      ...values,
      utm,
      page: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`bad_status_${res.status}`);

      // Stash a tiny payload for /gracias to greet the user by name.
      try {
        sessionStorage.setItem(
          SUBMITTED_KEY,
          JSON.stringify({
            name: payload.name,
            email: payload.email,
            projectType: payload.projectType,
            location: payload.location,
          }),
        );
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* noop */
      }

      setState("success");
      router.push("/gracias");
    } catch (err) {
      console.error("[buildra/form] submit failed", err);
      setState("error");
    }
  }

  const stepProgress = ((step + 1) / total) * 100;
  const stepLabel = (() => {
    switch (step) {
      case 0:
        return copy.steps.projectType.label;
      case 1:
        return copy.steps.location.label;
      case 2:
        return copy.steps.budget.label;
      case 3:
        return copy.steps.timing.label;
      case 4:
        return copy.steps.message.label;
      case 5:
        return copy.steps.contact.label;
      default:
        return copy.steps.projectType.label;
    }
  })();

  return (
    <section
      id="form"
      className="relative overflow-hidden bg-light px-5 py-24 text-base md:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[920px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#8A7340]">
            <span className="h-px w-6 bg-[#8A7340]" />
            <span>{t(copy.tag)}</span>
          </div>
          <h2 className="text-[clamp(36px,4.5vw,64px)] font-extralight leading-[1.05] tracking-[-0.025em] text-[#0A0A0A]">
            {t(copy.title)}
          </h2>
          <p className="mt-4 max-w-[460px] text-[15px] leading-[1.7] text-[#0A0A0A]/55">
            {t(copy.intro)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-14 overflow-hidden rounded bg-white shadow-[0_1px_0_rgba(10,10,10,0.04),0_60px_100px_-40px_rgba(10,10,10,0.18)] ring-1 ring-black/[0.08]"
        >
          <ProgressBar
            step={step + 1}
            total={total}
            label={t(stepLabel)}
            progress={stepProgress}
          />

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <StepView key={step} step={step} form={form} total={total} />
            </AnimatePresence>
          </div>

          <FormNav
            step={step}
            total={total}
            state={state}
            onBack={goBack}
            onNext={goNext}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// Subcomponents — all defined at MODULE level so their function reference is
// stable across re-renders. (Defining them inside LeadForm caused
// AnimatePresence to remount on every parent re-render, which produced the
// "reload" flicker when an option was picked.)
// ============================================================

function StepView({
  step,
  form,
  total,
}: {
  step: number;
  form: UseFormReturn<LeadInput>;
  total: number;
}) {
  const { t } = useI18n();

  return (
    <motion.div
      data-step={step}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col p-7 sm:p-14"
    >
      <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#0A0A0A]/45">
        <span className="h-px w-5 bg-accent" />
        <span>
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {step === 0 && (
        <OptionStep
          title={t(copy.steps.projectType.question)}
          helper={t(copy.steps.projectType.helper)}
          options={copy.steps.projectType.options}
          value={form.watch("projectType") as string | undefined}
          onPick={(v) =>
            form.setValue("projectType", v as never, { shouldValidate: true })
          }
          twoCol
        />
      )}
      {step === 1 && (
        <OptionStep
          title={t(copy.steps.location.question)}
          helper={t(copy.steps.location.helper)}
          options={copy.steps.location.options}
          value={form.watch("location") as string | undefined}
          onPick={(v) =>
            form.setValue("location", v as never, { shouldValidate: true })
          }
          twoCol
        />
      )}
      {step === 2 && (
        <OptionStep
          title={t(copy.steps.budget.question)}
          helper={t(copy.steps.budget.helper)}
          options={copy.steps.budget.options}
          value={form.watch("budget") as string | undefined}
          onPick={(v) =>
            form.setValue("budget", v as never, { shouldValidate: true })
          }
        />
      )}
      {step === 3 && (
        <OptionStep
          title={t(copy.steps.timing.question)}
          helper={t(copy.steps.timing.helper)}
          options={copy.steps.timing.options}
          value={form.watch("timing") as string | undefined}
          onPick={(v) =>
            form.setValue("timing", v as never, { shouldValidate: true })
          }
          twoCol
        />
      )}
      {step === 4 && (
        <>
          <Heading
            title={t(copy.steps.message.question)}
            helper={t(copy.steps.message.helper)}
          />
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#0A0A0A]/50">
              {t(copy.steps.message.fieldLabel)}
            </label>
            <textarea
              {...form.register("message")}
              rows={5}
              placeholder={t(copy.steps.message.placeholder)}
              className="min-h-[120px] resize-y border-0 border-b border-[#0A0A0A]/20 bg-transparent py-3 font-sans text-[16px] text-[#0A0A0A] outline-none transition-colors duration-300 placeholder:text-[#0A0A0A]/30 focus:border-[#0A0A0A]"
            />
          </div>
        </>
      )}
      {step === 5 && <ContactStep form={form} />}
    </motion.div>
  );
}

// ============================================================
// Subcomponents (no hooks below — keep them simple to avoid scope issues)
// ============================================================

function ProgressBar({
  step,
  total,
  label,
  progress,
}: {
  step: number;
  total: number;
  label: string;
  progress: number;
}) {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/[0.08] bg-gradient-to-b from-black/[0.02] to-transparent px-8 py-5">
      <div className="text-[11px] uppercase tracking-[0.2em] text-base/45">
        {t({ es: "Paso", en: "Step" })}{" "}
        <strong className="font-medium text-base">{step}</strong>{" "}
        {t({ es: "de", en: "of" })}{" "}
        <strong className="font-medium text-base">{total}</strong>
      </div>
      <div className="relative mx-6 h-0.5 flex-1 max-w-[280px] overflow-hidden rounded-full bg-black/[0.08]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-base"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-base/45">
        {label}
      </div>
    </div>
  );
}

function Heading({ title, helper }: { title: string; helper: string }) {
  return (
    <>
      <h2 className="mb-3 text-[clamp(24px,3vw,36px)] font-light leading-[1.15] tracking-[-0.02em] text-base">
        {title}
      </h2>
      <p className="mb-8 max-w-[540px] text-[14px] leading-[1.6] text-base/55">
        {helper}
      </p>
    </>
  );
}

function OptionStep({
  title,
  helper,
  options,
  value,
  onPick,
  twoCol = false,
}: {
  title: string;
  helper: string;
  options: { value: string; label: { es: string; en: string }; sub?: { es: string; en: string } }[];
  value: string | undefined;
  onPick: (v: string) => void;
  twoCol?: boolean;
}) {
  const { t } = useI18n();
  return (
    <>
      <Heading title={title} helper={helper} />
      <div
        className={cn(
          "grid gap-2.5",
          twoCol ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
        )}
      >
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <button
              type="button"
              key={o.value}
              onClick={() => onPick(o.value)}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded border px-5 py-4 text-left text-[14px] transition-all duration-200",
                selected
                  ? "border-base bg-base text-ink"
                  : "border-black/[0.10] bg-white text-base hover:-translate-y-px hover:border-black/30 hover:bg-black/[0.015]",
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="font-medium">{t(o.label)}</div>
                {o.sub && (
                  <div
                    className={cn(
                      "text-[12px]",
                      selected ? "text-ink/55" : "text-base/50",
                    )}
                  >
                    {t(o.sub)}
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                  selected ? "border-accent bg-accent" : "border-black/20",
                )}
              >
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-base" />}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function ContactStep({ form }: { form: UseFormReturn<LeadInput> }) {
  const { t } = useI18n();
  const errors = form.formState.errors;

  return (
    <>
      <Heading
        title={t(copy.steps.contact.question)}
        helper={t(copy.steps.contact.helper)}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label={t(copy.steps.contact.name)}
          error={errors.name ? t(copy.steps.contact.errors.name) : null}
        >
          <input
            {...form.register("name")}
            placeholder={t(copy.steps.contact.namePlaceholder)}
            className="border-0 border-b border-base/20 bg-transparent py-3 text-[16px] outline-none transition-colors duration-300 placeholder:text-base/30 focus:border-base"
          />
        </Field>
        <Field
          label={t(copy.steps.contact.email)}
          error={errors.email ? t(copy.steps.contact.errors.email) : null}
        >
          <input
            type="email"
            {...form.register("email")}
            placeholder={t(copy.steps.contact.emailPlaceholder)}
            className="border-0 border-b border-base/20 bg-transparent py-3 text-[16px] outline-none transition-colors duration-300 placeholder:text-base/30 focus:border-base"
          />
        </Field>
      </div>
      <div className="mt-4">
        <Field
          label={t(copy.steps.contact.phone)}
          error={errors.phone ? t(copy.steps.contact.errors.phone) : null}
        >
          <div className="grid grid-cols-[90px_1fr] gap-4">
            <select
              {...form.register("countryCode")}
              className="border-0 border-b border-base/20 bg-transparent py-3 text-[16px] outline-none focus:border-base"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.value} {c.flag}
                </option>
              ))}
            </select>
            <input
              type="tel"
              {...form.register("phone")}
              placeholder={t(copy.steps.contact.phonePlaceholder)}
              className="border-0 border-b border-base/20 bg-transparent py-3 text-[16px] outline-none transition-colors duration-300 placeholder:text-base/30 focus:border-base"
            />
          </div>
        </Field>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-base/60">
        <input
          type="checkbox"
          {...form.register("privacy")}
          className="mt-1 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-sm border border-base/30 transition-all duration-200 checked:border-base checked:bg-base checked:after:absolute checked:after:ml-1 checked:after:h-2 checked:after:w-1 checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-accent"
        />
        <span>{t(copy.steps.contact.privacy)}</span>
      </label>
      {errors.privacy && (
        <div className="mt-2 text-[12px] text-red-600">
          {t(copy.steps.contact.errors.privacy)}
        </div>
      )}
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-base/50">
        {label}
      </label>
      {children}
      {error && <div className="text-[12px] text-red-600">{error}</div>}
    </div>
  );
}

function FormNav({
  step,
  total,
  state,
  onBack,
  onNext,
}: {
  step: number;
  total: number;
  state: State;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-between gap-4 border-t border-black/[0.08] bg-black/[0.015] px-8 py-5">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="inline-flex items-center gap-2.5 rounded-full bg-transparent px-6 py-3 text-[13px] font-medium tracking-[0.02em] text-base transition-all duration-300 hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M13 8H3M7 12L3 8l4-4" />
        </svg>
        {t(copy.back)}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={state === "submitting"}
        className="inline-flex items-center gap-2.5 rounded-full bg-base px-6 py-3 text-[13px] font-medium tracking-[0.02em] text-ink transition-all duration-300 hover:-translate-y-px hover:bg-accent hover:text-base disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "submitting"
          ? t(copy.sending)
          : step === total - 1
            ? t(copy.submit)
            : t(copy.next)}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
}

