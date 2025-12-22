import DepartmentsSection from "@/components/modules/website/DepartmentsSection";
import FactoryInsight from "@/components/modules/website/FactoryInsight";
import FeaturedCollections from "@/components/modules/website/FeaturedCollections";
import GlobalReach from "@/components/modules/website/GlobalReach";
import HeroSection from "@/components/modules/website/HeroSection";
import MissionQualitySection from "@/components/modules/website/MissionQualitySection";
import PartnerCTA from "@/components/modules/website/PartnerCTA";
import VisualShowcase from "@/components/modules/website/VisualShowcase";

export default function HomePage() {
  return (
    <>
      {/* The Hero Section (Banner) */}
      <HeroSection />
      <MissionQualitySection />
      <DepartmentsSection />
      <FeaturedCollections />
      <VisualShowcase />
      <FactoryInsight />
      <GlobalReach />
      <PartnerCTA />

      {/* We will add more sections here next (Products, About, etc.) */}
    </>
  );
}
