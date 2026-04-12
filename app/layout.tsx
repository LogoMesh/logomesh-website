import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { ScrollReset } from "@/components/ScrollReset";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["300", "400", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
  weight: "400",
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
      className={`${dmSans.variable} ${syne.variable} ${jbMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
