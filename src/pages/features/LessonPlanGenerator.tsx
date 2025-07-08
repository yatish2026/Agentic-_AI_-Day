import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft, Upload, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LessonPlanGenerator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [lessonPlan, setLessonPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const generateLessonPlan = async () => {
    if (!selectedFile) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setLessonPlan({
        week: "Week 1 - Science: Water Cycle",
        sessions: [
          {
            day: "Monday",
            topic: "Introduction to Water Cycle",
            activities: ["Story reading about water drop journey", "Simple evaporation experiment"],
            visualAids: ["Water cycle diagram", "Cloud formation video"]
          },
          {
            day: "Wednesday", 
            topic: "States of Water",
            activities: ["Ice melting observation", "Steam from hot water demo"],
            visualAids: ["States of matter chart", "Interactive thermometer"]
          },
          {
            day: "Friday",
            topic: "Rain and Weather",
            activities: ["Weather tracking chart", "Rain gauge making"],
            visualAids: ["Weather symbols poster", "Cloud types diagram"]
          }
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Lesson Plan Generator</CardTitle>
            <p className="text-muted-foreground">Auto-generate weekly lesson plans based on your curriculum</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="curriculum-upload"
              />
              <label htmlFor="curriculum-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Upload Curriculum Image/PDF</span>
                </Button>
              </label>
              {selectedFile && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
            
            <Button 
              onClick={generateLessonPlan} 
              disabled={!selectedFile || isGenerating}
              className="w-full bg-gradient-primary"
            >
              {isGenerating ? "Generating Lesson Plan..." : "Generate Lesson Plan"}
            </Button>
          </CardContent>
        </Card>

        {lessonPlan && (
          <Card>
            <CardHeader>
              <CardTitle>{lessonPlan.week}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {lessonPlan.sessions.map((session: any, index: number) => (
                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{session.day}: {session.topic}</h4>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-muted-foreground mb-1">Activities:</h5>
                    <ul className="text-sm space-y-1">
                      {session.activities.map((activity: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-1">Visual Aids:</h5>
                    <ul className="text-sm space-y-1">
                      {session.visualAids.map((aid: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                          {aid}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Complete Lesson Plan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};