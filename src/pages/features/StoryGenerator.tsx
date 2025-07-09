import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Book, ArrowLeft, Download, Share2, Save, Sparkles, BookOpen, Languages, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Story {
  title: string;
  content: string;
  language: string;
  topic: string;
  gradeLevel: string;
  scienceConcepts: string[];
  vocabulary: string[];
  visualization: string;
}

export const StoryGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedGrade, setSelectedGrade] = useState("grade-3");
  const navigate = useNavigate();

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "bengali", label: "Bengali" },
    { value: "tamil", label: "Tamil" },
    { value: "telugu", label: "Telugu" },
    { value: "marathi", label: "Marathi" }
  ];

  const gradeLevels = [
    { value: "grade-1", label: "Grade 1" },
    { value: "grade-2", label: "Grade 2" },
    { value: "grade-3", label: "Grade 3" },
    { value: "grade-4", label: "Grade 4" },
    { value: "grade-5", label: "Grade 5" }
  ];

  const generateStory = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation with timeout
    setTimeout(() => {
      setStory({
        title: `The Journey of ${prompt.split(' ')[0] || "a Water Drop"}`,
        content: `In a small village called Shantipur, ${prompt}. The children learned valuable lessons about friendship and community, understanding that every person has a unique role to play in making their surroundings better.\n\nAs the story unfolded, they discovered how ${prompt.toLowerCase()} connects to their daily lives and the environment around them. The teacher helped them see the science behind everyday phenomena through this engaging tale.`,
        language: selectedLanguage,
        topic: "Science & Community",
        gradeLevel: selectedGrade,
        scienceConcepts: [
          "Water Cycle",
          "Evaporation",
          "Condensation",
          "Precipitation",
          "Conservation"
        ],
        vocabulary: [
          "Community",
          "Environment",
          "Sustainability",
          "Ecosystem",
          "Responsibility"
        ],
        visualization: "water-cycle"
      });
      setIsGenerating(false);
    }, 2500);
  };

  const visualizeConcepts = (concept: string) => {
    // In a real app, this would show different visualizations
    return (
      <div className="bg-white p-4 rounded-lg border shadow-sm mt-4">
        {concept === "water-cycle" && (
          <div className="text-center">
            <div className="relative h-64 w-full bg-blue-50 rounded-lg flex items-center justify-center">
              {/* Simple SVG visualization of water cycle */}
              <svg width="100%" height="100%" viewBox="0 0 400 300" className="max-w-md mx-auto">
                {/* Sun */}
                <circle cx="350" cy="50" r="30" fill="#FBBF24" />
                {/* Clouds */}
                <ellipse cx="100" cy="60" rx="50" ry="30" fill="#E5E7EB" />
                <ellipse cx="130" cy="50" rx="40" ry="25" fill="#E5E7EB" />
                <ellipse cx="300" cy="80" rx="60" ry="35" fill="#E5E7EB" />
                <ellipse cx="330" cy="70" rx="50" ry="30" fill="#E5E7EB" />
                {/* Mountains */}
                <polygon points="0,150 100,50 200,150" fill="#6B7280" />
                <polygon points="150,150 250,75 350,150" fill="#4B5563" />
                {/* River */}
                <path d="M100,50 Q200,100 300,50 L400,150 L0,150 Z" fill="#60A5FA" opacity="0.6" />
                {/* Arrows */}
                <path d="M100,80 Q150,30 200,80" stroke="#3B82F6" fill="none" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M300,100 Q250,150 200,120" stroke="#3B82F6" fill="none" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M200,120 Q150,180 100,150" stroke="#3B82F6" fill="none" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M100,150 L100,80" stroke="#3B82F6" fill="none" strokeWidth="2" markerEnd="url(#arrow)" />
                {/* Labels */}
                <text x="150" y="30" className="text-xs font-medium">Evaporation</text>
                <text x="250" y="40" className="text-xs font-medium">Condensation</text>
                <text x="200" y="200" className="text-xs font-medium">Precipitation</text>
                <text x="50" y="130" className="text-xs font-medium">Collection</text>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#3B82F6" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Interactive Water Cycle Diagram</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <Sparkles className="w-5 h-5" />
            <span>Hyper-Local Story Generator</span>
          </div>
        </div>

        {/* Main Generator Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-8">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl">AI Story Generator</CardTitle>
            <CardDescription className="text-white/80">
              Create culturally relevant educational stories in local languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language" className="text-white/90">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="grade" className="text-white/90">Grade Level</Label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeLevels.map(grade => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="story-prompt" className="text-white/90">
                Story Prompt (in {languages.find(l => l.value === selectedLanguage)?.label || "your language"})
              </Label>
              <Textarea
                id="story-prompt"
                placeholder="Example: Create a story about farmers to explain soil types"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <Button 
              onClick={generateStory} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-white text-blue-600 hover:bg-white/90 shadow-lg"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating Story...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Story
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {story && (
          <div className="space-y-6">
            {/* Story Display Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {story.title}
                  </span>
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    {languages.find(l => l.value === story.language)?.label || story.language}
                  </Badge>
                  <Badge variant="outline">{story.gradeLevel.replace('grade-', 'Grade ')}</Badge>
                  <Badge variant="outline">{story.topic}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Story Content */}
                <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-semibold mb-3 text-blue-800">📖 Generated Story</h4>
                  <div className="prose max-w-none">
                    {story.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Science Concepts */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold mb-3 text-green-800">🔬 Science Concepts Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {story.scienceConcepts.map((concept, i) => (
                      <Badge key={i} variant="outline" className="bg-green-100 text-green-800">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Visualization */}
                <div>
                  <h4 className="font-semibold mb-3 text-blue-800">📊 Story Visualization</h4>
                  {visualizeConcepts(story.visualization)}
                </div>

                {/* Vocabulary */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-semibold mb-3 text-purple-800">📚 Vocabulary Words</h4>
                  <div className="flex flex-wrap gap-2">
                    {story.vocabulary.map((word, i) => (
                      <Badge key={i} variant="outline" className="bg-purple-100 text-purple-800">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen to Story
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Story
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};