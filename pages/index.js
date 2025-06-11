import { useState } from "react";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function Home() {
  const [products, setProducts] = useState([
    { id: 1, name: "Товар 1", code: "1234567890123", quantity: 5 },
    { id: 2, name: "Товар 2", code: "9876543210987", quantity: 3 },
  ]);
  const [showScanner, setShowScanner] = useState(false);

  const handleScanSuccess = (code) => {
    const updated = products.map((p) =>
      p.code === code ? { ...p, quantity: p.quantity - 1 } : p
    );
    setProducts(updated);
    setShowScanner(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Склад</h1>
      <button
        onClick={() => setShowScanner(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        📷 Сканировать
      </button>

      {products.map((p) => (
        <div key={p.id} className="border p-2 mb-2 rounded">
          <div>{p.name}</div>
          <div>Штрихкод: {p.code}</div>
          <div>Остаток: {p.quantity}</div>
        </div>
      ))}

      {showScanner && (
        <BarcodeScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
