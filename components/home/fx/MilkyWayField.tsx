"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

interface GalaxyStar {
  arm: number;
  normR: number;
  baseAngle: number;
  angleJitter: number;
  speed: number;
  glyph: string;
  size: number;
  isCoreWarm: boolean;
}

const GALAXY_GLYPHS = ["0", "1", "0", "1", "·", "1", "0", "✦"];

/**
 * Persistent background Binary Milky Way Galaxy born from the Boot Big Bang.
 * Rotates continuously as a tilted 3-arm spiral galaxy of binary (0/1) and stardust,
 * fading out smoothly toward the lateral edges (memudar semakin ke samping).
 * Shifts to the right side during Scene 01 (Hero) to replace the old GitHub profile.
 */
export default function MilkyWayField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const stars: GalaxyStar[] = Array.from({ length: 210 }, (_, i) => {
      const arm = i % 3;
      const normR = (i / 210) ** 0.82;
      return {
        arm,
        normR,
        baseAngle: (arm * (Math.PI * 2)) / 3 + normR * 4.2,
        angleJitter: ((i * 29) % 19 - 9) * 0.032,
        speed: 0.0022 + (1 - normR) * 0.0038,
        glyph: GALAXY_GLYPHS[i % GALAXY_GLYPHS.length],
        size: normR < 0.2 ? 12 : 9 + (i % 3) * 1.5,
        isCoreWarm: normR < 0.28 || i % 9 === 0,
      };
    });

    let rafId = 0;
    let lastTime = 0;
    let currentXRatio = 0.72;
    let currentYRatio = 0.48;

    const draw = (now: number) => {
      if (now - lastTime < 36) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTime = now;

      const isDark = document.documentElement.classList.contains("dark");
      const activeScene = document.documentElement.dataset.scene ?? "01";
      const w = canvas.width;
      const h = canvas.height;

      // Target galaxy position shifts right on Scene 01 (Hero), drifts softly on 02..05, and re-centers on 06
      const targetXRatio =
        activeScene === "01"
          ? w >= 1024
            ? 0.73
            : 0.65
          : activeScene === "06"
            ? 0.5
            : 0.62;
      const targetYRatio = activeScene === "01" ? 0.48 : 0.5;

      currentXRatio += (targetXRatio - currentXRatio) * 0.06;
      currentYRatio += (targetYRatio - currentYRatio) * 0.06;

      const cx = w * currentXRatio;
      const cy = h * currentYRatio;
      const maxRadius = Math.min(w, h) * (activeScene === "01" ? 0.48 : 0.44);
      const sceneAlphaBoost = activeScene === "01" ? 1 : 0.55;

      ctx.clearRect(0, 0, w, h);

      // Soft Orange-Amber-Emerald Galactic Core Nebular Glow
      const coreGlow = ctx.createRadialGradient(
        cx,
        cy,
        4,
        cx,
        cy,
        maxRadius * 0.68
      );
      if (isDark) {
        coreGlow.addColorStop(
          0,
          `rgba(255, 148, 48, ${0.18 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.32,
          `rgba(255, 94, 20, ${0.08 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.68,
          `rgba(126, 200, 176, ${0.05 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        coreGlow.addColorStop(
          0,
          `rgba(234, 88, 12, ${0.13 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.35,
          `rgba(217, 119, 6, ${0.06 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.7,
          `rgba(47, 111, 94, ${0.04 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius * 0.68, 0, Math.PI * 2);
      ctx.fill();

      // Tilted Milky Way Spiral Plane Projection
      const tilt = 0.46;
      const planeAngle = -0.35;
      const cosP = Math.cos(planeAngle);
      const sinP = Math.sin(planeAngle);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const s of stars) {
        if (!reducedMotion) {
          s.baseAngle += s.speed;
        }
        const r = 10 + s.normR * maxRadius;
        const theta = s.baseAngle + s.angleJitter;

        const lx = Math.cos(theta) * r;
        const ly = Math.sin(theta) * r * tilt;

        const x = cx + (lx * cosP - ly * sinP);
        const y = cy + (lx * sinP + ly * cosP);

        // Smooth radial falloff so the Milky Way fades out evenly toward the sides
        const radialFade = Math.max(0.03, (1 - s.normR) ** 1.55);
        const alpha = radialFade * sceneAlphaBoost;

        ctx.font = `${s.size}px monospace`;
        if (s.isCoreWarm) {
          ctx.fillStyle = isDark
            ? `rgba(255, 168, 76, ${Math.min(0.78, alpha * 1.15)})`
            : `rgba(194, 65, 12, ${Math.min(0.68, alpha * 1.05)})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(126, 200, 176, ${Math.min(0.65, alpha * 0.85)})`
            : `rgba(47, 111, 94, ${Math.min(0.58, alpha * 0.8)})`;
        }

        ctx.fillText(s.glyph, x, y);
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
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        maskImage:
          "radial-gradient(ellipse 92% 86% at 62% 50%, black 25%, rgba(0,0,0,0.55) 68%, transparent 98%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 92% 86% at 62% 50%, black 25%, rgba(0,0,0,0.55) 68%, transparent 98%)",
      }}
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
