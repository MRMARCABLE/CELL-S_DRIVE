"use client";

import { asciiPortraitDesktop } from "@/data/ascii-portrait";

/**
 * Giant proportional ASCII GitHub emblem positioned on the right edge/corner
 * of the Hero section so roughly half of the emblem emerges from the right side
 * and gradually fades out evenly (memudar merata) toward the center/left.
 */
export default function AsciiPortrait({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none font-mono ${className}`}
    >
      {/* Right-corner half-cropped proportional ASCII GitHub emblem */}
      <div
        style={{
          maskImage:
            "radial-gradient(circle at 92% 50%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,0.72) 34%, rgba(0,0,0,0.38) 58%, rgba(0,0,0,0.12) 76%, transparent 94%), linear-gradient(to left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.78) 28%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.08) 80%, transparent 96%)",
          WebkitMaskImage:
            "radial-gradient(circle at 92% 50%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,0.72) 34%, rgba(0,0,0,0.38) 58%, rgba(0,0,0,0.12) 76%, transparent 94%), linear-gradient(to left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.78) 28%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.08) 80%, transparent 96%)",
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[36%] sm:translate-x-[34%] lg:translate-x-[32%] flex items-center justify-center"
      >
        <pre className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[18.5px] leading-[1.14] tracking-[0.04em] text-[var(--accent-text)] opacity-60 dark:opacity-55 transition-opacity duration-700">
          {asciiPortraitDesktop.join("\n")}
        </pre>
      </div>

      {/* Subtle secondary ambient echo fading further toward the center so the transition is ultra-smooth */}
      <div
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 75% at 76% 50%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 76% 50%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 50%, transparent 85%)",
        }}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[18%] items-center justify-center"
      >
        <pre className="text-[12px] lg:text-[15px] leading-[1.14] tracking-[0.06em] text-[var(--text-secondary)] opacity-35 blur-[0.4px]">
          {asciiPortraitDesktop.join("\n")}
        </pre>
      </div>

      {/* Vertical top & bottom edge feathering into the Hero card surface */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-surface) 0%, transparent 14%, transparent 86%, var(--bg-surface) 100%)",
          opacity: 0.65,
        }}
      />
    </div>
  );
}
