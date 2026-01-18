import Header from "./components/Header";
import Hero from "./components/Hero";
import BenefitsBar from "./components/sections/BenefitsBar";
import NutritionSection from "./components/sections/NutritionSection";
import FlavorProfile from "./components/sections/FlavorProfile";
import UseCasesSection from "./components/sections/UseCasesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import FAQSection from "./components/sections/FAQSection";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";

export default function Home() {
  return (
    <div className="bg-warm-corners min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <BenefitsBar />
        <NutritionSection />
        <FlavorProfile />
        <UseCasesSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
