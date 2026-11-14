"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

function isInteractiveInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target.isContentEditable
  );
}

export default function HotkeysController() {
  const { locale, setLocale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const lastGTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isInteractiveInput(e.target)) return;

      const key = e.key.toLowerCase();
      const now = Date.now();

      // Chord: G then P -> /projects, G then H -> /
      if (now - lastGTimeRef.current < 900) {
        if (key === "p") {
          e.preventDefault();
          lastGTimeRef.current = 0;
          router.push("/projects");
          return;
        }
        if (key === "h") {
          e.preventDefault();
          lastGTimeRef.current = 0;
          router.push("/");
          return;
        }
      }

      if (key === "g") {
        lastGTimeRef.current = now;
        return;
      }

      if (key === "t") {
        e.preventDefault();
        const nextDark = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", nextDark);
        try {
          localStorage.setItem("theme", nextDark ? "dark" : "light");
        } catch {
          // Ignore storage errors
        }
        return;
      }

      if (key === "l") {
        e.preventDefault();
        setLocale(locale === "en" ? "id" : "en");
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        const cliInput = document.getElementById(
          "marca-cli-input"
        ) as HTMLInputElement | null;
        if (cliInput) {
          cliInput.scrollIntoView({ behavior: "smooth", block: "center" });
          window.setTimeout(() => cliInput.focus(), 220);
        } else {
          router.push("/#scene-06");
        }
        return;
      }

      if (pathname === "/" && /^[1-6]$/.test(key)) {
        const sceneEl = document.getElementById(`scene-0${key}`);
        if (sceneEl) {
          e.preventDefault();
          sceneEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [locale, pathname, router, setLocale]);

  return null;
}

