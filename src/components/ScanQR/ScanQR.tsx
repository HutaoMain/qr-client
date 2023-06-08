import QrScan from "react-qr-reader";
import { useState } from "react";

const ScanQR = () => {
  const [qrCode, setQRCode] = useState<string>("");
  const handleScan = (data: any) => {
    if (data) {
      setQRCode(data);
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <>
      <QrScan
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ height: 240, width: 320 }}
      />
    </>
  );
};

export default ScanQR;
