// Updated DoubtSolver with vibrant Azientic AI Assistant look and enhanced UX
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bot,
  ArrowLeft,
  Mic,
  Send,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Lightbulb,
  BookOpenCheck,
  BrainCircuit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: number;
  type: "user" | "bot" | "teacher";
  content: string;
  hasAudio?: boolean;
  hasDiagram?: boolean;
}

export const DoubtSolver = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      content:
        "🧠 Hello! I'm Yatish, your personal AI Teaching Assistant. Ask me anything — concepts, formulas, doubts, examples!",
      hasAudio: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulated response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        content: generateResponse(inputValue),
        hasAudio: true,
        hasDiagram:
          inputValue.toLowerCase().includes("photosynthesis") ||
          inputValue.toLowerCase().includes("digestive system") ||
          inputValue.toLowerCase().includes("water cycle") ||
          inputValue.toLowerCase().includes("newton"),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const generateResponse = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes("photosynthesis")) {
      return `🌿 **Photosynthesis**:
Plants use sunlight, carbon dioxide (CO₂), and water (H₂O) to make their food.

**Process:**
1. Sunlight absorbed by leaves (chlorophyll)
2. CO₂ from air + H₂O from soil → Glucose + Oxygen`;
    }

    if (q.includes("digestive system")) {
      return `🍽️ **Digestive System**:
It's how our body breaks down food!

1. Mouth → Chews food
2. Stomach → Acid & enzymes break it further
3. Small intestine → Nutrient absorption
4. Large intestine → Water absorbed, waste removed

**Diagram available above 👆**`;
    }

    if (q.includes("newton")) {
      return `🚀 **Newton's Laws of Motion**:

**1. First Law (Law of Inertia):**
An object remains at rest or in uniform motion unless acted upon by a force.
👉 Example: A book on a table stays still unless pushed.

**2. Second Law (F = ma):**
Force = mass × acceleration. This explains how an object speeds up or slows down.
👉 Example: Pushing a heavy cart needs more force.

**3. Third Law:**
For every action, there is an equal and opposite reaction.
👉 Example: When you jump, the ground pushes you back up.`;
    }

    return `📘 Here's an explanation I prepared just for you:

**Answer:** I understood your question about "${question}".

**Steps:**
1. Concept clarity 📖
2. Real-world examples 🌍
3. Tips for remembering 🧠

Would you like a diagram or audio version?`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 font-sans">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl mb-6">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-purple-800">Yatish AI Assistant</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Solving doubts for teachers & students in real-time with diagrams & voice.
            </p>
          </CardHeader>
        </Card>

        <Card className="h-[500px] flex flex-col bg-white/90 rounded-xl">
          <CardHeader className="bg-purple-100 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <BrainCircuit className="w-5 h-5" /> Doubt Solving Chat
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-purple-50 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-xl text-sm whitespace-pre-wrap shadow-md transition-all duration-300 ${message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border"
                      }`}
                  >
                    {message.content}

                    {message.type === "bot" && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                        {message.hasAudio && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-purple-600">
                            <Volume2 className="w-4 h-4 mr-1" /> Listen
                          </Button>
                        )}
                        {message.hasDiagram && (
                          <Button size="sm" variant="ghost" className="h-8 px-2 bg-indigo-100">
                            🖼️ View Diagram
                          </Button>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <ThumbsDown className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your doubt ...."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-purple-300"
              />
              <Button variant="outline" size="icon">
                <Mic className="w-4 h-4" />
              </Button>
              <Button onClick={handleSendMessage} size="icon" className="bg-purple-500 text-white hover:bg-purple-600">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-700 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" /> Try asking these:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {["Explain photosynthesis", "Digestive system diagram", "How to do division?", "Newton's laws of motion"].map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left bg-white hover:bg-purple-100"
                  onClick={() => setInputValue(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};