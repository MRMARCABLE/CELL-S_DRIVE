"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

interface HeroSpiralNode {
  arm: number;
  normR: number;
  angle: number;
  spread: number;
  speed: number;
  glyph: string;
  size: number;
  warm: boolean;
}

const SPIRAL_GLYPHS = ["0", "1", "1", "0", "✦", "·", "0", "1"];

/**
 * Right-shifted Binary Milky Way Spiral focal canvas inside Scene 01 (Hero).
 * Replaces the old GitHub profile/ASCII with the rotating Milky Way galaxy
 * born from the Big Bang, fading out smoothly toward the sides.
 */
export default function AsciiPortrait({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const resize = () => {
      const rect = parent?.getBoundingClientRect();
      canvas.width = Math.max(320, Math.floor(rect ? rect.width : 960));
      canvas.height = Math.max(320, Math.floor(rect ? rect.height : 560));
    };
    resize();

    const nodes: HeroSpiralNode[] = Array.from({ length: 190 }, (_, i) => {
      const arm = i % 3;
      const normR = (i / 190) ** 0.8;
      return {
        arm,
        normR,
        angle: (arm * (Math.PI * 2)) / 3 + normR * 4.5,
        spread: ((i * 19) % 15 - 7) * 0.036,
        speed: 0.0032 + (1 - normR) * 0.0048,
        glyph: SPIRAL_GLYPHS[i % SPIRAL_GLYPHS.length],
        size: normR < 0.18 ? 13 : 9.5 + (i % 3) * 1.5,
        warm: normR < 0.34 || i % 7 === 0,
      };
    });

    let rafId = 0;
    let lastTime = 0;

    const draw = (now: number) => {
      if (now - lastTime < 32) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTime = now;

      const isDark = document.documentElement.classList.contains("dark");
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Shifted to the right side of the Hero stage (replacing the old GitHub profile)
      const cx = w >= 768 ? w * 0.76 : w * 0.68;
      const cy = h * 0.46;
      const maxR = Math.min(w, h) * 0.62;

      // Galactic Core Halo (warm post-Big-Bang orange/amber blending into theme accent)
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, maxR * 0.58);
      if (isDark) {
        coreGrad.addColorStop(0, "rgba(255, 235, 180, 0.55)");
        coreGrad.addColorStop(0.18, "rgba(255, 140, 36, 0.28)");
        coreGrad.addColorStop(0.52, "rgba(126, 200, 176, 0.12)");
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        coreGrad.addColorStop(0, "rgba(20, 18, 16, 0.45)");
        coreGrad.addColorStop(0.2, "rgba(234, 88, 12, 0.22)");
        coreGrad.addColorStop(0.55, "rgba(47, 111, 94, 0.1)");
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.58, 0, Math.PI * 2);
      ctx.fill();

      // Center Dancing Star Nucleus
      ctx.fillStyle = isDark ? "#ffffff" : "#141210";
      ctx.beginPath();
      ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
      ctx.fill();

      const tilt = 0.46;
      const planeAngle = -0.35;
      const cosP = Math.cos(planeAngle);
      const sinP = Math.sin(planeAngle);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const n of nodes) {
        if (!reducedMotion) {
          n.angle += n.speed;
        }
        const r = 8 + n.normR * maxR;
        const theta = n.angle + n.spread;

        const lx = Math.cos(theta) * r;
        const ly = Math.sin(theta) * r * tilt;

        const x = cx + (lx * cosP - ly * sinP);
        const y = cy + (lx * sinP + ly * cosP);

        // Smooth radial fade toward the edges (memudar semakin ke samping)
        const fade = Math.max(0.04, (1 - n.normR) ** 1.5);

        ctx.font = `${n.size}px monospace`;
        if (n.warm) {
          ctx.fillStyle = isDark
            ? `rgba(255, 166, 72, ${Math.min(0.9, fade * 1.1)})`
            : `rgba(194, 65, 12, ${Math.min(0.82, fade * 1.05)})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(126, 200, 176, ${Math.min(0.82, fade * 0.95)})`
            : `rgba(47, 111, 94, ${Math.min(0.75, fade * 0.9)})`;
        }

        ctx.fillText(n.glyph, x, y);
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      style={{
        maskImage:
          "radial-gradient(ellipse 88% 84% at 76% 46%, black 18%, rgba(0,0,0,0.68) 54%, rgba(0,0,0,0.18) 80%, transparent 98%), linear-gradient(to left, black 10%, rgba(0,0,0,0.75) 52%, rgba(0,0,0,0.12) 85%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 88% 84% at 76% 46%, black 18%, rgba(0,0,0,0.68) 54%, rgba(0,0,0,0.18) 80%, transparent 98%), linear-gradient(to left, black 10%, rgba(0,0,0,0.75) 52%, rgba(0,0,0,0.12) 85%, transparent 100%)",
      }}
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
