import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, ArrowLeft, Download, FileText, Headphones, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VoiceToContent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const navigate = useNavigate();

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setTranscription("मुझे गणित के addition के बारे में worksheet बनाना है। बच्चों के लिए 10 तक के numbers के साथ simple problems चाहिए।");
      generateContent();
    }, 3000);
  };

  const generateContent = () => {
    setTimeout(() => {
      setGeneratedContent(`
## Generated Worksheet Content

### Topic: Addition (संख्या जोड़ना)
### Grade: 1-2

**Fill in the blanks:**
1. 3 + 2 = ___
2. 5 + 1 = ___
3. 4 + 3 = ___

**Word Problems:**
1. राम के पास 3 आम हैं। उसकी माँ ने उसे 2 और आम दिए। अब राम के पास कुल कितने आम हैं?
2. सीता के पास 5 पेंसिल हैं। उसके दोस्त ने उसे 1 और पेंसिल दी। अब सीता के पास कुल कितनी पेंसिल हैं?

**MCQ Questions:**
1. 6 + 2 = ?
   a) 7  b) 8  c) 9
2. 4 + 4 = ?
   a) 6  b) 8  c) 10
      `);
    }, 1500);
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
              <Mic className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🎙️ Voice-to-Content Generator</CardTitle>
            <p className="text-muted-foreground">
              Speak in your local language to create worksheets and assignments instantly
            </p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recording Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Voice Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Button
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`w-24 h-24 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-primary'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  {isRecording ? "Recording... Speak clearly" : "Click to start recording"}
                </p>
              </div>

              {transcription && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-medium mb-2">📝 Transcription:</h4>
                  <p className="text-sm">{transcription}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Content Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Generated Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <Textarea
                    value={generatedContent}
                    readOnly
                    className="min-h-[300px] font-mono text-xs"
                  />
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download DOCX
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generated content will appear here after recording</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};