export function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#1B5E20" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#00C853" }}
              >
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-white">Interview Assistant</span>
            </div>
            <p className="text-green-100 max-w-md leading-relaxed">
              Empowering professionals and job seekers with cutting-edge AI technology to master interview skills and
              achieve career success through personalized feedback and comprehensive analysis.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-green-200" style={{ borderColor: "#2E7D32" }}>
          <p>&copy; 2024 AI Interview Assistant. All rights reserved. Empowering careers through technology.</p>
        </div>
      </div>
    </footer>
  )
}
