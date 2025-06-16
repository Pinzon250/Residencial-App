import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ( {children, role }) => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    if (!token || !user) {
        return <Navigate to= "/" />;
    }

    if (role && user.role !== role.toLowerCase()) {
        return <Navigate to="/home" />
    }

    return children;
}

export default ProtectedRoute;