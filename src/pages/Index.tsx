import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturesGrid />
      <Footer />
    </div>
  );
};

export default Index;