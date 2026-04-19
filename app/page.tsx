import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorksBrief } from "@/components/HowItWorksBrief";
import { HomeInstall } from "@/components/HomeInstall";
import { Footer } from "@/components/Footer";
import { MobileInstallCTA } from "@/components/MobileInstallCTA";

export default async function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex w-full flex-1 flex-col">
        <Nav />
        <Hero />
        <HowItWorksBrief />
        <HomeInstall />
      </main>
      <Footer />
      <MobileInstallCTA />
    </div>
  );
}
