import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import {
  eventMapperInterface,
  parentInfoInterface,
  userInterface,
} from "../../types/Types";
import useAuthStore from "../../zustand/AuthStore";
import { useEffect, useState } from "react";
import axios from "axios";
import "./EventRegistrationPage.css";
import dayjs from "dayjs";
import QRCode from "qrcode.react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
  },
};

Modal.setAppElement("#root");

const EventRegistrationPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [userInfo, setUserInfo] = useState<userInterface>();
  const [activeTab, setActiveTab] = useState(1);

  const [parentInfo, setParentInfo] = useState<parentInfoInterface>({
    attendeeFirstName: "",
    attendeeMiddleName: "",
    attendeeLastName: "",
    attendeeRelationship: "",
  });

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const [qrCode, setQRCode] = useState<string>("");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
      );
      setUserInfo(res.data);
    };
    fetch();
  }, []);

  const { data } = useQuery<eventMapperInterface>({
    queryKey: ["getSpecificEvent"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/event/${id}`).then((res) =>
        res.json()
      ),
  });

  const onChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setParentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (activeTab === 1) {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/attendee/create`,
        {
          eventName: data?.eventName,
          eventLocation: data?.eventLocation,
          eventDateAndTime: data?.eventDateAndTime,
          attendeeFirstName: userInfo?.firstName,
          attendeeMiddleName: userInfo?.middleName,
          attendeeLastName: userInfo?.lastName,
          attendeeIdNumber: userInfo?.idNumber,
          attendeeYearLevel: userInfo?.yearLevel,
          attendeeCourse: userInfo?.course,
          email: userInfo?.email,
        }
      );

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/attendee/sms/create`,
        {
          phoneNumber: "+69554376617",
        }
      );

      setQRCode(res.data._id);
      toggleModalOpen();
    } else if (activeTab === 2) {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/attendee/create`,
        {
          eventName: data?.eventName,
          eventLocation: data?.eventLocation,
          eventDateAndTime: data?.eventDateAndTime,
          email: userInfo?.email,
          attendeeIdNumber: userInfo?.idNumber,
          ...parentInfo,
        }
      );
      setQRCode(res.data._id);
      toggleModalOpen();
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

  const renderFormInputs = () => {
    if (activeTab === 1) {
      return (
        <div className="form-container">
          <div className="form-container-itemlist">
            <label>Event Name:</label>
            <span className="tab-input">{data?.eventName}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Event Location:</label>
            <span className="tab-input">{data?.eventLocation}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Event Date and Time:</label>
            <span className="tab-input">
              {dayjs(data?.eventDateAndTime).format("DD/MM/YYYY hh:mm A")}
            </span>
          </div>
          <div className="form-container-itemlist">
            <label>Email Address:</label>
            <span className="tab-input">{userInfo?.email}</span>
          </div>
          <div className="form-container-itemlist">
            <label>First name:</label>
            <span className="tab-input">{userInfo?.firstName}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Middle name:</label>
            <span className="tab-input">{userInfo?.middleName}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Last name:</label>
            <span className="tab-input">{userInfo?.lastName}</span>
          </div>
          <div className="form-container-itemlist">
            <label>ID Number:</label>
            <span className="tab-input">{userInfo?.idNumber}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Course:</label>
            <span className="tab-input">{userInfo?.course}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Year level:</label>
            <span className="tab-input">{userInfo?.yearLevel}</span>
          </div>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      );
    } else if (activeTab === 2) {
      return (
        <div className="form-container">
          <div className="form-container-itemlist">
            <label>Event Name:</label>
            <span className="tab-input">{data?.eventName}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Event Location:</label>
            <span className="tab-input">{data?.eventLocation}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Event Date and Time:</label>
            <span className="tab-input">
              {dayjs(data?.eventDateAndTime).format("DD/MM/YYYY hh:mm A")}
            </span>
          </div>
          <div className="form-container-itemlist">
            <label>Last name:</label>
            <input
              type="text"
              className="tab-input"
              name="attendeeLastName"
              value={parentInfo.attendeeLastName}
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="form-container-itemlist">
            <label>First name:</label>
            <input
              type="text"
              className="tab-input"
              name="attendeeFirstName"
              value={parentInfo.attendeeFirstName}
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="form-container-itemlist">
            <label>Middle name:</label>
            <input
              type="text"
              className="tab-input"
              name="attendeeMiddleName"
              value={parentInfo.attendeeMiddleName}
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="form-container-itemlist">
            <label>ID Number of the student:</label>
            <span className="tab-input">{userInfo?.idNumber}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Email Address of the student:</label>
            <span className="tab-input">{userInfo?.email}</span>
          </div>
          <div className="form-container-itemlist">
            <label>Relationship with student :</label>
            <input
              type="text"
              className="tab-input"
              name="attendeeRelationship"
              value={parentInfo.attendeeRelationship}
              onChange={onChangeEventHandler}
            />
          </div>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      );
    }
  };

  const toggleModalOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className="event-registration-page">
      <div className="event-registration-btns">
        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Student Registration
        </button>
        <button
          className={`tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Parent Registration
        </button>
      </div>
      {data && userInfo ? <>{renderFormInputs()}</> : "loading"}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModalOpen}
        style={customStyles}
      >
        {qrCode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h3>Your QR Code:</h3>
            <QRCode id="qrcode-canvas" value={qrCode} renderAs="canvas" />
            <button onClick={handleDownloadQRCode}>Download QR Code</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventRegistrationPage;
