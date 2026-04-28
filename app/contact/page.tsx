import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact · LogoMesh",
  description:
    "Reach the LogoMesh team about the beta, integrations, or partnerships.",
  openGraph: {
    title: "Contact · LogoMesh",
    description:
      "Reach the LogoMesh team about the beta, integrations, or partnerships.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <ContactView />
        <Footer />
      </div>
    </div>
  );
}
