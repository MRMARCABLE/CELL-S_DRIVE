"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { translations, type Locale, type LocalizedContent } from "@/data/i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  t: LocalizedContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LOCALE_EVENT = "portfolio-locale-change";

function subscribe(callback: () => void) {
  window.addEventListener(LOCALE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem("locale");
    return saved === "id" ? "id" : "en";
  } catch {
    return "en";
  }
}

function getServerSnapshot(): Locale {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setLocale = (next: Locale) => {
    try {
      localStorage.setItem("locale", next);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.lang = next;
    window.dispatchEvent(new Event(LOCALE_EVENT));
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "id" : "en");
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

