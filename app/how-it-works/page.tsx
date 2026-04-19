import { Nav } from "@/components/Nav";
import { TechStrip } from "@/components/TechStrip";
import { DemoSection } from "@/components/DemoSection";
import { IncidentsGrid } from "@/components/IncidentsGrid";
import { ProofSection } from "@/components/ProofSection";
import { FeaturesBento } from "@/components/FeaturesBento";
import { PipelineSection } from "@/components/PipelineSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { TerminalWindow } from "@/components/TerminalWindow";
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

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex w-full flex-1 flex-col">
        <Nav />
        <div className="mx-auto hidden w-full max-w-[1280px] px-4 pb-6 pt-2 md:block md:px-10 md:pb-8 md:pt-4">
          <TerminalWindow />
        </div>
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
      <MobileInstallCTA />
    </div>
  );
}
