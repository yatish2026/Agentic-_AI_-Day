import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ArrowLeft, Download, FileText, Image, Video, Headphones, BookOpen, Eye, Shapes, Music, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PackContent {
  type: 'worksheet' | 'visual' | 'video' | 'audio' | 'lesson' | 'activity';
  title: string;
  size: string;
  icon: React.ReactNode;
  items: {
    title: string;
    description: string;
    duration?: string;
    pages?: number;
  }[];
}

interface GradeTheme {
  bgFrom: string;
  bgTo: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  badge: string;
}

const gradeThemes: Record<string, GradeTheme> = {
  "Grade 1": {
    bgFrom: "from-blue-50",
    bgTo: "to-blue-100",
    primary: "bg-blue-600",
    secondary: "bg-blue-500",
    accent: "bg-blue-400",
    text: "text-blue-800",
    badge: "bg-blue-100 text-blue-800"
  },
  "Grade 2": {
    bgFrom: "from-green-50",
    bgTo: "to-green-100",
    primary: "bg-green-600",
    secondary: "bg-green-500",
    accent: "bg-green-400",
    text: "text-green-800",
    badge: "bg-green-100 text-green-800"
  },
  "Grade 3": {
    bgFrom: "from-purple-50",
    bgTo: "to-purple-100",
    primary: "bg-purple-600",
    secondary: "bg-purple-500",
    accent: "bg-purple-400",
    text: "text-purple-800",
    badge: "bg-purple-100 text-purple-800"
  },
  "Grade 4": {
    bgFrom: "from-amber-50",
    bgTo: "to-amber-100",
    primary: "bg-amber-600",
    secondary: "bg-amber-500",
    accent: "bg-amber-400",
    text: "text-amber-800",
    badge: "bg-amber-100 text-amber-800"
  },
  "Grade 5": {
    bgFrom: "from-rose-50",
    bgTo: "to-rose-100",
    primary: "bg-rose-600",
    secondary: "bg-rose-500",
    accent: "bg-rose-400",
    text: "text-rose-800",
    badge: "bg-rose-100 text-rose-800"
  }
};

