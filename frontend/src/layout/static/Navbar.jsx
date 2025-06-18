import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Navbar({ setIsOpen, isOpen }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const usuario = JSON.parse(
    localStorage.getItem("user") || { nombres: "Usuario" }
  );

  return (
    <header className="flex items-center bg-white justify-between z-50 relative py-3 border-b border-gray-300/80 h-15">
      {/* Boton 3 barras */}
      <div className="flex items-center ml-3 space-x-3">
        {!isOpen && (
        <button className="lg:hidden" onClick={() => setIsOpen(true)}>
          <Bars3BottomLeftIcon className="h-7 w-7 hover:text-zinc-500 transition cursor-pointer" />
        </button>
        )}
        <span className="text-xl font-semibold text-orange-500">
          
        </span>

      </div>

      {/* iconos y usuario */}
      <div className="mr-4 flex items-center gap-6">
        {/* Notificaciones */}
        <div className="relative cursor-pointer">
          <BellIcon className="h-6 w-6 text-orange-500" />
        </div>

        {/* Menu usuario */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 focus:outline-none cursor-pointer"
          >
            <span className="text-lg font-medium text-zinc-700">
              {usuario.usuario}
            </span>
            <UserCircle size={36} className="text-orange-500" />
          </button>
        </div>
      </div>

      {/* Menu desplegable */}
      {menuOpen && (
        <div className="absolute right-0 mt-30 w-50 px-1 bg-orange-600 shadow-lg rounded-md py-1 z-50">
          <button
            onClick={() => navigate("/perfil")}
            className="block px-4 py-2 rounded-xl cursor-pointer text-md transition text-zinc-100 hover:text-zinc-200 w-full text-left"
          >
            Ver Perfil
          </button>
        </div>
      )}
    </header>
  );
}