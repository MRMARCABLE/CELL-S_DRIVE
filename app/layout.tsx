import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marca | Personal Portfolio",
  description: "Informatics Student & Developer Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <Navbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
          © 2026 Yohannes Marcel Lalopua —{" "}
          <a href="https://github.com/" target="_blank" className="text-zinc-300 hover:underline">
            GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}