import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'اردو' }
];

export const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sahayak</h1>
              <p className="text-xs text-muted-foreground">AI Teaching Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <Select defaultValue="en">
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm">
              Features
            </Button>
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/teacher-login'}
            >
              Teacher Login
            </Button>
            <Button 
              size="sm"
              onClick={() => window.location.href = '/student-login'}
            >
              Student Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Import GraduationCap for the icon
import { GraduationCap } from "lucide-react";