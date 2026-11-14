"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";
import {
  asciiPortraitDesktop,
  asciiPortraitMobile,
} from "@/data/ascii-portrait";

const SHIMMER_CHARS = "01+*#%@:";

export default function AsciiPortrait({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const baseLines = compact ? asciiPortraitMobile : asciiPortraitDesktop;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setTick((t) => (t + 1) % 64);
    }, 240);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={`select-none font-mono leading-[1.08] tracking-[0.04em] overflow-hidden ${className}`}
    >
      <div className="mb-1.5 flex items-center justify-between border-b border-[var(--border-soft)] pb-1 text-[10px] text-[var(--text-muted)]">
        <span>TTY // PORTRAIT_BUFFER</span>
        <span className="text-[var(--accent-text)]">● 68×34 ASCII</span>
      </div>
      <pre className="text-[7px] sm:text-[8.5px] md:text-[9.5px] leading-[1.05] text-[var(--text-secondary)] opacity-85">
        {baseLines.map((line, rowIdx) => {
          if (reducedMotion || tick === 0) {
            return `${line}\n`;
          }
          // Subtle living terminal shimmer on non-empty characters
          const chars = line.split("");
          const colTarget = (rowIdx * 13 + tick * 7) % chars.length;
          if (chars[colTarget] && chars[colTarget] !== " " && chars[colTarget] !== ".") {
            chars[colTarget] =
              SHIMMER_CHARS[(rowIdx + tick) % SHIMMER_CHARS.length];
          }
          return `${chars.join("")}\n`;
        })}
      </pre>
    </div>
  );
}

