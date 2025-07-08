import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VisualAidCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [diagram, setDiagram] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const generateDiagram = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setDiagram(`Generated blackboard-friendly diagram for: ${prompt}`);
      setIsGenerating(false);
    }, 2000);
  };

  const sendToStudents = () => {
    // Simulate sending to students
    alert("Diagram and explanatory video sent to all students!");
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
              <Image className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Visual Aid Creator</CardTitle>
            <p className="text-muted-foreground">Generate blackboard-friendly diagrams and visual learning materials</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="diagram-prompt">Describe the diagram you need</Label>
              <Input
                id="diagram-prompt"
                placeholder="Example: Draw a simple diagram of the water cycle"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={generateDiagram} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-primary"
            >
              {isGenerating ? "Generating Diagram..." : "Generate Diagram"}
            </Button>
          </CardContent>
        </Card>

        {diagram && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Visual Aid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <Image className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{diagram}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  + Short explanatory video/animation generated
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Download Image</Button>
                <Button variant="outline" size="sm">Download Video</Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-primary"
                  onClick={sendToStudents}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to All Students
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};