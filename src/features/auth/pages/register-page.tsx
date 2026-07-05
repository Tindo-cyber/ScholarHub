import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas/auth-schemas'
import { useAuthStore } from '@/features/auth/stores/auth-store'
import { useState } from 'react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const registerUser = useAuthStore((s) => s.register)
  const isLoading = useAuthStore((s) => s.isLoading)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterFormData) => {
    setError('')
    try {
      await registerUser(data)
      navigate('/')
    } catch {
      setError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-emerald-600 to-emerald-800 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-10 w-10" />
          <span className="text-xl font-semibold">InnovateX</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight">Start your innovation journey</h1>
          <p className="mt-4 max-w-md text-emerald-100">
            Join thousands of students building, innovating, and launching from one platform.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <h2 className="text-2xl font-bold tracking-tight">Create account</h2>
          <p className="mt-2 text-muted-foreground">Join InnovateX as a student innovator</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium">First name</label>
                <Input id="firstName" {...register('firstName')} aria-invalid={!!errors.firstName} />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium">Last name</label>
                <Input id="lastName" {...register('lastName')} aria-invalid={!!errors.lastName} />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="you@university.edu" {...register('email')} />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="university" className="mb-2 block text-sm font-medium">University</label>
              <Input id="university" placeholder="Optional" {...register('university')} />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-emerald-600 hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
