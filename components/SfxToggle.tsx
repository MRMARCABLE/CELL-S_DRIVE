"use client";

import { useSyncExternalStore } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { toggleSfx } from "@/components/shell/sound";

function subscribeSfx(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-sfx"],
  });
  return () => observer.disconnect();
}

function getSfxSnapshot() {
  return document.documentElement.dataset.sfx === "on";
}

function getSfxServerSnapshot() {
  return false;
}

export default function SfxToggle() {
  const { t } = useLanguage();
  const enabled = useSyncExternalStore(
    subscribeSfx,
    getSfxSnapshot,
    getSfxServerSnapshot
  );

  return (
    <button
      type="button"
      onClick={() => toggleSfx()}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute tactile UI sound effects" : "Enable tactile UI sound effects"}
      title={`${enabled ? t.sceneUi.sfxOn : t.sceneUi.sfxOff} [M]`}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 font-mono text-xs transition cursor-pointer ${
        enabled
          ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-text)]"
          : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
      }`}
    >
      {enabled ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-3.5 w-3.5"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-3.5 w-3.5 opacity-75"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
      <span className="hidden lg:inline text-[11px]">
        {enabled ? "SFX" : "MUTE"}
      </span>
    </button>
  );
}
