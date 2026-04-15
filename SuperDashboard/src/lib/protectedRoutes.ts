import { useAuth } from "@/context";

export const protectedRoutes = (route: string) => {
  const { isAuthenticated } = useAuth();
    const publicRoutes = ["/login", "/register"];
    if (!isAuthenticated && !publicRoutes.includes(route)) {
        
        return false; // Not authenticated, access denied
    }
    return true; // Authenticated or public route, access granted
};