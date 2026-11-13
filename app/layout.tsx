import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import { profile } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Marca | Yohannes Marcel Lalopua — Portfolio",
    template: "%s | Yohannes Marcel Lalopua",
  },
  description:
    "Informatics Student at UKWMS — Full-Stack Web Development, UI/UX (UCD), Autonomous AI Agents & Embedded Robotics Portfolio.",
  openGraph: {
    title: "Marca | Yohannes Marcel Lalopua — Portfolio",
    description:
      "Informatics Student at UKWMS — Web Development, UI/UX, AI Agents & Embedded Systems Portfolio.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: profile.avatarUrl,
        width: 460,
        height: 460,
        alt: "Yohannes Marcel Lalopua",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Marca | Yohannes Marcel Lalopua — Portfolio",
    description:
      "Informatics Student at UKWMS — Web Development, UI/UX, AI Agents & Embedded Systems.",
    images: [profile.avatarUrl],
  },
};

const themeInitScript = `
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
    var l = localStorage.getItem('locale');
    if (l === 'id' || l === 'en') document.documentElement.lang = l;
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full flex flex-col text-[var(--text-primary)] selection:bg-emerald-500/15 selection:text-[var(--accent-text)]">
        {/* Atmospheric shadowy texture & grain */}
        <div
          aria-hidden="true"
          className="ambient-backdrop pointer-events-none fixed inset-0 z-0"
        />
        <div
          aria-hidden="true"
          className="ambient-grain pointer-events-none fixed inset-0 z-0"
        />

        <LanguageProvider>
          <Navbar />

          <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-12">
            {children}
          </main>

          <footer className="relative z-10 border-t border-[var(--border-soft)] bg-[var(--bg-nav)] backdrop-blur-md py-8">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-text)] opacity-75" />
              <span>© 2026 YOHANNES MARCEL LALOPUA // SURABAYA, ID</span>
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
        </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
