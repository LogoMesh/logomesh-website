import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs — LogoMesh",
  description: "Documentation and links for LogoMesh pre-merge verification.",
};

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
