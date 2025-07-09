import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, ArrowLeft, Send, Volume2, MessageSquare, User, BookOpen, Home, Mail, School, Award, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: number;
  name: string;
  avatar: string;
  grade: string;
  progress: number;
  attendance: number;
  recentTopics: string[];
  parentName: string;
  motherName: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;
  address: string;
  testResults: {
    subject: string;
    marks: number;
    maxMarks: number;
    grade: string;
  }[];
}

const students: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    avatar: "AS",
    grade: "Grade 3",
    progress: 85,
    attendance: 92,
    recentTopics: ["Addition", "Water Cycle", "Shapes"],
    parentName: "Rahul Sharma",
    motherName: "Priya Sharma",
    phoneNumber: "+91 98765 43210",
    alternatePhone: "+91 98765 43211",
    email: "sharma.family@example.com",
    address: "12, Green Park, New Delhi - 110016",
    testResults: [
      { subject: "Mathematics", marks: 45, maxMarks: 50, grade: "A" },
      { subject: "Science", marks: 42, maxMarks: 50, grade: "A-" },
      { subject: "English", marks: 38, maxMarks: 50, grade: "B+" },
      { subject: "Hindi", marks: 48, maxMarks: 50, grade: "A+" },
    ]
  },
  {
    id: 2,
    name: "Diya Patel",
    avatar: "DP",
    grade: "Grade 3", 
    progress: 92,
    attendance: 96,
    recentTopics: ["Multiplication", "Plants", "Colors"],
    parentName: "Raj Patel",
    motherName: "Neha Patel",
    phoneNumber: "+91 87654 32109",
    alternatePhone: "+91 87654 32108",
    email: "patel.family@example.com",
    address: "34, Shivaji Nagar, Mumbai - 400028",
    testResults: [
      { subject: "Mathematics", marks: 49, maxMarks: 50, grade: "A+" },
      { subject: "Science", marks: 47, maxMarks: 50, grade: "A" },
      { subject: "English", marks: 45, maxMarks: 50, grade: "A" },
      { subject: "Hindi", marks: 46, maxMarks: 50, grade: "A" },
    ]
  },
  {
    id: 3,
    name: "Arjun Singh",
    avatar: "AS",
    grade: "Grade 3",
    progress: 78,
    attendance: 88,
    recentTopics: ["Subtraction", "Animals", "Numbers"],
    parentName: "Vikram Singh",
    motherName: "Meera Singh",
    phoneNumber: "+91 76543 21098",
    alternatePhone: "+91 76543 21097",
    email: "singh.family@example.com",
    address: "78, MG Road, Bangalore - 560001",
    testResults: [
      { subject: "Mathematics", marks: 38, maxMarks: 50, grade: "B" },
      { subject: "Science", marks: 35, maxMarks: 50, grade: "B-" },
      { subject: "English", marks: 42, maxMarks: 50, grade: "A-" },
      { subject: "Hindi", marks: 40, maxMarks: 50, grade: "B+" },
    ]
  },
  {
    id: 4,
    name: "Ananya Gupta",
    avatar: "AG",
    grade: "Grade 3",
    progress: 88,
    attendance: 94,
    recentTopics: ["Fractions", "Solar System", "Poetry"],
    parentName: "Amit Gupta",
    motherName: "Shweta Gupta",
    phoneNumber: "+91 65432 10987",
    alternatePhone: "+91 65432 10986",
    email: "gupta.family@example.com",
    address: "56, Civil Lines, Lucknow - 226001",
    testResults: [
      { subject: "Mathematics", marks: 42, maxMarks: 50, grade: "A-" },
      { subject: "Science", marks: 45, maxMarks: 50, grade: "A" },
      { subject: "English", marks: 48, maxMarks: 50, grade: "A+" },
      { subject: "Hindi", marks: 44, maxMarks: 50, grade: "A-" },
    ]
  },
  {
    id: 5,
    name: "Reyansh Joshi",
    avatar: "RJ",
    grade: "Grade 3",
    progress: 95,
    attendance: 98,
    recentTopics: ["Division", "Human Body", "Grammar"],
    parentName: "Sanjay Joshi",
    motherName: "Pooja Joshi",
    phoneNumber: "+91 54321 09876",
    alternatePhone: "+91 54321 09875",
    email: "joshi.family@example.com",
    address: "23, Satellite Road, Ahmedabad - 380015",
    testResults: [
      { subject: "Mathematics", marks: 50, maxMarks: 50, grade: "A+" },
      { subject: "Science", marks: 49, maxMarks: 50, grade: "A+" },
      { subject: "English", marks: 47, maxMarks: 50, grade: "A" },
      { subject: "Hindi", marks: 48, maxMarks: 50, grade: "A+" },
    ]
  }
];

const messageTemplates = [
  {
    name: "Progress Report",
    template: (student: Student) => `नमस्ते ${student.parentName} जी,

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
Sahayak AI Teaching Assistant`
  },
  {
    name: "Test Results",
    template: (student: Student) => `नमस्ते ${student.parentName} जी,

${student.name} के हालिया टेस्ट के परिणाम:

${student.testResults.map(result => 
  `📝 ${result.subject}: ${result.marks}/${result.maxMarks} (${result.grade})`
).join('\n')}

${student.testResults.some(r => r.grade.includes('A')) ? 
  '🌟 कुछ विषयों में उत्कृष्ट प्रदर्शन!' : 
  '📈 कुछ विषयों में सुधार की आवश्यकता है।'}

सुझाव:
• कमजोर विषयों पर अधिक ध्यान दें
• नियमित रिवीजन करें
• शिक्षक से संपर्क करें यदि कोई संदेह हो

धन्यवाद,
Sahayak AI Teaching Assistant`
  },
  {
    name: "Attendance Alert",
    template: (student: Student) => `नमस्ते ${student.parentName} जी,

${student.name} की उपस्थिति इस महीने ${student.attendance}% है।

${student.attendance < 90 ? 
  '⚠️ कृपया नियमित उपस्थिति सुनिश्चित करें।' : 
  '👍 उत्कृष्ट उपस्थिति! इसे बनाए रखें।'}

कृपया:
• बीमारी के मामले में सूचित करें
• समय पर स्कूल भेजें
• छुट्टियों के बाद नियमितता सुनिश्चित करें

धन्यवाद,
Sahayak AI Teaching Assistant`
  }
];

