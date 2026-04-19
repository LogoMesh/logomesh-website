import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhyLogoMesh } from "@/components/landing/WhyLogoMesh";
import { AutoFixFeature } from "@/components/landing/AutoFixFeature";
import { FrameworkMarquee } from "@/components/landing/FrameworkMarquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex w-full flex-1 flex-col">
        <Hero />
        <WhyLogoMesh />
        <AutoFixFeature />
        <FrameworkMarquee />
        <HowItWorks />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
