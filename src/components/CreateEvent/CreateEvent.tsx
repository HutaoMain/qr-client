import "./CreateEvent.css";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventDateAndTime, setEventDateAndTime] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [eventName, setEventName] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");

  const navigate = useNavigate();

  const onChangeEventNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventName(event.target.value);
  };

  const onChangeEventLocationHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventLocation(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/event/create`, {
        eventName: eventName,
        eventDateAndTime: eventDateAndTime,
        eventLocation: eventLocation,
      });
      toast("Successful created event!", {
        type: "success",
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-event">
      <div className="create-event-header"></div>
      <label htmlFor="" className="create-even-itemlist">
        Event Name:
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={onChangeEventNameHandler}
        />
      </label>

      <label htmlFor="" className="create-even-itemlist">
        Event Location:
        <input
          type="text"
          placeholder="Enter event location"
          value={eventLocation}
          onChange={onChangeEventLocationHandler}
        />
      </label>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Event Date and Time"
          value={eventDateAndTime}
          onChange={(newValue) => setEventDateAndTime(newValue)}
        />
      </LocalizationProvider>

      <button onClick={handleSubmit}>Create Event</button>
    </div>
  );
};

export default CreateEvent;
