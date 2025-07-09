import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ArrowLeft, Plus, TrendingUp, User, Star, Calendar, BookOpen, Target, BarChart2, Clock, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Student {
  id: number;
  name: string;
  avatar: string;
  grade: string;
  performance: 'high' | 'medium' | 'low';
  score: number;
  strengths: string[];
  weaknesses?: string[];
  buddy?: number;
  lastSession?: string;
}

interface BuddyPair {
  id: number;
  mentor: Student;
  mentee: Student;
  progress: number;
  sessionsCompleted: number;
  nextSession?: string;
  goals: string[];
}

const students: Student[] = [
  { 
    id: 1, 
    name: "Aarav Sharma", 
    avatar: "AS",
    grade: "Grade 3", 
    performance: 'high', 
    score: 92, 
    strengths: ["Math", "Science"],
    weaknesses: ["Creative Writing"],
    lastSession: "2023-06-15"
  },
  { 
    id: 2, 
    name: "Diya Patel", 
    avatar: "DP",
    grade: "Grade 3", 
    performance: 'high', 
    score: 89, 
    strengths: ["English", "Math"],
    weaknesses: ["Public Speaking"],
    lastSession: "2023-06-14"
  },
  { 
    id: 3, 
    name: "Arjun Singh", 
    avatar: "AR",
    grade: "Grade 3", 
    performance: 'medium', 
    score: 75, 
    strengths: ["Art", "Sports"], 
    weaknesses: ["Math", "Science"],
    buddy: 1,
    lastSession: "2023-06-15"
  },
  { 
    id: 4, 
    name: "Priya Gupta", 
    avatar: "PG",
    grade: "Grade 3", 
    performance: 'low', 
    score: 68, 
    strengths: ["Music"], 
    weaknesses: ["Math", "Reading"],
    buddy: 2,
    lastSession: "2023-06-14"
  },
  { 
    id: 5, 
    name: "Rohan Kumar", 
    avatar: "RK",
    grade: "Grade 3", 
    performance: 'medium', 
    score: 78, 
    strengths: ["Science"],
    weaknesses: ["Writing"],
    lastSession: "2023-06-10"
  },
  { 
    id: 6, 
    name: "Ananya Joshi", 
    avatar: "AJ",
    grade: "Grade 3", 
    performance: 'low', 
    score: 65, 
    strengths: ["Art"],
    weaknesses: ["Math", "Science"],
    lastSession: "2023-06-08"
  },
  { 
    id: 7, 
    name: "Vihaan Malhotra", 
    avatar: "VM",
    grade: "Grade 3", 
    performance: 'high', 
    score: 94, 
    strengths: ["All Subjects"],
    weaknesses: ["None"],
    lastSession: "2023-06-16"
  },
  { 
    id: 8, 
    name: "Ishaan Nair", 
    avatar: "IN",
    grade: "Grade 3", 
    performance: 'low', 
    score: 62, 
    strengths: ["Sports"],
    weaknesses: ["Math", "Science", "Reading"],
    lastSession: "2023-06-09"
  }
];

const initialPairs: BuddyPair[] = [
  {
    id: 1,
    mentor: students.find(s => s.id === 1)!,
    mentee: students.find(s => s.id === 3)!,
    progress: 78,
    sessionsCompleted: 5,
    nextSession: "2023-06-20",
    goals: ["Improve math skills", "Build science vocabulary"]
  },
  {
    id: 2,
    mentor: students.find(s => s.id === 2)!,
    mentee: students.find(s => s.id === 4)!,
    progress: 65,
    sessionsCompleted: 3,
    nextSession: "2023-06-19",
    goals: ["Improve reading comprehension", "Practice math problems"]
  }
];

