"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

export default function CursorFollower() {
  const reducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const mq = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setFinePointer(mq.matches);
    updatePointer();
    mq.addEventListener("change", updatePointer);
    return () => mq.removeEventListener("change", updatePointer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!finePointer || reducedMotion) return;
    const el = dotRef.current;
    if (!el) return;

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${targetX - 10}px, ${
              targetY - 10
            }px, 0)`;
            dotRef.current.style.opacity = "1";
          }
          rafId = 0;
        });
      }
    };

    const handleLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [finePointer, reducedMotion]);

  if (!finePointer || reducedMotion) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] h-5 w-5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] opacity-0 transition-opacity duration-150"
    />
  );
}

