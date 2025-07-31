"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#00C853" }}
            >
              AI
            </div>
            <span className="text-xl font-bold text-gray-900">Interview Assistant</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Home 🏠
            </Link>
            <Link href="/upload-analysis" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Upload & Analyze
            </Link>
            <Link href="/live-interview" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Live Interview
            </Link>
            <Link
              href="/analysis-dashboard"
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Analysis Dashboard
            </Link>
            <Link href="/recommendations" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Recommendations
            </Link>
          </nav>

          {/* Login Button */}
          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent">
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}
