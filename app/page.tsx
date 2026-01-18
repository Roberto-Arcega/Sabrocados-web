import Header from "./components/Header";
import Hero from "./components/Hero";
import PhoneMockup from "./components/PhoneMockup";

export default function Home() {
  return (
    <div className="bg-warm-corners min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <PhoneMockup />
      </main>
    </div>
  );
}
