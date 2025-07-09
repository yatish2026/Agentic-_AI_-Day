import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartBar, ArrowLeft, Send, Award, BookOpen, ClipboardList, TrendingUp, ChevronDown, ChevronUp, Filter, Search, BarChart2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Student {
  id: number;
  name: string;
  avatar: string;
  rank: number;
  rankChange: number;
  assignments: {
    completed: number;
    total: number;
    lastScore: number;
  };
  quizzes: {
    completed: number;
    total: number;
    averageScore: number;
  };
  projects: {
    completed: number;
    total: number;
    averageScore: number;
  };
  performance: number;
  attendance: number;
  strengths: string[];
  areasToImprove: string[];
  lastActive: string;
}

const mockStudents: Student[] = [
  { 
    id: 1, 
    name: "Diya Karmakar", 
    avatar: "DK",
    rank: 1, 
    rankChange: 2,
    assignments: { completed: 12, total: 12, lastScore: 98 },
    quizzes: { completed: 8, total: 8, averageScore: 96 },
    projects: { completed: 3, total: 3, averageScore: 94 },
    performance: 95, 
    attendance: 98,
    strengths: ["Mathematics", "Scientific Reasoning"],
    areasToImprove: ["Creative Writing"],
    lastActive: "2 hours ago"
  },
  { 
    id: 2, 
    name: "Kishore Kumar", 
    avatar: "KK",
    rank: 2, 
    rankChange: 1,
    assignments: { completed: 11, total: 12, lastScore: 92 },
    quizzes: { completed: 7, total: 8, averageScore: 89 },
    projects: { completed: 3, total: 3, averageScore: 86 },
    performance: 88, 
    attendance: 96,
    strengths: ["Logical Thinking", "Problem Solving"],
    areasToImprove: ["Time Management"],
    lastActive: "5 hours ago"
  },
  { 
    id: 3, 
    name: "Mahesh Das", 
    avatar: "MD",
    rank: 3, 
    rankChange: -1,
    assignments: { completed: 10, total: 12, lastScore: 85 },
    quizzes: { completed: 6, total: 8, averageScore: 83 },
    projects: { completed: 2, total: 3, averageScore: 80 },
    performance: 82, 
    attendance: 94,
    strengths: ["Practical Applications"],
    areasToImprove: ["Theoretical Concepts", "Participation"],
    lastActive: "1 day ago"
  },
  { 
    id: 4, 
    name: "Sunita Devi", 
    avatar: "SD",
    rank: 4, 
    rankChange: 3,
    assignments: { completed: 9, total: 12, lastScore: 82 },
    quizzes: { completed: 6, total: 8, averageScore: 80 },
    projects: { completed: 2, total: 3, averageScore: 78 },
    performance: 78, 
    attendance: 92,
    strengths: ["Artistic Skills"],
    areasToImprove: ["Numeracy", "Scientific Concepts"],
    lastActive: "1 day ago"
  },
  { 
    id: 5, 
    name: "K.S Shaziya", 
    avatar: "KS",
    rank: 5, 
    rankChange: 0,
    assignments: { completed: 8, total: 12, lastScore: 78 },
    quizzes: { completed: 5, total: 8, averageScore: 76 },
    projects: { completed: 2, total: 3, averageScore: 74 },
    performance: 75, 
    attendance: 90,
    strengths: ["Language Skills"],
    areasToImprove: ["Mathematics", "Science"],
    lastActive: "2 days ago"
  },
  { 
    id: 6, 
    name: "Kavya Reddy", 
    avatar: "KR",
    rank: 6, 
    rankChange: -2,
    assignments: { completed: 8, total: 12, lastScore: 75 },
    quizzes: { completed: 5, total: 8, averageScore: 73 },
    projects: { completed: 1, total: 3, averageScore: 70 },
    performance: 72, 
    attendance: 88,
    strengths: ["Creativity"],
    areasToImprove: ["Consistency", "Focus"],
    lastActive: "3 days ago"
  },
  { 
    id: 7, 
    name: "Karthik Reddy", 
    avatar: "KR",
    rank: 7, 
    rankChange: 1,
    assignments: { completed: 7, total: 12, lastScore: 70 },
    quizzes: { completed: 4, total: 8, averageScore: 68 },
    projects: { completed: 1, total: 3, averageScore: 65 },
    performance: 68, 
    attendance: 85,
    strengths: ["Physical Education"],
    areasToImprove: ["Academic Subjects", "Attendance"],
    lastActive: "4 days ago"
  },
  { 
    id: 8, 
    name: "Sita Gupta", 
    avatar: "SG",
    rank: 8, 
    rankChange: -1,
    assignments: { completed: 6, total: 12, lastScore: 68 },
    quizzes: { completed: 4, total: 8, averageScore: 65 },
    projects: { completed: 1, total: 3, averageScore: 62 },
    performance: 65, 
    attendance: 82,
    strengths: ["Social Skills"],
    areasToImprove: ["All Core Subjects"],
    lastActive: "5 days ago"
  },
  { 
    id: 9, 
    name: "Arjun Yadav", 
    avatar: "AY",
    rank: 9, 
    rankChange: 0,
    assignments: { completed: 6, total: 12, lastScore: 65 },
    quizzes: { completed: 3, total: 8, averageScore: 62 },
    projects: { completed: 1, total: 3, averageScore: 60 },
    performance: 62, 
    attendance: 80,
    strengths: ["Hands-on Learning"],
    areasToImprove: ["Theoretical Understanding"],
    lastActive: "1 week ago"
  },
  { 
    id: 10, 
    name: "Pooja Jain", 
    avatar: "PJ",
    rank: 10, 
    rankChange: -2,
    assignments: { completed: 5, total: 12, lastScore: 60 },
    quizzes: { completed: 3, total: 8, averageScore: 58 },
    projects: { completed: 0, total: 3, averageScore: 0 },
    performance: 58, 
    attendance: 78,
    strengths: ["Art"],
    areasToImprove: ["All Subjects", "Attendance"],
    lastActive: "2 weeks ago"
  }
];

