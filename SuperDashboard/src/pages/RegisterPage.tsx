import { RegisterForm } from "@/components/register-form"

const RegisterPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-900">
      <RegisterForm className="mx-auto w-full max-w-4xl" />
    </div>
  )
}

export default RegisterPage
