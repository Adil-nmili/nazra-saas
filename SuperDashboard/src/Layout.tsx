import { Outlet } from "react-router-dom"
import { AppSidebar } from "./components/app-sidebar"
import NavBar from "./components/partials/NavBar"
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar"

const Layout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset />
            <div className="min-h-screen w-screen overflow-x-hidden bg-slate-200 dark:bg-slate-800">
                <NavBar />
                <div className="overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Layout