export const OfflinePacks = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [packContent, setPackContent] = useState<PackContent[]>([]);
  const [activePreview, setActivePreview] = useState<number | null>(null);
  const navigate = useNavigate();

  // Get current theme based on selected grade
  const currentTheme = selectedGrade ? gradeThemes[selectedGrade] : {
    bgFrom: "from-indigo-50",
    bgTo: "to-blue-50",
    primary: "bg-indigo-600",
    secondary: "bg-blue-500",
    accent: "bg-purple-400",
    text: "text-gray-800",
    badge: "bg-gray-100 text-gray-800"
  };

  const grades = [
    { value: "Grade 1", label: "Grade 1", color: "bg-blue-100 text-blue-800" },
    { value: "Grade 2", label: "Grade 2", color: "bg-green-100 text-green-800" },
    { value: "Grade 3", label: "Grade 3", color: "bg-purple-100 text-purple-800" },
    { value: "Grade 4", label: "Grade 4", color: "bg-amber-100 text-amber-800" },
    { value: "Grade 5", label: "Grade 5", color: "bg-rose-100 text-rose-800" },
  ];

  const topics = {
    "Grade 1": [
      { value: "Numbers 1-10", label: "Numbers 1-10", icon: <span>🔢</span> },
      { value: "Basic Shapes", label: "Basic Shapes", icon: <span>🟦</span> },
      { value: "Colors", label: "Colors", icon: <span>🎨</span> },
      { value: "Animals", label: "Animals", icon: <span>🐘</span> }
    ],
    "Grade 2": [
      { value: "Addition", label: "Addition", icon: <span>➕</span> },
      { value: "Subtraction", label: "Subtraction", icon: <span>➖</span> },
      { value: "Plants", label: "Plants", icon: <span>🌱</span> },
      { value: "Water Cycle", label: "Water Cycle", icon: <span>💧</span> }
    ],
    "Grade 3": [
      { value: "Multiplication", label: "Multiplication", icon: <span>✖️</span> },
      { value: "Division", label: "Division", icon: <span>➗</span> },
      { value: "Solar System", label: "Solar System", icon: <span>🪐</span> },
      { value: "Human Body", label: "Human Body", icon: <span>🧠</span> }
    ],
    "Grade 4": [
      { value: "Fractions", label: "Fractions", icon: <span>½</span> },
      { value: "Decimals", label: "Decimals", icon: <span>0.5</span> },
      { value: "Weather", label: "Weather", icon: <span>⛅</span> },
      { value: "Food Chain", label: "Food Chain", icon: <span>🦁</span> }
    ],
    "Grade 5": [
      { value: "Geometry", label: "Geometry", icon: <span>📐</span> },
      { value: "Algebra Basics", label: "Algebra Basics", icon: <span>𝑥</span> },
      { value: "Earth Science", label: "Earth Science", icon: <span>🌎</span> },
      { value: "Ecosystems", label: "Ecosystems", icon: <span>🌳</span> }
    ]
  };

  const generatePack = () => {
    if (!selectedGrade || !selectedTopic) return;
    
    setIsGenerating(true);
    setProgress(0);
    setPackContent([]);
    setActivePreview(null);

    const stages = [
      { progress: 20, label: "Gathering resources..." },
      { progress: 40, label: "Creating worksheets..." },
      { progress: 60, label: "Generating visuals..." },
      { progress: 80, label: "Preparing multimedia..." },
      { progress: 100, label: "Finalizing package..." }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = stages[currentStage].progress;
        if (prev >= nextProgress) {
          currentStage++;
          if (currentStage >= stages.length) {
            clearInterval(interval);
            createContentPackage();
            setIsGenerating(false);
            return 100;
          }
          return prev;
        }
        return prev + 1;
      });
    }, 50);
  };

  const createContentPackage = () => {
    const grade = grades.find(g => g.value === selectedGrade);
    const topic = topics[selectedGrade as keyof typeof topics]?.find(t => t.value === selectedTopic);
    
    setPackContent([
      {
        type: 'worksheet',
        title: `${topic?.label} Worksheets`,
        size: `${(Math.random() * 3 + 2).toFixed(1)} MB`,
        icon: <FileText className="w-5 h-5" style={{ color: currentTheme.text }} />,
        items: [
          { title: "Practice Sheet 1", description: "Basic exercises", pages: 2 },
          { title: "Practice Sheet 2", description: "Intermediate problems", pages: 3 },
          { title: "Challenge Sheet", description: "Advanced problems", pages: 2 }
        ]
      },
      {
        type: 'visual',
        title: `${topic?.label} Visual Aids`,
        size: `${(Math.random() * 4 + 3).toFixed(1)} MB`,
        icon: <Image className="w-5 h-5" style={{ color: currentTheme.text }} />,
        items: [
          { title: "Diagram Set", description: "Detailed illustrations" },
          { title: "Flash Cards", description: "Visual learning cards" },
          { title: "Poster", description: "Classroom poster" }
        ]
      },
      {
        type: 'video',
        title: `${topic?.label} Videos`,
        size: `${(Math.random() * 20 + 30).toFixed(1)} MB`,
        icon: <Video className="w-5 h-5" style={{ color: currentTheme.text }} />,
        items: [
          { title: "Introduction Video", description: "Topic overview", duration: "3:45" },
          { title: "Explanation Video", description: "Detailed concepts", duration: "7:20" },
          { title: "Activity Guide", description: "Practical demonstration", duration: "5:10" }
        ]
      },
      {
        type: 'audio',
        title: `${topic?.label} Audio Lessons`,
        size: `${(Math.random() * 5 + 8).toFixed(1)} MB`,
        icon: <Headphones className="w-5 h-5" style={{ color: currentTheme.text }} />,
        items: [
          { title: "Lesson Narration", description: "Audio explanation", duration: "8:30" },
          { title: "Story Session", description: "Educational story", duration: "6:15" },
          { title: "Memory Songs", description: "Learning through music", duration: "4:45" }
        ]
      },
      {
        type: 'lesson',
        title: `${topic?.label} Lesson Plans`,
        size: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
        icon: <BookOpen className="w-5 h-5" style={{ color: currentTheme.text }} />,
        items: [
          { title: "Teacher Guide", description: "Complete lesson plan" },
          { title: "Activity Ideas", description: "Classroom activities" },
          { title: "Assessment", description: "Evaluation sheets" }
        ]
      },
      {
        type: 'activity',
        title: `${topic?.label} Activities`,
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        icon: <Activity className="w-5 h-5" style={{ color: currentTheme.text }} />,
        items: [
          { title: "Hands-on Project", description: "Practical activity" },
          { title: "Group Exercise", description: "Collaborative task" },
          { title: "Experiment Guide", description: "Science experiment" }
        ]
      }
    ]);
  };

  const totalSize = packContent.reduce((total, item) => {
    return total + parseFloat(item.size);
  }, 0);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bgFrom} ${currentTheme.bgTo} p-4 transition-colors duration-500`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header with back button */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
            {selectedGrade ? `${selectedGrade} Offline Pack Creator` : "Offline Learning Pack Creator"}
          </h1>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Configuration Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.primary} ${currentTheme.secondary} text-white`}>
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl">Configure Learning Pack</span>
                  <CardDescription>Select grade and topic to generate customized content</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Grade Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Grade Level</label>
                <Select value={selectedGrade} onValueChange={(value) => {
                  setSelectedGrade(value);
                  setSelectedTopic("");
                }}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem 
                        key={grade.value} 
                        value={grade.value}
                        className="flex items-center gap-2"
                      >
                        <span className={`px-2 py-1 rounded-full text-xs ${grade.color}`}>
                          {grade.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Topic Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Learning Topic</label>
                <Select 
                  value={selectedTopic} 
                  onValueChange={setSelectedTopic}
                  disabled={!selectedGrade}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={selectedGrade ? "Select topic" : "Select grade first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedGrade && 
                      topics[selectedGrade as keyof typeof topics]?.map(topic => (
                        <SelectItem 
                          key={topic.value} 
                          value={topic.value}
                          className="flex items-center gap-3"
                        >
                          <span className="text-lg">{topic.icon}</span>
                          <span>{topic.label}</span>
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generatePack}
                disabled={!selectedGrade || !selectedTopic || isGenerating}
                className={`w-full h-12 bg-gradient-to-r ${currentTheme.primary} ${currentTheme.secondary} hover:${currentTheme.secondary} hover:${currentTheme.accent} text-white shadow-md transition-all`}
                size="lg"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Pack ({progress}%)
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="text-xl">✨</span> Generate Learning Pack
                  </span>
                )}
              </Button>

              {isGenerating && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Preparing your content package...</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-200" />
                  <div className="text-xs text-gray-500">
                    {progress < 25 && "Gathering resources for your topic..."}
                    {progress >= 25 && progress < 50 && "Creating customized worksheets..."}
                    {progress >= 50 && progress < 75 && "Generating visual learning aids..."}
                    {progress >= 75 && "Finalizing multimedia content..."}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Content Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.secondary} ${currentTheme.accent} text-white`}>
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl">Pack Contents</span>
                  <CardDescription>
                    {packContent.length > 0 
                      ? `Ready to download - ${totalSize.toFixed(1)} MB package` 
                      : "Your generated content will appear here"}
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {packContent.length > 0 ? (
                <div className="space-y-6">
                  {/* Package Summary */}
                  <div className={`bg-gradient-to-r ${currentTheme.bgFrom} ${currentTheme.bgTo} rounded-xl p-4 border ${currentTheme.text.replace('text', 'border')}/20`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg ${currentTheme.text}">
                          {selectedTopic} - {selectedGrade}
                        </h3>
                        <p className="text-sm ${currentTheme.text}/80">
                          Comprehensive offline learning package
                        </p>
                      </div>
                      <Badge variant="outline" className={`${currentTheme.badge} border-${currentTheme.text.replace('text', 'border')}/30`}>
                        Ready to Download
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs ${currentTheme.text}/80">Total Files</p>
                        <p className="font-semibold ${currentTheme.text}">{packContent.length * 3}</p>
                      </div>
                      <div>
                        <p className="text-xs ${currentTheme.text}/80">Package Size</p>
                        <p className="font-semibold ${currentTheme.text}">{totalSize.toFixed(1)} MB</p>
                      </div>
                      <div>
                        <p className="text-xs ${currentTheme.text}/80">Content Types</p>
                        <p className="font-semibold ${currentTheme.text}">{new Set(packContent.map(c => c.type)).size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content List */}
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {packContent.map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${activePreview === index ? `border-${currentTheme.text.replace('text', 'border')} bg-${currentTheme.text.replace('text', 'bg')}/10` : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setActivePreview(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${currentTheme.text.replace('text', 'bg')}/10 ${currentTheme.text}`}>
                              {item.icon}
                            </div>
                            <div>
                              <p className={`font-medium ${currentTheme.text}`}>{item.title}</p>
                              <p className={`text-xs ${currentTheme.text}/70`}>{item.size}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.items.length} items
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Button */}
                  <Button 
                    className={`w-full h-12 bg-gradient-to-r ${currentTheme.primary} ${currentTheme.secondary} hover:${currentTheme.secondary} hover:${currentTheme.accent} text-white shadow-md mt-4`}
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Complete Pack ({totalSize.toFixed(1)} MB)
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className={`mx-auto w-24 h-24 bg-gradient-to-br ${currentTheme.bgFrom} ${currentTheme.bgTo} rounded-full flex items-center justify-center mb-6`}>
                    <Package className="w-10 h-10 ${currentTheme.text}/50" />
                  </div>
                  <h3 className={`text-lg font-medium ${currentTheme.text}/70 mb-2`}>
                    No Content Generated Yet
                  </h3>
                  <p className={`text-sm ${currentTheme.text}/50 max-w-md mx-auto`}>
                    Select a grade level and topic, then click "Generate Learning Pack" to create your offline content package.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Content Preview Section */}
        {packContent.length > 0 && activePreview !== null && (
          <Card className="mt-6 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.secondary} ${currentTheme.accent} text-white`}>
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl">Content Preview</span>
                  <CardDescription>
                    {packContent[activePreview].title} - Details
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packContent[activePreview].items.map((item, idx) => (
                  <div key={idx} className={`bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all ${currentTheme.text.replace('text', 'border')}/10`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${currentTheme.badge}/20 ${currentTheme.text}`}>
                        {getItemIcon(packContent[activePreview].type)}
                      </div>
                      <div>
                        <h4 className={`font-medium ${currentTheme.text}`}>{item.title}</h4>
                        <p className={`text-xs ${currentTheme.text}/70`}>{item.description}</p>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center text-xs ${currentTheme.text}/70`}>
                      <span>
                        {item.duration && `Duration: ${item.duration}`}
                        {item.pages && `Pages: ${item.pages}`}
                      </span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Helper functions
const getItemIcon = (type: string) => {
  switch(type) {
    case 'worksheet': return <FileText className="w-4 h-4" />;
    case 'visual': return <Image className="w-4 h-4" />;
    case 'video': return <Video className="w-4 h-4" />;
    case 'audio': return <Headphones className="w-4 h-4" />;
    case 'lesson': return <BookOpen className="w-4 h-4" />;
    case 'activity': return <Activity className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};