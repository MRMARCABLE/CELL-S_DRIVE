"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

type RgbChannel = "r" | "g" | "b" | null;

function getRgbChannelColor(
  channel: RgbChannel,
  isDark: boolean,
  alpha: number
): string {
  if (channel === "r") {
    return isDark
      ? `rgba(251, 113, 133, ${alpha})`
      : `rgba(225, 29, 72, ${alpha})`;
  }
  if (channel === "g") {
    return isDark
      ? `rgba(52, 211, 153, ${alpha})`
      : `rgba(5, 150, 105, ${alpha})`;
  }
  if (channel === "b") {
    return isDark
      ? `rgba(56, 189, 248, ${alpha})`
      : `rgba(2, 132, 199, ${alpha})`;
  }
  return isDark
    ? `rgba(126, 200, 176, ${alpha})`
    : `rgba(47, 111, 94, ${alpha})`;
}

/**
 * Expanding ASCII binary matrix background for Scene 02.
 * Reacts subtly to pointer proximity and hovered RGB playing card channel,
 * and pauses automatically when off-screen via IntersectionObserver.
 */
export default function BinaryField({
  intensity = 1,
  activeRgb = null,
  className = "",
}: {
  intensity?: number;
  activeRgb?: RgbChannel;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRgbRef = useRef<RgbChannel>(activeRgb);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    activeRgbRef.current = activeRgb;
  }, [activeRgb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let isVisible = false;
    let rafId = 0;
    let lastTime = 0;
    let tick = 0;

    const resize = () => {
      const rect = parent?.getBoundingClientRect();
      const w = rect ? rect.width : window.innerWidth;
      const h = rect ? rect.height : window.innerHeight;
      canvas.width = Math.max(300, Math.floor(w));
      canvas.height = Math.max(300, Math.floor(h));
    };

    const handleParentMove = (e: MouseEvent) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleParentLeave = () => {
      mouseRef.current.active = false;
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
      const currentRgb = activeRgbRef.current;
      const pointer = mouseRef.current;

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
          const px = c * cellSize + cellSize / 2;
          const py = r * cellSize + cellSize / 2;

          let nearMouse = false;
          if (pointer.active) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            nearMouse = dx * dx + dy * dy < 150 * 150;
          }

          if (seed > 9 && !nearMouse) continue;

          const bit = (r + c + tick) % 2 === 0 ? "1" : "0";
          const alpha = nearMouse
            ? isDark
              ? 0.42
              : 0.34
            : seed === 0
              ? isDark
                ? 0.28
                : 0.2
              : isDark
                ? 0.08
                : 0.06;

          if (nearMouse || seed === 0) {
            ctx.fillStyle = getRgbChannelColor(currentRgb, isDark, alpha);
          } else {
            ctx.fillStyle = isDark
              ? `rgba(236, 238, 242, ${alpha})`
              : `rgba(28, 25, 23, ${alpha})`;
          }

          ctx.fillText(bit, px, py);
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
    parent?.addEventListener("mousemove", handleParentMove, { passive: true });
    parent?.addEventListener("mouseleave", handleParentLeave);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", handleParentMove);
      parent?.removeEventListener("mouseleave", handleParentLeave);
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
