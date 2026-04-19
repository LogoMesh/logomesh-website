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
    <div className="page-root-shell flex min-h-dvh flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative z-[1] flex w-full flex-1 flex-col">
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
    </div>
  );
}
