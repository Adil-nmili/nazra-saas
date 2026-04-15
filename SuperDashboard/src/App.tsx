import { RouterProvider } from "react-router-dom"
import Router from './Router'
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider } from "./context/AuthContext"



const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="Dashboard-theme">
      <AuthProvider>
        <RouterProvider router={Router}/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App