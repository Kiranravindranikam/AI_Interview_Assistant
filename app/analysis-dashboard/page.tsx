"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrendingUp, Eye, MessageSquare, Brain, Download, Share2, Award, Clock, Target, Zap } from "lucide-react"

// Mock data for the analysis
const skillsData = [
  { name: "Tone", score: 85 },
  { name: "Confidence", score: 78 },
  { name: "Grammar", score: 92 },
]

const sentimentData = [
  { name: "Positive", value: 65, color: "#00C853" },
  { name: "Neutral", value: 25, color: "#9E9E9E" },
  { name: "Negative", value: 10, color: "#F44336" },
]

// Simple CSS-based charts
const BarChart = ({ data, title }: { data: any[]; title: string }) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-gray-900">{title}</h4>
    {data.map((item, index) => (
      <div key={index} className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{item.name}</span>
          <span className="text-sm font-bold" style={{ color: "#00C853" }}>
            {item.score}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${item.score}%`,
              backgroundColor: "#00C853",
            }}
          />
        </div>
      </div>
    ))}
  </div>
)

const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#00C853"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: "#00C853" }}>
              {percentage}%
            </div>
            <div className="text-xs text-gray-600">Relevance</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PieChart = ({ data, size = 200 }: { data: any[]; size?: number }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const strokeDasharray = `${percentage} ${100 - percentage}`
            const strokeDashoffset = -cumulativePercentage
            cumulativePercentage += percentage

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={size / 4}
                stroke={item.color}
                strokeWidth="40"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">Sentiment</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GaugeChart = ({ value, max = 100, size = 160 }: { value: number; max?: number; size?: number }) => {
  const percentage = (value / max) * 100
  const angle = (percentage / 100) * 180 // Half circle

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + 20}>
          {/* Background arc */}
          <path
            d={`M 20 ${size / 2} A ${size / 2 - 20} ${size / 2 - 20} 0 0 1 ${size - 20} ${size / 2}`}
            stroke="#F1F5F9"
            strokeWidth="20"
            fill="none"
          />
          {/* Progress arc */}
          <path
            d={`M 20 ${size / 2} A ${size / 2 - 20} ${size / 2 - 20} 0 0 1 ${size - 20} ${size / 2}`}
            stroke="#00C853"
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${(percentage / 100) * Math.PI * (size / 2 - 20)} ${Math.PI * (size / 2 - 20)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Needle */}
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2 + (size / 2 - 30) * Math.cos((angle - 90) * (Math.PI / 180))}
            y2={size / 2 + (size / 2 - 30) * Math.sin((angle - 90) * (Math.PI / 180))}
            stroke="#1B5E20"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Center dot */}
          <circle cx={size / 2} cy={size / 2} r="6" fill="#1B5E20" />
        </svg>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: "#00C853" }}>
              {value}
            </div>
            <div className="text-xs text-gray-600">Eye Contact Score</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnalysisDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Analysis Dashboard</h1>
              <p className="text-gray-600">Comprehensive AI-powered feedback on your interview performance</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button style={{ backgroundColor: "#00C853" }} className="text-white hover:opacity-90">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 border-green-200">
          <CardHeader className="text-center" style={{ backgroundColor: "#F1F5F9" }}>
            <CardTitle className="text-2xl text-gray-900">Overall Interview Score</CardTitle>
            <div className="text-5xl font-bold mt-4" style={{ color: "#00C853" }}>
              82/100
            </div>
            <Badge className="mt-2" style={{ backgroundColor: "#00C853" }}>
              Excellent Performance
            </Badge>
          </CardHeader>
        </Card>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interview Duration</p>
                  <p className="text-3xl font-bold text-gray-900">28m</p>
                  <p className="text-xs text-gray-500">Optimal length</p>
                </div>
                <Clock className="w-8 h-8" style={{ color: "#1B5E20" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions Answered</p>
                  <p className="text-3xl font-bold text-gray-900">5/5</p>
                  <p className="text-xs text-gray-500">100% completion</p>
                </div>
                <Target className="w-8 h-8" style={{ color: "#4CAF50" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confidence Level</p>
                  <p className="text-3xl font-bold text-gray-900">85%</p>
                  <p className="text-xs text-gray-500">Above average</p>
                </div>
                <Zap className="w-8 h-8" style={{ color: "#66BB6A" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className="text-3xl font-bold" style={{ color: "#00C853" }}>
                    +5
                  </p>
                  <p className="text-xs text-gray-500">From last interview</p>
                </div>
                <Award className="w-8 h-8" style={{ color: "#00C853" }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tone, Confidence, and Grammar Bar Chart */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <TrendingUp className="w-5 h-5" style={{ color: "#00C853" }} />
                Communication Skills Analysis
              </CardTitle>
              <CardDescription>Your performance across key communication metrics (0-100 scale)</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={skillsData} title="" />
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                <h4 className="font-semibold text-gray-900 mb-2">Key Insights:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Excellent grammar and articulation (92%)</li>
                  <li>• Strong professional tone maintained (85%)</li>
                  <li>• Confidence can be improved with practice (78%)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Answer Relevance Circular Progress */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Brain className="w-5 h-5" style={{ color: "#00C853" }} />
                Answer Relevance Score
              </CardTitle>
              <CardDescription>How well your answers matched the interview questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-8">
                <CircularProgress percentage={87} size={160} />
              </div>
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                <h4 className="font-semibold text-gray-900 mb-2">Analysis:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Strong alignment with technical questions</li>
                  <li>• Good use of relevant examples and experiences</li>
                  <li>• Minor improvements needed in behavioral responses</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sentiment and Eye Contact Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sentiment Analysis Pie Chart */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <MessageSquare className="w-5 h-5" style={{ color: "#00C853" }} />
                Sentiment Analysis
              </CardTitle>
              <CardDescription>Emotional tone distribution throughout your interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <PieChart data={sentimentData} size={200} />
              </div>

              <div className="mt-6 space-y-3">
                {sentimentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#F1F5F9" }}>
                <p className="text-sm text-gray-700">
                  <strong>Key Insight:</strong> Your positive sentiment remained consistently high (65%), indicating
                  strong enthusiasm and engagement throughout the interview.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Eye Contact Analysis Gauge */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Eye className="w-5 h-5" style={{ color: "#00C853" }} />
                Eye Contact Analysis
              </CardTitle>
              <CardDescription>Consistency and quality of eye contact during the interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-8">
                <GaugeChart value={73} />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Consistency Rating</span>
                  <Badge style={{ backgroundColor: "#00C853" }}>Good</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Total Duration</span>
                  <span className="text-sm font-semibold text-gray-900">68% of interview</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Natural Breaks</span>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Appropriate (12)
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Engagement Level</span>
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="w-16 h-2" />
                    <span className="text-sm font-bold" style={{ color: "#00C853" }}>
                      78%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Timeline */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Clock className="w-5 h-5" style={{ color: "#00C853" }} />
              Performance Timeline
            </CardTitle>
            <CardDescription>How your performance evolved throughout the interview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { time: "0-5 min", phase: "Opening", confidence: 65, engagement: 70 },
                { time: "5-15 min", phase: "Technical Questions", confidence: 85, engagement: 88 },
                { time: "15-25 min", phase: "Behavioral Questions", confidence: 78, engagement: 82 },
                { time: "25-30 min", phase: "Closing", confidence: 90, engagement: 92 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-900">{item.phase}</span>
                      <span className="text-sm text-gray-500 ml-2">({item.time})</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <div className="text-xs text-gray-600">Confidence</div>
                        <div className="text-sm font-bold" style={{ color: "#00C853" }}>
                          {item.confidence}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">Engagement</div>
                        <div className="text-sm font-bold" style={{ color: "#1B5E20" }}>
                          {item.engagement}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${item.confidence}%`,
                          backgroundColor: "#00C853",
                          animationDelay: `${index * 200}ms`,
                        }}
                      />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${item.engagement}%`,
                          backgroundColor: "#1B5E20",
                          animationDelay: `${index * 200 + 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-green-200">
          <CardHeader style={{ backgroundColor: "#F1F5F9" }}>
            <CardTitle className="text-gray-900">Next Steps</CardTitle>
            <CardDescription>Continue your interview improvement journey</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
              >
                <TrendingUp className="w-6 h-6" />
                <span>View Detailed Recommendations</span>
              </Button>
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
              >
                <MessageSquare className="w-6 h-6" />
                <span>Practice More Interviews</span>
              </Button>
              <Button
                style={{ backgroundColor: "#00C853" }}
                className="text-white hover:opacity-90 h-auto p-4 flex flex-col items-center gap-2"
              >
                <Share2 className="w-6 h-6" />
                <span>Share Your Progress</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
