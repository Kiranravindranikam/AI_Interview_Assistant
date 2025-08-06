"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Mic, MicOff, VideoOff, Play, Square, Plus, Edit, Trash2, Bot, Clock, Activity, Upload, FileText, CheckCircle, Loader2, Send } from 'lucide-react'

interface Question {
  id: number
  text: string
}

interface InterviewMessage {
  id: number
  type: "interviewer" | "user"
  content: string
  timestamp: Date
}

interface LiveAnalysis {
  grammar: number
  confidence: number
  tone: number
  relevance: number
  sentiment: "positive" | "neutral" | "negative"
  facialExpression: number
}

interface ResumeData {
  name: string
  email: string
  phone: string
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  skills: string[]
  summary: string
}

interface PersonalizedQuestion {
  id: number
  question: string
  category: string
  basedOn: string
}

// Mock AI Questions - Replace with OpenAI API
const mockAIQuestions = [
  "Tell me about yourself and your background.",
  "What are your greatest strengths and how do they apply to this role?",
  "Describe a challenging situation you faced at work and how you handled it.",
  "Where do you see yourself in 5 years?",
  "Why are you interested in this position and our company?",
  "What is your biggest weakness and how are you working to improve it?",
  "Tell me about a time you had to work with a difficult team member.",
  "How do you handle stress and pressure in the workplace?",
]

