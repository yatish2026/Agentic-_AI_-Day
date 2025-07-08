// AI-powered Drama Script Generator Page (No framer-motion, Improved Visual Media)
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DramaScripts = () => {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const generateScript = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setScript({
        title: `Drama Script: ${topic}`,
        characters: ["Narrator", "Ravi (Student)", "Priya (Student)", "Teacher", "Village Elder"],
        scenes: [
          {
            scene: "Scene 1: The Problem",
            image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
            dialogue: [
              "Narrator: In the village of Greenfield, water was being wasted every day...",
              "Ravi: Look! The tap is running and no one is using it!",
              "Priya: We learned in school that water is precious. We must do something!"
            ]
          },
          {
            scene: "Scene 2: The Solution",
            image: "https://images.unsplash.com/photo-1517153292778-40c6a4e3a3f9",
            dialogue: [
              "Teacher: Children, what can we do to save water?",
              "Ravi: We can turn off taps when not in use!",
              "Priya: We can collect rainwater for plants!",
              "Village Elder: You children are wise. Let's work together!"
            ]
          }
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecf0f3] to-[#ffffff] p-4">
      <div className="container mx-auto max-w-5xl">
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

        <Card className="mb-6 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <School className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">AI Drama & Roleplay Scripts</CardTitle>
            <p className="text-muted-foreground text-sm">Instantly generate visuals and scripts for engaging educational dramas</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="topic-input">Enter Topic (e.g., Water Conservation)</Label>
              <Input
                id="topic-input"
                placeholder="Water Conservation, Tree Plantation, Cleanliness, etc."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-white shadow-inner"
              />
            </div>
            <Button
              onClick={generateScript}
              disabled={!topic.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white"
            >
              {isGenerating ? "Generating Script..." : "Generate Script with AI"}
            </Button>
          </CardContent>
        </Card>

        {script && (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-indigo-700">
                <Play className="w-5 h-5" />
                {script.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Characters:</h4>
                <div className="flex flex-wrap gap-2">
                  {script.characters.map((character: string, index: number) => (
                    <span key={index} className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                      {character}
                    </span>
                  ))}
                </div>
              </div>
              {script.scenes.map((scene: any, index: number) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-lg mb-2">{scene.scene}</h4>
                  <img
                    src={scene.image}
                    alt="Scene visual"
                    className="w-full rounded-md h-48 object-cover mb-3"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <div className="space-y-1">
                    {scene.dialogue.map((line: string, idx: number) => (
                      <p key={idx} className="text-sm leading-relaxed">
                        <span className="font-medium text-gray-800">{line.split(":")[0]}:</span>
                        <span className="ml-2 text-gray-700">{line.split(":").slice(1).join(":")}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-300">
                <h4 className="font-semibold mb-2">🎥 AI Animated Preview</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Enjoy a short AI-generated animation for your classroom demo
                </p>
                <video
                  controls
                  className="rounded-lg w-full"
                  poster="https://img.youtube.com/vi/tgbNymZ7vqY/maxresdefault.jpg"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">Download Script</Button>
                  <Button variant="outline" size="sm">Download Visuals</Button>
                  <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Watch Full Animation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
