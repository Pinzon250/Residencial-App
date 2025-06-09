import { Routes, Route } from "react-router-dom";
import "./App.css";

// Layouts
import Layout from "./layout/Layout";

// Autenticacion
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CambiarContraseña from "./pages/ChangePassword";
import Login from "./pages/Login";
import PublicRoute from "./components/auth/PublicRoute";

// Paginas administrador
import Usuarios from "./pages/admin/Usuarios";

// Paginas
import Home from "./pages/Home";




function App() {
  return (
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/cambiar-contraseña" element={<ProtectedRoute><CambiarContraseña /></ProtectedRoute>}/>
        <Route path="/usuarios" element={<ProtectedRoute><Layout><Usuarios /></Layout></ProtectedRoute>}/>
      </Routes>
  );
} 

export default App; 
