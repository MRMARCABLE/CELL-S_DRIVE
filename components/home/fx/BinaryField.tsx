"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

/**
 * Expanding ASCII binary matrix background for Scene 02 (and the 01->02 phasing transition).
 * Automatically pauses when scrolled out of view via IntersectionObserver.
 */
export default function BinaryField({
  intensity = 1,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = false;
    let rafId = 0;
    let lastTime = 0;
    let tick = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect ? rect.width : window.innerWidth;
      const h = rect ? rect.height : window.innerHeight;
      canvas.width = Math.max(300, Math.floor(w));
      canvas.height = Math.max(300, Math.floor(h));
    };

    resize();

    const drawFrame = (now: number) => {
      if (!isVisible) return;
      if (now - lastTime < 75) {
        rafId = requestAnimationFrame(drawFrame);
        return;
      }
      lastTime = now;
      tick += 1;

      const isDark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = 0.85 + Math.min(1, Math.max(0, intensity)) * 0.45;
      const cellSize = Math.round(22 * scale);
      ctx.font = `${Math.round(11 * scale)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const seed = (r * 31 + c * 17 + tick) % 29;
          if (seed > 9) continue;

          const bit = (r + c + tick) % 2 === 0 ? "1" : "0";
          const alpha =
            seed === 0
              ? isDark
                ? 0.28
                : 0.2
              : isDark
                ? 0.08
                : 0.06;

          if (seed === 0) {
            ctx.fillStyle = isDark
              ? `rgba(126, 200, 176, ${alpha})`
              : `rgba(47, 111, 94, ${alpha})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(236, 238, 242, ${alpha})`
              : `rgba(28, 25, 23, ${alpha})`;
          }

          ctx.fillText(
            bit,
            c * cellSize + cellSize / 2,
            r * cellSize + cellSize / 2
          );
        }
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          isVisible = e.isIntersecting;
          if (isVisible) {
            resize();
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(drawFrame);
          } else {
            cancelAnimationFrame(rafId);
          }
        }
      },
      { threshold: 0.05 }
    );

    io.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [intensity, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

