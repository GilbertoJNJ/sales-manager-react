import { Navigate, Outlet } from "react-router-dom";
import authenticateStore from "../store/authenticate.store"

const PrivateRoute = () => {
    const {isAuthenticated} = authenticateStore;

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoute;