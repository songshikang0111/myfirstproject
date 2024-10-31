import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LLM Batch Processing Platform',
  description: 'Process your queries with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">
                    My LLM Platform
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="/login"
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}