export const PeerTeaching = () => {
  const [buddyPairs, setBuddyPairs] = useState<BuddyPair[]>(initialPairs);
  const [draggedStudent, setDraggedStudent] = useState<Student | null>(null);
  const [showPairModal, setShowPairModal] = useState(false);
  const [newPair, setNewPair] = useState<{mentor?: Student, mentee?: Student}>({});
  const [activeTab, setActiveTab] = useState<'pairs' | 'students'>('pairs');
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
    const minLength = Math.min(unpairedHighPerformers.length, unpairedLowPerformers.length);
    
    for (let i = 0; i < minLength; i++) {
      newPairs.push({
        id: buddyPairs.length + i + 1,
        mentor: unpairedHighPerformers[i],
        mentee: unpairedLowPerformers[i],
        progress: 0,
        sessionsCompleted: 0,
        nextSession: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days from now
        goals: ["Improve core subjects"]
      });
    }

    setBuddyPairs([...buddyPairs, ...newPairs]);
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (student: Student) => {
    setDraggedStudent(student);
  };

  const handleDrop = (role: 'mentor' | 'mentee') => {
    if (draggedStudent) {
      if ((role === 'mentor' && draggedStudent.performance === 'high') || 
          (role === 'mentee' && (draggedStudent.performance === 'low' || draggedStudent.performance === 'medium'))) {
        setNewPair(prev => ({...prev, [role]: draggedStudent}));
      }
    }
    setDraggedStudent(null);
  };

  const createNewPair = () => {
    if (newPair.mentor && newPair.mentee) {
      const newPairObj: BuddyPair = {
        id: buddyPairs.length + 1,
        mentor: newPair.mentor,
        mentee: newPair.mentee,
        progress: 0,
        sessionsCompleted: 0,
        nextSession: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
        goals: ["General improvement"]
      };
      setBuddyPairs([...buddyPairs, newPairObj]);
      setNewPair({});
      setShowPairModal(false);
    }
  };

  const calculateImprovement = (pair: BuddyPair) => {
    const initialDiff = pair.mentor.score - pair.mentee.score;
    const currentDiff = pair.mentor.score - (pair.mentee.score + (pair.progress / 100 * initialDiff));
    return Math.max(0, initialDiff - currentDiff);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
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
          <div className="flex items-center gap-2 text-primary font-medium">
            <Users className="w-5 h-5" />
            <span>Peer Teaching Scheduler</span>
          </div>
        </div>

        {/* Main Title Card */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl">Peer Teaching Scheduler</CardTitle>
            <CardDescription className="text-white/80">
              Smart buddy system for collaborative learning and peer support
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'pairs' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('pairs')}
          >
            Buddy Pairs
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'students' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('students')}
          >
            All Students
          </button>
        </div>

        {activeTab === 'pairs' ? (
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Current Buddy Pairs */}
            <Card className="lg:col-span-2 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Active Buddy Pairs</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowPairModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Pair
                  </Button>
                  <Button
                    onClick={autoAssignPairs}
                    variant="outline"
                    disabled={unpairedHighPerformers.length === 0 || unpairedLowPerformers.length === 0}
                  >
                    Auto Assign
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {buddyPairs.map((pair) => (
                  <Card key={pair.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          {/* Mentor */}
                          <div className="flex items-center gap-3">
                            <Avatar className="bg-green-100 text-green-800">
                              <AvatarFallback>
                                {pair.mentor.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{pair.mentor.name}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  <span>Mentor</span>
                                </Badge>
                                <span className="text-sm text-muted-foreground">{pair.mentor.score}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-muted-foreground mx-2">↔</div>

                          {/* Mentee */}
                          <div className="flex items-center gap-3">
                            <Avatar className="bg-blue-100 text-blue-800">
                              <AvatarFallback>
                                {pair.mentee.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{pair.mentee.name}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>Mentee</span>
                                </Badge>
                                <span className="text-sm text-muted-foreground">{pair.mentee.score}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium">{pair.progress}%</span>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{pair.sessionsCompleted} sessions</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Next Session</p>
                          <Badge className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{pair.nextSession || "Not scheduled"}</span>
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Improvement</p>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            <span>+{calculateImprovement(pair).toFixed(1)}%</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Learning Goals</p>
                        <div className="flex flex-wrap gap-2">
                          {pair.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              <Check className="w-3 h-3 text-green-600" />
                              <span>{goal}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Progress 
                          value={pair.progress} 
                          className="h-2"
                          indicatorColor="bg-gradient-to-r from-blue-500 to-indigo-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {buddyPairs.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground bg-white/50 rounded-lg border border-dashed">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No buddy pairs assigned yet</p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Button 
                        onClick={() => setShowPairModal(true)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      >
                        Create Pair
                      </Button>
                      <Button 
                        onClick={autoAssignPairs}
                        variant="outline"
                      >
                        Auto Assign
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-primary" />
                  <span>Class Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-3xl font-bold text-primary">{buddyPairs.length}</div>
                    <p className="text-sm text-muted-foreground">Active Pairs</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {buddyPairs.length > 0 
                        ? Math.round(buddyPairs.reduce((sum, pair) => sum + pair.progress, 0) / buddyPairs.length)
                        : 0}%
                    </div>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Performance Distribution</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">High</span>
                        </div>
                        <span className="text-sm font-medium">
                          {students.filter(s => s.performance === 'high').length}
                        </span>
                      </div>
                      <Progress 
                        value={students.filter(s => s.performance === 'high').length / students.length * 100}
                        className="h-2"
                        indicatorColor="bg-green-500"
                      />
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">Medium</span>
                        </div>
                        <span className="text-sm font-medium">
                          {students.filter(s => s.performance === 'medium').length}
                        </span>
                      </div>
                      <Progress 
                        value={students.filter(s => s.performance === 'medium').length / students.length * 100}
                        className="h-2"
                        indicatorColor="bg-yellow-500"
                      />
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">Low</span>
                        </div>
                        <span className="text-sm font-medium">
                          {students.filter(s => s.performance === 'low').length}
                        </span>
                      </div>
                      <Progress 
                        value={students.filter(s => s.performance === 'low').length / students.length * 100}
                        className="h-2"
                        indicatorColor="bg-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-medium text-sm mb-2">Pairing Availability</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Available Mentors</span>
                        <Badge className="bg-green-100 text-green-800">
                          {unpairedHighPerformers.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Students Needing Help</span>
                        <Badge className="bg-red-100 text-red-800">
                          {unpairedLowPerformers.length}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="mb-6 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span>All Students</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {students.map(student => {
                  const isMentor = buddyPairs.some(p => p.mentor.id === student.id);
                  const isMentee = buddyPairs.some(p => p.mentee.id === student.id);
                  
                  return (
                    <Card 
                      key={student.id} 
                      className={`hover:shadow-md transition-shadow ${
                        isMentor ? 'ring-1 ring-green-500' : 
                        isMentee ? 'ring-1 ring-blue-500' : ''
                      }`}
                      draggable
                      onDragStart={() => handleDragStart(student)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {student.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.grade}</p>
                            </div>
                          </div>
                          <Badge className={getPerformanceColor(student.performance)}>
                            {student.performance}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">Overall Score</p>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={student.score} 
                                className="h-2 flex-1"
                                indicatorColor={
                                  student.performance === 'high' ? 'bg-green-500' :
                                  student.performance === 'medium' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }
                              />
                              <span className="text-sm font-medium">{student.score}%</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-1">Strengths</p>
                            <div className="flex flex-wrap gap-1">
                              {student.strengths.map((strength, index) => (
                                <Badge key={index} variant="outline" className="text-green-800 bg-green-50">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {student.weaknesses && student.weaknesses.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-1">Needs Help With</p>
                              <div className="flex flex-wrap gap-1">
                                {student.weaknesses.map((weakness, index) => (
                                  <Badge key={index} variant="outline" className="text-red-800 bg-red-50">
                                    {weakness}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {isMentor && (
                            <Badge className="flex items-center gap-1 bg-green-50 text-green-800">
                              <Star className="w-3 h-3" />
                              <span>Mentor</span>
                            </Badge>
                          )}
                          {isMentee && (
                            <Badge className="flex items-center gap-1 bg-blue-50 text-blue-800">
                              <User className="w-3 h-3" />
                              <span>Mentee</span>
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pair Creation Modal */}
      {showPairModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create New Pair</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setShowPairModal(false);
                    setNewPair({});
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className={`border-2 rounded-lg p-6 text-center ${
                  !newPair.mentor ? 'border-dashed bg-blue-50 border-blue-200' : 'border-solid bg-white'
                } ${draggedStudent?.performance === 'high' ? 'border-blue-500' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop('mentor')}
              >
                {newPair.mentor ? (
                  <div className="flex flex-col items-center">
                    <Avatar className="w-12 h-12 mb-2 bg-green-100 text-green-800">
                      <AvatarFallback>{newPair.mentor.avatar}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{newPair.mentor.name}</p>
                    <p className="text-sm text-muted-foreground">Score: {newPair.mentor.score}%</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setNewPair(prev => ({...prev, mentor: undefined}))}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">Drag a high performer here</p>
                    <p className="text-sm text-muted-foreground">Mentor</p>
                  </>
                )}
              </div>

              <div className="text-center text-muted-foreground">
                <ArrowLeft className="w-6 h-6 mx-auto rotate-90" />
              </div>

              <div 
                className={`border-2 rounded-lg p-6 text-center ${
                  !newPair.mentee ? 'border-dashed bg-blue-50 border-blue-200' : 'border-solid bg-white'
                } ${(draggedStudent?.performance === 'low' || draggedStudent?.performance === 'medium') ? 'border-blue-500' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop('mentee')}
              >
                {newPair.mentee ? (
                  <div className="flex flex-col items-center">
                    <Avatar className="w-12 h-12 mb-2 bg-blue-100 text-blue-800">
                      <AvatarFallback>{newPair.mentee.avatar}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{newPair.mentee.name}</p>
                    <p className="text-sm text-muted-foreground">Score: {newPair.mentee.score}%</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setNewPair(prev => ({...prev, mentee: undefined}))}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <User className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">Drag a student needing help here</p>
                    <p className="text-sm text-muted-foreground">Mentee</p>
                  </>
                )}
              </div>

              <Button 
                className="w-full" 
                disabled={!newPair.mentor || !newPair.mentee}
                onClick={createNewPair}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Pair
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};