import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  ArrowLeft, 
  Download, 
  FileText, 
  Headphones, 
  MicOff,
  Languages,
  BookOpen,
  School,
  Sparkles,
  ClipboardEdit,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ContentType = 'worksheet' | 'lesson-plan' | 'quiz' | 'story' | 'assignment';
type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';
type Language = 'hindi' | 'english' | 'bilingual';

interface GeneratedContent {
  id: string;
  title: string;
  type: ContentType;
  language: Language;
  difficulty: DifficultyLevel;
  content: string;
  createdAt: Date;
  wordCount: number;
}

export const VoiceToContent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [contentType, setContentType] = useState<ContentType>('worksheet');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('basic');
  const [language, setLanguage] = useState<Language>('hindi');
  const [isBilingual, setIsBilingual] = useState(false);
  const [history, setHistory] = useState<GeneratedContent[]>([]);
  const navigate = useNavigate();

  // Sample content templates
  const contentTemplates = {
    worksheet: {
      hindi: `## वर्कशीट: जोड़ (Addition)
      
### कक्षा: 1-2

*रिक्त स्थान भरें:*
1. 3 + 2 = ___
2. 5 + 1 = ___
3. 4 + 3 = ___

*शब्द समस्याएँ:*
1. राम के पास 3 आम हैं। उसकी माँ ने उसे 2 और आम दिए। अब राम के पास कुल कितने आम हैं?
2. सीता के पास 5 पेंसिल हैं। उसके दोस्त ने उसे 1 और पेंसिल दी। अब सीता के पास कुल कितनी पेंसिल हैं?`,
      english: `## Worksheet: Addition
      
### Grade: 1-2

*Fill in the blanks:*
1. 3 + 2 = ___
2. 5 + 1 = ___
3. 4 + 3 = ___

*Word Problems:*
1. Ram has 3 mangoes. His mother gave him 2 more mangoes. How many mangoes does Ram have now?
2. Sita has 5 pencils. Her friend gave her 1 more pencil. How many pencils does Sita have now?`,
      bilingual: `## Worksheet/वर्कशीट: Addition/जोड़
      
### Grade/कक्षा: 1-2

*Fill in the blanks/रिक्त स्थान भरें:*
1. 3 + 2 = ___  
2. 5 + 1 = ___  
3. 4 + 3 = ___  

*Word Problems/शब्द समस्याएँ:*
1. Ram has 3 mangoes. His mother gave him 2 more mangoes. How many mangoes does Ram have now?  
   राम के पास 3 आम हैं। उसकी माँ ने उसे 2 और आम दिए। अब राम के पास कुल कितने आम हैं?`
    },
    'lesson-plan': {
      hindi: `## पाठ योजना: जोड़ का परिचय
      
### उद्देश्य:
- छात्र 10 तक की संख्याओं को जोड़ना सीखेंगे
- छात्र सरल शब्द समस्याओं को हल करना सीखेंगे

### गतिविधियाँ:
1. परिचय (10 मिनट): संख्या रेखा का उपयोग करके जोड़ समझाएं
2. समूह कार्य (15 मिनट): छात्र जोड़ के उदाहरण बनाएंगे
3. स्वतंत्र अभ्यास (10 मिनट): वर्कशीट पूरा करें`,
      english: `## Lesson Plan: Introduction to Addition
      
### Objectives:
- Students will learn to add numbers up to 10
- Students will learn to solve simple word problems

### Activities:
1. Introduction (10 mins): Demonstrate addition using number line
2. Group Work (15 mins): Students create addition examples
3. Independent Practice (10 mins): Complete worksheet`,
      bilingual: `## Lesson Plan/पाठ योजना: Introduction to Addition/जोड़ का परिचय
      
### Objectives/उद्देश्य:
- Students will learn to add numbers up to 10  
  छात्र 10 तक की संख्याओं को जोड़ना सीखेंगे
- Students will learn to solve simple word problems  
  छात्र सरल शब्द समस्याओं को हल करना सीखेंगे`
    },
    quiz: {
      hindi: `## प्रश्नोत्तरी: जोड़
      
1. 2 + 3 = ?  
   a) 4  
   b) 5  
   c) 6  

2. यदि राहुल के पास 4 किताबें हैं और वह 3 और किताबें खरीदता है, तो उसके पास कुल कितनी किताबें होंगी?  
   a) 6  
   b) 7  
   c) 8  

3. 5 + 0 = ?  
   a) 0  
   b) 5  
   c) 10`,
      english: `## Quiz: Addition
      
1. 2 + 3 = ?  
   a) 4  
   b) 5  
   c) 6  

2. If Rahul has 4 books and buys 3 more books, how many books does he have in total?  
   a) 6  
   b) 7  
   c) 8  

3. 5 + 0 = ?  
   a) 0  
   b) 5  
   c) 10`,
      bilingual: `## Quiz/प्रश्नोत्तरी: Addition/जोड़
      
1. 2 + 3 = ?  
   a) 4  
   b) 5  
   c) 6  

2. If Rahul has 4 books and buys 3 more books, how many books does he have in total?  
   यदि राहुल के पास 4 किताबें हैं और वह 3 और किताबें खरीदता है, तो उसके पास कुल कितनी किताबें होंगी?  
   a) 6  
   b) 7  
   c) 8`
    }
  };

  // Sample transcriptions based on content type
  const sampleTranscriptions = {
    worksheet: "मुझे गणित के addition के बारे में worksheet बनाना है। बच्चों के लिए 10 तक के numbers के साथ simple problems चाहिए।",
    'lesson-plan': "मुझे कक्षा 1 के लिए जोड़ सिखाने के लिए एक पाठ योजना चाहिए। 30 मिनट की अवधि के लिए विभिन्न गतिविधियों के साथ।",
    quiz: "मुझे 5 सरल जोड़ प्रश्नों वाली एक प्रश्नोत्तरी चाहिए, प्रत्येक के लिए 3 विकल्पों के साथ।"
  };

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('contentHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Set default transcription based on content type
    setTranscription(sampleTranscriptions[contentType]);
  }, [contentType]);

  const startRecording = () => {
    setIsRecording(true);
    setProgress(0);
    
    // Simulate recording progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      setIsRecording(false);
      clearInterval(interval);
      setProgress(100);
      processRecording();
    }, 3000);
  };

  const processRecording = () => {
    setIsProcessing(true);
    setTranscription(sampleTranscriptions[contentType]);
    
    setTimeout(() => {
      generateContent();
      setIsProcessing(false);
    }, 2000);
  };

  const generateContent = () => {
    setIsProcessing(true);
    
    // Determine the language to use
    const contentLanguage = isBilingual ? 'bilingual' : language;
    
    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        title: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} on Addition`,
        type: contentType,
        language: isBilingual ? 'bilingual' : language,
        difficulty,
        content: contentTemplates[contentType][contentLanguage],
        createdAt: new Date(),
        wordCount: contentTemplates[contentType][contentLanguage].split(' ').length
      };
      
      setGeneratedContent(newContent);
      
      // Add to history
      const updatedHistory = [newContent, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('contentHistory', JSON.stringify(updatedHistory));
      
      setIsProcessing(false);
    }, 1500);
  };

  const downloadContent = (format: 'pdf' | 'docx') => {
    alert(`Downloading as ${format.toUpperCase()}...`);
    // In a real app, this would generate and download the file
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">AI-Powered Content Generation</span>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">🎙 Voice-to-Content Generator</CardTitle>
            <CardDescription className="text-blue-100">
              Speak naturally in Hindi or English to create educational content instantly
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Content Settings Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardEdit className="w-5 h-5" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select 
                  value={contentType}
                  onValueChange={(value) => setContentType(value as ContentType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worksheet">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Worksheet
                      </div>
                    </SelectItem>
                    <SelectItem value="lesson-plan">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Lesson Plan
                      </div>
                    </SelectItem>
                    <SelectItem value="quiz">
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4" /> Quiz
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select 
                  value={difficulty}
                  onValueChange={(value) => setDifficulty(value as DifficultyLevel)}
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

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={language}
                  onValueChange={(value) => setLanguage(value as Language)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="bilingual" 
                  checked={isBilingual}
                  onCheckedChange={setIsBilingual}
                />
                <Label htmlFor="bilingual">Bilingual Output</Label>
                <Languages className="w-4 h-4 ml-1 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Voice Input Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Voice Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Button
                  onClick={startRecording}
                  disabled={isRecording || isProcessing}
                  className={`w-32 h-32 rounded-full relative overflow-hidden ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : "bg-gradient-to-r from-blue-500 to-blue-600"
                  }`}
                >
                  {isRecording ? (
                    <>
                    <Progress 
  value={progress} 
  className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 rounded-none"
  // Remove indicatorClassName and use the default indicator styling
/>
                    </>
                  ) : isProcessing ? (
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  {isRecording 
                    ? "Recording... Speak clearly about what content you need" 
                    : isProcessing
                    ? "Processing your request..."
                    : "Click to start recording in Hindi or English"}
                </p>
              </div>

              {transcription && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <h4 className="font-medium">Transcription:</h4>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{transcription}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Generated Content Card */}
        {generatedContent && (
          <Card className="mb-6 animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generated {generatedContent.type.charAt(0).toUpperCase() + generatedContent.type.slice(1)}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {generatedContent.language}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {generatedContent.difficulty}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={generatedContent.content}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => downloadContent('pdf')}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => downloadContent('docx')}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download DOCX
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recently Generated Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {history.map((item) => (
                  <Card 
                    key={item.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setGeneratedContent(item)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg line-clamp-1">
                          {item.title}
                        </CardTitle>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {item.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.content.split('\n')[0]}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-xs">
                        <span className="text-muted-foreground">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          {item.wordCount} words
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};