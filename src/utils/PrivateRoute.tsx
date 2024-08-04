import { Navigate, Outlet } from "react-router-dom";
import authenticateStore from "../store/authenticate.store"

export default function PrivateRoute() {
    const { isAuthenticated } = authenticateStore;

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}