"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";

function getBusDomainTag(busId: string): string {
  if (busId === "BUS_01") return "WEB.3D_UX ♠";
  if (busId === "BUS_02") return "AI.AGENT ♦";
  return "SYS.EMBED ♣";
}

function getBusColorClasses(busId: string): {
  led: string;
  badge: string;
  activeBorder: string;
} {
  if (busId === "BUS_01") {
    return {
      led: "bg-sky-500",
      badge:
        "border-sky-500/40 bg-sky-500/10 text-sky-800 dark:text-sky-300",
      activeBorder: "border-sky-500/55",
    };
  }
  if (busId === "BUS_02") {
    return {
      led: "bg-rose-500",
      badge:
        "border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300",
      activeBorder: "border-rose-500/55",
    };
  }
  return {
    led: "bg-emerald-500",
    badge:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    activeBorder: "border-emerald-500/55",
  };
}

export default function StackScene() {
  const { t } = useLanguage();
  const [activeBus, setActiveBus] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<{
    skill: string;
    busId: string;
    pinHex: string;
  }>({
    skill: "Next.js (App Router)",
    busId: "BUS_01",
    pinHex: "0x01",
  });

  // Compute strict sequential hex pin addresses (0x01..0x0F) without skipping indices
  const busesWithPins = useMemo(() => {
    return t.techCategories.map((group, groupIdx) => {
      const startOffset = t.techCategories
        .slice(0, groupIdx)
        .reduce((acc, g) => acc + g.items.length, 0);
      return {
        ...group,
        keycaps: group.items.map((skill, idx) => ({
          skill,
          pinHex: `0x${(startOffset + idx + 1)
            .toString(16)
            .toUpperCase()
            .padStart(2, "0")}`,
        })),
      };
    });
  }, [t.techCategories]);

  const activeCategoryLabel =
    t.techCategories.find((g) => g.id === selectedSkill.busId)?.category ??
    t.techCategories[0]?.category ??
    "";

  return (
    <section id="scene-04" data-scene-index="04" className="scene-stage">
      <ScenePrompt
        index="04"
        command="lsmod --matrix"
        subtitle={t.sections.stackHeading}
        badge={t.sections.stackBadge}
      />

      <div className="soft-card rounded-3xl p-5 sm:p-7 space-y-6">
        {/* Top Hardware Bus Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveBus(null)}
              className={`rounded-lg border px-3 py-1.5 transition cursor-pointer ${
                activeBus === null
                  ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold"
                  : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              {t.sceneUi.filterBusAll}
            </button>

            {busesWithPins.map((group) => {
              const isBusSelected = activeBus === group.id;
              const colors = getBusColorClasses(group.id);
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() =>
                    setActiveBus((prev) =>
                      prev === group.id ? null : group.id
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 transition cursor-pointer ${
                    isBusSelected
                      ? `${colors.badge} font-semibold`
                      : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${colors.led}`} />
                  <span>{group.id}</span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {t.sceneUi.modulesMounted}
          </span>
        </div>

        {/* 3 Circuit Bus Columns */}
        <div className="grid gap-5 lg:grid-cols-3">
          {busesWithPins.map((group) => {
            const isDimmed = activeBus !== null && activeBus !== group.id;
            const isHighlighted = activeBus === group.id;
            const colors = getBusColorClasses(group.id);

            return (
              <div
                key={group.id}
                onMouseEnter={() => setActiveBus(group.id)}
                onMouseLeave={() => setActiveBus(null)}
                className={`rounded-2xl border bg-[var(--bg-elevated)]/55 p-5 transition-all duration-200 flex flex-col justify-between space-y-5 ${
                  isHighlighted
                    ? `${colors.activeBorder} shadow-md`
                    : "border-[var(--border-soft)]"
                } ${isDimmed ? "opacity-45" : "opacity-100"}`}
              >
                <div className="space-y-3">
                  {/* Bus Header */}
                  <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${colors.led}`}
                      />
                      <span className="font-semibold text-[var(--text-primary)]">
                        {group.busCode}
                      </span>
                    </div>
                    <span
                      className={`rounded border px-1.5 py-0.5 text-[10px] ${colors.badge}`}
                    >
                      {getBusDomainTag(group.id)}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {group.category}
                  </h3>

                  {/* Mechanical Keycaps Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {group.keycaps.map(({ skill, pinHex }) => {
                      const isKeySelected = selectedSkill.skill === skill;

                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() =>
                            setSelectedSkill({
                              skill,
                              busId: group.id,
                              pinHex,
                            })
                          }
                          onMouseEnter={() =>
                            setSelectedSkill({
                              skill,
                              busId: group.id,
                              pinHex,
                            })
                          }
                          className={`group/key relative flex flex-col justify-between rounded-xl border border-b-[3px] p-2.5 text-left transition-all active:translate-y-0.5 cursor-pointer ${
                            isKeySelected
                              ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-sm -translate-y-0.5"
                              : "border-[var(--border-soft)] bg-[var(--bg-surface)]/85 hover:border-[var(--border-hover)] hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="flex w-full items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                            <span>{pinHex}</span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition ${
                                isKeySelected
                                  ? "bg-[var(--accent-text)]"
                                  : "bg-[var(--border-hover)] group-hover/key:bg-[var(--accent-text)]"
                              }`}
                            />
                          </div>
                          <div className="mt-2 font-mono text-xs font-medium text-[var(--text-primary)] leading-tight">
                            {skill}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bus Trace Footer */}
                <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 font-mono text-[10px] text-[var(--text-muted)]">
                  <span>{`${t.sceneUi.modulesCountLabel}: ${group.items.length}`}</span>
                  <span>{t.sceneUi.statusOnline}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Live Kernel Module Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-[var(--accent-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent-text)] border border-[var(--accent-border)]">
              {`MODINFO // ${selectedSkill.pinHex}`}
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              {selectedSkill.skill}
            </span>
            <span className="text-[var(--text-muted)]">—</span>
            <span className="text-[var(--text-secondary)]">
              {activeCategoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--accent-text)]">
            <span>{`${selectedSkill.busId} → ${getBusDomainTag(selectedSkill.busId)}`}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
