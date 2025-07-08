import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { 
  Book, BookOpen, Camera, ChartBar, 
  Image, School 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const teacherFeatures = [
  {
    title: "Hyper-Local Story Generator",
    description: "Create culturally relevant stories and explanations in local languages using AI",
    icon: Book,
    category: "Content" as const,
    path: "/features/story-generator"
  },
  {
    title: "Worksheet Generator",
    description: "Upload textbook photos and generate differentiated worksheets for multiple grades",
    icon: Camera,
    category: "AI" as const,
    path: "/features/worksheet-generator"
  },
  {
    title: "Visual Aid Creator",
    description: "Generate blackboard-friendly diagrams and visual learning materials",
    icon: Image,
    category: "Content" as const,
    path: "/features/visual-aid-creator"
  },
  {
    title: "Student Progress Tracker",
    description: "Monitor individual student performance and identify learning gaps with AI insights",
    icon: ChartBar,
    category: "Assessment" as const,
    path: "/features/progress-tracker"
  },
  {
    title: "Lesson Plan Generator",
    description: "Auto-generate weekly lesson plans based on your curriculum and syllabus",
    icon: BookOpen,
    category: "Teacher" as const,
    path: "/features/lesson-plan-generator"
  },
  {
    title: "Drama & Roleplay Scripts",
    description: "Create engaging drama scripts and roleplay activities for various topics",
    icon: School,
    category: "Content" as const,
    path: "/features/drama-scripts"
  }
];

export const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome to Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Teacher Dashboard
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the AI tool you need today. Transform your classroom with intelligent teaching assistance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherFeatures.map((feature, index) => (
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