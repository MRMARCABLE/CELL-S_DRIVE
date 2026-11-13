"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={
        locale === "en"
          ? "Switch language to Bahasa Indonesia"
          : "Ganti bahasa ke English"
      }
      title={locale === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
    >
      <span className={locale === "en" ? "text-[var(--accent-text)] font-semibold" : "text-[var(--text-muted)]"}>
        EN
      </span>
      <span className="text-[var(--text-muted)]">/</span>
      <span className={locale === "id" ? "text-[var(--accent-text)] font-semibold" : "text-[var(--text-muted)]"}>
        ID
      </span>
    </button>
  );
}

