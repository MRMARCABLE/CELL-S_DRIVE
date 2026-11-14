"use client";

import {
  asciiPortraitDesktop,
  asciiPortraitMobile,
} from "@/data/ascii-portrait";

/**
 * Full-section ambient ASCII background for Scene 01 (Hero).
 * Spans behind the entire hero stage and gradually fades evenly (memudar merata)
 * from right to left and toward the edges, aligning with the proportioned
 * portrait on the right column.
 */
export default function AsciiPortrait({
  settled = true,
  asciiFocus = false,
  className = "",
}: {
  settled?: boolean;
  asciiFocus?: boolean;
  className?: string;
}) {
  // Build a wide background matrix by pairing a mirrored ambient stream on the left
  // with the main portrait matrix anchored toward the right side of the hero section.
  const wideLines = asciiPortraitDesktop.map((line, idx) => {
    const leftEcho = asciiPortraitDesktop[
      (idx + 6) % asciiPortraitDesktop.length
    ]
      .slice(8, 56)
      .replace(/[#%*]/g, ":")
      .replace(/[+=-]/g, ".");
    return `${leftEcho}   ${line}   ${line}`;
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none font-mono ${className}`}
    >
      {/* Desktop Wide Section ASCII Background */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.16) 28%, rgba(0,0,0,0.48) 58%, rgba(0,0,0,0.92) 86%, rgba(0,0,0,0.4) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.16) 28%, rgba(0,0,0,0.48) 58%, rgba(0,0,0,0.92) 86%, rgba(0,0,0,0.4) 100%)",
        }}
        className={`hidden md:flex h-full w-full items-center justify-end pr-2 lg:pr-6 transition-opacity duration-[1800ms] ease-out ${
          asciiFocus
            ? "opacity-85"
            : settled
              ? "opacity-35"
              : "opacity-80"
        }`}
      >
        <pre className="text-[9px] lg:text-[10.5px] leading-[1.12] tracking-[0.06em] text-[var(--accent-text)]/85">
          {wideLines.join("\n")}
        </pre>
      </div>

      {/* Mobile Section ASCII Background */}
      <div
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 85% at 65% 55%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.25) 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 65% 55%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.25) 65%, transparent 100%)",
        }}
        className={`flex md:hidden h-full w-full items-center justify-center transition-opacity duration-[1800ms] ease-out ${
          asciiFocus
            ? "opacity-75"
            : settled
              ? "opacity-25"
              : "opacity-65"
        }`}
      >
        <pre className="text-[8px] leading-[1.1] tracking-[0.05em] text-[var(--accent-text)]/80">
          {asciiPortraitMobile.join("\n")}
        </pre>
      </div>

      {/* Smooth Radial & Vertical Vignette so ASCII fades evenly into the Hero card surface */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 74% 48%, transparent 20%, var(--bg-surface) 88%), linear-gradient(to bottom, var(--bg-surface) 0%, transparent 18%, transparent 82%, var(--bg-surface) 100%)",
          opacity: asciiFocus ? 0.42 : 0.72,
        }}
      />
    </div>
  );
}
