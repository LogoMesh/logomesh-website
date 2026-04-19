import { Nav } from "@/components/Nav";
import { Hero } from "@/components/landing/Hero";
import { TechStrip } from "@/components/TechStrip";
import { DemoSection } from "@/components/DemoSection";
import { ProofSection } from "@/components/ProofSection";
import { FeaturesBento } from "@/components/FeaturesBento";
import { IncidentsGrid } from "@/components/IncidentsGrid";
import { PipelineSection } from "@/components/PipelineSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

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
    <div className="flex min-h-dvh flex-col">
      <main className="flex w-full flex-1 flex-col">
        <Nav />
        <Hero />
        <TechStrip />
        <DemoSection />
        <IncidentsGrid />
        <Rule />
        <ProofSection />
        <Rule />
        <FeaturesBento />
        <Rule />
        <PipelineSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
