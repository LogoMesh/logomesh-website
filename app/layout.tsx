import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Fraunces } from "next/font/google";
import { ScrollReset } from "@/components/ScrollReset";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: "variable",
  axes: ["opsz"],
  preload: true,
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["italic", "normal"],
  weight: "variable",
  axes: ["opsz", "SOFT"],
  preload: false,
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0b",
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
      className={`${bricolage.variable} ${jbMono.variable} ${fraunces.variable}`}
    >
      <body className={`${bricolage.className} antialiased`}>
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
