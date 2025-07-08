import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ArrowLeft, Download, FileText, Image, Video, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface PackContent {
  type: 'worksheet' | 'visual' | 'video' | 'audio';
  title: string;
  size: string;
  icon: React.ReactNode;
}

export const OfflinePacks = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [packContent, setPackContent] = useState<PackContent[]>([]);
  const navigate = useNavigate();

  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
  const topics = {
    "Grade 1": ["Numbers 1-10", "Basic Shapes", "Colors", "Animals"],
    "Grade 2": ["Addition", "Subtraction", "Plants", "Water Cycle"],
    "Grade 3": ["Multiplication", "Division", "Solar System", "Human Body"],
    "Grade 4": ["Fractions", "Decimals", "Weather", "Food Chain"],
    "Grade 5": ["Geometry", "Algebra Basics", "Earth Science", "Ecosystems"]
  };

  const generatePack = () => {
    if (!selectedGrade || !selectedTopic) return;
    
    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setPackContent([
            {
              type: 'worksheet',
              title: `${selectedTopic} - Worksheet Set (5 files)`,
              size: '2.3 MB',
              icon: <FileText className="w-4 h-4" />
            },
            {
              type: 'visual',
              title: `${selectedTopic} - Visual Aids (8 images)`,
              size: '5.7 MB',
              icon: <Image className="w-4 h-4" />
            },
            {
              type: 'video',
              title: `${selectedTopic} - Educational Videos (3 files)`,
              size: '45.2 MB',
              icon: <Video className="w-4 h-4" />
            },
            {
              type: 'audio',
              title: `${selectedTopic} - Audio Lessons (6 files)`,
              size: '12.8 MB',
              icon: <Headphones className="w-4 h-4" />
            }
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const totalSize = packContent.reduce((total, item) => {
    const size = parseFloat(item.size);
    return total + size;
  }, 0);

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
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🗂️ Offline Learning Pack Creator</CardTitle>
            <p className="text-muted-foreground">
              Generate comprehensive offline content packages for classroom use
            </p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>📚 Configure Learning Pack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Grade</label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Select Topic</label>
                <Select 
                  value={selectedTopic} 
                  onValueChange={setSelectedTopic}
                  disabled={!selectedGrade}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedGrade && topics[selectedGrade as keyof typeof topics]?.map(topic => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generatePack}
                disabled={!selectedGrade || !selectedTopic || isGenerating}
                className="w-full bg-gradient-primary"
              >
                {isGenerating ? "Generating Pack..." : "🎯 Generate Learning Pack"}
              </Button>

              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating content...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle>📦 Generated Pack Contents</CardTitle>
            </CardHeader>
            <CardContent>
              {packContent.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {selectedTopic} - {selectedGrade}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Total Size: {totalSize.toFixed(1)} MB
                    </p>
                  </div>

                  <div className="space-y-3">
                    {packContent.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.size}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-secondary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Complete Pack ({totalSize.toFixed(1)} MB)
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select grade and topic to generate your learning pack</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {packContent.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>👁️ Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Worksheet 1</p>
                  <p className="text-xs text-muted-foreground">Fill in the blanks</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Diagram 1</p>
                  <p className="text-xs text-muted-foreground">Visual explanation</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Video className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Video 1</p>
                  <p className="text-xs text-muted-foreground">3:45 minutes</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Headphones className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Audio 1</p>
                  <p className="text-xs text-muted-foreground">Story narration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};