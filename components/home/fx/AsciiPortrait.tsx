"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  asciiPortraitDesktop,
  asciiPortraitMobile,
} from "@/data/ascii-portrait";
import { profile } from "@/data/portfolio";

export default function AsciiPortrait({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useLanguage();
  const [decrypted, setDecrypted] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    const spot = spotlightRef.current;
    if (!el || !spot) return;
    const rect = el.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    spot.style.setProperty("--spot-x", `${x}px`);
    spot.style.setProperty("--spot-y", `${y}px`);
    spot.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="decrypt"
      className={`group/ascii relative select-none font-mono overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/65 p-3 sm:p-4 ${className}`}
    >
      {/* Header bar with Decrypt Photo Easter-Egg Toggle */}
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-[var(--border-soft)] pb-1.5 text-[10px] text-[var(--text-muted)]">
        <span className="truncate">
          {decrypted ? "CAM // /avatar.png [RAW]" : "TTY // PORTRAIT_BUFFER"}
        </span>
        <button
          type="button"
          onClick={() => setDecrypted((prev) => !prev)}
          className="rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition cursor-pointer"
        >
          {decrypted ? t.sceneUi.asciiMaskBtn : t.sceneUi.revealPhotoBtn}
        </button>
      </div>

      {/* Main Portrait Viewport */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={decrypted}
        aria-label={
          decrypted ? t.sceneUi.asciiMaskBtn : t.sceneUi.revealPhotoBtn
        }
        onClick={() => setDecrypted((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDecrypted((prev) => !prev);
          }
        }}
        className="relative cursor-pointer focus:outline-none"
      >
        {/* Static Precomputed ASCII Matrices (0ms React Interval overhead) */}
        <pre
          aria-hidden="true"
          className={`hidden md:block text-[8px] lg:text-[8.5px] leading-[1.06] tracking-[0.04em] text-[var(--text-secondary)] transition-opacity duration-300 ${
            decrypted ? "opacity-15" : "opacity-90"
          }`}
        >
          {asciiPortraitDesktop.join("\n")}
        </pre>

        <pre
          aria-hidden="true"
          className={`block md:hidden text-[7px] sm:text-[8px] leading-[1.06] tracking-[0.04em] text-[var(--text-secondary)] transition-opacity duration-300 ${
            decrypted ? "opacity-15" : "opacity-90"
          }`}
        >
          {asciiPortraitMobile.join("\n")}
        </pre>

        {/* Cursor Spotlight Glow Layer */}
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle 110px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(126, 200, 176, 0.28), transparent 72%)",
          }}
        />

        {/* Crisp Real Photo Reveal Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            decrypted
              ? "opacity-100 scale-100"
              : "pointer-events-none opacity-0 scale-95"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-surface)] p-1.5 shadow-lg">
            <Image
              src="/avatar.png"
              alt={profile.name}
              width={220}
              height={220}
              className="h-44 w-44 sm:h-52 sm:w-52 rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
