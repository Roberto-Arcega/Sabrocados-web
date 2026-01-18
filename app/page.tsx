import Header from "./components/Header";
import Hero from "./components/Hero";
import BenefitsBar from "./components/sections/BenefitsBar";
import NutritionSection from "./components/sections/NutritionSection";
import FlavorProfile from "./components/sections/FlavorProfile";
import UseCasesSection from "./components/sections/UseCasesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import FAQSection from "./components/sections/FAQSection";
import ContactForm from "./components/sections/ContactForm";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/Footer";

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
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
