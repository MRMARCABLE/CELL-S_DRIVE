"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { playSfx } from "@/components/shell/sound";
import { credlyBadges, profile } from "@/data/portfolio";

export default function CvContent() {
  const { t, locale } = useLanguage();

  const handlePrint = () => {
    playSfx("cmd");
    window.print();
  };

  return (
    <div className="space-y-8 py-4">
      <div className="no-print">
        <ScenePrompt
          index="CV"
          command="cat ./marcel_cv.spec --printable"
          subtitle={
            locale === "id"
              ? "RINGKASAN AKADEMIK & REKAYASA"
              : "ACADEMIC & ENGINEERING SPECIFICATION"
          }
          badge={`NRP // 5803025050`}
          rightSlot={
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
              >
                ← {t.nav.overview}
              </Link>
              <button
                type="button"
                onClick={handlePrint}
                data-cursor="key"
                className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-bg)] px-3.5 py-1.5 font-mono text-xs font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition cursor-pointer"
              >
                ⎙ {t.sceneUi.printCvBtn}
              </button>
            </div>
          }
        />
      </div>

      {/* Printable Resume Sheet */}
      <article className="cv-print-sheet soft-card rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Top Identity Header */}
        <header className="border-b border-[var(--border-soft)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-text)]">
              <span>✦</span>
              <span>{t.hero.roleBadge}</span>
              <span>·</span>
              <span>{t.hero.availability}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {profile.name}
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {t.hero.bio}
            </p>
          </div>

          <div className="font-mono text-xs space-y-1 text-[var(--text-secondary)] md:text-right shrink-0">
            <div>{profile.location}</div>
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="text-[var(--accent-text)] hover:underline"
              >
                {profile.email}
              </a>
            </div>
            <div>github.com/MRMARCABLE</div>
            <div>git-eng.ukwms.ac.id/5803025050</div>
            <div>credly.com/users/yohannes-lalopua</div>
          </div>
        </header>

        {/* Section 1: Education & Experience */}
        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-text)] border-b border-[var(--border-soft)] pb-2">
              {locale === "id" ? "01 // PENDIDIKAN" : "01 // EDUCATION"}
            </h2>
            <div className="space-y-4">
              {t.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                    <span>{edu.institution}</span>
                    <span>{edu.period}</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">
                    {edu.degree}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {edu.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-text)] border-b border-[var(--border-soft)] pb-2">
              {locale === "id"
                ? "02 // PENGALAMAN & ORGANISASI"
                : "02 // EXPERIENCE & LEADERSHIP"}
            </h2>
            <div className="space-y-4">
              {t.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                    <span>{exp.organization}</span>
                    <span>{exp.period}</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">
                    {exp.role}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Section 2: Technical Stack & Verified Credentials */}
        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-text)] border-b border-[var(--border-soft)] pb-2">
              {locale === "id"
                ? "03 // MATRIKS TEKNOLOGI"
                : "03 // TECHNICAL STACK"}
            </h2>
            <div className="space-y-3">
              {t.techCategories.map((bus) => (
                <div key={bus.id} className="space-y-1.5">
                  <div className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                    {`${bus.id} — ${bus.category}`}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bus.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-text)] border-b border-[var(--border-soft)] pb-2">
              {locale === "id"
                ? "04 // KREDENSIAL & SERTIFIKAT"
                : "04 // VERIFIED CREDENTIALS"}
            </h2>
            <ul className="space-y-2.5 text-xs">
              {credlyBadges.map((badge) => (
                <li
                  key={badge.id}
                  className="flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {badge.name}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {` — ${badge.issuer}`}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                    {badge.issuedAt}
                  </span>
                </li>
              ))}
              {t.certificates.map((cert) => (
                <li
                  key={cert.id}
                  className="flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {cert.name}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {` — ${cert.issuer}`}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                    {cert.issuedAt}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Section 3: Selected Engineering Projects */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-text)] border-b border-[var(--border-soft)] pb-2">
            {locale === "id"
              ? "05 // PROYEK REKAYASA & RISET"
              : "05 // SELECTED ENGINEERING PROJECTS"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/55 p-4 space-y-2"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
                  <span>{`${proj.id} // ${proj.code}`}</span>
                  <span>{proj.year}</span>
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  {proj.title}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {proj.desc}
                </p>
                <div className="font-mono text-[10px] text-[var(--accent-text)]">
                  {proj.architecture.join(" → ")}
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
