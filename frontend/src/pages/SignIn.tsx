import { AuthForm } from "@/components/AuthForm"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative" data-testid="signin-page">
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white dark:bg-gray-100 rounded-lg p-4">
            <img 
              src="/DevSamuraiBanner.png" 
              alt="DevSamurai" 
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        <AuthForm mode="signin" />
      </div>
    </div>
  )
}
