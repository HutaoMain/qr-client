import { useState } from "react";
import "./Navbar.css";
// import { useQuery } from "react-query";
// import useAuthStore from "../../zustand/AuthStore";
// import { userInterface } from "../../types/Types";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  // const user = useAuthStore((state) => state.user);

  // const { data } = useQuery<userInterface>({
  //   queryKey: ["navbar"],
  //   queryFn: () =>
  //     fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Event Registration</h2>
        </div>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          {/* {data?.role === "admin" && ( */}
          <li className="nav-item">
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="/create-event" className="nav-link">
              Create Event
            </a>
          </li>
          <li className="nav-item">
            <a href="/scan-qr" className="nav-link">
              Scan QR
            </a>
          </li>
          {/* )} */}
          {/* <li className="nav-item">
            <a href="/profile" className="nav-link">
              Profile
            </a>
          </li> */}
        </ul>
        <div className="burger" onClick={() => setOpen(!open)}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
