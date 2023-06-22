import React, { useEffect, useRef, useState } from "react";
import QrScan from "react-qr-reader";
import QrScanner from "qr-scanner";
import axios from "axios";

const ScanQR = () => {
  const [qrCode, setQRCode] = useState<string>("");
  const [qrFile, setQrFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setQrFile(file);

    if (file) {
      const result = await QrScanner.scanImage(file);
      setData(result);
    }
  };

  const updateStatus = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/attendee/update/${id}`,
        {
          status: "Attended",
        }
      );
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  console.log(data);

  useEffect(() => {
    if (data) {
      updateStatus(data);
    }
  }, [data]);

  const handleScan = (data: any) => {
    if (data) {
      setQRCode(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Scan your QR Code</h1>
        <button onClick={handleClick}>Click to upload QR Code</button>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={fileRef}
          style={{ display: "none" }}
        />
        {qrFile && <span>{data}</span>}
        or
        {!qrFile && (
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        )}
      </div>
    </div>
  );
};

export default ScanQR;
