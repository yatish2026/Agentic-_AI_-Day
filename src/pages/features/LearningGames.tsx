// Enhanced version with more complex questions and answer input
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Gamepad2,
  ArrowLeft,
  Trophy,
  Star,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const gameCategories = [
  {
    id: 5,
    title: "Mixed Genius",
    description: "Challenge your brain with a mix of coding, math, and logic",
    icon: "🧩",
    difficulty: "Expert",
    bestScore: 80,
    demo: [
      { question: "What is the output of: [1, 2] + [3, 4]? (JavaScript)", answer: "1,23,4" },
      { question: "If f(x) = x² - 2x, what is f(3)?", answer: "3" },
      { question: "What comes next: ACE, BDF, ___?", answer: "CEG" }
    ]
  },
  {
    id: 4,
    title: "Coding Quest",
    description: "Test your programming logic and code basics",
    icon: "💻",
    difficulty: "Hard",
    bestScore: 75,
    demo: [
      { question: "What will be the output of: console.log(typeof NaN)?", answer: "number" },
      { question: "Which keyword is used to create a constant in JavaScript?", answer: "const" },
      { question: "What does 'HTML' stand for?", answer: "HyperText Markup Language" }
    ],
  },
  {
    id: 1,
    title: "Math Challenges",
    description: "Solve puzzles, logic problems and equations",
    icon: "🧠",
    difficulty: "Hard",
    bestScore: 70,
    demo: [
      { question: "What is the next number in the sequence: 2, 6, 12, 20, ?", answer: "30" },
      { question: "Solve for x: 3x + 5 = 20", answer: "5" },
      { question: "What is the square root of 144?", answer: "12" }
    ],
  },
  {
    id: 2,
    title: "Science Explorer",
    description: "Learn about plants, animals, and nature",
    icon: "🌿",
    difficulty: "Medium",
    bestScore: 92,
    demo: [
      { question: "Which part of the plant conducts photosynthesis?", answer: "Leaf" },
      { question: "Which gas do humans need to breathe?", answer: "Oxygen" },
      { question: "What planet is known as the Red Planet?", answer: "Mars" }
    ],
  },
  {
    id: 3,
    title: "Word Wizard",
    description: "Improve your vocabulary with tricky clues",
    icon: "📝",
    difficulty: "Medium",
    bestScore: 78,
    demo: [
      { question: "Find a synonym for 'Happy'", answer: "Joyful" },
      { question: "What’s the opposite of 'Ancient'?", answer: "Modern" },
      { question: "Spell the word that means a journey by sea", answer: "Voyage" }
    ],
  },
];

export const LearningGames = () => {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [gameActive, setGameActive] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const navigate = useNavigate();

  const startGame = (game: any) => {
    setSelectedGame(game);
    setDemoIndex(0);
    setUserAnswer("");
    setScore(0);
    setGameActive(true);
    setCurrentScore(null);
  };

  const handleNext = () => {
    const correctAnswer = selectedGame.demo[demoIndex].answer.toLowerCase();
    if (userAnswer.trim().toLowerCase() === correctAnswer) {
      setScore(score + 1);
    }
    setUserAnswer("");
    if (demoIndex < selectedGame.demo.length - 1) {
      setDemoIndex(demoIndex + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameActive(false);
    const percentage = Math.round((score / selectedGame.demo.length) * 100);
    setCurrentScore(percentage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-100 p-4">
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

        <Card className="mb-6 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">🎮 Learning Games</CardTitle>
            <p className="text-muted-foreground">Play advanced educational games powered by Agentic AI</p>
          </CardHeader>
        </Card>

        {!selectedGame ? (
          <div className="grid gap-6 md:grid-cols-2">
            {gameCategories.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{game.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{game.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{game.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {game.difficulty}
                          </span>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-muted-foreground">Best: {game.bestScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => startGame(game)}
                      className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
                    >
                      Play Game
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{selectedGame.icon}</span>
                {selectedGame.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {gameActive ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="mb-6">
                    <div className="text-xl font-medium text-muted-foreground mb-2">
                      Question {demoIndex + 1} of {selectedGame.demo.length}
                    </div>
                    <div className="text-2xl font-bold text-primary mb-4">
                      {selectedGame.demo[demoIndex].question}
                    </div>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="border p-2 rounded w-full max-w-md mx-auto mb-4"
                    />
                  </div>
                  <Button onClick={handleNext} className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    {demoIndex < selectedGame.demo.length - 1 ? "Next" : "Finish Game"}
                  </Button>
                </div>
              ) : currentScore !== null ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
                  <div className="text-4xl font-bold text-primary mb-2">{currentScore}%</div>
                  <p className="text-muted-foreground mb-4">
                    {currentScore >= selectedGame.bestScore ? "New Best Score! 🎉" : "Nice attempt! Keep practicing."}
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => setSelectedGame(null)}>
                      Back to Games
                    </Button>
                    <Button
                      onClick={() => startGame(selectedGame)}
                      className="bg-gradient-to-r from-yellow-400 to-red-500 text-white"
                    >
                      Replay Game
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">{selectedGame.description}</p>
                  <Button onClick={() => setGameActive(true)} className="bg-gradient-to-r from-green-500 to-cyan-500 text-white">
                    Start Game
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
