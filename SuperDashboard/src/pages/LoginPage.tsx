import { LoginForm } from "@/components/login-form"

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[url(/assets/Blue Contemplation Silhouette.png)] bg-center bg-no-repeat bg-cover" >
      <LoginForm className="mx-auto w-full max-w-2xl " />
      
    </div>
  )
}

export default LoginPage
