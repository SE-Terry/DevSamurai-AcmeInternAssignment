import { AuthForm } from "@/components/AuthForm"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
              <span className="text-background font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Acme</span>
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
