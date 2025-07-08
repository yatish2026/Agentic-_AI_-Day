import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartBar, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockStudents = [
  { id: 1, name: "Diya karmakar", rank: 1, assignments: 12, quizzes: 8, projects: 3, performance: 95 },
  { id: 2, name: "kishore kumar", rank: 2, assignments: 11, quizzes: 7, projects: 3, performance: 88 },
  { id: 3, name: "mahesh das", rank: 3, assignments: 10, quizzes: 6, projects: 2, performance: 82 },
  { id: 4, name: "Sunita Devi", rank: 4, assignments: 9, quizzes: 6, projects: 2, performance: 78 },
  { id: 5, name: "K.s shaziya", rank: 5, assignments: 8, quizzes: 5, projects: 2, performance: 75 },
  { id: 6, name: "Kavya Reddy", rank: 6, assignments: 8, quizzes: 5, projects: 1, performance: 72 },
  { id: 7, name: "karthik Reddy", rank: 7, assignments: 7, quizzes: 4, projects: 1, performance: 68 },
  { id: 8, name: "Sita Gupta", rank: 8, assignments: 6, quizzes: 4, projects: 1, performance: 65 },
  { id: 9, name: "Arjun Yadav", rank: 9, assignments: 6, quizzes: 3, projects: 1, performance: 62 },
  { id: 10, name: "Pooja Jain", rank: 10, assignments: 5, quizzes: 3, projects: 0, performance: 58 }
];

export const ProgressTracker = () => {
  const [students] = useState(mockStudents);
  const navigate = useNavigate();

  const assignBasedOnPerformance = () => {
    alert("Personalized assignments sent to students based on their performance levels!");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
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
              <ChartBar className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Student Progress Tracker</CardTitle>
            <p className="text-muted-foreground">Monitor individual student performance and identify learning gaps</p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={assignBasedOnPerformance}
              className="w-full mb-6 bg-gradient-primary"
            >
              <Send className="w-4 h-4 mr-2" />
              Assign Work Based on Performance
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {students.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">Rank #{student.rank}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{student.performance}%</div>
                    <div className="text-xs text-muted-foreground">Overall Performance</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{student.assignments}</div>
                    <div className="text-xs text-muted-foreground">Assignments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{student.quizzes}</div>
                    <div className="text-xs text-muted-foreground">Quizzes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{student.projects}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>

                <Progress value={student.performance} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};