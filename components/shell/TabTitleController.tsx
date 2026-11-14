"use client";

import { useEffect, useRef } from "react";

const DEFAULT_TITLE = "Marca | Yohannes Marcel Lalopua — Portfolio";

export default function TabTitleController() {
  const originalTitleRef = useRef<string>(DEFAULT_TITLE);
  const wakeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (document.title) {
      originalTitleRef.current = document.title;
    }

    const handleVisibilityChange = () => {
      if (wakeTimerRef.current !== null) {
        window.clearTimeout(wakeTimerRef.current);
        wakeTimerRef.current = null;
      }

      if (document.hidden) {
        if (
          document.title &&
          !document.title.startsWith("marca --sleep") &&
          !document.title.startsWith("marca --wake")
        ) {
          originalTitleRef.current = document.title;
        }
        document.title = "marca --sleep ☾ // Yohannes Marcel Lalopua";
      } else {
        document.title = "marca --wake ✦ // Yohannes Marcel Lalopua";
        wakeTimerRef.current = window.setTimeout(() => {
          document.title = originalTitleRef.current || DEFAULT_TITLE;
        }, 1200);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (wakeTimerRef.current !== null) {
        window.clearTimeout(wakeTimerRef.current);
      }
    };
  }, []);

  return null;
}

