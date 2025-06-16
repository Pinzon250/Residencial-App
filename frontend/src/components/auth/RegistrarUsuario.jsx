import { useState } from "react";
import axios from "axios";

export default function RegistrarUsuario({ setMessage, message }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    documento: "",
    torre: "",
    apartamento: "",
    cargo: "residente",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPassword = (length = 10) => {
    const caracteres =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let contraseña = "";
    for (let i = 0; i < length; i++) {
      contraseña += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return contraseña;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposRequeridos = [
      "nombres",
      "apellidos",
      "correo",
      "telefono",
      "documento",
      "torre",
      "apartamento",
      "cargo",
    ];

    const algunVacio = camposRequeridos.some((campo) => !form[campo]);

    if (algunVacio) {
      setMessage({
        type: "error",
        text: "Por favor, completa todos los campos requeridos.",
      });
      return;
    }

    const nombreUsuario = `T${form.torre}_A${form.apartamento}`;
    const passwordTemporal = generarPassword();
    const creador = JSON.parse(localStorage.getItem("usuario"));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        {
          usuario: nombreUsuario,
          password: passwordTemporal,
          nombres: form.nombres,
          apellidos: form.apellidos,
          correo: form.correo,
          telefono: form.telefono,
          documento: form.documento,
          torre: form.torre,
          apartamento: form.apartamento,
          cargo: form.cargo,
          creado_por: creador?.usuario || "admin",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          "Content-Type": "application/json",
        }
      );

      setMessage({
        type: "success",
        text: `\nUsuario: ${nombreUsuario}\nContraseña: ${passwordTemporal}`,
      });
      setTimeout(() => setMessage(null), 100000);

      setForm({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        documento: "",
        torre: "",
        apartamento: "",
        cargo: "residente",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error al registrar el usuario. Por favor, intenta mas tarde.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-8 py-2 border-t border-gray-300 bg-owhite"
    >
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3 row-start-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombres
          </label>
          <input
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="col-span-3 col-start-4 row-start-2">
          <label className="block text-sm font-medium text-gray-700">
            Apellidos
          </label>
          <input
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="col-span-2 row-start-3">
          <label className="block text-sm font-medium text-gray-700">
            Torre
          </label>
          <select
            name="torre"
            value={form.torre}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          >
            <option value="">Seleccionar</option>
            <option value="1">Torre 1</option>
            <option value="2">Torre 2</option>
            <option value="3">Torre 3</option>
            <option value="4">Torre 4</option>
            <option value="5">Torre 5</option>
            <option value="6">Torre 6</option>
            <option value="7">Torre 7</option>
          </select>
        </div>

        <div className="col-span-2 col-start-3 row-start-3">
          <label className="block text-sm font-medium text-gray-700">
            Apartamento
          </label>
          <select
            name="apartamento"
            value={form.apartamento}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          >
            <option value="">Seleccionar</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="201">201</option>
            <option value="202">202</option>
            <option value="203">203</option>
            <option value="204">204</option>
          </select>
        </div>

        <div className="col-span-2 col-start-5 row-start-3">
          <label className="block text-sm font-medium text-gray-700">
            Cargo
          </label>
          <select
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          >
            <option value="residente">Residente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <div className="col-span-6 col-start-1 row-start-4">
          <label className="block text-sm font-medium text-gray-700">
            Correo
          </label>
          <input
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="col-span-3 col-start-1 row-start-6">
          <label className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="col-span-3 col-start-4 row-start-6">
          <label className="block text-sm font-medium text-gray-700">
            Documento
          </label>
          <input
            name="documento"
            value={form.documento}
            onChange={handleChange}
            className="h-11 w-full mt-1 rounded-lg border appearance-none px-4 py-2.5 text-md shadow placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-white text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20"
            required
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 mb-5 rounded hover:bg-orange-600 transition"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}
