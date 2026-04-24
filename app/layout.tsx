import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ScrollReset } from "@/components/ScrollReset";
import { LenisProvider } from "@/lib/lenis";
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
  title: "LogoMesh · Ship Python PRs with proof, not noise",
  description:
    "Merge with confidence. LogoMesh runs your changed Python in a sandbox and only comments when it can show a reproducible bug. Free GitHub App for public repos in beta.",
  icons: {
    apple: "/branding/logomesh-github-app-256.png",
  },
  openGraph: {
    title: "LogoMesh",
    description:
      "Pre-merge checks for Python PRs. Run the code you changed and post only when there is proof. Free in beta.",
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
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
          strategy="afterInteractive"
        />
        <ScrollReset />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
