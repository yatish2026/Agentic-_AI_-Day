import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WorksheetGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [worksheets, setWorksheets] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const generateWorksheets = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setWorksheets([
        { grade: "Grade 1-2", title: "Basic Math Worksheet", difficulty: "Easy" },
        { grade: "Grade 3-4", title: "Intermediate Math Worksheet", difficulty: "Medium" },
        { grade: "Grade 5-6", title: "Advanced Math Worksheet", difficulty: "Hard" }
      ]);
      setIsGenerating(false);
    }, 3000);
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
              <Camera className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Worksheet Generator</CardTitle>
            <p className="text-muted-foreground">Upload textbook photos and generate differentiated worksheets</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Upload Textbook Photo</span>
                </Button>
              </label>
              {selectedImage && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {selectedImage.name}
                </p>
              )}
            </div>
            
            <Button 
              onClick={generateWorksheets} 
              disabled={!selectedImage || isGenerating}
              className="w-full bg-gradient-primary"
            >
              {isGenerating ? "Generating Worksheets..." : "Generate Worksheets"}
            </Button>
          </CardContent>
        </Card>

        {worksheets.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Worksheets</h3>
            {worksheets.map((worksheet, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{worksheet.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {worksheet.grade} • {worksheet.difficulty}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary"
                        onClick={() => alert(`${worksheet.title} assigned to students based on performance tracking!`)}
                      >
                        Send as Assignment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};