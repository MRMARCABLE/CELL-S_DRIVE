"use client";

import { useEffect, useState } from "react";

/**
 * Computes normalized scroll progress p in [0, 1] across the transition
 * from Scene 01 into Scene 02 so the giant name can phase into the binary field.
 */
export function useScrollProgress(targetId: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Start phasing as user scrolls past the top 15% of Scene 01
      const raw = (-rect.top) / (vh * 0.85);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return progress;
}

