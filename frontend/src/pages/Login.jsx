import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import axios from 'axios';

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        usuario,
        password
      });

      const data = response.data;

      localStorage.setItem("token", data.access_token);
      login({ id: data.id, usuario, cargo: data.cargo });

      if (data.must_change_password) {
        navigate("/cambiar-contraseña")
      } else {
        navigate("/home")
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Error al iniciar sesion")
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-300/30">
      <form 
      onSubmit={handleSubmit}
      className="flex-col w-sm m-auto bg-white p-8 border border-black/10 shadow-xl rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-orange-400"></div>
          <p className="font-bold pb-[2px]">Nombre del conjunto</p>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl font-semibold">¡Bienvenido de vuelta!</h1>
        </div>
        <p className="mt-4 text-sm">Breve descripcion sobre la residencia</p>
        <div className="mt-6">
            <input 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
            type="text"
            className="p-2 px-3 border-b-[2px] border-orange-300 focus:border-orange-500 w-full outline-none bg-white transition duration-300" />

            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="p-2 px-3 border-orange-300 border-b-[2px] w-full focus:border-orange-600 mt-3 outline-none transition duration-300"
            required 
            />
        </div>
        <button type="submit" className="place-items-center bg-orange-500 text-white text-sm h-10 rounded-md mt-10 px-5 w-full cursor-pointer hover:bg-orange-700 transition duration-200">
            Iniciar sesion  
        </button>
        {error && (
          <div className="text-red-500 text-sm font-bold my-4 text-center">{error}</div>
        )}
      </form>
    </div>
  );
}
