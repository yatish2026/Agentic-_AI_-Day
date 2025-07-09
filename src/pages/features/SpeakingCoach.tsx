import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Mic, MicOff, Sparkles, Volume2, BookOpen, Trophy, Clock, TrendingUp, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SpeechFeedback {
  pronunciation: number;
  clarity: number;
  confidence: number;
  fluency: number;
  vocabulary: number;
  transcript: string;
  suggestions: string[];
  wordCloud: string[];
  improvementAreas: string[];
  strengths: string[];
  historicalData: {
    date: string;
    score: number;
  }[];
}

const SpeakingCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<SpeechFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedTopic, setSelectedTopic] = useState("environment");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "bengali", label: "Bengali" },
    { value: "tamil", label: "Tamil" },
  ];

  const topics = [
    { value: "environment", label: "Environment" },
    { value: "technology", label: "Technology" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "current-affairs", label: "Current Affairs" },
  ];

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    analyzeSpeech();
  };

  const analyzeSpeech = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setFeedback({
        pronunciation: 85 + Math.floor(Math.random() * 10),
        clarity: 78 + Math.floor(Math.random() * 10),
        confidence: 90 + Math.floor(Math.random() * 5),
        fluency: 82 + Math.floor(Math.random() * 10),
        vocabulary: 75 + Math.floor(Math.random() * 15),
        transcript: "Hello, my name is [Student Name]. Today I want to talk about water conservation. Water is essential for all living beings. It is important to use it wisely and avoid wastage. We can conserve water by turning off taps, fixing leaks, and using water-saving appliances. Let us all pledge to save water for a better tomorrow.",
        suggestions: [
          "🎯 Excellent pronunciation! Slow down slightly for more clarity.",
          "🔊 Great confidence, maintain the tone and volume.",
          "🗣️ Work on crisp articulation of consonants.",
          "📈 Try using more advanced vocabulary to improve your score.",
          "⏱️ Your speaking rate is good, but could be more consistent."
        ],
        wordCloud: ["water", "conservation", "essential", "living", "important", "wisely", "wastage", "taps", "leaks", "appliances", "pledge", "better", "tomorrow"],
        improvementAreas: ["Vocabulary range", "Sentence structure", "Pausing"],
        strengths: ["Confidence", "Pronunciation", "Fluency"],
        historicalData: [
          { date: "2023-05-01", score: 72 },
          { date: "2023-05-08", score: 75 },
          { date: "2023-05-15", score: 78 },
          { date: "2023-05-22", score: 82 },
          { date: "2023-05-29", score: 85 },
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const leaderboard = [
    { name: "Priya Singh", score: 92, avatar: "PS", improvement: 5, streak: 7 },
    { name: "Rahul Sharma", score: 88, avatar: "RS", improvement: 3, streak: 5 },
    { name: "Amit Kumar", score: 85, avatar: "AK", improvement: 7, streak: 3 },
    { name: "Sunita Devi", score: 82, avatar: "SD", improvement: 4, streak: 10 },
    { name: "Ravi Patel", score: 79, avatar: "RP", improvement: 2, streak: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 p-6">
      <div className="container mx-auto max-w-6xl">
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
            <GraduationCap className="w-5 h-5" />
            <span>Vaani Saathi - AI Speaking Coach</span>
          </div>
        </div>

        <Card className="shadow-xl bg-white/90 backdrop-blur rounded-2xl border-0 mb-8">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Speaking Coach
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Practice and improve your speaking skills with AI-powered feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
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
                <label className="block text-sm font-medium mb-1">Select Topic</label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map(topic => (
                      <SelectItem key={topic.value} value={topic.value}>
                        {topic.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-center">
              <div className={`w-40 h-40 mx-auto mb-6 rounded-full transition-all duration-500 flex items-center justify-center relative ${
                isRecording ? 'bg-blue-100 animate-pulse shadow-lg' : 'bg-white shadow-md'
              }`}>
                {isRecording ? (
                  <>
                    <MicOff className="w-16 h-16 text-cyan-600" />
                    <div className="absolute bottom-4 left-0 right-0 text-sm font-medium text-blue-600">
                      {formatTime(recordingTime)}
                    </div>
                  </>
                ) : (
                  <Mic className="w-16 h-16 text-blue-600" />
                )}
              </div>

              <Button
                onClick={toggleRecording}
                disabled={isAnalyzing}
                className={`w-full max-w-sm text-white text-lg shadow-md transform transition-all hover:scale-105 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                }`}
                size="lg"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>

              {isRecording && (
                <p className="mt-3 text-sm text-blue-600 animate-pulse flex items-center justify-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Recording... Speak clearly into your microphone
                </p>
              )}

              {isAnalyzing && (
                <p className="mt-3 text-sm text-cyan-600 animate-pulse flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Analyzing your speech with AI...
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {feedback && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Sparkles className="w-5 h-5 text-cyan-500" />
                  AI Speech Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">📝 Your Transcript</h4>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen to playback
                    </Button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-gray-700 italic">"{feedback.transcript}"</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { label: "Pronunciation", value: feedback.pronunciation, icon: <BookOpen className="w-5 h-5" /> },
                    { label: "Clarity", value: feedback.clarity, icon: <Mic className="w-5 h-5" /> },
                    { label: "Confidence", value: feedback.confidence, icon: <Trophy className="w-5 h-5" /> },
                    { label: "Fluency", value: feedback.fluency, icon: <TrendingUp className="w-5 h-5" /> },
                    { label: "Vocabulary", value: feedback.vocabulary, icon: <GraduationCap className="w-5 h-5" /> },
                  ].map(({ label, value, icon }, i) => (
                    <div key={i} className="text-center p-4 bg-white rounded-lg shadow-sm border">
                      <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {icon}
                      </div>
                      <div className="text-2xl font-bold text-blue-700">{value}%</div>
                      <div className="text-sm text-gray-600">{label}</div>
                      <Progress value={value} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-gray-800">📊 Word Frequency</h4>
                  <div className="flex flex-wrap gap-2">
                    {feedback.wordCloud.map((word: string, index: number) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 rounded-full text-sm ${
                          index % 3 === 0 ? 'bg-cyan-100 text-cyan-800' :
                          index % 3 === 1 ? 'bg-blue-100 text-blue-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium mb-3 text-green-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      ✅ Your Strengths
                    </h4>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-medium mb-3 text-red-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      📌 Areas to Improve
                    </h4>
                    <ul className="space-y-2">
                      {feedback.improvementAreas.map((area: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Practice Similar Topic
                  </Button>
                  <Button variant="outline">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen to Model Answer
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Save Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800">📈 Your Speaking Progress</CardTitle>
                <CardDescription>Track your improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <TrendingUp className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                    <p className="text-blue-600 font-medium">Your speaking score has improved by 15% this month!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last 5 attempts: {feedback.historicalData.map(d => d.score).join(" → ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Speaking Leaderboard
                </CardTitle>
                <CardDescription>Top performers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 font-bold rounded-full flex items-center justify-center shadow ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                          index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{student.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-800">{student.name}</div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                +{student.improvement}%
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                <Clock className="w-3 h-3 text-blue-500" />
                                {student.streak} day streak
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">{student.score}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakingCoach;