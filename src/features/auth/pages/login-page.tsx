import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas/auth-schemas'
import { useAuthStore } from '@/features/auth/stores/auth-store'
import { useState } from 'react'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-emerald-600 to-emerald-800 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-semibold">InnovateX</span>
        </div>
        <div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Build.<br />Innovate.<br />Launch.
          </h1>
          <p className="mt-6 max-w-md text-lg text-emerald-100">
            The AI-powered innovation ecosystem that supports students from idea to startup.
          </p>
        </div>
        <p className="text-sm text-emerald-200">© 2026 InnovateX. All rights reserved.</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-emerald-600" />
              <span className="text-lg font-semibold">InnovateX</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-2 text-muted-foreground">Sign in to continue your innovation journey</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Demo: alex.morgan@university.edu / ScholarHub2026!
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-emerald-600 hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
