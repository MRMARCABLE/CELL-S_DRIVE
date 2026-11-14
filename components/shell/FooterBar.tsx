"use client";

import { useLanguage } from "@/components/LanguageProvider";
import SessionUptime from "@/components/shell/SessionUptime";
import { profile } from "@/data/portfolio";

export default function FooterBar() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-[var(--border-soft)] bg-[var(--bg-nav)] backdrop-blur-md py-8">
      <div className="max-w-6xl mx-auto px-6 space-y-4 text-xs text-[var(--text-muted)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 font-mono">
            <span className="text-[var(--accent-text)]">✦</span>
            <span>© 2026 YOHANNES MARCEL LALOPUA // SURABAYA, ID</span>
            <SessionUptime />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-mono">
            <a
              href={`mailto:${profile.email}`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-text)] transition"
            >
              EMAIL ↗
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
            >
              GITHUB ↗
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
            >
              LINKEDIN ↗
            </a>
            <a
              href={profile.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
            >
              CREDLY ↗
            </a>
            <a
              href={profile.gitEngUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
            >
              GIT-ENG ↗
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-soft)] pt-3 font-mono text-[11px] text-[var(--text-muted)]">
          <span>{t.sceneUi.shortcutsFooter}</span>
          <span>NRP // 5803025050</span>
        </div>
      </div>
    </footer>
  );
}

