import { useEffect, useState } from "react";
import axios from "axios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsuarios(res.data);
    } catch (err) {
      setError("Error al cargar usuarios");
    }
  };

  const resetearContraseña = async (id) => {
    if (!confirm("¿Estás seguro de resetear la contraseña?")) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}/reset_password`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Nueva contraseña temporal: " + res.data.contraseña_temporal);
    } catch (err) {
      alert("Error al resetear contraseña");
    }
  };

  const cambiarEstado = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}/toggle_state`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      obtenerUsuarios();
    } catch {
      alert("Error al cambiar el estado del usuario");
    }
  };

  const totalPaginas = Math.ceil(usuarios.length / porPagina);
  const usuariosPaginados = usuarios.slice((pagina - 1) * porPagina, pagina * porPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      obtenerUsuarios();
    } catch {
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <div className="p-8">
    <div className="justify-between flex flex-col">
      <h1 className="text-3xl font-bold mb-5 text-orange-600">Gestión de Usuarios</h1>
      {/* <button className="text-white font-bold cursor-pointer hover:bg-green-600 transition w-40 p-2 rounded-xl bg-green-500"> Añadir usuario    
      </button> */}
      {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="overflow-x-auto">
      <h1 className="text-xl px-5 py-4 font-semibild text-orange-600 border-t border-x rounded-t-xl border-gray-300">Tabla de usuarios</h1>
        <table className="min-w-full mx-auto bg-white border-x border-y rounded-y border-gray-300  border-gray-300/80 px-5 py-2">
          <thead className="bg-zinc-100 rounded-xl text-gray-700">
            <tr>
              <th className="py-2    px-4 ">ID</th>
              <th className="py-2 px-4 ">Documento</th>
              <th className="py-2 px-4 ">Nombre</th>
              <th className="py-2 px-4 ">Telefono</th>
              <th className="py-2 px-4 ">Correo</th>
              <th className="py-2 px-4 ">Torre</th>
              <th className="py-2 px-4 ">Apartamento</th>
              <th className="py-2 px-4 ">Estado</th>
              <th className="py-2 px-4 ">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="p-4 ">{user.id}</td>
                <td className="p-4 ">{user.documento}</td>
                <td className="p-4 ">{user.nombres} {user.apellidos}</td>
                <td className="p-4 ">{user.telefono}</td>
                <td className="p-4 ">{user.correo}</td>
                <td className="p-4 ">{user.torre}</td>
                <td className="p-4 ">{user.apartamento}</td>
                <td className="p-4 ">
                  <span className={user.estado ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {user.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2 justify-center">
                  <button onClick={() => resetearContraseña(user.id)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded">Resetear</button>
                  <button onClick={() => cambiarEstado(user.id)} className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Estado</button>
                  <button onClick={() => eliminarUsuario(user.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* PAGINACIÓN */}
        <div className="border-x border-b rounded-b-xl border-gray-300/80 px-4 py-2 flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Mostrando {(pagina - 1) * porPagina + 1} a{" "}
            {Math.min(pagina * porPagina, usuarios.length)} de {usuarios.length} registros
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1}
              className="px-2 py-1 text-gray-600 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPaginas)].map((_, index) => (
              <button
                key={index}
                onClick={() => cambiarPagina(index + 1)}
                className={`px-3 py-1 border rounded ${pagina === index + 1 ? "bg-blue-600 text-white" : "text-gray-700"}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => cambiarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="px-2 py-1 text-gray-600 border rounded disabled:opacity-50"
            >
              Next
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
