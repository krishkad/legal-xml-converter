import { DemoSection } from "@/components/DemoSection";
import Footer from "@/components/Footer";
import { HeroSection2 } from "@/components/HeroSection2";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import PrivacySection from "@/components/PrivacySection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import SubscriptionSection from "@/components/SubcriptionSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection2 />
      <ProblemSolutionSection />
      <PrivacySection />
      <DemoSection />
      <PricingSection />
      <SubscriptionSection />
      <Footer />
    </div>
  );
}
