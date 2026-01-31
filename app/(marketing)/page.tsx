import { Hero } from "@/components/marketing/Hero";
import { FeatureCards } from "@/components/marketing/FeatureCards";
import { Locations } from "@/components/marketing/Locations";
import { PopularPackages } from "@/components/marketing/PopularPackages";
import { TrustBar } from "@/components/marketing/TrustBar";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { ChooseAndBuy } from "@/components/marketing/ChooseAndBuy";
import { WhyChooseGrid } from "@/components/marketing/WhyChooseGrid";

export const metadata = {
  title: "ProxiesSeller — Fast, Secure & Global Proxies",
  description:
    "Enterprise-grade privacy, speed, and reliability — connect from anywhere with confidence. Residential, Mobile, Datacenter and Fast proxies.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeatureCards />
      <ChooseAndBuy />
      <Locations />
      <PopularPackages />
      <WhyChooseGrid />
      <FinalCTA />
    </main>
  );
}
