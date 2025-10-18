import { RouterProvider } from "react-router-dom"
import Router from './Router'
import { ThemeProvider } from "./components/theme-provider"



const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="Dashboard-theme">
    <RouterProvider  router={Router}/>
    </ThemeProvider>
  )
}

export default App