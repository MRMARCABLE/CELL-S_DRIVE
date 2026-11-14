"use client";

import { useEffect, useState } from "react";

export const SCENE_EVENT = "portfolio-scene-change";

export interface SceneMeta {
  id: string;
  index: string;
  cmd: string;
}

export const HOME_SCENES: readonly SceneMeta[] = [
  { id: "scene-01", index: "01", cmd: "whoami" },
  { id: "scene-02", index: "02", cmd: "ls ./focus --deck" },
  { id: "scene-03", index: "03", cmd: "git log --graph" },
  { id: "scene-04", index: "04", cmd: "lsmod --matrix" },
  { id: "scene-05", index: "05", cmd: "gpg --verify" },
  { id: "scene-06", index: "06", cmd: "./connect" },
];

export function useActiveScene(): string {
  const [activeIndex, setActiveIndex] = useState<string>("01");

  useEffect(() => {
    document.documentElement.dataset.scene = "01";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx =
              (entry.target as HTMLElement).dataset.sceneIndex ?? "01";
            setActiveIndex(idx);
            document.documentElement.dataset.scene = idx;
            window.dispatchEvent(
              new CustomEvent(SCENE_EVENT, { detail: { index: idx } })
            );
          }
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: 0.01,
      }
    );

    for (const scene of HOME_SCENES) {
      const el = document.getElementById(scene.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeIndex;
}

