import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="relative min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Ambient top radial spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.10),transparent)]"
        />

        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-zinc-800/80 bg-zinc-950/90 py-8">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
              <span>© 2026 YOHANNES MARCEL LALOPUA // SURABAYA, ID</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-mono">
              <a
                href={`mailto:${profile.email}`}
                className="text-zinc-400 hover:text-emerald-400 transition"
              >
                EMAIL ↗
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition"
              >
                GITHUB ↗
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition"
              >
                LINKEDIN ↗
              </a>
              <a
                href={profile.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition"
              >
                CREDLY ↗
              </a>
              <a
                href={profile.gitEngUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition"
              >
                GIT-ENG ↗
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
