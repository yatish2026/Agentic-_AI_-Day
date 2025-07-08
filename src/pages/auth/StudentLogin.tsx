import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StudentLogin = () => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/student-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Student Login</CardTitle>
            <p className="text-muted-foreground">Access your learning portal</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="grade">Select Your Grade</Label>
                <Select value={grade} onValueChange={setGrade} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-1">Grade 1</SelectItem>
                    <SelectItem value="grade-2">Grade 2</SelectItem>
                    <SelectItem value="grade-3">Grade 3</SelectItem>
                    <SelectItem value="grade-4">Grade 4</SelectItem>
                    <SelectItem value="grade-5">Grade 5</SelectItem>
                    <SelectItem value="grade-6">Grade 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || !name || !grade}
                className="w-full bg-gradient-accent"
              >
                {isLoading ? "Logging in..." : "Start Learning"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};