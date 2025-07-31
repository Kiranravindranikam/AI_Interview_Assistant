"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Play, TrendingUp, Clock, Award } from "lucide-react"

// Mock data for interview results
const interviewResults = [
  {
    id: 1,
    date: "2024-01-15",
    position: "Frontend Developer",
    company: "TechCorp",
    status: "Completed",
    score: 85,
    duration: "45 min",
  },
  {
    id: 2,
    date: "2024-01-12",
    position: "React Developer",
    company: "StartupXYZ",
    status: "Completed",
    score: 92,
    duration: "38 min",
  },
  {
    id: 3,
    date: "2024-01-10",
    position: "Full Stack Developer",
    company: "BigTech Inc",
    status: "Completed",
    score: 78,
    duration: "52 min",
  },
  {
    id: 4,
    date: "2024-01-08",
    position: "Software Engineer",
    company: "InnovateLab",
    status: "In Progress",
    score: null,
    duration: "25 min",
  },
  {
    id: 5,
    date: "2024-01-05",
    position: "Backend Developer",
    company: "DataFlow",
    status: "Completed",
    score: 88,
    duration: "41 min",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
    case "In Progress":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getScoreBadge = (score: number | null) => {
  if (score === null) return <span className="text-gray-400">-</span>

  if (score >= 90) {
    return <Badge className="bg-green-600 text-white hover:bg-green-600">Excellent ({score}%)</Badge>
  } else if (score >= 80) {
    return <Badge className="bg-green-500 text-white hover:bg-green-500">Good ({score}%)</Badge>
  } else if (score >= 70) {
    return <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">Fair ({score}%)</Badge>
  } else {
    return <Badge className="bg-red-500 text-white hover:bg-red-500">Needs Improvement ({score}%)</Badge>
  }
}

export function Dashboard() {
  const completedInterviews = interviewResults.filter((result) => result.status === "Completed")
  const averageScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce((sum, result) => sum + (result.score || 0), 0) / completedInterviews.length,
        )
      : 0

  return (
    <SidebarInset className="flex-1 bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-green-100 bg-white px-6">
        <SidebarTrigger className="text-green-600 hover:bg-green-50" />
        <div className="flex-1" />
        <div className="text-sm text-green-600">Welcome back! Ready for your next challenge?</div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Hero Section with Start Interview Button */}
        <div className="text-center py-12 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-green-800">Ready to Practice?</h1>
              <p className="text-lg text-green-600">
                Start your next mock interview and improve your skills with AI-powered feedback
              </p>
            </div>

            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Interview
            </Button>

            <p className="text-sm text-green-500">Average session time: 40 minutes • AI-powered feedback included</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Interviews</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{interviewResults.length}</div>
              <p className="text-xs text-green-600">{completedInterviews.length} completed</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{averageScore}%</div>
              <p className="text-xs text-green-600">Across all completed interviews</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Practice Time</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">3.4h</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Interview Results Table */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Interview History</CardTitle>
            <CardDescription className="text-green-600">
              Your recent mock interview sessions and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-green-100">
                  <TableHead className="text-green-700">Date</TableHead>
                  <TableHead className="text-green-700">Position</TableHead>
                  <TableHead className="text-green-700">Company</TableHead>
                  <TableHead className="text-green-700">Duration</TableHead>
                  <TableHead className="text-green-700">Status</TableHead>
                  <TableHead className="text-green-700">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviewResults.map((result) => (
                  <TableRow key={result.id} className="border-green-50 hover:bg-green-25">
                    <TableCell className="font-medium text-green-800">
                      {new Date(result.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-green-700">{result.position}</TableCell>
                    <TableCell className="text-green-600">{result.company}</TableCell>
                    <TableCell className="text-green-600">{result.duration}</TableCell>
                    <TableCell>{getStatusBadge(result.status)}</TableCell>
                    <TableCell>{getScoreBadge(result.score)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  )
}
