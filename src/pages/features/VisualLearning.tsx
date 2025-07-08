import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image, ArrowLeft, Eye, Play, Bot, Search, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const visualAids = [
  {
    id: 1,
    title: "Water Cycle Diagram",
    subject: "Science",
    type: "Diagram",
    description: "Interactive diagram showing evaporation, condensation, and precipitation",
    viewed: false,
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/IO9tT186mZw"
  },
  {
    id: 2,
    title: "Plant Parts Chart",
    subject: "Science",
    type: "Chart",
    description: "Detailed chart showing roots, stem, leaves, and flowers",
    viewed: true,
    hasVideo: false,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Plant_morphology_diagram.svg/800px-Plant_morphology_diagram.svg.png"
  },
  {
    id: 3,
    title: "Number Line Visual",
    subject: "Mathematics",
    type: "Interactive",
    description: "Visual number line for addition and subtraction practice",
    viewed: false,
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/uykOr7z_8ig"
  },
  {
    id: 4,
    title: "Photosynthesis Explained",
    subject: "Science",
    type: "Video",
    description: "AI Explanation with animation about how plants make food",
    viewed: false,
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/D1Ymc311XS8"
  },
  {
    id: 5,
    title: "Dummy Visual - AI Generated",
    subject: "AI Assistant",
    type: "Concept",
    description: "This is a placeholder showing how AI might generate responses for any topic.",
    viewed: false,
    hasVideo: false
  }
];

export const VisualLearning = () => {
  const [aids, setAids] = useState(visualAids);
  const [selectedAid, setSelectedAid] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSentPopup, setShowSentPopup] = useState(false);
  const navigate = useNavigate();

  const markAsViewed = (aidId: number) => {
    setAids(aids.map(aid =>
      aid.id === aidId ? { ...aid, viewed: true } : aid
    ));
  };

  const filteredAids = aids.filter(aid =>
    aid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aid.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aid.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] border-none animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white animate-bounce" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">🤖 AI Visual Assistant</CardTitle>
            <p className="text-blue-100">Powered by AI Agent • Ask any topic and get visuals instantly!</p>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
                className="bg-[#1e1e2f] border border-[#444] text-white placeholder:text-slate-400 px-10"
                placeholder="Search topic or concept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </CardContent>
        </Card>

        {!selectedAid ? (
          <div className="grid gap-4">
            {filteredAids.map((aid) => (
              <Card key={aid.id} className="bg-[#2c2e3e] hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border border-[#3c3e4e]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-white">{aid.title}</h3>
                          {aid.viewed && <Eye className="w-4 h-4 text-green-400" />}
                          {aid.hasVideo && <Play className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <p className="text-sm text-blue-200 mb-1">{aid.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-indigo-600/60 text-white px-2 py-1 rounded">
                            {aid.subject}
                          </span>
                          <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">
                            {aid.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedAid(aid)}
                      variant={aid.viewed ? "outline" : "default"}
                      className={!aid.viewed ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "border-blue-300 text-blue-300"}
                    >
                      {aid.viewed ? "View Again" : "Explore"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-[#2e3148] border border-[#454866] animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
                {selectedAid.title}
              </CardTitle>
              <p className="text-sm text-blue-300">{selectedAid.subject} | {selectedAid.type}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-800 p-8 rounded-lg text-center">
                {selectedAid.imageUrl ? (
                  <img
                    src={selectedAid.imageUrl}
                    alt={selectedAid.title}
                    className="w-64 h-auto mx-auto mb-4 rounded-lg shadow"
                  />
                ) : selectedAid.hasVideo && selectedAid.videoUrl ? null : (
                  <div className="text-blue-300 text-sm">AI Agent is thinking... No image available.</div>
                )}
                <p className="text-sm text-blue-300 mb-4">{selectedAid.description}</p>
                {selectedAid.hasVideo && selectedAid.videoUrl && (
                  <div className="bg-blue-900/30 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Play className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-cyan-300">
                        Interactive Video Available
                      </span>
                    </div>
                    <iframe
                      className="w-full h-64 rounded-md shadow"
                      src={selectedAid.videoUrl}
                      title="Video explanation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedAid(null)} className="text-white border-white">
                  Back to Visual Aids
                </Button>
                {selectedAid.hasVideo && (
                  <a href={selectedAid.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Play Video
                    </Button>
                  </a>
                )}
                <Button onClick={() => setShowSentPopup(true)} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Send className="w-4 h-4 mr-2" /> Send to Students
                </Button>
                {!selectedAid.viewed && (
                  <Button
                    onClick={() => {
                      markAsViewed(selectedAid.id);
                      setSelectedAid(null);
                    }}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Mark as Viewed
                  </Button>
                )}
              </div>
              {showSentPopup && (
                <div className="mt-4 p-3 bg-green-600 text-white rounded shadow-lg animate-fade-in">
                  ✅ Visual sent to all students by the teacher!
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
