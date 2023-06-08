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
          <span>Event Name: {eventItem.eventName}</span>
          <span>Event Location: {eventItem.eventLocation}</span>
          <span>Event Date: {eventItem.eventDateAndTime}</span>
          <Link to={`/events/${eventItem._id}`}>
            <button>Join Event</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Events;
