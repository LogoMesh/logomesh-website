import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TechStrip } from "@/components/TechStrip";
import { StatsStrip } from "@/components/StatsStrip";
import { ProofSection } from "@/components/ProofSection";
import { FeaturesBento } from "@/components/FeaturesBento";
import { IncidentsGrid } from "@/components/IncidentsGrid";
import { PipelineSection } from "@/components/PipelineSection";
import { CompareTable } from "@/components/CompareTable";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { MobileInstallCTA } from "@/components/MobileInstallCTA";

const Rule = () => (
  <div
    className="h-px w-full"
    style={{
      background:
        "linear-gradient(90deg, transparent 0%, var(--color-border-hi) 25%, var(--color-border-hi) 75%, transparent 100%)",
    }}
  />
);

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechStrip />
        <IncidentsGrid />
        <StatsStrip />
        <Rule />
        <ProofSection />
        <Rule />
        <FeaturesBento />
        <Rule />
        <PipelineSection />
        <Rule />
        <CompareTable />
        <CTASection />
      </main>
      <Footer />
      <MobileInstallCTA />
    </>
  );
}