export const ParentCommunication = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Progress Report");
  const [showTestResults, setShowTestResults] = useState(false);
  const navigate = useNavigate();

  const generateMessage = () => {
    if (!selectedStudent) return;
    
    const template = messageTemplates.find(t => t.name === selectedTemplate);
    if (template) {
      setGeneratedMessage(template.template(selectedStudent));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
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
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-medium">Parent Communication Portal</span>
          </div>
        </div>

        {/* Main Title Card */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl">Parent Communication Assistant</CardTitle>
            <CardDescription className="text-white/80">
              Seamlessly connect with parents and share student progress
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Student Selection */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span>Student Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                onValueChange={(value) => {
                  const student = students.find(s => s.id === parseInt(value));
                  setSelectedStudent(student || null);
                  if (student) {
                    generateMessage();
                    setShowTestResults(false);
                  }
                }}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a student..." />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {student.avatar}
                        </div>
                        <div>
                          <p>{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.grade}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedStudent && (
                <div className="space-y-6">
                  {/* Student Profile Card */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {selectedStudent.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{selectedStudent.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedStudent.grade}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>Progress: {selectedStudent.progress}%</span>
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <School className="w-3 h-3" />
                            <span>Attendance: {selectedStudent.attendance}%</span>
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Father</p>
                        <p>{selectedStudent.parentName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Mother</p>
                        <p>{selectedStudent.motherName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p>{selectedStudent.phoneNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Alternate Phone</p>
                        <p>{selectedStudent.alternatePhone}</p>
                      </div>
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="text-sm">{selectedStudent.address}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Recent Topics</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.recentTopics.map(topic => (
                          <Badge key={topic} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Test Results Toggle */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowTestResults(!showTestResults)}
                  >
                    {showTestResults ? 'Hide Test Results' : 'View Test Results'}
                  </Button>

                  {/* Test Results Section */}
                  {showTestResults && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span>Test Results</span>
                      </h4>
                      <div className="space-y-4">
                        {selectedStudent.testResults.map((result, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{result.subject}</span>
                              <span className="text-sm">
                                {result.marks}/{result.maxMarks} ({result.grade})
                              </span>
                            </div>
                            <Progress 
                              value={(result.marks / result.maxMarks) * 100} 
                              className="h-2"
                              indicatorColor={
                                result.grade.includes('A') ? 'bg-green-500' :
                                result.grade.includes('B') ? 'bg-blue-500' :
                                'bg-yellow-500'
                              }
                            />
                          </div>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between">
                            <span className="font-medium">Average</span>
                            <span className="font-medium">
                          {(
  (selectedStudent.testResults.reduce((sum, result) => sum + result.marks, 0) / 
   selectedStudent.testResults.reduce((sum, result) => sum + result.maxMarks, 0)
  ) * 100
).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Template Selection */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Message Template</p>
                    <Select 
                      value={selectedTemplate}
                      onValueChange={(value) => {
                        setSelectedTemplate(value);
                        generateMessage();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {messageTemplates.map(template => (
                          <SelectItem key={template.name} value={template.name}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Message */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Generated Communication</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedMessage ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-5 h-96 overflow-y-auto shadow-inner border">
                    <pre className="whitespace-pre-wrap text-sm font-sans">
                      {generatedMessage}
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-12 flex items-center gap-2"
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(generatedMessage);
                        utterance.lang = 'hi-IN';
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      <Volume2 className="w-4 h-4" />
                      Play Voice Note
                    </Button>
                    <Button className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send SMS
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-12 col-span-2 flex items-center gap-2"
                      onClick={() => {
                        const phone = selectedStudent?.phoneNumber.replace(/\D/g, '');
                        const message = encodeURIComponent(generatedMessage);
                        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send WhatsApp Message
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Quick Actions</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        Request Meeting
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        Share Documents
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        Feedback Form
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-white/50 rounded-lg border border-dashed">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a student to generate communication</p>
                  <p className="text-sm mt-1">Choose from multiple templates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Students Overview */}
        <Card className="mt-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              <span>Class Performance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {students.map(student => (
                <div 
                  key={student.id} 
                  className={`border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer ${selectedStudent?.id === student.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => {
                    setSelectedStudent(student);
                    generateMessage();
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-primary font-medium">
                      {student.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.grade}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress 
                      value={student.progress} 
                      className="h-2"
                      indicatorColor={
                        student.progress >= 90 ? 'bg-green-500' :
                        student.progress >= 80 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }
                    />
                  </div>

                  <div className="mt-3 flex justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <School className="w-3 h-3" />
                      <span>{student.attendance}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>
                        {student.testResults.reduce((sum, result) => sum + result.marks, 0) / 
                         student.testResults.length} avg
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4 bg-muted/30 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {students.reduce((sum, student) => sum + student.progress, 0) / students.length}%
                </p>
                <p className="text-xs text-muted-foreground">Class Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {students.filter(s => s.progress >= 90).length}
                </p>
                <p className="text-xs text-muted-foreground">Top Performers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {students.reduce((sum, student) => sum + student.attendance, 0) / students.length}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {students.filter(s => s.progress < 80).length}
                </p>
                <p className="text-xs text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};