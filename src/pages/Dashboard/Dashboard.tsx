import axios from "axios";
import { attendeesInterface } from "../../types/Types";
import "./Dashboard.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { useState } from "react";

const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState("");

  const { data } = useQuery<attendeesInterface[]>({
    queryKey: ["dashboard"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/attendee/list`)
        .then((res) => res.data),
  });

  const eventNames = [...new Set(data?.map((item) => item.eventName))];

  const filteredData = selectedEvent
    ? data?.filter((item) => item.eventName === selectedEvent)
    : data;

  const productColumn: GridColDef[] = [
    {
      field: "eventName",
      headerName: "Event Name",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "eventDateAndTime",
      headerName: "Event Date and Time",
      headerAlign: "center",
      align: "center",
      width: 250,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: "eventLocation",
      headerName: "Event Location",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeFirstName",
      headerName: "First name",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeMiddleName",
      headerName: "Middle name",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeLastName",
      headerName: "Last name",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeIdNumber",
      headerName: "ID number",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeYearLevel",
      headerName: "Year level",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeCourse",
      headerName: "Course",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "attendeeRelationship",
      headerName: "Relationship",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "timeIn",
      headerName: "Time In",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "timeOut",
      headerName: "Time Out",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
  ];

  return (
    <div className="dashboard">
      <section className="data-grid">
        <div className="filter-container">
          <label htmlFor="event-filter" className="filter-label">
            Event Filter:
          </label>
          <select
            id="event-filter"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="filter-select"
          >
            <option value="">All Events</option>
            {eventNames.map((eventName) => (
              <option key={eventName} value={eventName}>
                {eventName}
              </option>
            ))}
          </select>
        </div>
        <DataGrid
          rows={filteredData ?? []}
          columns={productColumn}
          getRowId={(row) => row._id}
        />
      </section>
    </div>
  );
};

export default Dashboard;
