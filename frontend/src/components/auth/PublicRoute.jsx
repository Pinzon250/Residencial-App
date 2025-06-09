import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function PublicRoute({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (token) {
        let message = null;
        if (location.pathname === "/") {
            message = "Ya haz iniciado sesion"
    }

    return (<Navigate to="/home" replace state={{ message }} />);
    }

    return children;
}

export default PublicRoute;