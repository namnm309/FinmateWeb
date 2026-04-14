import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-svh flex items-center justify-center p-6 bg-background">
      <SignIn routing="path" />
    </div>
  )
}

