import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: "AI" | "Teacher" | "Student" | "Content" | "Assessment";
  onClick?: () => void;
  comingSoon?: boolean;
  emoji?: string;
}

const categoryStyles = {
  AI: "bg-gradient-primary text-white",
  Teacher: "bg-gradient-secondary text-secondary-foreground",
  Student: "bg-gradient-accent text-accent-foreground", 
  Content: "bg-success text-success-foreground",
  Assessment: "bg-warning text-warning-foreground"
};

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  category, 
  onClick,
  comingSoon = false,
  emoji
}: FeatureCardProps) => {
  return (
    <Card 
      className={`
        group relative overflow-hidden border-0 shadow-card hover:shadow-hover 
        transition-all duration-300 hover:scale-[1.02] cursor-pointer 
        animate-fade-in bg-gradient-to-br from-card to-muted/20
        ${comingSoon ? 'opacity-75' : ''}
      `}
      onClick={!comingSoon ? onClick : undefined}
    >
      <CardContent className="p-6 h-full flex flex-col">
        {comingSoon && (
          <Badge className="absolute top-3 right-3 text-xs bg-gradient-accent">
            Coming Soon
          </Badge>
        )}
        
        <div className="relative mb-4">
          {emoji && (
            <div className="absolute -top-2 -right-2 text-2xl opacity-70 group-hover:scale-110 transition-transform duration-300">
              {emoji}
            </div>
          )}
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${categoryStyles[category]} shadow-feature
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center text-xs text-primary font-medium">
          <span>Learn More</span>
          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </CardContent>
    </Card>
  );
};