"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n";

interface I18nState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: "en",
      setLocale: (l) => set({ locale: l }),
      toggle: () => set((s) => ({ locale: s.locale === "en" ? "hi" : "en" })),
      t: (key) => {
        const { locale } = get();
        const dict = translations[locale] as Record<TranslationKey, string>;
        return dict[key] ?? translations.en[key] ?? key;
      },
    }),
    {
      name: "valley-gaze:locale",
      storage: createJSONStorage(() => localStorage),
      // Only persist the locale, not the functions
      partialize: (s) => ({ locale: s.locale }),
    },
  ),
);
