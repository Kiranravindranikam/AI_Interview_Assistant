import { Button } from "@/components/ui/button"

export function Header() {
  const navigationLinks = [
    { name: "Home 🏠", href: "#" },
    { name: "Upload & Analyze", href: "#" },
    { name: "Live Interview", href: "#" },
    { name: "Analysis Dashboard", href: "#" },
    { name: "Recommendations", href: "#" },
  ]

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo placeholder */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#00C853" }}>
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="ml-3 text-xl font-semibold" style={{ color: "#111827" }}>
              Interview Assistant
            </span>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "#111827" }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Login button */}
          <Button
            variant="outline"
            className="border-2 hover:opacity-90 transition-all duration-200 bg-white"
            style={{
              borderColor: "#00C853",
              color: "#00C853",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}
