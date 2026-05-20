import { Navigate, Outlet } from "react-router"

export const PrivateRoute = () => {
    const token = localStorage.getItem("access_token")
    return token ? <Outlet /> : <Navigate to="/login" replace />
}