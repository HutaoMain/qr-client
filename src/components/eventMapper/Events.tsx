import { useQuery } from "react-query";
import { eventMapperInterface } from "../../types/Types";
import "./Events.css";
import { Link } from "react-router-dom";

const Events = () => {
  const { data } = useQuery<eventMapperInterface[]>("eventMapper", () =>
    fetch(`${import.meta.env.VITE_APP_API_URL}/api/event/list`).then((res) =>
      res.json()
    )
  );

  console.log(data);

  return (
    <div className="event">
      {data?.map((eventItem, index) => (
        <div key={index} className="event-container">
          <div className="event-header">{eventItem.eventName}</div>
          <hr
            style={{
              borderBottom: "1px solid gray",
              width: "80%",
              padding: "0px",
              marginBottom: "10px",
            }}
          />

          <div className="event-body-container">
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
                marginBottom: "10px",
              }}
            >
              Event Location:
              <span>
                <b>{eventItem.eventLocation}</b>
              </span>
            </label>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                wordWrap: "break-word",
                width: "70%",
              }}
            >
              Event Date:
              <span>
                <b>{eventItem.eventDateAndTime}</b>
              </span>
            </label>
            <Link
              to={`/events/${eventItem._id}`}
              style={{ textDecoration: "none", marginTop: "20px" }}
            >
              <button>Join Event</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
