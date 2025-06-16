import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CambiarContraseña() {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (nueva !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/change_password`,
        {
          id: user.id,
          current_password: actual,
          new_password: nueva,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("¡Contraseña cambiada exitosamente!");
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail[0].msg); // muestra solo el primer mensaje
      } else if (typeof detail === "string") {
        setError(detail);
      } else {
        setError("Error al cambiar la contraseña");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
          Cambiar contraseña
        </h2>

        {msg && <p className="text-green-600 text-sm mb-4">{msg}</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}


        <input
          type="password"
          value={actual}
          onChange={(e) => setActual(e.target.value)}
          placeholder="Contraseña actual"
          className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-orange-500 mb-4"
          required
        />

        <input
          type="password"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-orange-500 mb-4"
          required
        />

        <input
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="Confirmar nueva contraseña"
          className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-orange-500 mb-6"
          required
        />

        <button
          type="submit"
          className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-700 transition"
        >
          Confirmar cambio
        </button>
      </form>
    </div>
  );
}
