import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Mic, Clock, Users, Settings, Play } from "lucide-react"

export default function LiveInterviewPage() {
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

        {/* Coming Soon Banner */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Card className="border-2 text-center" style={{ borderColor: "#00C853", backgroundColor: "#F0FDF4" }}>
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#00C853" }}
                >
                  <Settings className="w-8 h-8 text-white animate-spin" />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: "#1B5E20" }}>
                  Coming Soon!
                </h3>
                <p className="text-lg" style={{ color: "#047857" }}>
                  We're working hard to bring you the most advanced live interview simulation experience. Stay tuned for
                  updates!
                </p>
                <Button
                  variant="outline"
                  className="border-2 hover:opacity-90 transition-all duration-200 bg-transparent"
                  style={{ borderColor: "#00C853", color: "#00C853" }}
                >
                  Notify Me When Ready
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Planned Features */}
        <section className="py-16" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#111827" }}>
                What to Expect
              </h2>
              <p className="text-xl text-gray-600">Advanced features designed to simulate real interview experiences</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Video Interview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Face-to-face simulation with AI interviewer and real-time video analysis
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Voice Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Advanced speech-to-text with real-time pronunciation and clarity feedback
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Timed Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Realistic interview timing with customizable session lengths
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Multiple Scenarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Various interview types: technical, behavioral, and industry-specific
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <span className="text-2xl">⚡</span>
                  </div>
                  <CardTitle className="text-lg" style={{ color: "#111827" }}>
                    Real-time Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Instant suggestions and tips during the interview process
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
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Detailed post-interview analysis with improvement recommendations
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Preview Demo */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#111827" }}>
              Preview Demo
            </h2>
            <p className="text-xl text-gray-600">
              Get a sneak peek of what the live interview experience will look like
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#00C853" }}
                  >
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#111827" }}>
                    Demo Video Coming Soon
                  </h3>
                  <p className="text-gray-600">Watch how our AI interviewer conducts realistic interview sessions</p>
                </div>
              </div>
              <div className="text-center">
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-3 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#00C853" }}
                >
                  Watch Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Early Access */}
        <section className="py-16" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#111827" }}>
              Get Early Access
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Be among the first to experience our live interview simulation when it launches
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button
                className="text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#00C853" }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
