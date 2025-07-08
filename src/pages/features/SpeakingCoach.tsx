import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Mic, MicOff, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SpeakingCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      analyzeSpeech();
    }
  };

  const analyzeSpeech = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setFeedback({
        pronunciation: 85,
        clarity: 78,
        confidence: 90,
        suggestions: [
          "🎯 Excellent pronunciation! Slow down slightly for more clarity.",
          "🔊 Great confidence, maintain the tone and volume.",
          "🗣️ Work on crisp articulation of consonants."
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <Card className="shadow-xl bg-blue-100/70 backdrop-blur rounded-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-semibold text-blue-700">Speaking Coach - Vaani Saathi</CardTitle>
            <p className="text-muted-foreground text-sm">🎙️ Practice speaking with AI-powered feedback</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full transition-all duration-500 flex items-center justify-center ${isRecording ? 'bg-blue-200 animate-pulse' : 'bg-blue-100'}`}>
                {isRecording ? (
                  <MicOff className="w-16 h-16 text-cyan-600 animate-pulse" />
                ) : (
                  <Mic className="w-16 h-16 text-blue-600" />
                )}
              </div>

              <Button
                onClick={toggleRecording}
                disabled={isAnalyzing}
                className={`w-full max-w-sm text-white text-lg shadow-md ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                  }`}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>

              {isRecording && (
                <p className="mt-3 text-sm text-blue-600 animate-pulse">Recording... Speak clearly 🎤</p>
              )}

              {isAnalyzing && (
                <p className="mt-3 text-sm text-cyan-600 animate-pulse">Analyzing your speech with AI magic ✨...</p>
              )}
            </div>
          </CardContent>
        </Card>

        {feedback && (
          <div className="space-y-6 mt-8">
            <Card className="bg-blue-100/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Sparkles className="w-5 h-5 text-cyan-500" />
                  AI Speech Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">📝 Transcript:</h4>
                  <div className="bg-blue-200 p-3 rounded text-sm italic">
                    "Hello, my name is [Student Name]. Today I want to talk about water conservation. Water is essential for all living beings. It is important to use it wisely and avoid wastage. We can conserve water by turning off taps, fixing leaks, and using water-saving appliances. Let us all pledge to save water for a better tomorrow."
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[{ label: "Pronunciation", value: feedback.pronunciation }, { label: "Clarity", value: feedback.clarity }, { label: "Confidence", value: feedback.confidence }].map(({ label, value }, i) => (
                    <div key={i} className="text-center p-4 bg-cyan-50 rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-cyan-700">{value}%</div>
                      <div className="text-sm text-gray-600">{label} Score</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-gray-800">💡 Suggestions:</h4>
                  <ul className="space-y-2">
                    {feedback.suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm">💾 Save</Button>
                  <Button variant="outline" size="sm">🔁 Try Again</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle className="text-blue-800">🏆 Speaking Leaderboard</CardTitle>
                <p className="text-sm text-muted-foreground">Top performers this week</p>
              </CardHeader>
              <CardContent>
                {[{ name: "Priya Singh", score: 92, message: "Excellent pronunciation!" }, { name: "Rahul Sharma", score: 88, message: "Great confidence level!" }, { name: "Amit Kumar", score: 85, message: "Clear and steady speech!" }, { name: "Sunita Devi", score: 82, message: "Good improvement!" }, { name: "Ravi Patel", score: 79, message: "Keep practicing!" }].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-tr from-cyan-600 to-blue-500 text-white font-bold text-sm rounded-full flex items-center justify-center shadow">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.message}</div>
                      </div>
                    </div>
                    <div className="font-bold text-cyan-700">{student.score}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
