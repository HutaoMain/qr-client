import { useState } from "react";
// import { registrationInterface } from "../../types/Types";
import axios from "axios";
import QRCode from "qrcode.react";
import QrScan from "react-qr-reader";

const Registration = () => {
  const [qrCode, setQRCode] = useState<string>("");

  const handleScan = (data: any) => {
    if (data) {
      setQRCode(data);
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };

  const onChangeHandler = () => {
    // const { value, name } = event.target;
    // setRegistrationInfo((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        {}
      );
      setQRCode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadQRCode = () => {
    const canvas = document.getElementById(
      "qrcode-canvas"
    ) as HTMLCanvasElement;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div>
      <h2>Event Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          // value={registrationInfo.firstName}
          onChange={onChangeHandler}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          // value={registrationInfo.lastName}
          onChange={onChangeHandler}
        />
        <select name="status" onChange={onChangeHandler}>
          <option value="Pre-registered">Pre-registered</option>
          <option value="Attended">Attended</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {qrCode ? (
        <div>
          <h3>Your QR Code:</h3>
          <QRCode id="qrcode-canvas" value={qrCode} renderAs="canvas" />
          <button onClick={handleDownloadQRCode}>Download QR Code</button>
        </div>
      ) : (
        <>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        </>
      )}
    </div>
  );
};

export default Registration;
