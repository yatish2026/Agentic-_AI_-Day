import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, ArrowLeft, CheckCircle, Clock, Upload, Star, BookOpenCheck, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockAssignments = [
  {
    id: 1,
    title: "Water Cycle Worksheet",
    subject: "Science",
    dueDate: "2024-01-15",
    marks: 10,
    status: "pending",
    description: "Complete the worksheet about the water cycle process.",
    type: "worksheet"
  },
  {
    id: 2,
    title: "Math Practice Problems",
    subject: "Mathematics",
    dueDate: "2024-01-12",
    marks: 15,
    status: "submitted",
    description: "Solve addition and subtraction problems.",
    type: "practice",
    submittedAnswer: "I completed all 10 problems and got 8 correct answers.",
    obtainedMarks: 12
  },
  {
    id: 3,
    title: "Reading Comprehension",
    subject: "English",
    dueDate: "2024-01-18",
    marks: 20,
    status: "pending",
    description: "Read the story and answer questions about the main character.",
    type: "reading"
  },
  {
    id: 4,
    title: "Photosynthesis Quiz",
    subject: "Biology",
    dueDate: "2024-01-20",
    marks: 25,
    status: "pending",
    description: "Complete the quiz on Photosynthesis process.",
    type: "quiz"
  },
  {
    id: 5,
    title: "History Timeline Project",
    subject: "History",
    dueDate: "2024-01-22",
    marks: 30,
    status: "submitted",
    description: "Create a timeline of World War II.",
    type: "project",
    submittedAnswer: "Included all major events with dates and visuals.",
    obtainedMarks: 28
  }
];

export const Assignments = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const submitAssignment = () => {
    if (!answer.trim()) return;

    const updatedAssignments = assignments.map(assignment =>
      assignment.id === selectedAssignment.id
        ? {
          ...assignment,
          status: "submitted",
          submittedAnswer: answer,
          obtainedMarks: Math.floor(Math.random() * assignment.marks) + 1
        }
        : assignment
    );
    setAssignments(updatedAssignments);
    setSelectedAssignment(null);
    setAnswer("");
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-7xl">
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

        <Card className="mb-6 shadow-xl border-2 border-primary">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">📚 Assignments Portal</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">Track, Complete & Review your Assignments</p>
          </CardHeader>
        </Card>

        {!selectedAssignment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);
              return (
                <Card key={assignment.id} className="hover:shadow-2xl transition-shadow border-2 border-border w-full">
                  <CardContent className="p-5">
                    <div className="flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-xl text-foreground">{assignment.title}</h3>
                          {assignment.status === "submitted" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {assignment.subject}
                          </span>
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                            Marks: {assignment.marks}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${assignment.status === "submitted"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : daysUntilDue <= 0
                                ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                            }`}>
                            {assignment.status === "submitted"
                              ? "Submitted"
                              : daysUntilDue <= 0
                                ? "Overdue"
                                : `Due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}`
                            }
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedAssignment(assignment)}
                        variant={assignment.status === "submitted" ? "outline" : "default"}
                        className={`mt-4 ${assignment.status === "pending" ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""}`}
                      >
                        {assignment.status === "submitted" ? "View Submission" : "Start Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground text-xl">
                <BookOpenCheck className="w-6 h-6" />
                {selectedAssignment.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Subject: {selectedAssignment.subject} | Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()} | Marks: {selectedAssignment.marks}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p className="text-sm text-muted-foreground">{selectedAssignment.description}</p>
              </div>

              {selectedAssignment.status === "submitted" ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Assignment Submitted</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Your Answer:</p>
                  <p className="text-sm bg-white dark:bg-green-950/50 p-3 rounded border mb-2">
                    {selectedAssignment.submittedAnswer}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-300">
                    <Star className="w-4 h-4" /> Scored: {selectedAssignment.obtainedMarks} / {selectedAssignment.marks}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="assignment-answer" className="block text-sm font-medium mb-2">
                      Your Answer:
                    </label>
                    <Textarea
                      id="assignment-answer"
                      placeholder="Type your answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                      Back to List
                    </Button>
                    <Button
                      onClick={submitAssignment}
                      disabled={!answer.trim()}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Assignment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};