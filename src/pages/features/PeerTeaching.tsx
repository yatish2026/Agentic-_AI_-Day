import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, Plus, TrendingUp, User, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  grade: string;
  performance: 'high' | 'medium' | 'low';
  score: number;
  strengths: string[];
  buddy?: number;
}

interface BuddyPair {
  mentor: Student;
  mentee: Student;
  progress: number;
  sessionsCompleted: number;
}

const students: Student[] = [
  { id: 1, name: "Aarav Sharma", grade: "Grade 3", performance: 'high', score: 92, strengths: ["Math", "Science"] },
  { id: 2, name: "Diya Patel", grade: "Grade 3", performance: 'high', score: 89, strengths: ["English", "Math"] },
  { id: 3, name: "Arjun Singh", grade: "Grade 3", performance: 'medium', score: 75, strengths: ["Art", "Sports"], buddy: 1 },
  { id: 4, name: "Priya Gupta", grade: "Grade 3", performance: 'low', score: 68, strengths: ["Music"], buddy: 2 },
  { id: 5, name: "Rohan Kumar", grade: "Grade 3", performance: 'medium', score: 78, strengths: ["Science"] },
  { id: 6, name: "Ananya Joshi", grade: "Grade 3", performance: 'low', score: 65, strengths: ["Art"] }
];

export const PeerTeaching = () => {
  const [buddyPairs, setBuddyPairs] = useState<BuddyPair[]>([
    {
      mentor: students.find(s => s.id === 1)!,
      mentee: students.find(s => s.id === 3)!,
      progress: 78,
      sessionsCompleted: 5
    },
    {
      mentor: students.find(s => s.id === 2)!,
      mentee: students.find(s => s.id === 4)!,
      progress: 65,
      sessionsCompleted: 3
    }
  ]);

  const navigate = useNavigate();

  const unpairedHighPerformers = students.filter(s => 
    s.performance === 'high' && !buddyPairs.some(bp => bp.mentor.id === s.id)
  );

  const unpairedLowPerformers = students.filter(s => 
    (s.performance === 'low' || s.performance === 'medium') && 
    !buddyPairs.some(bp => bp.mentee.id === s.id)
  );

  const autoAssignPairs = () => {
    const newPairs: BuddyPair[] = [];
    
    unpairedHighPerformers.forEach((mentor, index) => {
      if (unpairedLowPerformers[index]) {
        newPairs.push({
          mentor,
          mentee: unpairedLowPerformers[index],
          progress: 0,
          sessionsCompleted: 0
        });
      }
    });

    setBuddyPairs([...buddyPairs, ...newPairs]);
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🧑‍🏫 Peer Teaching Scheduler</CardTitle>
            <p className="text-muted-foreground">
              Smart buddy system for collaborative learning and peer support
            </p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Current Buddy Pairs */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>👥 Active Buddy Pairs</CardTitle>
              <Button
                onClick={autoAssignPairs}
                className="bg-gradient-primary"
                disabled={unpairedHighPerformers.length === 0 || unpairedLowPerformers.length === 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Auto Assign
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {buddyPairs.map((pair, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      {/* Mentor */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{pair.mentor.name}</p>
                          <p className="text-xs text-muted-foreground">Mentor • {pair.mentor.score}%</p>
                        </div>
                      </div>

                      <div className="text-muted-foreground">↔️</div>

                      {/* Mentee */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{pair.mentee.name}</p>
                          <p className="text-xs text-muted-foreground">Mentee • {pair.mentee.score}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-sm font-medium">{pair.progress}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pair.sessionsCompleted} sessions
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all"
                      style={{ width: `${pair.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              {buddyPairs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No buddy pairs assigned yet</p>
                  <p className="text-xs">Click "Auto Assign" to create pairs automatically</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Class Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{buddyPairs.length}</div>
                <p className="text-sm text-muted-foreground">Active Pairs</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Performers</span>
                  <span className="text-sm font-medium text-green-600">
                    {students.filter(s => s.performance === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Need Support</span>
                  <span className="text-sm font-medium text-red-600">
                    {students.filter(s => s.performance === 'low').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Progress</span>
                  <span className="text-sm font-medium">
                    {buddyPairs.length > 0 
                      ? Math.round(buddyPairs.reduce((sum, pair) => sum + pair.progress, 0) / buddyPairs.length)
                      : 0}%
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Available for Pairing:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Mentors Available</span>
                    <span className="font-medium">{unpairedHighPerformers.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Students Need Help</span>
                    <span className="font-medium">{unpairedLowPerformers.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Students List */}
        <Card>
          <CardHeader>
            <CardTitle>👨‍🎓 All Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map(student => (
                <div key={student.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.grade}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getPerformanceColor(student.performance)}`}>
                      {student.performance}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">{student.score}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-gradient-primary h-1.5 rounded-full"
                        style={{ width: `${student.score}%` }}
                      ></div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Strengths:</p>
                      <div className="flex flex-wrap gap-1">
                        {student.strengths.map(strength => (
                          <span key={strength} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    {student.buddy && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-green-600 font-medium">
                          👥 Paired with {students.find(s => s.id === student.buddy)?.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};