export default function LiveInterviewPage() {
  const router = useRouter()

  // Custom Questions State
  const [customQuestions, setCustomQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Resume Upload State (add this after existing state)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isProcessingResume, setIsProcessingResume] = useState(false)
  const [resumeData, setResumeData] = useState<any>(null)
  const [personalizedQuestions, setPersonalizedQuestions] = useState<any[]>([])
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)

  // Interview State
  const [activeTab, setActiveTab] = useState("custom")
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [interviewMessages, setInterviewMessages] = useState<InterviewMessage[]>([])
  const [transcript, setTranscript] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [interviewDuration, setInterviewDuration] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [interviewType, setInterviewType] = useState<"custom" | "personalized">("custom")

  // Live Analysis State
  const [liveAnalysis, setLiveAnalysis] = useState<LiveAnalysis>({
    grammar: 0,
    confidence: 0,
    tone: 0,
    relevance: 0,
    sentiment: "neutral",
    facialExpression: 0,
  })

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get all questions based on active tab
  const getAllQuestions = () => {
    if (interviewType === "personalized") {
      return personalizedQuestions.map((q) => q.question)
    }
    return [...customQuestions.map((q) => q.text), ...mockAIQuestions]
  }

  // Custom Questions Functions
  const addQuestion = () => {
    if (newQuestion.trim()) {
      const newId = Date.now()
      setCustomQuestions([...customQuestions, { id: newId, text: newQuestion.trim() }])
      setNewQuestion("")
    }
  }

  const removeQuestion = (id: number) => {
    setCustomQuestions(customQuestions.filter((q) => q.id !== id))
  }

  const startEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editText.trim()) {
      setCustomQuestions(customQuestions.map((q) => (q.id === editingId ? { ...q, text: editText.trim() } : q)))
    }
    setEditingId(null)
    setEditText("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  // Resume Upload Functions (add after custom questions functions)
  const handleResumeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setResumeFile(file)
      processResume(file)
    } else {
      alert("Please select a valid PDF or DOC file")
    }
  }

  const processResume = async (file: File) => {
    setIsProcessingResume(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock extracted resume data
      const mockResumeData = {
        name: "John Doe",
        email: "john.doe@email.com",
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        experience: [
          { title: "Software Developer", company: "Tech Solutions Inc.", duration: "2022 - Present" },
          { title: "Junior Developer", company: "StartupXYZ", duration: "2020 - 2022" },
        ],
        education: [{ degree: "Bachelor of Science in Computer Science", institution: "University of Technology", year: "2020" }],
      }

      setResumeData(mockResumeData)
      generatePersonalizedQuestions(mockResumeData)
    } catch (error) {
      console.error("Error processing resume:", error)
    } finally {
      setIsProcessingResume(false)
    }
  }

  const generatePersonalizedQuestions = async (resumeData: any) => {
    setIsGeneratingQuestions(true)

    try {
      // Mock AI question generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockQuestions = [
        {
          id: 1,
          question: `I see you have experience with ${resumeData.skills.slice(0, 3).join(", ")}. Can you tell me about a challenging project you worked on using these technologies?`,
          category: "Technical Skills",
        },
        {
          id: 2,
          question: `You've worked as a ${resumeData.experience[0]?.title} at ${resumeData.experience[0]?.company}. What was your biggest achievement in this role?`,
          category: "Experience",
        },
        {
          id: 3,
          question: `Given your background in ${resumeData.education[0]?.degree}, how do you stay updated with the latest technology trends?`,
          category: "Education",
        },
      ]

      setPersonalizedQuestions(mockQuestions)
    } catch (error) {
      console.error("Error generating questions:", error)
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const removeResumeFile = () => {
    setResumeFile(null)
    setResumeData(null)
    setPersonalizedQuestions([])
  }

  // Media Functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      mediaStreamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsVideoEnabled(true)
      setIsAudioEnabled(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsVideoEnabled(false)
    setIsAudioEnabled(false)
  }

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
      }
    }
  }

  // Interview Functions
  const startInterview = async (type: "custom" | "personalized") => {
    await startCamera()
    setIsInterviewActive(true)
    setInterviewType(type)
    setCurrentQuestionIndex(0)
    setInterviewMessages([])
    setTranscript("")
    setCurrentAnswer("")
    setInterviewDuration(0)

    // Start timer
    intervalRef.current = setInterval(() => {
      setInterviewDuration((prev) => prev + 1)
    }, 1000)

    // Ask first question
    askQuestion(0, type)

    // Start mock real-time analysis
    startMockAnalysis()
  }

  const endInterview = async () => {
    setIsInterviewActive(false)
    setIsRecording(false)
    stopCamera()

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Prepare interview results
    const interviewResults = {
      type: interviewType,
      duration: interviewDuration,
      questionsAnswered: currentQuestionIndex + 1,
      totalQuestions: getAllQuestions().length,
      transcript,
      analysis: liveAnalysis,
      timestamp: new Date(),
      resumeData: interviewType === "personalized" ? resumeData : null,
      personalizedQuestions: interviewType === "personalized" ? personalizedQuestions : null,
      responses: interviewMessages.filter((msg) => msg.type === "user"),
    }

    // Store results - Replace with Flask API call
    try {
      await saveInterviewResults(interviewResults)
      localStorage.setItem("latestInterviewResults", JSON.stringify(interviewResults))
      router.push("/analysis-dashboard")
    } catch (error) {
      console.error("Error saving interview results:", error)
      // Fallback to localStorage
      localStorage.setItem("latestInterviewResults", JSON.stringify(interviewResults))
      router.push("/analysis-dashboard")
    }
  }

  const saveInterviewResults = async (results: any) => {
    // Mock API call - Replace with actual Flask endpoint
    const response = await fetch("/api/interviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    })

    if (!response.ok) {
      throw new Error("Failed to save interview results")
    }

    return response.json()
  }

  const askQuestion = (questionIndex: number, type: "custom" | "personalized") => {
    const questions =
      type === "personalized"
        ? personalizedQuestions.map((q) => q.question)
        : [...customQuestions.map((q) => q.text), ...mockAIQuestions]

    if (questionIndex < questions.length) {
      const question = questions[questionIndex]
      const message: InterviewMessage = {
        id: Date.now(),
        type: "interviewer",
        content: question,
        timestamp: new Date(),
      }
      setInterviewMessages((prev) => [...prev, message])
      setCurrentAnswer("")
    }
  }

  const submitAnswer = () => {
    if (currentAnswer.trim()) {
      const message: InterviewMessage = {
        id: Date.now(),
        type: "user",
        content: currentAnswer.trim(),
        timestamp: new Date(),
      }
      setInterviewMessages((prev) => [...prev, message])
      setCurrentAnswer("")

      // Move to next question after a short delay
      setTimeout(() => {
        nextQuestion()
      }, 1000)
    }
  }

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1
    const totalQuestions = getAllQuestions().length

    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex)
      askQuestion(nextIndex, interviewType)
    } else {
      endInterview()
    }
  }

  // Mock real-time analysis (replace with actual APIs)
  const startMockAnalysis = () => {
    const analysisInterval = setInterval(() => {
      if (!isInterviewActive) {
        clearInterval(analysisInterval)
        return
      }

      // Mock live analysis updates
      setLiveAnalysis((prev) => ({
        grammar: Math.min(100, prev.grammar + Math.random() * 5),
        confidence: Math.min(100, prev.confidence + Math.random() * 3),
        tone: Math.min(100, prev.tone + Math.random() * 4),
        relevance: Math.min(100, prev.relevance + Math.random() * 6),
        sentiment: ["positive", "neutral", "negative"][Math.floor(Math.random() * 3)] as any,
        facialExpression: Math.min(100, prev.facialExpression + Math.random() * 2),
      }))

      // Mock transcript updates
      if (currentAnswer && Math.random() > 0.8) {
        const words = currentAnswer.split(" ")
        const transcriptWords = transcript.split(" ")
        if (transcriptWords.length < words.length) {
          setTranscript(words.slice(0, transcriptWords.length + 1).join(" "))
        }
      }
    }, 2000)
  }

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  if (isInterviewActive) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Interview Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Activity className="w-4 h-4 mr-1" />
                  Live Interview ({interviewType === "personalized" ? "Personalized" : "Standard"})
                </Badge>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDuration(interviewDuration)}
                </div>
                <div className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {getAllQuestions().length}
                </div>
              </div>
              <Button onClick={endInterview} variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Square className="w-4 h-4 mr-2" />
                End Interview
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Video Section */}
              <div className="lg:col-span-2 space-y-4">
                {/* User Video */}
                <Card>
                  <CardContent className="p-4">
                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                      {!isVideoEnabled && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                          <VideoOff className="w-12 h-12 text-gray-400" />
                        </div>
                      )}

                      {/* Controls Overlay */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <Button
                          size="sm"
                          variant={isVideoEnabled ? "default" : "secondary"}
                          onClick={toggleVideo}
                          className={isVideoEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant={isAudioEnabled ? "default" : "secondary"}
                          onClick={toggleAudio}
                          className={isAudioEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interview Chat */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Conversation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-64 overflow-y-auto">
                    {interviewMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                            message.type === "interviewer"
                              ? "bg-green-50 border border-green-200 text-green-800"
                              : "bg-gray-50 border border-gray-200 text-gray-800"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <span className="text-xs font-medium text-gray-600">
                              {message.type === "interviewer" ? "AI Interviewer" : "You"}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  {/* Answer Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your answer here or speak..."
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && submitAnswer()}
                        className="flex-1"
                      />
                      <Button
                        onClick={submitAnswer}
                        disabled={!currentAnswer.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      You can type your answer or speak (audio will be transcribed automatically)
                    </p>
                  </div>
                </Card>
              </div>

              {/* Analysis Panel */}
              <div className="space-y-4">
                {/* Live Transcript */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-3 rounded-lg min-h-24 max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-700">
                        {transcript || currentAnswer || "Start speaking to see your transcript..."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Grammar</span>
                        <span>{Math.round(liveAnalysis.grammar)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${liveAnalysis.grammar}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Confidence</span>
                        <span>{Math.round(liveAnalysis.confidence)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${liveAnalysis.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tone</span>
                        <span>{Math.round(liveAnalysis.tone)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${liveAnalysis.tone}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Relevance</span>
                        <span>{Math.round(liveAnalysis.relevance)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${liveAnalysis.relevance}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sentiment</span>
                      <Badge
                        variant={
                          liveAnalysis.sentiment === "positive"
                            ? "default"
                            : liveAnalysis.sentiment === "neutral"
                              ? "secondary"
                              : "destructive"
                        }
                        className={liveAnalysis.sentiment === "positive" ? "bg-green-600" : ""}
                      >
                        {liveAnalysis.sentiment}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Facial Expression</span>
                        <span>{Math.round(liveAnalysis.facialExpression)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${liveAnalysis.facialExpression}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#111827" }}>
            Live Interview Simulation 🎯
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with our AI-powered live interview simulator. Get real-time feedback, improve your responses, and
            build confidence for your next interview.
          </p>
        </section>

        {/* Interview Options */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="custom" className="text-lg py-3">
                Custom Questions
              </TabsTrigger>
              <TabsTrigger value="personalized" className="text-lg py-3">
                AI-Personalized Interview
              </TabsTrigger>
            </TabsList>

            {/* Custom Questions Tab */}
            <TabsContent value="custom" className="space-y-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: "#111827" }}>
                    Customize Interview Questions
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Add your own interview questions to personalize the simulation experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Question Input */}
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Enter your interview question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addQuestion()}
                      className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                    <Button
                      onClick={addQuestion}
                      disabled={!newQuestion.trim()}
                      className="text-white font-semibold px-6 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#00C853" }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </div>

                  {/* Questions List */}
                  {customQuestions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
                        Custom Questions ({customQuestions.length})
                      </h3>
                      <div className="space-y-2">
                        {customQuestions.map((question, index) => (
                          <div
                            key={question.id}
                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50"
                          >
                            <span className="text-sm font-medium text-gray-500 min-w-[2rem]">{index + 1}.</span>

                            {editingId === question.id ? (
                              <>
                                <Input
                                  type="text"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") saveEdit()
                                    if (e.key === "Escape") cancelEdit()
                                  }}
                                  className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={saveEdit}
                                    className="text-white px-3 py-1 hover:opacity-90"
                                    style={{ backgroundColor: "#00C853" }}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEdit}
                                    className="px-3 py-1 border-gray-300 hover:bg-gray-100 bg-transparent"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <span className="flex-1 text-gray-800">{question.text}</span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => startEdit(question.id, question.text)}
                                    className="p-2 border-gray-300 hover:bg-gray-100"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeQuestion(question.id)}
                                    className="p-2 border-red-300 hover:bg-red-50 text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {customQuestions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No custom questions added yet. Add your first question above!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Start Custom Interview */}
              <Card className="border-2 text-center" style={{ borderColor: "#00C853", backgroundColor: "#F0FDF4" }}>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#00C853" }}
                    >
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold" style={{ color: "#1B5E20" }}>
                      Ready to Start Your Custom Interview?
                    </h3>
                    <p className="text-lg" style={{ color: "#047857" }}>
                      You have {[...customQuestions, ...mockAIQuestions].length} questions ready. The AI interviewer
                      will guide you through each one with real-time analysis.
                    </p>
                    <Button
                      onClick={() => startInterview("custom")}
                      size="lg"
                      className="text-white font-semibold px-8 py-3 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#00C853" }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Custom Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personalized Interview Tab */}
            <TabsContent value="personalized" className="space-y-8">
              {/* Resume Upload Section - Add this at the beginning of personalized TabsContent */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: "#111827" }}>
                    Upload Your Resume
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Upload your resume to generate personalized interview questions based on your experience and skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!resumeFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeFileChange}
                        className="hidden"
                        id="resume-upload-live"
                      />
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Resume</h3>
                      <p className="text-gray-600 mb-4">Drag and drop your resume here, or click to browse</p>
                      <label htmlFor="resume-upload-live">
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50 cursor-pointer"
                          asChild
                        >
                          <span>
                            <FileText className="w-4 h-4 mr-2" />
                            Choose File
                          </span>
                        </Button>
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Supports PDF, DOC, DOCX files up to 10MB</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* File Upload Success */}
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium text-green-800">{resumeFile.name}</p>
                          <p className="text-sm text-green-600">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={removeResumeFile}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>

                      {/* Processing Status */}
                      {isProcessingResume && (
                        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <div>
                            <p className="font-medium text-blue-800">Processing Resume...</p>
                            <p className="text-sm text-blue-600">Extracting your education, experience, and skills</p>
                          </div>
                        </div>
                      )}

                      {/* Resume Data Display */}
                      {resumeData && !isProcessingResume && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h3 className="text-lg font-semibold text-green-800">Resume Processed Successfully</h3>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <Card className="bg-gray-50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-700">Skills</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="flex flex-wrap gap-1">
                                  {resumeData.skills.map((skill: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-gray-50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-gray-700">Experience</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  {resumeData.experience.map((exp: any, index: number) => (
                                    <div key={index} className="text-sm">
                                      <p className="font-medium">{exp.title}</p>
                                      <p className="text-gray-600">{exp.company} ({exp.duration})</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}

                      {/* Question Generation Status */}
                      {isGeneratingQuestions && (
                        <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <div>
                            <p className="font-medium text-purple-800">Generating Personalized Questions...</p>
                            <p className="text-sm text-purple-600">AI is creating questions based on your resume</p>
                          </div>
                        </div>
                      )}

                      {/* Generated Questions Display */}
                      {personalizedQuestions.length > 0 && !isGeneratingQuestions && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h3 className="text-lg font-semibold text-green-800">
                              {personalizedQuestions.length} Personalized Questions Generated
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {personalizedQuestions.map((question: any, index: number) => (
                              <div key={question.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                                <div className="flex items-start gap-3">
                                  <span className="text-sm font-medium text-gray-500 min-w-[2rem] mt-1">
                                    {index + 1}.
                                  </span>
                                  <div className="flex-1">
                                    <p className="text-gray-800 mb-2">{question.question}</p>
                                    <Badge variant="outline" className="text-xs">
                                      {question.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Start Personalized Interview */}
              {personalizedQuestions.length > 0 && (
                <Card className="border-2 text-center" style={{ borderColor: "#00C853", backgroundColor: "#F0FDF4" }}>
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center space-y-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#00C853" }}
                      >
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold" style={{ color: "#1B5E20" }}>
                        Ready for Your Personalized Interview?
                      </h3>
                      <p className="text-lg" style={{ color: "#047857" }}>
                        Your AI interviewer has prepared {personalizedQuestions.length} questions specifically tailored
                        to your background and experience.
                      </p>
                      <Button
                        onClick={() => startInterview("personalized")}
                        size="lg"
                        className="text-white font-semibold px-8 py-3 hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#00C853" }}
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Personalized Interview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Features Preview */}
        <section className="py-16" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#111827" }}>
                Interview Features
              </h2>
              <p className="text-xl text-gray-600">Advanced AI-powered analysis during your interview</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <span className="text-2xl">🎙️</span>
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Speech Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Real-time speech-to-text with grammar and pronunciation analysis
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <span className="text-2xl">📊</span>
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Live Scoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Instant feedback on confidence, tone, and answer relevance
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <span className="text-2xl">😊</span>
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Facial Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Monitor facial expressions and eye contact during responses
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    AI Interviewer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Dynamic questions powered by AI with natural conversation flow
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
