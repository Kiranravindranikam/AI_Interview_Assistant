import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: "#111827" }}>
          🎤 AI Interview Feedback System
        </h1>

        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "#6B7280" }}>
          Enhance your interview performance with our advanced AI-powered feedback system. Get personalized insights,
          improve your communication skills, and boost your confidence for career success.
        </p>

        <Button
          size="lg"
          className="px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-white"
          style={{ backgroundColor: "#00C853" }}
        >
          Get Started
        </Button>
      </div>
    </section>
  )
}
