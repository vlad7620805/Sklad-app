
import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Товар 1", sku: "A001", barcode: "1234567890123", quantity: 10 },
  { id: 2, name: "Товар 2", sku: "A002", barcode: "9876543210987", quantity: 5 },
];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [message, setMessage] = useState("");

  const handleWriteOff = () => {
    const index = products.findIndex((p) => p.barcode === barcodeInput);
    if (index === -1) {
      setMessage("Товар со штрихкодом не найден");
      return;
    }
    if (products[index].quantity <= 0) {
      setMessage("Нет товара на складе для списания");
      return;
    }

    const updated = [...products];
    updated[index].quantity -= 1;
    setProducts(updated);
    setMessage(`Списан 1 шт. товара: ${updated[index].name}`);
    setBarcodeInput("");
  };

  const updateProduct = (id, field, value) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, [field]: field === "quantity" ? Number(value) : value } : p
    );
    setProducts(updated);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Складское приложение</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>Сканирование штрихкода</h2>
        <input
          type="text"
          placeholder="Введите штрихкод"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          style={{ fontSize: 18, padding: 8, width: "100%" }}
        />
        <button onClick={handleWriteOff} style={{ marginTop: 8, fontSize: 18, width: "100%" }}>
          Списать товар
        </button>
        {message && <p style={{ marginTop: 10, color: "green" }}>{message}</p>}
      </section>

      <section>
        <h2>Список товаров</h2>
        {products.map(({ id, name, sku, barcode, quantity }) => (
          <div
            key={id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => updateProduct(id, "name", e.target.value)}
              style={{ fontSize: 18, marginBottom: 6 }}
            />
            <small>Артикул: {sku}</small>
            <small>Штрихкод: {barcode}</small>
            <input
              type="number"
              value={quantity}
              onChange={(e) => updateProduct(id, "quantity", e.target.value)}
              style={{ fontSize: 18, marginTop: 6, width: 80 }}
              min={0}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
