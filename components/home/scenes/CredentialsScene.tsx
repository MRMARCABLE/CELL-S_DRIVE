"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { playSfx } from "@/components/shell/sound";
import { credlyBadges, profile } from "@/data/portfolio";

export default function CredentialsScene() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState<string>(
    credlyBadges[0]?.id ?? "01"
  );
  const [vaultReady, setVaultReady] = useState(false);
  const [prismSweep, setPrismSweep] = useState(false);
  const [typedStep, setTypedStep] = useState<number>(3);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVaultReady(true);
            setPrismSweep(true);
            setTypedStep(1);
            window.setTimeout(() => setPrismSweep(false), 1500);
          }
        });
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(() => setTypedStep(1), 20);
    const t2 = window.setTimeout(() => setTypedStep(2), 210);
    const t3 = window.setTimeout(() => setTypedStep(3), 430);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [selectedId]);

  const handleSelectCredential = (id: string) => {
    setSelectedId(id);
    setTypedStep(0);
    playSfx("key");
  };

  const selectedBadge = credlyBadges.find((b) => b.id === selectedId) ?? null;
  const selectedCert =
    t.certificates.find((c) => c.id === selectedId) ?? null;

  const handleFoilMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = `${Math.round(((e.clientX - rect.left) / rect.width) * 100)}%`;
    const my = `${Math.round(((e.clientY - rect.top) / rect.height) * 100)}%`;
    e.currentTarget.style.setProperty("--mx", mx);
    e.currentTarget.style.setProperty("--my", my);
  };

  return (
    <section
      ref={sectionRef}
      id="scene-05"
      data-scene-index="05"
      className="scene-stage"
    >
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
          {/* Left 2x2 Holographic Badge Vault + Certificate Trigger */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {credlyBadges.map((badge, idx) => {
                const isSelected = selectedId === badge.id;

                return (
                  <div
                    key={badge.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    data-cursor="gpg"
                    onClick={() => handleSelectCredential(badge.id)}
                    onMouseEnter={() => {
                      if (selectedId !== badge.id) {
                        setSelectedId(badge.id);
                      }
                    }}
                    onMouseMove={handleFoilMove}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectCredential(badge.id);
                      }
                    }}
                    style={{
                      transitionDelay: `${idx * 90}ms`,
                    }}
                    className={`holo-card-foil group rounded-2xl border p-5 flex flex-col justify-between gap-4 cursor-pointer transition-all duration-500 focus:outline-none ${
                      vaultReady
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    } ${
                      isSelected
                        ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-md -translate-y-0.5"
                        : "border-[var(--border-soft)] bg-[var(--bg-surface)]/75 hover:border-[var(--border-hover)] hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        data-active={
                          isSelected || prismSweep ? "true" : "false"
                        }
                        className="holo-badge shrink-0 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-2.5 shadow-sm"
                      >
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
                          <span>{t.sceneUi.gpgValidLabel}</span>
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

            {/* Selectable Additional Certificate Archive (Codelamp) */}
            {t.certificates.map((cert) => {
              const isSelected = selectedId === cert.id;
              return (
                <div
                  key={cert.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  data-cursor="gpg"
                  onClick={() => handleSelectCredential(cert.id)}
                  onMouseEnter={() => {
                    if (selectedId !== cert.id) {
                      setSelectedId(cert.id);
                    }
                  }}
                  onMouseMove={handleFoilMove}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectCredential(cert.id);
                    }
                  }}
                  style={{ transitionDelay: "360ms" }}
                  className={`holo-card-foil soft-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-500 focus:outline-none ${
                    vaultReady
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  } ${
                    isSelected
                      ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-md"
                      : "hover:border-[var(--border-hover)]"
                  }`}
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
              );
            })}
          </div>

          {/* Right Live Unified GPG / Certificate Inspector */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 soft-card rounded-2xl overflow-hidden border border-[var(--border-soft)]">
            <div className="flex items-center justify-between border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
              <span className="text-[var(--accent-text)] font-semibold">
                {t.sceneUi.inspectBadge}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {`ID_${selectedId}`}
              </span>
            </div>

            {selectedBadge ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    data-active="true"
                    className="holo-badge shrink-0 rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-elevated)] p-3"
                  >
                    <Image
                      src={selectedBadge.imageUrl}
                      alt={selectedBadge.name}
                      width={88}
                      height={88}
                      className="h-20 w-20 object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs text-[var(--accent-text)]">
                      {selectedBadge.issuer}
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-[var(--text-primary)]">
                      {selectedBadge.name}
                    </h3>
                    <div className="font-mono text-xs text-[var(--text-muted)]">
                      {`${t.sections.issuedLabel}: ${selectedBadge.issuedAt}`}
                    </div>
                  </div>
                </div>

                {/* GPG Verification Output — Live Terminal Typewriter */}
                <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 p-3.5 font-mono text-[11px] space-y-1.5 text-[var(--text-secondary)]">
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      {`$ gpg --verify badge_${selectedBadge.id}.asc`}
                      {typedStep < 3 && (
                        <span className="cursor-blink ml-1 text-[var(--accent-primary)]">
                          ▋
                        </span>
                      )}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                      {typedStep >= 3 ? "DECIPHERED" : "VERIFYING..."}
                    </span>
                  </div>
                  <div
                    className={`text-[var(--text-muted)] transition-all duration-200 ${
                      typedStep >= 2
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }`}
                  >
                    {`gpg: Signature issued ${selectedBadge.issuedAt}`}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-[var(--accent-text)] transition-all duration-200 ${
                      typedStep >= 3
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }`}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{`gpg: Good signature from "${selectedBadge.issuer}" [VALID]`}</span>
                    <span className="cursor-blink text-[var(--accent-primary)]">
                      _
                    </span>
                  </div>
                </div>

                {/* Verified Skills */}
                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    {t.sceneUi.verifiedCompetencies}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBadge.skills.map((skill) => (
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
                    href={selectedBadge.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
                  >
                    <span>{t.sections.verifyBadge}</span>
                  </a>
                </div>
              </div>
            ) : selectedCert ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    data-active="true"
                    className="holo-badge flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 font-mono text-2xl font-bold text-amber-700 dark:text-amber-300"
                  >
                    ✦
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs text-amber-700 dark:text-amber-300">
                      {selectedCert.issuer}
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-[var(--text-primary)]">
                      {selectedCert.name}
                    </h3>
                    <div className="font-mono text-xs text-[var(--text-muted)]">
                      {`${selectedCert.period} · ${selectedCert.issuedAt}`}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 p-3.5 font-mono text-[11px] space-y-1.5 text-[var(--text-secondary)]">
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      {`$ gpg --verify cert_${selectedCert.id}.sig`}
                      {typedStep < 3 && (
                        <span className="cursor-blink ml-1 text-[var(--accent-primary)]">
                          ▋
                        </span>
                      )}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                      {typedStep >= 3 ? "DECIPHERED" : "VERIFYING..."}
                    </span>
                  </div>
                  <div
                    className={`text-[var(--text-muted)] transition-all duration-200 ${
                      typedStep >= 2
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }`}
                  >
                    {`Type: ${selectedCert.credentialType}`}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-[var(--accent-text)] transition-all duration-200 ${
                      typedStep >= 3
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }`}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.sceneUi.certificateValidLabel}</span>
                    <span className="cursor-blink text-[var(--accent-primary)]">
                      _
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    {t.sceneUi.verifiedCompetencies}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Outgoing Transition Bridge: 05 -> 06 Cosmic Singularity Convergence */}
        <div
          aria-hidden="true"
          className="pointer-events-none flex flex-col items-center justify-center pt-4 opacity-80"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.26em] uppercase text-[var(--text-muted)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
            <span>05 → 06 // CONVERGING GALAXY TO SINGULARITY</span>
          </div>
          <div className="mt-2 h-10 w-px bg-gradient-to-b from-[var(--accent-primary)] via-amber-400/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
