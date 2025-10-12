import { LoginForm } from "@/components/login-form"

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-900">
      <LoginForm className="mx-auto w-full max-w-2xl" />
    </div>
  )
}

export default LoginPage
