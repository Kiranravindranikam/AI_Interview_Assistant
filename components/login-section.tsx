import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#111827" }}>
            Login to Your Account
          </h2>
          <p style={{ color: "#6B7280" }}>
            Access your personalized interview feedback and comprehensive analytics dashboard
          </p>
        </div>

        <div className="p-8 rounded-lg shadow-sm border border-gray-200" style={{ backgroundColor: "#F1F5F9" }}>
          <form className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#111827" }}>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full border-2 bg-white transition-all duration-200 focus:ring-2"
                style={{
                  borderColor: "#D1D5DB",
                  color: "#111827",
                }}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#111827" }}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border-2 bg-white transition-all duration-200 focus:ring-2"
                style={{
                  borderColor: "#D1D5DB",
                  color: "#111827",
                }}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg text-white"
              style={{ backgroundColor: "#1B5E20" }}
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Don't have an account?{" "}
              <a href="#" className="font-medium hover:underline transition-colors" style={{ color: "#00C853" }}>
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
