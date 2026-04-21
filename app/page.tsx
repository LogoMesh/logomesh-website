import { Nav } from "@/components/Nav";
import { Hero } from "@/components/landing/Hero";
import { IntegrateShowcase } from "@/components/landing/IntegrateShowcase";
import { RealWorldHarnessSection } from "@/components/landing/RealWorldHarnessSection";
import { ProductOverviewSection } from "@/components/landing/ProductOverviewSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { DemoSection } from "@/components/DemoSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="page-root-shell flex min-h-dvh min-w-0 flex-col bg-background">
      <Nav />
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div aria-hidden className="page-dotted-canvas" />
        <main className="relative z-[1] flex w-full min-w-0 flex-1 flex-col">
          <Hero />
          <IntegrateShowcase />
          <RealWorldHarnessSection />
          <ProductOverviewSection />
          <HowItWorksSection />
          <DemoSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
