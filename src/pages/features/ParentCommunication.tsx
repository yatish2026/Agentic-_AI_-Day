import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, ArrowLeft, Send, Volume2, MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  grade: string;
  progress: number;
  recentTopics: string[];
  parentName: string;
  phoneNumber: string;
}

const students: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    grade: "Grade 3",
    progress: 85,
    recentTopics: ["Addition", "Water Cycle", "Shapes"],
    parentName: "Priya Sharma",
    phoneNumber: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Diya Patel",
    grade: "Grade 3", 
    progress: 92,
    recentTopics: ["Multiplication", "Plants", "Colors"],
    parentName: "Raj Patel",
    phoneNumber: "+91 87654 32109"
  },
  {
    id: 3,
    name: "Arjun Singh",
    grade: "Grade 3",
    progress: 78,
    recentTopics: ["Subtraction", "Animals", "Numbers"],
    parentName: "Meera Singh",
    phoneNumber: "+91 76543 21098"
  }
];

export const ParentCommunication = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const navigate = useNavigate();

  const generateMessage = (student: Student) => {
    const message = `नमस्ते ${student.parentName} जी,

आपके बच्चे ${student.name} की इस सप्ताह की प्रगति रिपोर्ट:

📚 पढ़ाए गए विषय:
${student.recentTopics.map(topic => `• ${topic}`).join('\n')}

📊 समग्र प्रदर्शन: ${student.progress}%
${student.progress >= 90 ? '🌟 बहुत अच्छा प्रदर्शन!' : 
  student.progress >= 80 ? '👍 अच्छा प्रदर्शन!' : 
  '💪 और मेहनत की जरूरत है।'}

🏠 घर पर करने के लिए गतिविधियां:
• रोज 15 मिनट पढ़ाई करें
• गणित के सवाल practice करें
• कहानी की किताबें पढ़ें

धन्यवाद,
Sahayak AI Teaching Assistant`;

    setGeneratedMessage(message);
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
              <Phone className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">📞 Parent Communication Assistant</CardTitle>
            <p className="text-muted-foreground">
              Generate automated progress reports and communicate with parents
            </p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Student Selection */}
          <Card>
            <CardHeader>
              <CardTitle>👨‍👩‍👧 Select Student</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={(value) => {
                const student = students.find(s => s.id === parseInt(value));
                setSelectedStudent(student || null);
                if (student) generateMessage(student);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name} - {student.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedStudent && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{selectedStudent.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedStudent.grade}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Overall Progress</span>
                        <span className="text-sm font-medium">{selectedStudent.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all"
                          style={{ width: `${selectedStudent.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Recent Topics:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedStudent.recentTopics.map(topic => (
                          <span key={topic} className="text-xs bg-white/60 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/20">
                      <p className="text-sm"><strong>Parent:</strong> {selectedStudent.parentName}</p>
                      <p className="text-sm"><strong>Phone:</strong> {selectedStudent.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Message */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Generated Message</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedMessage ? (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4 max-h-80 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm font-sans">
                      {generatedMessage}
                    </pre>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-primary flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Play Voice Note
                    </Button>
                    <Button className="flex-1 bg-gradient-secondary flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send SMS
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Send WhatsApp Message
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a student to generate their progress message</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Students Overview */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>👥 Class Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {students.map(student => (
                <div key={student.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.grade}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-gradient-primary h-1.5 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-3"
                    onClick={() => {
                      setSelectedStudent(student);
                      generateMessage(student);
                    }}
                  >
                    Generate Report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};