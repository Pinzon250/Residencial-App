// Link para redireccionar a otros componentes
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthContext";
import { useNavigate } from "react-router-dom";

// Importacion de iconos
import {
  HomeIcon,
  CurrencyDollarIcon,
  DocumentArrowUpIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  ArrowLeftEndOnRectangleIcon,
  XMarkIcon,
  UsersIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
  FolderIcon,
  ChartPieIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";

// Secciones del sidebar
const secciones = [
  { nombre: "Inicio", icon: HomeIcon, to: "/home" },
  { nombre: "Pagos", icon: CurrencyDollarIcon, to: "/pagos" },
  { nombre: "Documentos", icon: DocumentArrowUpIcon, to: "/documentos" },
  { nombre: "Historial", icon: ClipboardDocumentListIcon, to: "/historial" },
  { nombre: "Novedades", icon: InformationCircleIcon, to: "/novedades" },
  { nombre: "Reservas", icon: PencilSquareIcon, to: "/reservas" },
];

const administrador = [
  { nombre: "Usuarios", icon: UsersIcon, to: "/usuarios" },
  { nombre: "Calendario", icon: CalendarDaysIcon, to: "/calendario" },
  { nombre: "Archivos", icon: FolderIcon, to: "/archivos" },
  { nombre: "Balance", icon: ChartPieIcon, to: "/balance" },
  { nombre: "Registros", icon: NewspaperIcon, to: "/registros" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed w-50 inset-y-0 left-0 lg:w-[250px] h-screen border-r border-gray-300/80 bg-zinc-800 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50 lg:translate-x-0 lg:static `}
    >
      <div className="flex items-center justify-between p-4 h-15 mb-2">
        {/* Mostrar la X solo si el sidebar está abierto */}
        {isOpen && (
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-white hover:text-zinc-500 transition cursor-pointer" />
          </button>
        )}
      </div>
      <div className="py-3 mx-5 border-t border-zinc-700">
        <h1 className="text-zinc-400 text-sm select-none">GENERAL</h1>
      </div>

      <nav>
        {secciones.map((item) => {
          const active = isActive(item.to);
          return (
          <Link
            key={item.nombre}
            to={item.to}
            className={`text-sm flex rounded-xl mx-2 my-1 items-center px-5 py-3 transition ${active ? "bg-zinc-700 text-orange-500" : "text-zinc-300 hover:text-orange-500 hover:bg-zinc-600"}`}
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.nombre}
          </Link>
          );
      })}
      </nav>


    {user?.role === "administrador" && (
      <>
      <div className= "py-3 border-t mx-5 mt-2 border-zinc-700">
        <h1 className="text-zinc-400 text-sm mt-1 select-none">
          ADMINISTRACION
        </h1>
      </div>
      <nav>
        {administrador.map((adm) => {
          const active = isActive(adm.to);
          return (
          <Link
            key={adm.nombre}
            to={adm.to}
            className={`text-sm flex rounded-xl mx-2 my-1 items-center px-5 py-3  transition ${active ? "bg-zinc-700 text-orange-500"
              : "text-zinc-300 hover:bg-zinc-600 hover:text-orange-500"
            }`}
          >
            <adm.icon className="h-5 w-5 mr-2" />
            {adm.nombre}
          </Link>
          )
        })}
      </nav>
      </>
    )}


      <div className="absolute bottom-16 w-full text-zinc-300 px-5 py-3 hover:text-orange-500 hover:bg-zinc-700 rounded-xl transition text-sm flex items-center cursor-pointer">
        <Cog8ToothIcon className="h-5 w-5 mr-2" />
        <span>Configuracion</span>
      </div>
      <div
        onClick={handleLogout}
        className="absolute bottom-1 w-full rounded-xl hover:bg-red-500 my-2 px-5 py-3 text-red-500 transition hover:text-red-100 text-sm flex items-center cursor-pointer"
      >
        <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2" />
        <span>Cerrar Sesión</span>
      </div>
    </div>
  );
}
