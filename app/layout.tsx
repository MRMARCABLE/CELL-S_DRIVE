import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/shell/CursorFollower";
import FooterBar from "@/components/shell/FooterBar";
import HotkeysController from "@/components/shell/HotkeysController";
import TabTitleController from "@/components/shell/TabTitleController";
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
          <HotkeysController />
          <TabTitleController />
          <CursorFollower />
          <Navbar />

          <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-10 lg:py-12">
            {children}
          </main>

          <FooterBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
