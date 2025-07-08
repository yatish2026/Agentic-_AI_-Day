import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { 
  Book, GraduationCap, School, Image, TrendingUp, ClipboardList, Gamepad2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const studentFeatures = [
  {
    title: "Story Reading",
    description: "Read AI-generated stories tailored to your grade and interests",
    icon: Book,
    category: "Content" as const,
    path: "/features/story-reading"
  },
  {
    title: "Speaking Practice",
    description: "Practice speaking and get feedback from your AI coach",
    icon: GraduationCap,
    category: "Student" as const,
    path: "/features/speaking-coach"
  },
  {
    title: "Learning Games",
    description: "Play educational games designed for your grade level",
    icon: Gamepad2,
    category: "Student" as const,
    path: "/features/learning-games"
  },
  {
    title: "Visual Learning",
    description: "Explore interactive diagrams and visual aids",
    icon: Image,
    category: "Content" as const,
    path: "/features/visual-learning"
  },
  {
    title: "Track Your Progress",
    description: "Monitor your learning progress in real-time",
    icon: TrendingUp,
    category: "Assessment" as const,
    path: "/features/track-progress"
  },
  {
    title: "Assignments",
    description: "Complete assignments given by your teacher",
    icon: ClipboardList,
    category: "Assessment" as const,
    path: "/features/assignments"
  }
];

export const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome to Your{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Learning Portal
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose what you'd like to learn today. Your AI learning companion is here to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {studentFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  category={feature.category}
                  onClick={() => navigate(feature.path)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};