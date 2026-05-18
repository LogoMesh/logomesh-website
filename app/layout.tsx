import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ScrollReset } from "@/components/ScrollReset";
import { VantaScripts } from "@/components/VantaScripts";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
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

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#060608",
};

export const metadata: Metadata = {
  title: "logomesh · Reproduce production crashes in 60 seconds",
  description:
    "When your error monitor fires, logomesh reads the program state at the moment of failure and writes a failing pytest that reproduces the crash. The audit artifact is deterministic from frame locals — no LLM in the evidence path. Python. Free during beta.",
  icons: {
    apple: "/branding/logomesh-github-app-256.png",
  },
  openGraph: {
    title: "logomesh",
    description:
      "Reads the crash. Reproduces it from frame locals. Hands you a failing pytest. Built for Python fintech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jbMono.variable}`}
    >
      <body
        className={`${dmSans.className} bg-background antialiased [text-rendering:optimizeLegibility]`}
      >
        <Script id="scroll-restoration-head" strategy="beforeInteractive">
          {`(function(){try{if("scrollRestoration"in history)history.scrollRestoration="manual";}catch(e){}})()`}
        </Script>
        <VantaScripts />
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
