import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { ScrollReset } from "@/components/ScrollReset";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
  weight: "400",
  preload: true,
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0b",
};

export const metadata: Metadata = {
  title: "LogoMesh — Catch the bug before it ships to production",
  description:
    "AI teammate that tests every pull request, proves exactly how it breaks, and posts the fix. Zero false alarms. Free for public Python repos.",
  icons: {
    apple: "/branding/logomesh-github-app-256.png",
  },
  openGraph: {
    title: "LogoMesh — Catch the bug before it ships to production",
    description:
      "AI teammate that tests every pull request, proves how it breaks, and posts the fix. Zero false alarms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jbMono.variable} ${instrumentSerif.variable}`}
    >
      <body className={`${geistSans.className} antialiased`}>
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
