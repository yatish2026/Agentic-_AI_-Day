import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StoryGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const generateStory = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setStory(`Once upon a time in our village, ${prompt}. The children learned valuable lessons about friendship and community, understanding that every person has a unique role to play in making their surroundings better.`);
      setIsGenerating(false);
    }, 2000);
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
            Back to Home
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Book className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Hyper-Local Story Generator</CardTitle>
            <p className="text-muted-foreground">Create culturally relevant stories in your local language</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="story-prompt">Describe the story you want (in your local language)</Label>
              <Textarea
                id="story-prompt"
                placeholder="Example: Create a story about farmers to explain soil types in Marathi"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={generateStory} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-primary"
            >
              {isGenerating ? "Generating Story..." : "Generate Story"}
            </Button>
          </CardContent>
        </Card>

        {story && (
          <Card>
            <CardHeader>
              <CardTitle>📚 Story Title: The Journey of a Water Drop</CardTitle>
              <p className="text-sm text-muted-foreground">Language: English (Simple, classroom-friendly) | Science Topic: The Water Cycle</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Generated Story:</h4>
                <div className="leading-relaxed text-sm space-y-3">
                  <p>In a small village called Shantipur, a boy named Ravi was learning about the water cycle in school. His teacher asked, "Can anyone tell me where water comes from?"</p>
                  
                  <p>Ravi closed his eyes and imagined, "What if I was a drop of water?"</p>
                  
                  <p>"I would rise up from the river as steam when the sun shines. I would float in the sky as part of the clouds. Then, when the clouds get heavy, I would fall as rain back to the earth. I would flow into rivers, soak into the soil, help plants grow, and again rise back to the sky as vapor!"</p>
                  
                  <p>The teacher smiled and explained, "This is called the Water Cycle. It is nature's way of recycling water so that life can survive on Earth."</p>
                  
                  <p>Ravi understood how important water is. He promised to tell all his friends, "Don't waste water, because every drop is precious!"</p>
                </div>
              </div>
              
              <div className="bg-gradient-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📖 Simple Science Explanation Inside the Story:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Evaporation — Water turns to vapor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Condensation — Clouds form</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Precipitation — Rain falls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Infiltration — Water enters soil</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Save Story</Button>
                <Button variant="outline" size="sm">Download PDF</Button>
                <Button size="sm" className="bg-gradient-primary">Share with Students</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};