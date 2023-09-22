import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { attendeesInterface } from "../../types/Types";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ScanQR = () => {
  const [eventId, setEventId] = useState("");
  const [attendeeInfo, setAttendeeInfo] = useState<attendeesInterface>();

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

  const handleSendSMS = async (message: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/send-sms`, {
        // phoneNumber: attendeeInfo?.phoneNumber,
        phoneNumber: "+639669917664",
        message: message,
      });
      console.log("success");
    } catch (error) {
      console.log(error);
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
        await handleSendSMS(
          `GSCI CEBU ADVISORY: ${(<br />)} This is to inform that ${
            attendeeInfo.attendeeFirstName
          } ${attendeeInfo.attendeeLastName}, has TIME-IN in ${
            attendeeInfo.eventName
          }. Time and Date: ${dayjs(new Date()).format("DD/MM/YYYY HH:mma")} `
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
      } else if (attendeeInfo?.status.trim() === "Attended") {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/attendee/update/${id}`,
          {
            timeOut: dayjs().format("hh:mm A"),
          }
        );
        await handleSendSMS(
          `GSCI CEBU ADVISORY: ${(<br />)} This is to inform that ${
            attendeeInfo.attendeeFirstName
          } ${attendeeInfo.attendeeLastName}, has TIME-OUT in ${
            attendeeInfo.eventName
          }. Time and Date: ${dayjs(new Date()).format("DD/MM/YYYY HH:mma")} `
        );
        toast("Successful time out from the event!", {
          type: "success",
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSubmit = () => {
    if (eventId) {
      updateStatus(eventId);
    }
  };

  const handleScan = (data: any) => {
    console.log(data);
    // setEventId(data);
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  useEffect(() => {
    // create a configuration object for Html5QrcodeScanner
    const config = {
      fps: 10,
      qrbox: 250,
      aspectRatio: 1,
      disableFlip: false,
    };
    // create a new instance of Html5QrcodeScanner
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-code-scanner",
      config,
      false
    );
    // render the scanner with the callbacks
    html5QrcodeScanner.render(handleScan, handleError);
    // clear the scanner when the component unmounts
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner.", error);
      });
    };
  }, []);

  console.log();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
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
        <p>To upload your QR code, select "Scan an image file".</p>
        <div id="qr-code-scanner" />

        {eventId && (
          <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
            Submit QR Code
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
