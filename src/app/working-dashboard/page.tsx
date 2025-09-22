'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WorkingDashboard() {
  const [user, setUser] = useState<{ email: string; id: string; created_at: string; email_confirmed_at?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const sessionData = localStorage.getItem('supabase_session')
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData)
        setUser(session.user)
      } catch (error) {
        console.error('Error parsing session:', error)
        router.push('/working-login')
      }
    } else {
      router.push('/working-login')
    }
    setLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('supabase_session')
    router.push('/working-login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AuthApp - Working Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="text-gray-900 font-medium">
                  Logged in as <span className="text-blue-600">{user.email}</span>
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🎉 Welcome to your Working Dashboard!
          </h1>
          <p className="mt-2 text-gray-600">
            Your authentication system is now working with direct API calls!
          </p>
        </div>

        {/* Success Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                🎉 Authentication System Working!
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Your login system is now fully functional with:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>✅ Direct API authentication</li>
                  <li>✅ Session management</li>
                  <li>✅ Protected routes</li>
                  <li>✅ Logout functionality</li>
                  <li>✅ Fast redirects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Information</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user.email_confirmed_at ? 'Yes' : 'No'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Main Page
          </button>
          <button
            onClick={() => router.push('/working-login')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Go to Working Login
          </button>
        </div>
      </main>
    </div>
  )
}
