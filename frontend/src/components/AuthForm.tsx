"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authService } from "@/services/authService"

const getAuthSchema = (isSignUp: boolean) => z.object({
  name: isSignUp 
    ? z.string().min(2, { message: "Name must be at least 2 characters" })
    : z.string().optional(),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

type AuthFormData = z.infer<ReturnType<typeof getAuthSchema>>

interface AuthFormProps {
  mode: "signin" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup"
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(getAuthSchema(isSignUp)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = isSignUp 
        ? await authService.signUp(data as { name: string; email: string; password: string })
        : await authService.signIn({ email: data.email, password: data.password })

      if (isSignUp) {
        setSuccess("Account created successfully! Please sign in to continue.")        
        // Navigate to sign-in page after successful registration
        setTimeout(() => {
          navigate('/auth/sign-in')
        }, 1500)
      } else {
        authService.setToken(result.access_token)
        authService.setUser(result.user)
        
        setSuccess("Welcome back!")
        
        // Navigate to dashboard after successful sign-in
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
      
    } catch (err: any) {
      let errorMessage = "An unexpected error occurred"
      
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err?.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-border/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {isSignUp ? "Enter your details to create your account." : "Welcome back! Please sign in to continue."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                data-testid={isSignUp ? "signup-form" : "signin-form"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault()
                    if (!isLoading) {
                      form.handleSubmit(onSubmit)()
                    }
                  }
                }}
              >
            {isSignUp && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your full name"
                          className="pl-10"
                          disabled={isLoading}
                          data-testid="name-input"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        disabled={isLoading}
                        data-testid="email-input"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {!isSignUp ? (
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline px-0 h-auto opacity-50 disabled-cursor"
                        disabled
                        onClick={() => console.log("Forgot password clicked")}
                      >
                        Forgot password?
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-sm text-primary px-0 h-auto invisible disabled-cursor"
                        disabled
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-12"
                        disabled={isLoading}
                        data-testid="password-input"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        data-testid="password-toggle-btn"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full text-primary-foreground" 
              disabled={isLoading}
              data-testid={isSignUp ? "signup-btn" : "signin-btn"}
            >
              {isLoading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link to={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}>
            <Button
              type="button"
              variant="link"
              size="sm"
              className="px-1 h-auto"
              disabled={isLoading}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthForm


