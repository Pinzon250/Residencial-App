// Link para redireccionar a otros componentes
import { Link } from "react-router-dom"
import { useAuth } from '../../hooks/AuthContext';
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
    ChartPieIcon
} from '@heroicons/react/24/solid'

// Secciones del sidebar
const secciones = [
    { nombre: 'Inicio', icon: HomeIcon, to: '/home'},
    { nombre: 'Pagos', icon: CurrencyDollarIcon, to: '/' },
    { nombre: 'Documentos', icon: DocumentArrowUpIcon, to: '/' },
    { nombre: 'Historial', icon: ClipboardDocumentListIcon, to: '/' },
    { nombre: 'Novedades', icon: InformationCircleIcon, to: '/novedades'},
    { nombre: 'Reservas', icon: PencilSquareIcon, to: '/reservas'},
]

const administrador = [
    { nombre: 'Usuarios', icon: UsersIcon, to: '/usuarios'},
    { nombre: 'Calendario', icon: CalendarDaysIcon, to: '/calendario'},
    { nombre: 'Archivos', icon: FolderIcon, to: '/Archivos'},
    { nombre: 'Balance', icon: ChartPieIcon, to: '/Balance'}
]


export default function Sidebar({ isOpen, setIsOpen }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/")
    };

    return (
        <div className={`fixed w-50 inset-y-0 left-0 lg:w-[290px] h-screen border-r border-gray-300/80 bg-zinc-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50 lg:translate-x-0 lg:static `}>
            <div className="flex items-center justify-between p-4 h-15 mb-2">
  {/* Mostrar la X solo si el sidebar está abierto */}
  {isOpen && (
    <button className="lg:hidden" onClick={() => setIsOpen(false)}>
      <XMarkIcon className="h-6 w-6 text-white" />
    </button>
  )}
</div>
            <div className="py-3 px-4">
                <h1 className="text-zinc-400 text-sm select-none">GENERAL</h1>

            </div>
            <nav className="">
                {secciones.map((item) => (
                    <Link 
                      key={item.nombre}
                      to={item.to}
                      className="text-sm flex rounded-xl mx-2 my-1 items-center text-zinc-300 hover:bg-zinc-700 px-5 py-3 hover:text-orange-500 transition"
                      >
                    <item.icon className="h-5 w-5 mr-2"/>
                    {item.nombre}
                    </Link>
                ))}
            </nav>

            <div className="text-zinc-500 px-4 py-3 border-t mt-2 border-zinc-700">
                <h1 className="text-zinc-400 text-sm mt-1 select-none">
                    ADMINISTRACION
                </h1> 
            </div>
            <nav className="">
                {administrador.map((adm) => (
                    <Link
                    key={adm.nombre}
                    to={adm.to}
                    className="text-sm flex rounded-xl mx-2 items-center text-zinc-300 hover:bg-zinc-700 px-5 py-3 hover:text-orange-500 transition">
                    <adm.icon className="h-5 w-5 mr-2"/>
                    {adm.nombre}
                    </Link>
                )) }
            </nav>
            <div className="absolute bottom-16 w-full text-zinc-300 px-5 py-3 hover:text-orange-500 hover:bg-zinc-700 rounded-xl transition text-sm flex items-center cursor-pointer">
                <Cog8ToothIcon className="h-5 w-5 mr-2"/>
                <span>Configuracion</span>
            </div>
            <div 
            onClick={handleLogout}
            className="absolute bottom-1 w-full rounded-xl hover:bg-red-500 my-2 px-5 py-3 text-red-500 transition hover:text-red-100 text-sm flex items-center cursor-pointer">
                <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2"/>
                <span>Cerrar Sesión</span>
            </div>
        </div>
    );
}
