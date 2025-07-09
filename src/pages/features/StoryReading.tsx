import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Book, ArrowLeft, CheckCircle, BookOpen, Bookmark, Search, Filter, 
  Star, BookmarkCheck, Clock, Volume2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Story {
  id: number;
  title: string;
  topic: string;
  grade: string;
  read: boolean;
  content: string;
  readingTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  rating?: number;
  vocabulary: string[];
  bookmarked: boolean;
}

const mockStories: Story[] = [
  {
    id: 1,
    title: "The Journey of a Water Drop",
    topic: "Water Cycle",
    grade: "Grade 3-4",
    read: false,
    content: "In a small village called Shantipur, a boy named Ravi was learning about the water cycle in school. His teacher explained how water evaporates from rivers and lakes, forms clouds, and then falls back as rain. Ravi was fascinated and decided to follow a single water drop's journey from the river near his village all the way to the ocean and back again.\n\nAs Ravi imagined the journey, he learned about evaporation, condensation, precipitation, and collection. The water drop traveled through clouds, fell as rain on mountains, flowed through rivers, and was even drunk by animals before evaporating again to continue the cycle.",
    readingTime: 8,
    difficulty: 'easy',
    rating: 4.5,
    vocabulary: ["evaporation", "condensation", "precipitation", "collection"],
    bookmarked: false
  },
  {
    id: 2,
    title: "Soil and the Farmer's Friend",
    topic: "Soil Types",
    grade: "Grade 4-5",
    read: true,
    content: "Farmer Gopal had three different fields with different types of soil: sandy, clay, and loamy. He noticed that his crops grew differently in each field. With the help of a soil scientist, Gopal learned about the properties of each soil type and how they affect plant growth.\n\nThe sandy soil drained quickly but didn't hold nutrients well. The clay soil held water but became hard when dry. The loamy soil was just right - it retained moisture and nutrients while allowing proper drainage. Gopal learned to amend his soils with organic matter and choose the right crops for each field, becoming the most successful farmer in his village.",
    readingTime: 10,
    difficulty: 'medium',
    rating: 4.2,
    vocabulary: ["sandy", "clay", "loamy", "nutrients", "drainage"],
    bookmarked: true
  },
  {
    id: 3,
    title: "The Plant's Secret Kitchen",
    topic: "Photosynthesis",
    grade: "Grade 5",
    read: false,
    content: "Meera was curious about how plants make their own food. Her science teacher explained the magical process called photosynthesis. Using sunlight, carbon dioxide, and water, plants create glucose and oxygen in their leaves.\n\nMeera imagined tiny kitchens inside each leaf where chlorophyll (the green pigment) acted as the chef, sunlight as the stove, and water and carbon dioxide as the ingredients. She learned how this process not only feeds the plant but also provides oxygen for all living things. Meera conducted an experiment with a potted plant, proving that leaves need sunlight to produce starch.",
    readingTime: 12,
    difficulty: 'hard',
    rating: 4.8,
    vocabulary: ["photosynthesis", "chlorophyll", "glucose", "stomata", "chloroplasts"],
    bookmarked: false
  }
];

export const StoryReading = () => {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const navigate = useNavigate();

  const markAsRead = (storyId: number) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, read: true } : story
    ));
    setSelectedStory(null);
  };

  const toggleBookmark = (storyId: number) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, bookmarked: !story.bookmarked } : story
    ));
    if (selectedStory?.id === storyId) {
      setSelectedStory({ ...selectedStory, bookmarked: !selectedStory.bookmarked });
    }
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         story.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || story.grade === gradeFilter;
    const matchesDifficulty = difficultyFilter === "all" || story.difficulty === difficultyFilter;
    
    return matchesSearch && matchesGrade && matchesDifficulty;
  });

  const readingProgress = Math.round(
    (stories.filter(s => s.read).length / stories.length) * 100
  );

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
            <BookOpen className="w-5 h-5" />
            <span>Story Reading</span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl">📖 Story Reading Corner</CardTitle>
            <CardDescription className="text-white/80">
              Explore AI-generated educational stories tailored to your level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-1/2">
                <p className="text-sm mb-2">Your reading progress:</p>
                <Progress value={readingProgress} className="h-3" />
                <p className="text-sm mt-1">
                  {stories.filter(s => s.read).length} of {stories.length} stories completed
                </p>
              </div>
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                <BookmarkCheck className="w-4 h-4 mr-2" />
                View Bookmarks
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select onValueChange={setGradeFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="All Grades" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="Grade 3-4">Grade 3-4</SelectItem>
                  <SelectItem value="Grade 4-5">Grade 4-5</SelectItem>
                  <SelectItem value="Grade 5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="All Levels" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center justify-center gap-2">
                <Book className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  {filteredStories.length} stories found
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {!selectedStory ? (
          <div className="grid gap-4">
            {filteredStories.map((story) => (
              <Card 
                key={story.id} 
                className={`border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  story.read ? 'bg-green-50/50' : 'bg-white'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{story.title}</h3>
                        {story.read && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{story.topic}</Badge>
                        <Badge variant="outline">{story.grade}</Badge>
                        <Badge 
                          variant="outline" 
                          className={
                            story.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            story.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {story.difficulty}
                        </Badge>
                        {story.rating && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {story.rating}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {story.readingTime} min read • {story.vocabulary.length} vocabulary words
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(story.id);
                        }}
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${story.bookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} 
                        />
                      </Button>
                      <Button
                        onClick={() => setSelectedStory(story)}
                        variant={story.read ? "outline" : "default"}
                        className={!story.read ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" : ""}
                        size="sm"
                      >
                        {story.read ? "Read Again" : "Read Story"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedStory.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{selectedStory.topic}</Badge>
                      <Badge variant="outline">{selectedStory.grade}</Badge>
                      <Badge 
                        variant="outline" 
                        className={
                          selectedStory.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          selectedStory.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {selectedStory.difficulty}
                      </Badge>
                      {selectedStory.rating && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {selectedStory.rating}
                        </Badge>
                      )}
                    </div>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(selectedStory.id)}
                >
                  <Bookmark 
                    className={`w-5 h-5 ${selectedStory.bookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} 
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="prose max-w-none">
                  {selectedStory.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {selectedStory.vocabulary.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium mb-3 text-blue-800">📚 Vocabulary Words</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStory.vocabulary.map((word, i) => (
                      <Badge key={i} variant="outline" className="bg-white text-blue-800">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStory(null)}
                  className="flex-1"
                >
                  Back to Stories
                </Button>
                {!selectedStory.read && (
                  <Button 
                    onClick={() => markAsRead(selectedStory.id)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen to Story
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};