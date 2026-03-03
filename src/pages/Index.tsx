import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProgramsSection from "@/components/ProgramsSection";
import PhilosophySection from "@/components/PhilosophySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProgramsSection />
    <PhilosophySection />
    <TestimonialsSection />
    <FAQSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
