'use client'

import { useState } from 'react'
import AuthCard from '@/components/auth/AuthCard'

export default function Home() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Panel - Marketing Content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="text-blue-600">AuthApp</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Secure, fast, and reliable authentication system built with Next.js and Supabase.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Secure Authentication</h3>
                  <p className="text-gray-600">Built-in security features with password hashing, session management, and CSRF protection.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Real-time Database</h3>
                  <p className="text-gray-600">Powered by Supabase with PostgreSQL and real-time subscriptions.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Modern UI/UX</h3>
                  <p className="text-gray-600">Beautiful, responsive design with Tailwind CSS and smooth animations.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Get Started Today</h3>
              <p className="text-gray-600 mb-4">
                Join thousands of users who trust our secure authentication system.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Free to use</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">No setup fees</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">24/7 support</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Auth Card */}
          <div className="flex justify-center lg:justify-end">
            <AuthCard mode={authMode} onModeChange={setAuthMode} />
          </div>
        </div>
      </div>
    </div>
  )
}