import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfile from "./pages/DoctorProfile";
import AppointmentsPage from "./pages/AppointmentsPage";
import Navbar from "./components/Navbar";
import "./styles/global.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [newlyBookedId, setNewlyBookedId] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
    setAppointments([]);
    setNewlyBookedId(null);
  };

  const navigateTo = (page, doctorId = null) => {
    setCurrentPage(page);
    if (doctorId !== null) setSelectedDoctorId(doctorId);
    // Clear newly-booked highlight when leaving appointments
    if (page !== "appointments") setNewlyBookedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bookAppointment = (appointment) => {
    const id = Date.now();
    const newAppt = { ...appointment, id, isNew: true };
    setAppointments((prev) => [...prev, newAppt]);
    setNewlyBookedId(id);
    setCurrentPage("appointments");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-root">
      {/* Navbar only shown when logged in */}
      {currentUser && (
        <Navbar
          currentPage={currentPage}
          navigateTo={navigateTo}
          onLogout={handleLogout}
          userName={currentUser.name}
        />
      )}

      <main className={`main-content${currentUser ? " with-nav" : ""}`}>
        {currentPage === "login" && (
          <LoginPage onLogin={handleLogin} />
        )}

        {currentPage === "dashboard" && (
          <Dashboard
            user={currentUser}
            appointments={appointments}
            navigateTo={navigateTo}
          />
        )}

        {currentPage === "doctors" && (
          <DoctorsPage navigateTo={navigateTo} />
        )}

        {currentPage === "doctor-profile" && (
          <DoctorProfile
            doctorId={selectedDoctorId}
            onBook={bookAppointment}
            navigateTo={navigateTo}
            existingAppointments={appointments}
          />
        )}

        {currentPage === "appointments" && (
          <AppointmentsPage
            appointments={appointments}
            newlyBookedId={newlyBookedId}
            navigateTo={navigateTo}
          />
        )}
      </main>
    </div>
  );
}
