import Image from "next/image";
import Link from "next/link";
import {
  certificates,
  credlyBadges,
  education,
  experiences,
  focusDomains,
  profile,
  techCategories,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="space-y-16 py-4">
      {/* 01 // PROFILE & HERO */}
      <section className="relative rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-4 mb-6 font-mono text-xs text-zinc-500">
          <span>01 // DEVELOPER PROFILE</span>
          <span className="text-emerald-400">
            STATUS: {profile.availability}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0 rounded-xl border border-zinc-700/80 bg-zinc-900 p-1.5 shadow-lg">
            <Image
              src={profile.avatarUrl}
              alt={`Profile photo of ${profile.name}`}
              width={96}
              height={96}
              priority
              className="rounded-lg object-cover"
            />
            <span
              title="Available for Collaboration & Internships"
              className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-400"
            />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 font-mono text-xs text-zinc-300">
              <span>{profile.roleBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              {profile.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition"
            >
              <span>Explore Project Suite</span>
              <span className="font-mono">→</span>
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 transition"
            >
              <span>Contact Me</span>
              <span className="font-mono text-xs">↗</span>
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
            >
              <span>GitHub</span>
              <span className="font-mono text-xs text-zinc-500">↗</span>
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
            >
              <span>LinkedIn</span>
              <span className="font-mono text-xs text-zinc-500">↗</span>
            </a>
          </div>

          <div className="font-mono text-xs text-zinc-500">
            {profile.location.toUpperCase()}
          </div>
        </div>
      </section>

      {/* 02 // FOCUS & ENGINEERING DOMAINS */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            02 // Engineering & Research Focus
          </h2>
          <span className="font-mono text-xs text-zinc-600">
            {focusDomains.length} CORE PILLARS
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {focusDomains.map((domain) => (
            <div
              key={domain.id}
              className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500">
                    {domain.id}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] ${domain.accent}`}
                  >
                    {domain.code}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition">
                  {domain.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 // EXPERIENCE & EDUCATION */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            03 // Experience & Education
          </h2>
          <span className="font-mono text-xs text-zinc-600">
            TRACK RECORD
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {/* Experience Column */}
          <div className="lg:col-span-3 space-y-3">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 transition space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    {exp.type}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {exp.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-zinc-100">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-0.5">
                    {exp.organization}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {exp.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-zinc-800 bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
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
            {education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-xl border border-zinc-800/90 bg-zinc-900/20 p-5 hover:border-zinc-700 transition space-y-2.5"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
                  <span>EDU // {edu.id}</span>
                  <span className="text-zinc-400">{edu.period}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 leading-snug">
                  {edu.institution}
                </h3>
                <p className="text-xs font-medium text-emerald-400">
                  {edu.degree}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {edu.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 // TECH STACK MATRIX */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            04 // Tech Stack & Tooling Matrix
          </h2>
          <span className="font-mono text-xs text-zinc-600">MODULAR STACK</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {techCategories.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-zinc-800/90 bg-zinc-900/20 p-5 space-y-3"
            >
              <h3 className="font-mono text-xs text-zinc-400">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 text-xs text-zinc-200 hover:border-zinc-700 transition"
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
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            05 // Verified Credentials & Certificates
          </h2>
          <a
            href={profile.credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-emerald-400 hover:underline"
          >
            CREDLY VERIFIED ↗
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {credlyBadges.map((badge) => (
            <div
              key={badge.id}
              className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-950 p-2">
                  <Image
                    src={badge.imageUrl}
                    alt={badge.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-zinc-500">
                    <span className="truncate">{badge.issuer}</span>
                    <span className="shrink-0 text-zinc-400">
                      {badge.issuedAt}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition leading-snug">
                    {badge.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {badge.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-zinc-800 bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800/70 pt-3 font-mono text-xs">
                <span className="text-zinc-500">CREDENTIAL // {badge.id}</span>
                <a
                  href={badge.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-emerald-400 transition"
                >
                  Verify Badge ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Certificates */}
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-500">
                <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
                  {cert.credentialType}
                </span>
                <span>{cert.issuer}</span>
                <span>•</span>
                <span className="text-zinc-400">{cert.period}</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100">
                {cert.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-zinc-800 bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 font-mono text-xs text-zinc-500">
              ISSUED // {cert.issuedAt.toUpperCase()}
            </div>
          </div>
        ))}
      </section>

      {/* 06 // REPOSITORIES & DIRECT CONTACT */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            06 // Repositories & Direct Contact
          </h2>
          <span className="font-mono text-xs text-zinc-600">5 CHANNELS</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-emerald-400">
                GITHUB // PUBLIC REPOS
              </div>
              <div className="text-base font-semibold text-zinc-100">
                github.com/MRMARCABLE
              </div>
              <p className="text-xs text-zinc-400">
                Open-source code, personal engineering builds, and web experiments.
              </p>
            </div>
            <span className="font-mono text-lg text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-sky-400">
                LINKEDIN // PROFESSIONAL PROFILE
              </div>
              <div className="text-base font-semibold text-zinc-100">
                {profile.name}
              </div>
              <p className="text-xs text-zinc-400">
                Professional network, academic milestones, and industry connections.
              </p>
            </div>
            <span className="font-mono text-lg text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-amber-400">
                CREDLY // DIGITAL CREDENTIALS
              </div>
              <div className="text-base font-semibold text-zinc-100">
                credly.com/users/yohannes-lalopua
              </div>
              <p className="text-xs text-zinc-400">
                Verified digital badges from IBM SkillsBuild and Certiport.
              </p>
            </div>
            <span className="font-mono text-lg text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.gitEngUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-violet-400">
                GIT-ENG // UKWMS ACADEMIC
              </div>
              <div className="text-base font-semibold text-zinc-100">
                git-eng.ukwms.ac.id/5803025050
              </div>
              <p className="text-xs text-zinc-400">
                Academic repository at Faculty of Engineering, UKWMS.
              </p>
            </div>
            <span className="font-mono text-lg text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="group sm:col-span-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-emerald-400">
                DIRECT EMAIL // COLLABORATION & INTERNSHIPS
              </div>
              <div className="text-base font-semibold text-zinc-100">
                {profile.email}
              </div>
              <p className="text-xs text-zinc-400">
                Open to software engineering internships, UI/UX collaborations, and AI/IoT projects.
              </p>
            </div>
            <span className="font-mono text-lg text-emerald-400 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
