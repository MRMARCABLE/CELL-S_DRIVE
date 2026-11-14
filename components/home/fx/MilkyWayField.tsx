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

    const stars: GalaxyStar[] = Array.from({ length: 240 }, (_, i) => {
      const arm = i % 3;
      const normR = (i / 240) ** 0.8;
      return {
        arm,
        normR,
        baseAngle: (arm * (Math.PI * 2)) / 3 + normR * 4.4,
        angleJitter: ((i * 29) % 19 - 9) * 0.034,
        speed: 0.0026 + (1 - normR) * 0.0042,
        glyph: GALAXY_GLYPHS[i % GALAXY_GLYPHS.length],
        size: normR < 0.18 ? 13 : 9.5 + (i % 3) * 1.5,
        isCoreWarm: normR < 0.32 || i % 8 === 0,
      };
    });

    let rafId = 0;
    let lastTime = 0;
    let currentXRatio = 0.72;
    let currentYRatio = 0.47;

    const draw = (now: number) => {
      if (now - lastTime < 34) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTime = now;

      const isDark = document.documentElement.classList.contains("dark");
      const activeScene = document.documentElement.dataset.scene ?? "01";
      const w = canvas.width;
      const h = canvas.height;

      // Single unified Milky Way: anchored to the right side of Hero (Scene 01),
      // drifting softly in the background on 02..05, and re-centering on 06
      const targetXRatio =
        activeScene === "01"
          ? w >= 1024
            ? 0.72
            : 0.66
          : activeScene === "06"
            ? 0.5
            : 0.62;
      const targetYRatio = activeScene === "01" ? 0.47 : 0.5;

      currentXRatio += (targetXRatio - currentXRatio) * 0.06;
      currentYRatio += (targetYRatio - currentYRatio) * 0.06;

      const cx = w * currentXRatio;
      const cy = h * currentYRatio;
      const maxRadius = Math.min(w, h) * (activeScene === "01" ? 0.54 : 0.46);
      const sceneAlphaBoost = activeScene === "01" ? 1.05 : 0.52;

      ctx.clearRect(0, 0, w, h);

      // Soft Orange-Amber-Emerald Galactic Core Nebular Glow
      const coreGlow = ctx.createRadialGradient(
        cx,
        cy,
        2,
        cx,
        cy,
        maxRadius * 0.65
      );
      if (isDark) {
        coreGlow.addColorStop(
          0,
          `rgba(255, 225, 165, ${0.34 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.2,
          `rgba(255, 140, 36, ${0.22 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.55,
          `rgba(126, 200, 176, ${0.08 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        coreGlow.addColorStop(
          0,
          `rgba(20, 18, 16, ${0.26 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.22,
          `rgba(234, 88, 12, ${0.18 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(
          0.58,
          `rgba(47, 111, 94, ${0.07 * sceneAlphaBoost})`
        );
        coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Center Dancing Star Nucleus of the single Milky Way
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 16px monospace";
      ctx.fillStyle = isDark
        ? `rgba(255, 245, 220, ${Math.min(0.95, 0.85 * sceneAlphaBoost)})`
        : `rgba(20, 18, 16, ${Math.min(0.9, 0.8 * sceneAlphaBoost)})`;
      ctx.fillText("✦", cx, cy);

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
