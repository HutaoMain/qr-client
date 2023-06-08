import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useAuthStore from "./zustand/AuthStore";
import Navbar from "./components/navbar/Navbar";
import EventPage from "./pages/EventPage/EventPage";
import EventRegistrationPage from "./pages/EventRegistrationPage/EventRegistrationPage";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import Dashboard from "./pages/Dashboard/Dashboard";
import ScanQR from "./components/ScanQR/ScanQR";

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <EventPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/events/:id" element={<EventRegistrationPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan-qr" element={<ScanQR />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
