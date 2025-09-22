'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signUpSchema, signInSchema, type SignUpFormData, type SignInFormData } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'

interface AuthCardProps {
  mode: 'signin' | 'signup'
  onModeChange: (mode: 'signin' | 'signup') => void
}

export default function AuthCard({ mode, onModeChange }: AuthCardProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createClient()

  const isSignUp = mode === 'signup'
  const schema = isSignUp ? signUpSchema : signInSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData | SignInFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: SignUpFormData | SignInFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isSignUp) {
        const { email, password, fullName } = data as SignUpFormData
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) {
          setError(error.message)
        } else {
          setSuccess('Check your email for the confirmation link!')
          reset()
        }
      } else {
        const { email, password } = data as SignInFormData
        
        // Use direct API call for login (working approach)
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
          const authData = await response.json()
          setSuccess('Successfully signed in!')
          
          // Store the session data
          localStorage.setItem('supabase_session', JSON.stringify(authData))
          
          // Redirect to working dashboard
          setTimeout(() => {
            router.push('/working-dashboard')
          }, 1000)
        } else {
          const errorData = await response.text()
          setError(`Login failed: ${errorData}`)
        }
      }
    } catch (err: unknown) {
      setError(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-600 mt-2">
          {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isSignUp && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
              <input
                {...register('fullName')}
                type="text"
                id="fullName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Enter your full name"
              />
            {(errors as Record<string, { message?: string }>).fullName && (
              <p className="text-red-500 text-sm mt-1">{(errors as Record<string, { message?: string }>).fullName?.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Enter your email"
            />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {(errors as Record<string, { message?: string }>).confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{(errors as Record<string, { message?: string }>).confirmPassword?.message}</p>
            )}
          </div>
        )}

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
        )}

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
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              {isSignUp ? 'Creating Account...' : 'Signing In...'}
            </>
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => onModeChange(isSignUp ? 'signin' : 'signup')}
            className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}
