'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WorkingLogin() {
  const [email, setEmail] = useState('someshsapa09@gmail.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('https://elzjjiofmtlgxpzxunrt.supabase.co/auth/v1/token?grant_type=password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsempqaW9mbXRsZ3hwenh1bnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MDk3OTMsImV4cCI6MjA3Mzk4NTc5M30.NR8Q-f5tSUBn3iRA5Sl-W6ROUGfNj6AqhmaMDn4sjIY',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsempqaW9mbXRsZ3hwenh1bnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MDk3OTMsImV4cCI6MjA3Mzk4NTc5M30.NR8Q-f5tSUBn3iRA5Sl-W6ROUGfNj6AqhmaMDn4sjIY'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSuccess('Login successful! Redirecting...')
        
        // Store the session data
        localStorage.setItem('supabase_session', JSON.stringify(data))
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/working-dashboard')
        }, 1000)
      } else {
        const errorData = await response.text()
        setError(`Login failed: ${errorData}`)
      }
    } catch (err: unknown) {
      setError(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Working Login</h1>
          <p className="text-gray-600 mt-2">Direct API authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            ← Back to main page
          </button>
        </div>
      </div>
    </div>
  )
}
