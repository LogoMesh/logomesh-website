import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhyLogoMesh } from "@/components/landing/WhyLogoMesh";
import { AutoFixFeature } from "@/components/landing/AutoFixFeature";
import { FrameworkMarquee } from "@/components/landing/FrameworkMarquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DemoSection } from "@/components/DemoSection";
import { IncidentsGrid } from "@/components/IncidentsGrid";
import { ProofSection } from "@/components/ProofSection";
import { FeaturesBento } from "@/components/FeaturesBento";
import { SocialProof } from "@/components/landing/SocialProof";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Rule = () => (
  <div
    className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
    aria-hidden
  />
);

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex w-full flex-1 flex-col">
        <Navbar />
        <Hero />
        <WhyLogoMesh />
        <AutoFixFeature />
        <FrameworkMarquee />
        <HowItWorks />
        <DemoSection />
        <IncidentsGrid />
        <Rule />
        <ProofSection />
        <Rule />
        <FeaturesBento />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
