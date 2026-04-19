import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "hsl(240 6% 4%)",
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
    <html lang="en" className={`${plusJakarta.variable} ${jbMono.variable}`}>
      <body className={`${plusJakarta.className} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
