import { Navigate } from "react-router-dom";


const ProtectedRoute = ( {children, rol }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/" />;
    }

    if (rol && user?.cargo.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;