import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/sections/hero-section";
import { FeaturesSection } from "@/sections/features-section";
import { HowItWorksSection } from "@/sections/how-it-works-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { CTASection } from "@/sections/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
