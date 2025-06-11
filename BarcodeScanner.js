// components/BarcodeScanner.js
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export default function BarcodeScanner({ onScanSuccess, onClose }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 300, height: 200 },
    });

    scanner.render(
      (decodedText) => {
        scanner.clear().then(() => onScanSuccess(decodedText));
      },
      (errorMessage) => {
        // Можно логировать ошибки, но не обязательно
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50 p-4">
      <div id="reader" />
      <button onClick={onClose} className="mt-4 bg-gray-200 px-4 py-2 rounded">
        Закрыть
      </button>
    </div>
  );
}
