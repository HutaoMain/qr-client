import React, { useEffect, useRef, useState } from "react";
import QrScan from "react-qr-reader";
import QrScanner from "qr-scanner";
import axios from "axios";
import { attendeesInterface } from "../../types/Types";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ScanQR = () => {
  const [qrCode, setQRCode] = useState<string>("");
  const [qrFile, setQrFile] = useState<File | undefined>(undefined);
  const [eventId, setEventId] = useState("");
  const [attendeeInfo, setAttendeeInfo] = useState<attendeesInterface>();

  const fileRef = useRef<HTMLInputElement>(null);

  console.log(qrCode);

  useEffect(() => {
    if (eventId) {
      const fetch = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/attendee/${eventId}`
        );
        setAttendeeInfo(res.data);
      };
      fetch();
    }
  }, [eventId]);

  console.log("eto attendee info", attendeeInfo);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setQrFile(file);

    if (file) {
      const result = await QrScanner.scanImage(file);
      setEventId(result);
    }
  };

  const updateStatus = async (id: string) => {
    try {
      if (attendeeInfo?.status.trim() === "pre-registered".trim()) {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/attendee/update/${id}`,
          {
            status: "Attended",
            timeIn: dayjs().format("hh:mm A"),
          }
        );
        toast("Successful time in from the event!", {
          type: "success",
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else if (attendeeInfo?.status.trim() === "Attended") {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/attendee/update/${id}`,
          {
            timeOut: dayjs().format("hh:mm A"),
          }
        );
        toast("Successful time out from the event!", {
          type: "success",
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  console.log(eventId);

  // useEffect(() => {
  //   if (eventId) {
  //     updateStatus(eventId);
  //   }
  // }, [eventId]);

  const handleSubmit = () => {
    if (eventId) {
      updateStatus(eventId);
    }
  };

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
        {eventId ? (
          <>
            <button onClick={handleSubmit}>Submit QR Code</button>
          </>
        ) : (
          <button onClick={handleClick}>Click to upload QR Code</button>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={fileRef}
          style={{ display: "none" }}
        />
        {qrFile && <span>{eventId}</span>}
        {!eventId && <span>or</span>}
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
