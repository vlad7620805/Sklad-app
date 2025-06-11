import dynamic from 'next/dynamic';

const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  { ssr: false }
);

export default function BarcodeScanner({ onDetected }) {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <BarcodeScannerComponent
        width="100%"
        height="100%"
        onUpdate={(err, result) => {
          if (result) onDetected(result.text);
        }}
      />
    </div>
  );
}