const performanceLevels = [
  { name: "Excellent", min: 90, color: "bg-green-500" },
  { name: "Good", min: 80, color: "bg-blue-500" },
  { name: "Average", min: 70, color: "bg-yellow-500" },
  { name: "Needs Improvement", min: 0, color: "bg-red-500" }
];

export const ProgressTracker = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);
  const navigate = useNavigate();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPerformance = performanceFilter === "all" || 
      (performanceFilter === "90" && student.performance >= 90) ||
      (performanceFilter === "80" && student.performance >= 80 && student.performance < 90) ||
      (performanceFilter === "70" && student.performance >= 70 && student.performance < 80) ||
      (performanceFilter === "0" && student.performance < 70);
    return matchesSearch && matchesPerformance;
  });

  const assignBasedOnPerformance = () => {
    // In a real app, this would call an API
    alert("Personalized assignments have been generated and assigned based on each student's performance level!");
  };

  const generateProgressReport = () => {
    // In a real app, this would generate a PDF
    alert("Comprehensive progress report is being generated and will be downloaded shortly!");
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'bg-green-100 text-green-800';
    if (performance >= 80) return 'bg-blue-100 text-blue-800';
    if (performance >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <ChevronUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ChevronDown className="w-4 h-4 text-red-500" />;
    return <span className="w-4 h-4"></span>;
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
            <TrendingUp className="w-5 h-5" />
            <span>Student Progress Tracker</span>
          </div>
        </div>

        {/* Main Title Card */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <ChartBar className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl">Student Progress Tracker</CardTitle>
            <CardDescription className="text-white/80">
              Advanced analytics and performance monitoring for your classroom
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={assignBasedOnPerformance}
              className="bg-white text-primary hover:bg-white/90"
            >
              <Send className="w-4 h-4 mr-2" />
              Assign Personalized Work
            </Button>
            <Button 
              onClick={generateProgressReport}
              variant="outline" 
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Full Report
            </Button>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select onValueChange={setPerformanceFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Filter by performance" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Performance Levels</SelectItem>
                  <SelectItem value="90">Excellent (90-100%)</SelectItem>
                  <SelectItem value="80">Good (80-89%)</SelectItem>
                  <SelectItem value="70">Average (70-79%)</SelectItem>
                  <SelectItem value="0">Needs Improvement (Below 70%)</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center justify-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Showing {filteredStudents.length} of {students.length} students
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Class Performance Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>


<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {performanceLevels.map(level => {
    const count = students.filter(s => 
      s.performance >= level.min && 
      (level.min === 0 || s.performance < level.min + 10)
    ).length;
    
    const percentage = Math.round((count / students.length) * 100);
    
    return (
      <div key={level.name} className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">{level.name}</span>
          <Badge className={`${level.color.replace('bg-', 'bg-').replace('500', '100')} ${level.color.replace('bg-', 'text-')}`}>
            {count} student{count !== 1 ? 's' : ''}
          </Badge>
        </div>
        <div className="relative">
          <Progress 
            value={percentage} 
            className="h-2 bg-gray-200"
          />
          <div 
            className="absolute top-0 left-0 h-2 rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: level.color === 'bg-green-500' ? '#10B981' :
                              level.color === 'bg-blue-500' ? '#3B82F6' :
                              level.color === 'bg-yellow-500' ? '#F59E0B' : '#EF4444'
            }}
          ></div>
        </div>
        <div className="text-right mt-1 text-sm text-muted-foreground">
          {percentage}% of class
        </div>
      </div>
    );
  })}
</div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <Card 
              key={student.id} 
              className={`border-0 shadow-md hover:shadow-lg transition-shadow ${
                expandedStudent === student.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardContent className="p-0">
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>Rank #{student.rank}</span>
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getRankChangeIcon(student.rankChange)}
                            {student.rankChange !== 0 && (
                              <span className="text-xs">
                                {Math.abs(student.rankChange)} from last week
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{student.performance}%</div>
                      <Badge className={getPerformanceColor(student.performance)}>
                        {student.performance >= 90 ? 'Excellent' : 
                         student.performance >= 80 ? 'Good' : 
                         student.performance >= 70 ? 'Average' : 'Needs Improvement'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {expandedStudent === student.id && (
                  <div className="border-t p-4 space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Assignments</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            {student.assignments.completed}/{student.assignments.total}
                          </span>
                          <Badge variant="outline">
                            {student.assignments.lastScore}% last
                          </Badge>
                        </div>
                        <Progress 
                          value={(student.assignments.completed / student.assignments.total) * 100} 
                          className="h-2 mt-2"
                        />
                      </div>

                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Quizzes</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            {student.quizzes.completed}/{student.quizzes.total}
                          </span>
                          <Badge variant="outline">
                            {student.quizzes.averageScore}% avg
                          </Badge>
                        </div>
                        <Progress 
                          value={(student.quizzes.completed / student.quizzes.total) * 100} 
                          className="h-2 mt-2"
                        />
                      </div>

                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Projects</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            {student.projects.completed}/{student.projects.total}
                          </span>
                          <Badge variant="outline">
                            {student.projects.averageScore || 0}% avg
                          </Badge>
                        </div>
                        <Progress 
                          value={(student.projects.completed / student.projects.total) * 100} 
                          className="h-2 mt-2"
                        />
                      </div>

                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Attendance</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            {student.attendance}%
                          </span>
                          <Badge variant="outline">
                            Last active: {student.lastActive}
                          </Badge>
                        </div>
                        <Progress 
                          value={student.attendance} 
                          className="h-2 mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-2 text-green-800">Strengths</p>
                        <div className="flex flex-wrap gap-2">
                          {student.strengths.map((strength, index) => (
                            <Badge key={index} variant="outline" className="bg-green-100 text-green-800">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-2 text-red-800">Areas to Improve</p>
                        <div className="flex flex-wrap gap-2">
                          {student.areasToImprove.map((area, index) => (
                            <Badge key={index} variant="outline" className="bg-red-100 text-red-800">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Detailed Report
                      </Button>
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Assign Personalized Work
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};