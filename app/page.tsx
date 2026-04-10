import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TechStrip } from "@/components/TechStrip";
import { StatsStrip } from "@/components/StatsStrip";
import { ProofSection } from "@/components/ProofSection";
import { FeaturesBento } from "@/components/FeaturesBento";
import { IncidentsGrid } from "@/components/IncidentsGrid";
import { PipelineSection } from "@/components/PipelineSection";
import { CompareTable } from "@/components/CompareTable";
import { ChangelogStrip } from "@/components/ChangelogStrip";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { MobileInstallCTA } from "@/components/MobileInstallCTA";

const Rule = () => <div className="h-px w-full bg-[var(--color-border)]" />;

export default function Home() {
  return (
    <>
      <CursorGlow />
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
        <ChangelogStrip />
        <CTASection />
      </main>
      <Footer />
      <MobileInstallCTA />
    </>
  );
}
