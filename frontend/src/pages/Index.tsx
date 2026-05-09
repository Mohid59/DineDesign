import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CategoriesSection from "@/components/landing/CategoriesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import AIQuizSection from "@/components/landing/AIQuizSection";
import Reveal from "@/components/Reveal";

const Index = () => {
  useEffect(() => {
    if (window.location.hash !== "#pricing") return;

    const timer = window.setTimeout(() => {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal delayMs={50}>
        <FeaturesSection />
      </Reveal>
      <Reveal delayMs={80}>
        <HowItWorksSection />
      </Reveal>
      <Reveal delayMs={120}>
        <AIQuizSection />
      </Reveal>
      <Reveal delayMs={150}>
        <CategoriesSection />
      </Reveal>
      <Reveal delayMs={180}>
        <TestimonialsSection />
      </Reveal>
      <Reveal delayMs={220}>
        <PricingSection />
      </Reveal>
      <Footer />
    </div>
  );
};

export default Index;
