import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ArrowLeft, BookOpen, Mic, Gamepad2, Image, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const progressData = {
  storiesRead: { completed: 8, total: 12, percentage: 67 },
  speakingPractice: { sessions: 15, avgScore: 85, lastScore: 92 },
  gamesPlayed: { completed: 6, total: 10, highScore: 95 },
  visualAids: { viewed: 5, total: 8, percentage: 63 },
  assignments: { submitted: 4, total: 6, percentage: 67 }
};

const achievements = [
  { title: "Story Master", description: "Read 5 stories", achieved: true },
  { title: "Speaking Star", description: "Score 90+ in speaking", achieved: true },
  { title: "Game Champion", description: "Complete 10 games", achieved: false },
  { title: "Visual Explorer", description: "View all visual aids", achieved: false }
];

export const TrackProgress = () => {
  const navigate = useNavigate();

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
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">📊 Track Your Progress</CardTitle>
            <p className="text-muted-foreground">Monitor your learning progress in real-time</p>
          </CardHeader>
        </Card>

        <div className="grid gap-6 mb-6">
          {/* Stories Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Stories Read</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={progressData.storiesRead.percentage} className="flex-1" />
                    <span className="text-sm font-medium">{progressData.storiesRead.completed}/{progressData.storiesRead.total}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{progressData.storiesRead.percentage}% Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speaking Practice */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Mic className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Speaking Practice</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{progressData.speakingPractice.sessions}</div>
                      <div className="text-xs text-muted-foreground">Sessions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{progressData.speakingPractice.avgScore}%</div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{progressData.speakingPractice.lastScore}%</div>
                      <div className="text-xs text-muted-foreground">Last Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Games */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Learning Games</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={(progressData.gamesPlayed.completed / progressData.gamesPlayed.total) * 100} className="flex-1" />
                    <span className="text-sm font-medium">{progressData.gamesPlayed.completed}/{progressData.gamesPlayed.total}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">High Score: {progressData.gamesPlayed.highScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Learning */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Image className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Visual Aids Viewed</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={progressData.visualAids.percentage} className="flex-1" />
                    <span className="text-sm font-medium">{progressData.visualAids.viewed}/{progressData.visualAids.total}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{progressData.visualAids.percentage}% Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.achieved ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-muted/50'}`}>
                  <Trophy className={`w-5 h-5 ${achievement.achieved ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.achieved && (
                    <div className="ml-auto text-sm font-medium text-yellow-600">Achieved! 🎉</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};