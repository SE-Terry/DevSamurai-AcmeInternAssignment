"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"

const getAuthSchema = (isSignUp: boolean) => z.object({
  name: isSignUp 
    ? z.string().min(2, { message: "Name must be at least 2 characters" })
    : z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

type AuthFormData = z.infer<ReturnType<typeof getAuthSchema>>

interface AuthFormProps {
  mode: "signin" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup"
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (data.email === "error@example.com") {
        throw new Error("Invalid credentials")
      }

      console.log("Auth successful:", data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="px-0 h-auto"
                        onClick={() => console.log("Forgot password clicked")}
                      >
                        Forgot password?
                      </Button>
                    ) : (
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 h-auto invisible"
                        disabled
                      >
                        Forgot password?
                      </Button>
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
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-primary-foreground" disabled={isLoading}>
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


