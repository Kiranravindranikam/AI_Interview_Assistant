export function FeaturesSection() {
  const features = [
    {
      emoji: "🎙️",
      title: "Speech Analysis",
      description:
        "Advanced speech pattern analysis to evaluate your verbal communication, pace, and delivery style for optimal performance.",
    },
    {
      emoji: "📝",
      title: "Grammar & Relevance",
      description:
        "Real-time grammar checking and content relevance assessment to ensure your responses are clear and impactful.",
    },
    {
      emoji: "⚡",
      title: "Real-time Feedback",
      description:
        "Instant feedback during your practice sessions to help you identify areas for improvement on the spot.",
    },
    {
      emoji: "📊",
      title: "Confidence Tracking",
      description:
        "Monitor your confidence levels and track improvement over multiple practice sessions with detailed analytics.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F1F5F9" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#111827" }}>
            Powerful Features
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Our comprehensive AI-powered system provides detailed analysis to help you excel in any interview scenario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="text-3xl mb-4 text-center">{feature.emoji}</div>
              <h3 className="text-xl font-semibold mb-3 text-center" style={{ color: "#111827" }}>
                {feature.title}
              </h3>
              <p className="text-center leading-relaxed" style={{ color: "#6B7280" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
