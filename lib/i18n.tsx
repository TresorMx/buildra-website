"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T extends { es: unknown; en: unknown }>(node: T) => T["es"] | T["en"];
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "buildra-lang";

export function I18nProvider({
  initial = "es",
  children,
}: {
  initial?: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initial);

  // hydrate from localStorage / system once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "es" || saved === "en") {
        setLangState(saved);
        document.documentElement.setAttribute("lang", saved);
      }
    } catch {
      /* noop */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", l);
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (node) => (lang === "es" ? node.es : node.en),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
