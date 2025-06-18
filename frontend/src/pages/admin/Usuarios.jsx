import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowPathIcon,
  TrashIcon,
  PresentationChartBarIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

import RegistrarUsuario from "../../components/auth/RegistrarUsuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;
  const [busqueda, setBusqueda] = useState("");
  const [filtroTorre, setFiltroTorre] = useState("");
  const [filtroApartamento, setFiltroApartamento] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsuarios(res.data);
    } catch (err) {
      setError("Error al cargar usuarios");
    }
  };

  const resetearContraseña = async (id) => {
    if (!confirm("¿Estás seguro de resetear la contraseña?")) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/${id}/reset_password`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Nueva contraseña temporal: " + res.data.contraseña_temporal);
    } catch (err) {
      alert("Error al resetear contraseña");
    }
  };

  const cambiarEstado = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/${id}/toggle_state`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      obtenerUsuarios();
    } catch {
      alert("Error al cambiar el estado del usuario");
    }
  };

  const usuariosFiltrados = usuarios
    .filter((user) => {
      const texto =
        `${user.nombres} ${user.apellidos} ${user.correo} ${user.telefono} ${user.documento}`.toLowerCase();
      return texto.includes(busqueda.toLowerCase());
    })
    .filter((user) => (filtroTorre ? user.torre === filtroTorre : true))
    .filter((user) => {
      if (!filtroEstado) return true;
      return filtroEstado === "activo" ? user.estado : !user.estado;
    })
    .filter((user) =>
      filtroApartamento ? user.apartamento === filtroApartamento : true
    );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / porPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      obtenerUsuarios();
    } catch {
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <div className="p-8 bg-gray-100/45">
      <div className="justify-between flex mb-5">
        <h1 className="text-3xl font-bold text-orange-600 ">
          Gestión de Usuarios
        </h1>
        {error && (
          <div className="peer-invalid:block">
            <div className="border rounded-xl px-4 py-2 bg-red-100 border-red-200 w-60 m-auto justify-center my-3 flex items-center gap-1">
              <div className="w-4 fill-rose-500">
                <svg
                  viewBox="0 0 24 24"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM13,5H11V15h2Zm0,12H11v2h2Z"></path>
                </svg>
              </div>
              <p className="Capitalize font-medium text-rose-500">{error}</p>
            </div>
          </div>
        )}
        <button
  title="Add New"
  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
    className="stroke-lime-400 fill-none group-hover:fill-lime-700 group-active:stroke-lime-200 group-active:fill-lime-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      strokeWidth="1.5"
    ></path>
    <path d="M8 12H16" strokeWidth="1.5"></path>
    <path d="M12 16V8" strokeWidth="1.5"></path>
  </svg>
</button>
      </div>

      <div className="overflow-x-auto">
        <h1 className="flex text-xl px-5 py-4 font-semibild text-orange-600 border-t border-x bg-white rounded-t-xl border-gray-300">
          Tabla de usuarios
        </h1>
        {/* Barra de busqueda y filtros */}
        <div className="flex flex-wrap gap-4 px-5 py-2 bg-white border-x border-gray-300 items-center">
          <input
            type="text"
            placeholder="Buscar por nombre, correo, documento..."
            className="border border-gray-300 rounded px-4 py-2 flex-1"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="border border-gray-300 rounde px-3 py-2"
            value={filtroTorre}
            onChange={(e) => setFiltroTorre(e.target.value)}
          >
            <option value="" className="text-gray-200">
              Torre
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>

          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={filtroApartamento}
            onChange={(e) => setFiltroApartamento(e.target.value)}
          >
            <option value="">Apartamentos</option>
            <option value="101">101</option>
            <option value="102">102</option>
          </select>
        </div>

        <table className="min-w-full mx-auto bg-white border-x border-y rounded-y border-gray-300 px-5 py-2 ">
          <thead className="bg-zinc-200 rounded-xl text-gray-700">
            <tr>
              <th className="py-2 px-4 ">Documento</th>
              <th className="py-2 px-4 ">Nombre</th>
              <th className="py-2 px-4 ">Telefono</th>
              <th className="py-2 px-4 ">Correo</th>
              <th className="py-2 px-4 ">Torre</th>
              <th className="py-2 px-4 ">Apartamento</th>
              <th className="py-2 px-4 ">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="p-4 text-sm">{user.documento}</td>
                <td className="p-4 text-sm">
                  {user.nombres} {user.apellidos}
                </td>
                <td className="p-4 text-sm">{user.telefono}</td>
                <td className="p-4 text-sm">{user.correo}</td>
                <td className="p-4 text-sm">{user.torre}</td>
                <td className="p-4 text-sm">{user.apartamento}</td>
                <td className="py-2 px-4 flex gap-2 justify-center">
                  <ArrowPathIcon
                    onClick={() => resetearContraseña(user.id)}
                    className="text-sm text-blue-500 px-2 py-1 w-9 h-9 rounded hove:text-blue-400 transition cursor-pointer hover:scale-105"
                  >
                    Resetear
                  </ArrowPathIcon>

                  <PresentationChartBarIcon
                    onClick={() => cambiarEstado(user.id)}
                    className=" text-yellow-500 px-2 py-1 w-9 h-9 rounded hover:text-yellow-400 transition cursor-pointer hover:scale-105"
                  >
                    Estado
                  </PresentationChartBarIcon>

                  <TrashIcon
                    onClick={() => eliminarUsuario(user.id)}
                    className="text-sm text-red-500 px-2 py-1 rounded w-9 h-9 hover:text-red-400 transition cursor-pointer hover:scale-105"
                  >
                    Eliminar
                  </TrashIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* PAGINACIÓN */}
        <div className="border-x border-b bg-white rounded-b-xl border-gray-300/80 px-4 py-2 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Mostrando {(pagina - 1) * porPagina + 1} a{" "}
            {Math.min(pagina * porPagina, usuarios.length)} de {usuarios.length}{" "}
            registros
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1}
              className="px-2 py-1 text-gray-600 border cursor-pointer border-gray-300/80 rounded disabled:opacity-50 flex"
            >
              <ArrowLongLeftIcon className="h-5 w-7" />
            </button>

            {[...Array(totalPaginas)].map((_, index) => (
              <button
                key={index}
                onClick={() => cambiarPagina(index + 1)}
                className={`px-3 py-1 border border-gray-300/80 cursor-pointer rounded ${
                  pagina === index + 1
                    ? "bg-orange-600 text-white"
                    : "text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => cambiarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="px-2 py-1 text-gray-600 border border-gray-300/80 cursor-pointer rounded disabled:opacity-50 flex"
            >
              <ArrowLongRightIcon className="h-5 w-7" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-4 mt-20 border border-gray-300/80 rounded-xl bg-white">
            <h1 className="text-xl p-4 font-medium   text-orange-600 ">
              Registrar usuario
            </h1>
            <RegistrarUsuario setMessage={setMessage} />
          </div>
          <div className="col-span-2 bg-white rounded-xl border-gray-300 border mt-20">
            <div className="p-4 text-center border-gray-300 border-b">
              <h1 className="font-medium text-xl text-orange-600">
                Estado del usuario registrado
              </h1>
            </div>
            <div className="p-10">
              {message && message.type === "success" && (
                <div className="text-center bg-white p-6 mt-4 rounded-xl shadow-md border border-green-400">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-500 rounded-full p-3">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-green-800 mb-2">
                    ¡Usuario creado exitosamente!{" "}
                  </h2>
                  <p className="text-gray-700 mb-4">Datos generados:</p>
                  <div className="text-gray-800 font-mono">
                    {message.text.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <button
                    onClick={() => setMessage(null)}
                    className="mt-6 bg-green-500 text-white p-3 h-10 font-semibold transition cursor-pointer hover:bg-green-600 rounded-lg py-1 w-20"
                  >
                    Cerrar
                  </button>
                </div>
              )}
              {message && message.type === "error" && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-semibold">
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
