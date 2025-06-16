import { Routes, Route } from "react-router-dom";
import "./App.css";

// Layouts
import Layout from "./layout/Layout";

// Autenticacion
import ProtectedRoute from "./hooks/auth/ProtectedRoute";
import CambiarContraseña from "./pages/auth/ChangePassword";
import Login from "./pages/auth/Login";
import PublicRoute from "./hooks/auth/PublicRoute";

// Paginas administrador
import Usuarios from "./pages/admin/Usuarios";
import Calendario from "./pages/admin/Calendario";
import Archivos from "./pages/admin/Archivos";
import Balance from "./pages/admin/Balance";
import Registros from "./pages/admin/Registros";

// Paginas
import Home from "./pages/Home";

// Modulos principales
import Pagos from "./pages/modules/Pagos";
import Documentos from "./pages/modules/Documentos";
import Historial from "./pages/modules/Historial";
import Novedades from "./pages/modules/Novedades";
import Reservas from "./pages/modules/Reservas";





function App() {
  return (
      <Routes>

        {/* Login */}
        <Route path="/" element={
          <PublicRoute>
            <Login />
          </PublicRoute>}/>

        {/* Cambiar contraseña */}
        <Route path="/cambiar-contraseña" element={
          <ProtectedRoute>
            <CambiarContraseña />
          </ProtectedRoute>}/>

{/*---------------- Modulos Generales ------------- */}

        {/* Home */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Layout><Home /></Layout>
        </ProtectedRoute>} />

        {/* Pagos */}
        <Route path="/pagos" element={
          <ProtectedRoute>
            <Layout><Pagos /></Layout>
        </ProtectedRoute>} />

        {/* Documentos */}
        <Route path="/documentos" element={
          <ProtectedRoute>
            <Layout><Documentos /></Layout>
        </ProtectedRoute>} />

        {/* Historial */}
        <Route path="/historial" element={
          <ProtectedRoute>
            <Layout><Historial /></Layout>
        </ProtectedRoute>} />

        {/* Novedades */}
        <Route path="/novedades" element={
          <ProtectedRoute>
            <Layout><Novedades /></Layout>
        </ProtectedRoute>} />

        {/* Reservas */}
        <Route path="/reservas" element={
          <ProtectedRoute>
            <Layout><Reservas /></Layout>
        </ProtectedRoute>} />


{/*---------------- Modulos Administradores ------------- */}

        {/* Usuarios : Administrador */}
        <Route path="/usuarios" element={
          <ProtectedRoute role="administrador">
            <Layout><Usuarios /></Layout>
        </ProtectedRoute>}/>

        {/* Calendario : Administrador */}
        <Route path="/calendario" element={
          <ProtectedRoute role="administrador">
            <Layout><Calendario /></Layout>
        </ProtectedRoute>}/>

        {/* Archivos : Administrador */}
        <Route path="/archivos" element={
          <ProtectedRoute role="administrador">
            <Layout><Archivos /></Layout>
        </ProtectedRoute>}/>

        {/* Balance : Administrador */}
        <Route path="/balance" element={
          <ProtectedRoute role="administrador">
            <Layout><Balance /></Layout>
        </ProtectedRoute>}/>

        {/* Registros : Administrador */}
        <Route path="/registros" element={
          <ProtectedRoute role="administrador">
            <Layout><Registros /></Layout>
        </ProtectedRoute>}/>




      </Routes>
  );
} 

export default App; 
