"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileAudio, X, CheckCircle, AlertCircle, AudioWaveformIcon as Waveform, BarChart4 } from 'lucide-react'

interface UploadedFile {
  file: File
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  error?: string
}

export default function UploadAnalysisPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  // Validate file type and set file
  const validateAndSetFile = (file: File) => {
    // Check if file is audio (MP3 or WAV)
    const validTypes = ["audio/mpeg", "audio/wav", "audio/x-wav"]
    if (!validTypes.includes(file.type)) {
      setUploadedFile({
        file,
        progress: 0,
        status: "error",
        error: "Invalid file type. Please upload MP3 or WAV files only.",
      })
      return
    }

    // Check file size (max 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB in bytes
    if (file.size > maxSize) {
      setUploadedFile({
        file,
        progress: 0,
        status: "error",
        error: "File is too large. Maximum size is 100MB.",
      })
      return
    }

    setUploadedFile({
      file,
      progress: 0,
      status: "idle",
    })
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Handle file upload
  const uploadFile = async () => {
    if (!uploadedFile) return

    setUploadedFile({
      ...uploadedFile,
      status: "uploading",
      progress: 0,
    })

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFile((prev) => {
        if (!prev) return null
        const newProgress = Math.min(prev.progress + 5, 100)
        const newStatus = newProgress === 100 ? "success" : "uploading"

        if (newProgress === 100) {
          clearInterval(interval)
        }

        return {
          ...prev,
          progress: newProgress,
          status: newStatus,
        }
      })
    }, 200)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#111827" }}>
            Upload & Analyze Your Interview 🎤
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your interview recordings and get detailed AI-powered analysis including speech patterns, grammar
            assessment, and personalized feedback to improve your performance.
          </p>
        </section>

        {/* Upload Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Card
            className={`border-2 border-dashed transition-colors ${
              isDragging
                ? "border-green-400 bg-green-50"
                : uploadedFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-12">
              {!uploadedFile ? (
                <div className="text-center">
                  <div className="flex flex-col items-center space-y-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#00C853" }}
                    >
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2" style={{ color: "#111827" }}>
                        Upload Your Interview Recording
                      </h3>
                      <p className="text-gray-600 mb-6">Drag and drop your MP3 or WAV file here, or click to browse</p>
                      <input
                        type="file"
                        accept=".mp3,.wav,audio/mp3,audio/wav,audio/mpeg"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        ref={fileInputRef}
                      />
                      <label htmlFor="file-upload">
                        <Button
                          size="lg"
                          className="text-white font-semibold px-8 py-3 hover:opacity-90 transition-opacity cursor-pointer"
                          style={{ backgroundColor: "#00C853" }}
                          asChild
                        >
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FileAudio className="w-4 h-4 mr-1" />
                        MP3, WAV supported
                      </span>
                      <span>•</span>
                      <span>Max file size: 100MB</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex flex-col items-center space-y-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#00C853" }}
                    >
                      <FileAudio className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-full max-w-md">
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileAudio className="w-5 h-5 text-gray-400" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900 truncate max-w-48">{uploadedFile.file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.file.size)}</p>
                          </div>
                        </div>
                        <button onClick={removeFile} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      {/* Error Message */}
                      {uploadedFile.status === "error" && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 mt-4">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <p className="text-sm">{uploadedFile.error}</p>
                        </div>
                      )}

                      {/* Upload Progress */}
                      {uploadedFile.status === "uploading" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{uploadedFile.progress}%</span>
                          </div>
                          <Progress value={uploadedFile.progress} className="h-2" />
                        </div>
                      )}

                      {/* Upload Success */}
                      {uploadedFile.status === "success" && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 mt-4">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <p className="text-sm">Upload complete! Your file is being analyzed.</p>
                        </div>
                      )}

                      {/* Upload Button */}
                      {uploadedFile.status === "idle" && (
                        <Button
                          onClick={uploadFile}
                          disabled={uploadedFile.status === "uploading"}
                          className="w-full mt-4 text-white font-semibold py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
                          style={{ backgroundColor: "#00C853" }}
                        >
                          Start Analysis
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Analysis Features */}
        <section className="py-16" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#111827" }}>
                What You'll Get from Our Analysis
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive AI-powered insights to help you improve your interview performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    Analyze pace, clarity, filler words, and speaking confidence
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <span className="text-2xl">📝</span>
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Content Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Grammar, relevance, and structure assessment of your responses
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Performance Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Overall performance rating with detailed breakdown
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <BarChart4 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Improvement Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Personalized recommendations to enhance your interview skills
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#111827" }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple 3-step process to get your interview analysis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: "#00C853" }}
              >
                1
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#111827" }}>
                Upload Recording
              </h3>
              <p className="text-gray-600">Upload your interview recording in MP3 or WAV format</p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: "#1B5E20" }}
              >
                2
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#111827" }}>
                AI Analysis
              </h3>
              <p className="text-gray-600">Our AI analyzes your speech, content, and overall performance</p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: "#00C853" }}
              >
                3
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#111827" }}>
                Get Results
              </h3>
              <p className="text-gray-600">Receive detailed feedback and personalized improvement recommendations</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
