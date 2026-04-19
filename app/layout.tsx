import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { ScrollReset } from "@/components/ScrollReset";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "LogoMesh — Catch the bug before it ships to production",
  description:
    "AI tests every pull request in a hardened sandbox, proves how code breaks, and posts the repro—only when confirmed. Zero noisy alerts. Free on GitHub.",
  icons: {
    apple: "/branding/logomesh-github-app-256.png",
  },
  openGraph: {
    title: "LogoMesh — Catch the bug before it ships to production",
    description:
      "AI tests every PR with adversarial fuzzing in Docker. Comments only with proof.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jbMono.variable}`}>
      <body className="antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
