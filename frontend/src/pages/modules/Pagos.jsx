import { useState } from "react";

export default function Pagos() {
  const [concepto, setConcepto] = useState("");
  const [valor, setValor] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleWompiPago = () => {
    if (!concepto || !valor) {
      return setMensaje("Por favor completa todos los campos");
    }

    const valorCentavos = parseInt(valor) * 100;
    const referencia = `residencia_${Date.now()}`;

    const redirectURL = `https://checkout.wompi.co/p/?public-key=pub_test_5DxzM8B5D6t8JY1EcwrmR3vUCGCyyEC3&currency=COP&amount-in-cents=${valorCentavos}&reference=${referencia}&redirect-url=http://localhost:3000/pago-exitoso`;

    window.location.href = redirectURL;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Realizar Pago</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleWompiPago();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-gray-600">Concepto:</label>
          <select
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecciona un concepto</option>
            <option value="administracion">Administración</option>
            <option value="parqueadero">Parqueadero</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Valor (COP):</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Ej: 85000"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ir a pagar con Wompi
        </button>

        {mensaje && <p className="text-center mt-4 text-sm text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
}
