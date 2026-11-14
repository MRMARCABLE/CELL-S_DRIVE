"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const el = barRef.current;
      if (!el) return;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
    >
      <div
        ref={barRef}
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left center",
          backgroundColor: "rgb(var(--scene-glow-1))",
          boxShadow: "0 0 10px rgba(var(--scene-glow-1), 0.75)",
        }}
        className="h-full w-full opacity-90 transition-colors duration-500"
      />
    </div>
  );
}
