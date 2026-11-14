"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { useActiveScene } from "@/components/home/fx/hooks/useActiveScene";
import { credlyBadges, profile } from "@/data/portfolio";

export default function HomeContent() {
  const { t } = useLanguage();
  useActiveScene();

  return (
    <div className="space-y-8">
      {/* 01 // PROFILE & HERO */}
      <section
        id="scene-01"
        data-scene-index="01"
        className="scene-stage"
      >
        <ScenePrompt
          index="01"
          command="whoami --profile"
          badge={`STATUS: ${t.hero.availability}`}
          subtitle={t.hero.sectionLabel}
        />

        <div className="soft-card relative rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-1.5 shadow-sm">
              <Image
                src={profile.avatarUrl}
                alt={`Profile photo of ${profile.name}`}
                width={96}
                height={96}
                priority
                className="rounded-lg object-cover"
              />
              <span
                title={t.hero.availability}
                className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg-base)] bg-[var(--accent-text)]"
              />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]">
                <span>{t.hero.roleBadge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                {profile.name}
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {t.hero.bio}
              </p>

              <p className="font-mono text-xs italic text-[var(--accent-text)] pt-1">
                {`“${t.quotes.chaosStar}”`}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-soft)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:opacity-90 transition"
              >
                <span>{t.hero.exploreProjects}</span>
                <span className="font-mono">→</span>
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2 text-sm font-medium text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
              >
                <span>{t.hero.contactMe}</span>
                <span className="font-mono text-xs">↗</span>
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
              >
                <span>GitHub</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">↗</span>
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
              >
                <span>LinkedIn</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">↗</span>
              </a>
            </div>

            <div className="font-mono text-xs text-[var(--text-muted)]">
              {profile.location.toUpperCase()}
            </div>
          </div>
        </div>
      </section>

      {/* 02 // FOCUS & ENGINEERING DOMAINS */}
      <section
        id="scene-02"
        data-scene-index="02"
        className="scene-stage"
      >
        <ScenePrompt
          index="02"
          command="ls ./focus --deck"
          badge={t.sections.focusBadge}
          subtitle={t.sections.focusHeading}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {t.focusDomains.map((domain) => (
            <div
              key={domain.id}
              className="soft-card soft-card-interactive group rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {`${domain.id} ${domain.suit}`}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] ${domain.accent}`}
                  >
                    {domain.code}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] transition">
                  {domain.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 // EXPERIENCE & EDUCATION */}
      <section
        id="scene-03"
        data-scene-index="03"
        className="scene-stage"
      >
        <ScenePrompt
          index="03"
          command="git log --graph --all"
          badge={t.sections.expBadge}
          subtitle={t.sections.expHeading}
        />

        <div className="grid gap-4 lg:grid-cols-5">
          {/* Experience Column */}
          <div className="lg:col-span-3 space-y-3">
            {t.experiences.map((exp) => (
              <div
                key={exp.id}
                className="soft-card soft-card-interactive rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent-text)]">
                    {exp.type}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {exp.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-0.5">
                    {exp.organization}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {exp.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Column */}
          <div className="lg:col-span-2 space-y-3">
            {t.education.map((edu) => (
              <div
                key={edu.id}
                className="soft-card soft-card-interactive rounded-2xl p-5 space-y-2.5"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
                  <span>{`EDU // ${edu.id}`}</span>
                  <span className="text-[var(--text-secondary)]">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug">
                  {edu.institution}
                </h3>
                <p className="text-xs font-medium text-[var(--accent-text)]">
                  {edu.degree}
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {edu.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 // TECH STACK MATRIX */}
      <section
        id="scene-04"
        data-scene-index="04"
        className="scene-stage"
      >
        <ScenePrompt
          index="04"
          command="lsmod --matrix"
          badge={t.sections.stackBadge}
          subtitle={t.sections.stackHeading}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {t.techCategories.map((group) => (
            <div
              key={group.id}
              className="soft-card rounded-2xl p-5 space-y-3"
            >
              <h3 className="font-mono text-xs text-[var(--text-secondary)]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-xs text-[var(--text-primary)] hover:border-[var(--border-hover)] transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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

