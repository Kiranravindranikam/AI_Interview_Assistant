import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileAudio, CheckCircle, BarChart3 } from "lucide-react"

export default function UploadAnalysisPage() {
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
          <Card className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors">
            <CardContent className="p-12 text-center">
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
                  <Button
                    size="lg"
                    className="text-white font-semibold px-8 py-3 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    Choose File
                  </Button>
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
                    <BarChart3 className="w-6 h-6 text-white" />
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
