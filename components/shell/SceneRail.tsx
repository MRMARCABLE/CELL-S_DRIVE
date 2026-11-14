"use client";

import { useSyncExternalStore } from "react";
import { useLanguage } from "@/components/LanguageProvider";

interface RailNode {
  scene: string;
  targetId: string;
  en: string;
  id: string;
}

const RAIL_NODES: RailNode[] = [
  { scene: "01", targetId: "scene-01", en: "Identity", id: "Identitas" },
  { scene: "02", targetId: "scene-02", en: "Focus", id: "Fokus" },
  { scene: "03", targetId: "scene-03", en: "Journey", id: "Perjalanan" },
  { scene: "04", targetId: "scene-04", en: "Stack", id: "Stack" },
  { scene: "05", targetId: "scene-05", en: "Vault", id: "Kredensial" },
  { scene: "06", targetId: "scene-06", en: "Connect", id: "Koneksi" },
];

function subscribeScene(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-scene"],
  });
  return () => observer.disconnect();
}

function getSceneSnapshot() {
  return document.documentElement.dataset.scene ?? "01";
}

function getSceneServerSnapshot() {
  return "01";
}

export default function SceneRail() {
  const { locale } = useLanguage();
  const activeScene = useSyncExternalStore(
    subscribeScene,
    getSceneSnapshot,
    getSceneServerSnapshot
  );

  const jumpToScene = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      aria-label={locale === "id" ? "Navigasi scene" : "Scene minimap rail"}
      className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2.5"
    >
      <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-2 py-3 shadow-lg flex flex-col items-end gap-2">
        {RAIL_NODES.map((node) => {
          const isActive = activeScene === node.scene;
          const label = locale === "id" ? node.id : node.en;
          return (
            <button
              key={node.scene}
              type="button"
              onClick={() => jumpToScene(node.targetId)}
              aria-current={isActive ? "location" : undefined}
              aria-label={`Jump to Scene ${node.scene}: ${label}`}
              className="group flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span
                className={`pointer-events-none rounded px-1.5 py-0.5 font-mono text-[10px] tracking-wider transition-all ${
                  isActive
                    ? "opacity-100 text-[var(--accent-text)] bg-[var(--accent-bg)] border border-[var(--accent-border)]"
                    : "opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-soft)]"
                }`}
              >
                {label.toUpperCase()}
              </span>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-md border font-mono text-[10px] font-semibold transition-all ${
                  isActive
                    ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-text)] shadow-[0_0_12px_var(--scene-glow-1)] scale-105"
                    : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:border-[var(--accent-border)] group-hover:text-[var(--text-primary)]"
                }`}
              >
                {node.scene}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

