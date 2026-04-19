import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ScrollReset } from "@/components/ScrollReset";
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
  title: "LogoMesh — Pre-merge verification. Only comments when it has proof.",
  description:
    "LogoMesh infers what your code should do, then attacks those properties in a sandboxed container. Only posts a PR comment when it finds a real bug.",
  icons: {
    apple: "/branding/logomesh-github-app-256.png",
  },
  openGraph: {
    title: "LogoMesh",
    description: "Pre-merge verification. Only comments when it has proof.",
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
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
