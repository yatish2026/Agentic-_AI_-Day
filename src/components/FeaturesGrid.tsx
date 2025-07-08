import { FeatureCard } from "./FeatureCard";
import { 
  Mic, Bot, Package, Phone, Users, 
  Image, Gamepad2, BookOpen, Book, 
  Camera, ChartBar, Calendar, Drama,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  // Teacher Tools
  {
    title: "Voice-to-Content Generator",
    description: "Convert speech to worksheets and assignments in local languages",
    icon: Mic,
    category: "Teacher" as const,
    path: "/features/voice-to-content",
    emoji: "🎙️✍️"
  },
  {
    title: "Doubt Solver Bot",
    description: "AI-powered instant doubt resolution with voice and visual explanations",
    icon: Bot,
    category: "AI" as const,
    path: "/features/doubt-solver",
    emoji: "🤖📚"
  },
  {
    title: "Offline Learning Pack Creator",
    description: "Generate downloadable content packs for offline learning",
    icon: Package,
    category: "Content" as const,
    path: "/features/offline-packs",
    emoji: "🗂️📦"
  },
  {
    title: "Parent Communication Assistant",
    description: "Automated progress reports and communication with parents",
    icon: Phone,
    category: "Teacher" as const,
    path: "/features/parent-communication",
    emoji: "📞👨‍👩‍👧"
  },
  {
    title: "Peer Teaching Scheduler",
    description: "Smart buddy system for collaborative learning",
    icon: Users,
    category: "Teacher" as const,
    path: "/features/peer-teaching",
    emoji: "🧑‍🏫"
  },
  
  // Student Tools
  {
    title: "Visual Learning Hub",
    description: "Interactive visual content with explanations and videos",
    icon: Image,
    category: "Student" as const,
    path: "/features/visual-learning",
    emoji: "🖼️"
  },
  {
    title: "Learning Games",
    description: "Educational games for math, science, and vocabulary",
    icon: Gamepad2,
    category: "Student" as const,
    path: "/features/learning-games",
    emoji: "🎮"
  },
  {
    title: "Interactive Lessons",
    description: "Drag-drop activities, quizzes, and interactive content",
    icon: BookOpen,
    category: "Student" as const,
    path: "/features/interactive-lessons",
    emoji: "📚"
  },
  
  // Core Features
  {
    title: "Hyper-Local Story Generator",
    description: "Create culturally relevant stories in local languages",
    icon: Book,
    category: "Content" as const,
    path: "/features/story-generator",
    emoji: "📖🌍"
  },
  {
    title: "Worksheet Generator",
    description: "Upload textbook photos and generate differentiated worksheets",
    icon: Camera,
    category: "AI" as const,
    path: "/features/worksheet-generator",
    emoji: "📄✏️"
  },
  {
    title: "Visual Aid Creator",
    description: "Generate blackboard-friendly diagrams and visual materials",
    icon: Image,
    category: "Content" as const,
    path: "/features/visual-aid-creator",
    emoji: "🧊🖌️"
  },
  {
    title: "Student Progress Tracker",
    description: "Monitor individual performance with AI insights",
    icon: ChartBar,
    category: "Assessment" as const,
    path: "/features/progress-tracker",
    emoji: "📊🧒"
  },
  {
    title: "Lesson Plan Generator",
    description: "Auto-generate weekly lesson plans from curriculum",
    icon: Calendar,
    category: "Teacher" as const,
    path: "/features/lesson-plan-generator",
    emoji: "📆🧠"
  },
  {
    title: "Drama & Roleplay Scripts",
    description: "Create engaging drama scripts for various topics",
    icon: Drama,
    category: "Content" as const,
    path: "/features/drama-scripts",
    emoji: "🎭📜"
  }
];

export const FeaturesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-accent/10">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete AI-Powered{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Teaching Ecosystem
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From voice-powered content creation to interactive learning games - experience the future of education with culturally-aware AI assistance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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
                emoji={feature.emoji}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};