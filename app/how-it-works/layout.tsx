import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works — LogoMesh",
  description:
    "Full product tour: demo, examples, proof on PRs, features, and pipeline. Install the GitHub app when you are ready.",
};

export default function HowItWorksLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
