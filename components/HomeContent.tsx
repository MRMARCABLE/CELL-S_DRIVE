"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import BootSequence from "@/components/home/BootSequence";
import ScenePrompt from "@/components/home/ScenePrompt";
import { useActiveScene } from "@/components/home/fx/hooks/useActiveScene";
import FocusScene from "@/components/home/scenes/FocusScene";
import IdentityScene from "@/components/home/scenes/IdentityScene";
import JourneyScene from "@/components/home/scenes/JourneyScene";
import StackScene from "@/components/home/scenes/StackScene";
import { credlyBadges, profile } from "@/data/portfolio";

export default function HomeContent() {
  const { t } = useLanguage();
  useActiveScene();

  return (
    <div className="space-y-8">
      <BootSequence />

      {/* 01 // PROFILE & HERO */}
      <IdentityScene />

      {/* 02 // FOCUS & ENGINEERING DOMAINS */}
      <FocusScene />

      {/* 03 // EXPERIENCE & EDUCATION */}
      <JourneyScene />

      {/* 04 // TECH STACK MATRIX */}
      <StackScene />

      {/* 05 // VERIFIED CREDENTIALS & CERTIFICATES */}
      <section
        id="scene-05"
        data-scene-index="05"
        className="scene-stage"
      >
        <ScenePrompt
          index="05"
          command="gpg --verify ./badges"
          badge={t.sections.credVerifyLink}
          subtitle={t.sections.credHeading}
        />

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {credlyBadges.map((badge) => (
              <div
                key={badge.id}
                className="soft-card soft-card-interactive group rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="holo-badge shrink-0 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-2">
                    <Image
                      src={badge.imageUrl}
                      alt={badge.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                      <span className="truncate">{badge.issuer}</span>
                      <span className="shrink-0 text-[var(--text-secondary)]">
                        {badge.issuedAt}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] transition leading-snug">
                      {badge.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {badge.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                        >
                          {skill}
                        </span>
                      ))}
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
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-text)] transition"
                  >
                    {t.sections.verifyBadge}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Certificates */}
          {t.certificates.map((cert) => (
            <div
              key={cert.id}
              className="soft-card soft-card-interactive rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                  <span className="rounded border border-[var(--border-soft)] bg-amber-500/8 px-2 py-0.5 text-[10px] text-amber-800 dark:text-amber-300/90">
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

      {/* 06 // REPOSITORIES & DIRECT CONTACT */}
      <section
        id="scene-06"
        data-scene-index="06"
        className="scene-stage"
      >
        <ScenePrompt
          index="06"
          command="./connect --interactive"
          badge={t.sections.networkBadge}
          subtitle={t.sections.networkHeading}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-[var(--accent-text)]">
                GITHUB // PUBLIC REPOS
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                github.com/MRMARCABLE
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.githubDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-sky-700 dark:text-sky-300/90">
                LINKEDIN // PROFESSIONAL PROFILE
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                {profile.name}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.linkedinDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-amber-800 dark:text-amber-300/90">
                CREDLY // DIGITAL CREDENTIALS
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                credly.com/users/yohannes-lalopua
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.credlyDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.gitEngUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-violet-800 dark:text-violet-300/90">
                GIT-ENG // UKWMS ACADEMIC
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                git-eng.ukwms.ac.id/5803025050
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.gitEngDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="soft-card soft-card-interactive group sm:col-span-2 rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-[var(--accent-text)]">
                {t.channels.emailTag}
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                {profile.email}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.emailDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--accent-text)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}

