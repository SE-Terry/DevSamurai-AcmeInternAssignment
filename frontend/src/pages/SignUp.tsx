import { AuthForm } from "@/components/AuthForm"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative" data-testid="signup-page">
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white dark:bg-gray-100 rounded-lg p-4 shadow-sm">
            <img 
              src="/DevSamuraiBanner.png" 
              alt="DevSamurai" 
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        <AuthForm mode="signup" />
        
        <div className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our{" "}
          <button className="underline hover:text-foreground">Terms of Use</button>{" "}
          and{" "}
          <button className="underline hover:text-foreground">Privacy Policy</button>.{" "}
          Need help?{" "}
          <button className="underline hover:text-foreground">Get in touch</button>.
        </div>
      </div>
    </div>
  )
}
