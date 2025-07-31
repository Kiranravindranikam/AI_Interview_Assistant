"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Target,
  TrendingUp,
  BookOpen,
  Video,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
} from "lucide-react"

export default function Recommendations() {
  const strengths = [
    {
      title: "Excellent Grammar and Articulation",
      score: 92,
      description: "Your speech is clear and grammatically correct throughout the interview.",
      icon: <CheckCircle className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
    {
      title: "Strong Technical Knowledge",
      score: 87,
      description: "Demonstrated solid understanding of technical concepts and industry practices.",
      icon: <CheckCircle className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
    {
      title: "Positive Enthusiasm",
      score: 85,
      description: "Maintained an enthusiastic and positive tone throughout the conversation.",
      icon: <CheckCircle className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
  ]

  const improvements = [
    {
      title: "Eye Contact Consistency",
      currentScore: 73,
      targetScore: 85,
      priority: "High",
      description: "Practice maintaining steady eye contact with the camera/interviewer.",
      actionItems: [
        "Practice with video calls to friends or family",
        "Use the 'triangle technique' - look at eyes, nose, mouth",
        "Take brief breaks to look at notes, then return to eye contact",
      ],
    },
    {
      title: "Confidence in Behavioral Questions",
      currentScore: 78,
      targetScore: 88,
      priority: "Medium",
      description: "Strengthen responses to behavioral and situational questions.",
      actionItems: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Prepare 5-7 specific examples from your experience",
        "Practice storytelling techniques for engaging responses",
      ],
    },
    {
      title: "Answer Specificity",
      currentScore: 82,
      targetScore: 90,
      priority: "Medium",
      description: "Include more concrete examples and specific details in responses.",
      actionItems: [
        "Prepare quantifiable achievements and metrics",
        "Practice explaining complex concepts with simple examples",
        "Use specific project names, technologies, and outcomes",
      ],
    },
  ]

  const learningResources = [
    {
      type: "Video Course",
      title: "Advanced Interview Techniques",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      icon: <Video className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
    {
      type: "Practice Session",
      title: "Behavioral Question Mastery",
      duration: "45 minutes",
      difficulty: "Beginner",
      icon: <Users className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
    {
      type: "Reading Material",
      title: "Body Language in Interviews",
      duration: "30 minutes",
      difficulty: "Beginner",
      icon: <BookOpen className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">💡 Personalized Recommendations</h1>
              <p className="text-gray-600">
                AI-generated insights and action plans to improve your interview performance
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent">
                <BookOpen className="w-4 h-4 mr-2" />
                Study Plan
              </Button>
              <Button style={{ backgroundColor: "#00C853" }} className="text-white hover:opacity-90">
                <Target className="w-4 h-4 mr-2" />
                Set Goals
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 border-green-200">
          <CardHeader style={{ backgroundColor: "#F1F5F9" }}>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-5 h-5" style={{ color: "#00C853" }} />
              Your Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#00C853" }}>
                  82/100
                </div>
                <div className="text-sm text-gray-600">Current Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#1B5E20" }}>
                  88/100
                </div>
                <div className="text-sm text-gray-600">Target Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">6</div>
                <div className="text-sm text-gray-600">Points to Improve</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strengths Section */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Star className="w-5 h-5" style={{ color: "#00C853" }} />
              Your Strengths
            </CardTitle>
            <CardDescription>Keep leveraging these strong points in future interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-green-200"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {strength.icon}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{strength.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={strength.score} className="flex-1 h-2" />
                        <span className="text-sm font-bold" style={{ color: "#00C853" }}>
                          {strength.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{strength.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Areas */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <AlertCircle className="w-5 h-5" style={{ color: "#FF9800" }} />
              Areas for Improvement
            </CardTitle>
            <CardDescription>Focused action plans to enhance your interview performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {improvements.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <Badge
                          variant={item.priority === "High" ? "destructive" : "secondary"}
                          className={item.priority === "High" ? "bg-orange-100 text-orange-800" : ""}
                        >
                          {item.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Current → Target</div>
                      <div className="font-bold">
                        <span className="text-gray-900">{item.currentScore}</span>
                        <ArrowRight className="w-4 h-4 inline mx-2" />
                        <span style={{ color: "#00C853" }}>{item.targetScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress to Target</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((item.currentScore / item.targetScore) * 100)}%
                      </span>
                    </div>
                    <Progress value={(item.currentScore / item.targetScore) * 100} className="h-2" />
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Action Items:</h5>
                    <ul className="space-y-1">
                      {item.actionItems.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: "#00C853" }}></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Resources */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BookOpen className="w-5 h-5" style={{ color: "#00C853" }} />
              Recommended Learning Resources
            </CardTitle>
            <CardDescription>Curated content to help you improve specific skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningResources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    {resource.icon}
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {resource.type}
                      </Badge>
                      <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {resource.duration}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.difficulty}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
