import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ArrowLeft, BookOpen, Mic, Gamepad2, Image, Trophy, BarChart2, Award, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProgressData {
  label: string;
  icon: React.ReactNode;
  color: string;
  completed: number;
  total: number;
  percentage: number;
  additionalInfo?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface Achievement {
  title: string;
  description: string;
  achieved: boolean;
  date?: string;
  points: number;
  icon: React.ReactNode;
}

export const TrackProgress = () => {
  const navigate = useNavigate();

  const progressData: ProgressData[] = [
    {
      label: "Stories Read",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
      completed: 8,
      total: 12,
      percentage: 67,
      trend: 'up'
    },
    {
      label: "Speaking Practice",
      icon: <Mic className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
      completed: 15,
      total: 20,
      percentage: 75,
      additionalInfo: "Avg Score: 85% | Last: 92%",
      trend: 'up'
    },
    {
      label: "Learning Games",
      icon: <Gamepad2 className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
      completed: 6,
      total: 10,
      percentage: 60,
      additionalInfo: "High Score: 95%",
      trend: 'neutral'
    },
    {
      label: "Visual Aids",
      icon: <Image className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-600",
      completed: 5,
      total: 8,
      percentage: 63,
      trend: 'down'
    },
    {
      label: "Assignments",
      icon: <Award className="w-5 h-5" />,
      color: "bg-red-100 text-red-600",
      completed: 4,
      total: 6,
      percentage: 67,
      additionalInfo: "Pending: 2",
      trend: 'up'
    }
  ];

  const achievements: Achievement[] = [
    { 
      title: "Story Master", 
      description: "Read 5 stories", 
      achieved: true,
      date: "2023-06-15",
      points: 50,
      icon: <BookOpen className="w-5 h-5" />
    },
    { 
      title: "Speaking Star", 
      description: "Score 90+ in speaking", 
      achieved: true,
      date: "2023-06-18",
      points: 75,
      icon: <Mic className="w-5 h-5" />
    },
    { 
      title: "Game Champion", 
      description: "Complete 10 games", 
      achieved: false,
      points: 100,
      icon: <Gamepad2 className="w-5 h-5" />
    },
    { 
      title: "Visual Explorer", 
      description: "View all visual aids", 
      achieved: false,
      points: 60,
      icon: <Image className="w-5 h-5" />
    },
    { 
      title: "Assignment Ace", 
      description: "Complete all assignments", 
      achieved: false,
      points: 80,
      icon: <Award className="w-5 h-5" />
    }
  ];

  const leaderboard = [
    { name: "Priya Sharma", score: 92, avatar: "PS", change: 2 },
    { name: "Rahul Patel", score: 88, avatar: "RP", change: 1 },
    { name: "Amit Kumar", score: 85, avatar: "AK", change: -1 },
    { name: "Sunita Devi", score: 82, avatar: "SD", change: 3 },
    { name: "Ravi Joshi", score: 79, avatar: "RJ", change: 0 }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <ChevronUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ChevronDown className="w-4 h-4 text-red-500" />;
      default: return <span className="w-4 h-4"></span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="container mx-auto max-w-6xl">
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
          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <TrendingUp className="w-5 h-5" />
            <span>Learning Progress Tracker</span>
          </div>
        </div>

        {/* Main Stats Card */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart2 className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl">Your Learning Journey</CardTitle>
            <CardDescription className="text-white/80">
              Track your progress across all learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm">Stories Read</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm">Avg Speaking Score</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold">63%</div>
                <div className="text-sm">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {progressData.map((item, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{item.label}</h3>
                      <div className="flex items-center gap-1">
                        {item.trend && getTrendIcon(item.trend)}
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground">
                        {item.completed}/{item.total}
                      </span>
                    </div>
                    {item.additionalInfo && (
                      <p className="text-sm text-muted-foreground">{item.additionalInfo}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements and Leaderboard */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Your Achievements
              </CardTitle>
              <CardDescription>
                {achievements.filter(a => a.achieved).length} of {achievements.length} unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      achievement.achieved 
                        ? 'bg-yellow-50 border border-yellow-100' 
                        : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.achieved 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.achieved && achievement.date && (
                        <p className="text-xs text-yellow-600 mt-1">
                          Achieved on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className={`text-sm font-medium ${
                      achievement.achieved ? 'text-yellow-600' : 'text-gray-400'
                    }`}>
                      {achievement.achieved ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          +{achievement.points} pts
                        </Badge>
                      ) : (
                        <span>{achievement.points} pts</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Class Leaderboard
              </CardTitle>
              <CardDescription>Top performers this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {student.change > 0 ? (
                            <ChevronUp className="w-3 h-3 text-green-500" />
                          ) : student.change < 0 ? (
                            <ChevronDown className="w-3 h-3 text-red-500" />
                          ) : null}
                          {student.change !== 0 && Math.abs(student.change)}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{student.score}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="mt-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Weekly Progress Trend
            </CardTitle>
            <CardDescription>Your improvement over the last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center">
              {/* In a real app, this would be a chart component */}
              <div className="text-center p-6">
                <TrendingUp className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                <p className="text-blue-600 font-medium">Your overall progress increased by 12% this month!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Week 1: 58% → Week 2: 62% → Week 3: 67% → Week 4: 70%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};