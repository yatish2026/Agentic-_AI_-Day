import { Button } from "@/components/ui/button";
import heroImage from "@/assets/sahayak-hero.jpg";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-glow"></span>
              AI-Powered Education
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
                Sahayak
              </span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-lg">
              Your AI Teaching Assistant for Multi-Grade Classrooms. 
              Create engaging content, track progress, and empower every student with personalized learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="font-semibold shadow-feature hover:shadow-hover transition-all duration-300"
              >
                Start Teaching
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
              >
                Explore Features
              </Button>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-glow/30 to-accent/30 rounded-2xl blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="Sahayak AI Teaching Assistant"
              className="relative w-full h-auto rounded-2xl shadow-hover"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse-glow"></div>
    </section>
  );
};