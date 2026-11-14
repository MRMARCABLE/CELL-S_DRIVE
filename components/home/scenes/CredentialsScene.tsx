"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { credlyBadges, profile } from "@/data/portfolio";

export default function CredentialsScene() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(
    credlyBadges[0]?.id ?? "01"
  );

  const activeBadge =
    credlyBadges.find((b) => b.id === selectedId) ?? credlyBadges[0];

  return (
    <section id="scene-05" data-scene-index="05" className="scene-stage">
      <ScenePrompt
        index="05"
        command="gpg --verify ./badges"
        subtitle={t.sections.credHeading}
        rightSlot={
          <a
            href={profile.credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--accent-text)] hover:underline"
          >
            {t.sections.credVerifyLink}
          </a>
        }
      />

      <div className="space-y-5">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left 2x2 Holographic Badge Vault */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {credlyBadges.map((badge) => {
              const isSelected = activeBadge?.id === badge.id;

              return (
                <div
                  key={badge.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(badge.id)}
                  onMouseEnter={() => setSelectedId(badge.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(badge.id);
                    }
                  }}
                  className={`group rounded-2xl border p-5 flex flex-col justify-between gap-4 cursor-pointer transition-all focus:outline-none ${
                    isSelected
                      ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-md -translate-y-0.5"
                      : "border-[var(--border-soft)] bg-[var(--bg-surface)]/75 hover:border-[var(--border-hover)] hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="holo-badge shrink-0 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-2.5 shadow-sm">
                      <Image
                        src={badge.imageUrl}
                        alt={badge.name}
                        width={72}
                        height={72}
                        className="h-[68px] w-[68px] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-[var(--text-muted)]">
                        <span className="truncate">{badge.issuer}</span>
                        <span className="shrink-0 text-[var(--text-secondary)]">
                          {badge.issuedAt}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold leading-snug text-[var(--text-primary)]">
                        {badge.name}
                      </h3>

                      <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--accent-text)]">
                        <span>GPG_SIG // OK ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 font-mono text-xs">
                    <span className="text-[var(--text-muted)]">
                      {`${t.sections.credLabel} // ${badge.id}`}
                    </span>
                    <a
                      href={badge.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-text)] transition"
                    >
                      {t.sections.verifyBadge}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Live GPG Credential Inspector */}
          {activeBadge ? (
            <div className="lg:col-span-5 soft-card rounded-2xl overflow-hidden border border-[var(--border-soft)]">
              <div className="flex items-center justify-between border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
                <span className="text-[var(--accent-text)] font-semibold">
                  {t.sceneUi.inspectBadge}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {`ID_${activeBadge.id}`}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="holo-badge shrink-0 rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-elevated)] p-3">
                    <Image
                      src={activeBadge.imageUrl}
                      alt={activeBadge.name}
                      width={88}
                      height={88}
                      className="h-20 w-20 object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs text-[var(--accent-text)]">
                      {activeBadge.issuer}
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-[var(--text-primary)]">
                      {activeBadge.name}
                    </h3>
                    <div className="font-mono text-xs text-[var(--text-muted)]">
                      {`${t.sections.issuedLabel}: ${activeBadge.issuedAt}`}
                    </div>
                  </div>
                </div>

                {/* GPG Verification Output */}
                <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 p-3.5 font-mono text-[11px] space-y-1 text-[var(--text-secondary)]">
                  <div>{`$ gpg --verify badge_${activeBadge.id}.asc`}</div>
                  <div className="text-[var(--text-muted)]">
                    {`gpg: Signature issued ${activeBadge.issuedAt}`}
                  </div>
                  <div className="text-[var(--accent-text)]">
                    {`gpg: Good signature from "${activeBadge.issuer}" [VALID]`}
                  </div>
                </div>

                {/* Verified Skills */}
                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    VERIFIED COMPETENCIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeBadge.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={activeBadge.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
                  >
                    <span>{t.sections.verifyBadge}</span>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Additional Certificate Archive (Codelamp) */}
        {t.certificates.map((cert) => (
          <div
            key={cert.id}
            className="soft-card soft-card-interactive rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                <span className="rounded border border-[var(--border-soft)] bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-800 dark:text-amber-300">
                  {cert.credentialType}
                </span>
                <span>{cert.issuer}</span>
                <span>•</span>
                <span className="text-[var(--text-secondary)]">
                  {cert.period}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {cert.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
              {`${t.sections.issuedLabel} // ${cert.issuedAt.toUpperCase()}`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

