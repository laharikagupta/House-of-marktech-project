import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import SearchUsers from "@/components/SearchUsers";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <SearchUsers />
      <Footer />
    </div>
  );
};

export default Home;
