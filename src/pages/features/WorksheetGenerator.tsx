import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Camera, 
  ArrowLeft, 
  Download, 
  BookOpen,
  FileText,
  Sparkles,
  Image as ImageIcon,
  ClipboardList,
  Bookmark,
  Send,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Worksheet = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  difficulty: string;
  questionCount: number;
  pages: number;
  content: string;
  imagePreview?: string;
  createdAt: Date;
};

type Subject = "math" | "science" | "language" | "social-studies";
type Difficulty = "basic" | "intermediate" | "advanced";

export const WorksheetGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subject, setSubject] = useState<Subject>("math");
  const [difficulty, setDifficulty] = useState<Difficulty>("basic");
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [selectedWorksheet, setSelectedWorksheet] = useState<Worksheet | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const generateWorksheets = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate AI generation
    setTimeout(() => {
      clearInterval(interval);
      const newWorksheets: Worksheet[] = [
        {
          id: "1",
          title: `${subject === "math" ? "Mathematics" : 
                  subject === "science" ? "Science" : 
                  subject === "language" ? "Language Arts" : "Social Studies"} Worksheet - Basic`,
          subject,
          grade: "Grade 1-2",
          difficulty: "basic",
          questionCount: 10,
          pages: 2,
          content: generateWorksheetContent("basic"),
          imagePreview: imagePreview || undefined,
          createdAt: new Date()
        },
        {
          id: "2",
          title: `${subject === "math" ? "Mathematics" : 
                  subject === "science" ? "Science" : 
                  subject === "language" ? "Language Arts" : "Social Studies"} Worksheet - Intermediate`,
          subject,
          grade: "Grade 3-4",
          difficulty: "intermediate",
          questionCount: 15,
          pages: 3,
          content: generateWorksheetContent("intermediate"),
          imagePreview: imagePreview || undefined,
          createdAt: new Date()
        },
        {
          id: "3",
          title: `${subject === "math" ? "Mathematics" : 
                  subject === "science" ? "Science" : 
                  subject === "language" ? "Language Arts" : "Social Studies"} Worksheet - Advanced`,
          subject,
          grade: "Grade 5-6",
          difficulty: "advanced",
          questionCount: 20,
          pages: 4,
          content: generateWorksheetContent("advanced"),
          imagePreview: imagePreview || undefined,
          createdAt: new Date()
        }
      ];
      setWorksheets(newWorksheets);
      setIsGenerating(false);
    }, 3000);
  };

  const generateWorksheetContent = (level: Difficulty): string => {
    const subjects = {
      math: {
        basic: `## Basic Math Worksheet (Grade 1-2)
        
*Fill in the blanks:*
1. 2 + 3 = ___
2. 5 - 1 = ___
3. 4 + 0 = ___

*Circle the correct number:*
1. Which is greater? 7 or 4
2. Which is smaller? 5 or 9`,
        intermediate: `## Intermediate Math Worksheet (Grade 3-4)
        
*Multiplication Practice:*
1. 3 × 4 = ___
2. 5 × 2 = ___
3. 7 × 1 = ___

*Word Problems:*
1. Sara has 4 bags with 5 apples each. How many apples does she have in total?`,
        advanced: `## Advanced Math Worksheet (Grade 5-6)
        
*Fractions Practice:*
1. 1/2 + 1/4 = ___
2. 3/5 - 1/5 = ___

*Algebra Basics:*
1. If x + 3 = 7, then x = ___
2. Solve for y: 2y = 10`
      },
      science: {
        basic: `## Basic Science Worksheet (Grade 1-2)
        
*Identify the animal:*
1. 🐶 - ______
2. 🐱 - ______

*True or False:*
1. Plants need water to grow (T/F)`,
        intermediate: `## Intermediate Science Worksheet (Grade 3-4)
        
*Parts of a Plant:*
Label the diagram: roots, stem, leaves, flower

*Simple Machines:*
Name one example of a lever: _______`,
        advanced: `## Advanced Science Worksheet (Grade 5-6)
        
*Solar System:*
1. The third planet from the sun is _______
2. Jupiter is a ______ planet (terrestrial/gas giant)

*Scientific Method:*
What is the first step in the scientific method?`
      }
    };

    return subjects[subject][level] || "Worksheet content will appear here";
  };

  const downloadWorksheet = (worksheet: Worksheet, format: "pdf" | "docx") => {
    alert(`Downloading ${worksheet.title} as ${format.toUpperCase()}`);
    // In a real app, this would generate and download the file
  };

  const assignWorksheet = (worksheet: Worksheet) => {
    alert(`"${worksheet.title}" assigned to students!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">AI-Powered Worksheet Generator</span>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Worksheet Generator</CardTitle>
            <CardDescription className="text-purple-100">
              Upload textbook pages or photos to generate differentiated worksheets instantly
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Settings Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Worksheet Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select 
                  value={subject}
                  onValueChange={(value) => setSubject(value as Subject)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="language">Language Arts</SelectItem>
                    <SelectItem value="social-studies">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Base Difficulty</Label>
                <Select 
                  value={difficulty}
                  onValueChange={(value) => setDifficulty(value as Difficulty)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="include-answers" 
                  checked={includeAnswers}
                  onCheckedChange={setIncludeAnswers}
                />
                <Label htmlFor="include-answers">Include Answer Key</Label>
                <Bookmark className="w-4 h-4 ml-1 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Upload & Generate Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Upload Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                {imagePreview ? (
                  <div className="mb-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-md shadow"
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedImage?.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a photo of textbook pages, handwritten notes, or diagrams
                    </p>
                  </>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  ref={fileInputRef}
                />
                <Button 
                  variant="outline" 
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 mx-auto"
                >
                  <ImageIcon className="w-4 h-4" />
                  {imagePreview ? "Change Image" : "Select Image"}
                </Button>
              </div>
              
              <Button 
                onClick={generateWorksheets} 
                disabled={!selectedImage || isGenerating}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Worksheets ({progress}%)
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Generate Worksheets
                  </div>
                )}
              </Button>

              {isGenerating && (
                <Progress value={progress} className="h-2" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Generated Worksheets Section */}
        {worksheets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Generated Worksheets
              </CardTitle>
              <CardDescription>
                AI-generated worksheets tailored to different skill levels
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {worksheets.map((worksheet) => (
                <Card 
                  key={worksheet.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedWorksheet?.id === worksheet.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedWorksheet(worksheet)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">
                        {worksheet.title}
                      </CardTitle>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {worksheet.grade}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {worksheet.imagePreview && (
                      <img 
                        src={worksheet.imagePreview} 
                        alt="Source" 
                        className="mb-3 h-24 w-full object-contain rounded border"
                      />
                    )}
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {worksheet.questionCount} questions
                      </span>
                      <span className="text-muted-foreground">
                        {worksheet.pages} page{worksheet.pages > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadWorksheet(worksheet, "pdf");
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          assignWorksheet(worksheet);
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Assign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Worksheet Preview Section */}
        {selectedWorksheet && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedWorksheet.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {selectedWorksheet.difficulty}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {selectedWorksheet.subject}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/30">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {selectedWorksheet.content}
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => downloadWorksheet(selectedWorksheet, "pdf")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => downloadWorksheet(selectedWorksheet, "docx")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download DOCX
                </Button>
                <Button 
                  className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500"
                  onClick={() => assignWorksheet(selectedWorksheet)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Assign to Class
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};