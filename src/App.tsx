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
      {user && <Navbar />}
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
        <Route
          path="/events/:id"
          element={user ? <EventRegistrationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-event"
          element={user ? <CreateEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/scan-qr"
          element={user ? <ScanQR /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
