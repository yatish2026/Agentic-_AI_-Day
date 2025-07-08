import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockStories = [
  {
    id: 1,
    title: "The Journey of a Water Drop",
    topic: "Water Cycle",
    grade: "Grade 3-4",
    read: false,
    content: "In a small village called Shantipur, a boy named Ravi was learning about the water cycle in school..."
  },
  {
    id: 2,
    title: "Soil and the Farmer's Friend",
    topic: "Soil Types",
    grade: "Grade 4-5",
    read: true,
    content: "Farmer Gopal had three different fields with different types of soil..."
  },
  {
    id: 3,
    title: "The Plant's Secret Kitchen",
    topic: "Photosynthesis",
    grade: "Grade 5",
    read: false,
    content: "Meera was curious about how plants make their own food..."
  }
];

export const StoryReading = () => {
  const [stories, setStories] = useState(mockStories);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const navigate = useNavigate();

  const markAsRead = (storyId: number) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, read: true } : story
    ));
    setSelectedStory(null);
  };

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
              <Book className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">📖 Story Reading</CardTitle>
            <p className="text-muted-foreground">Read AI-generated stories tailored to your grade and interests</p>
          </CardHeader>
        </Card>

        {!selectedStory ? (
          <div className="grid gap-4">
            {stories.map((story) => (
              <Card key={story.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{story.title}</h3>
                        {story.read && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Topic: {story.topic}</p>
                      <p className="text-xs text-muted-foreground">{story.grade}</p>
                    </div>
                    <Button
                      onClick={() => setSelectedStory(story)}
                      variant={story.read ? "outline" : "default"}
                      className={!story.read ? "bg-gradient-primary" : ""}
                    >
                      {story.read ? "Read Again" : "Read Story"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{selectedStory.title}</CardTitle>
              <p className="text-sm text-muted-foreground">Topic: {selectedStory.topic} | {selectedStory.grade}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="leading-relaxed">{selectedStory.content}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedStory(null)}>
                  Back to Stories
                </Button>
                {!selectedStory.read && (
                  <Button 
                    onClick={() => markAsRead(selectedStory.id)}
                    className="bg-gradient-primary"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};