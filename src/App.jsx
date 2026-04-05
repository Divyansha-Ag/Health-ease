import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfile from "./pages/DoctorProfile";
import AppointmentsPage from "./pages/AppointmentsPage";
import DoctorLoginPage from "./pages/DoctorLoginPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import Navbar from "./components/Navbar";
import "./styles/global.css";

const APPOINTMENTS_KEY = "appointments";

function loadAppointmentsFromStorage() {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function persistAppointments(next) {
  const forStorage = next.map(({ isNew, ...rest }) => rest);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(forStorage));
}

function navPageFromPath(pathname) {
  if (pathname === "/dashboard") return "dashboard";
  if (pathname === "/appointments") return "appointments";
  if (pathname.startsWith("/doctors")) return "doctors";
  return "";
}

function DoctorDashboardRoute() {
  let session = null;
  try {
    const raw = localStorage.getItem("doctorSession");
    if (raw) session = JSON.parse(raw);
  } catch {
    session = null;
  }
  if (!session?.doctorId) {
    return <Navigate to="/doctor/login" replace />;
  }
  return <DoctorDashboard />;
}

function AuthenticatedPatient({
  currentUser,
  userName,
  navigateTo,
  onLogout,
  children,
}) {
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  const currentPage = navPageFromPath(location.pathname);
  return (
    <>
      <Navbar
        currentPage={currentPage}
        navigateTo={navigateTo}
        onLogout={onLogout}
        userName={userName}
      />
      <main className="main-content with-nav">{children}</main>
    </>
  );
}

function DoctorProfileRoute({
  currentUser,
  appointments,
  onBook,
  navigateTo,
  patientName,
}) {
  const { doctorId } = useParams();
  const id = Number(doctorId);
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <DoctorProfile
      doctorId={id}
      onBook={onBook}
      navigateTo={navigateTo}
      existingAppointments={appointments}
      patientName={patientName}
    />
  );
}

function AppRoutes() {
  const [currentUser, setCurrentUser] = useState(null);
  const [appointments, setAppointments] = useState(loadAppointmentsFromStorage);
  const [newlyBookedId, setNewlyBookedId] = useState(null);
  const navigate = useNavigate();

  const navigateTo = (page, doctorId = null) => {
    if (page === "dashboard") navigate("/dashboard");
    else if (page === "doctors") navigate("/doctors");
    else if (page === "appointments") navigate("/appointments");
    else if (page === "doctor-profile" && doctorId != null) {
      navigate(`/doctors/${doctorId}`);
    }
    if (page !== "appointments") setNewlyBookedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setNewlyBookedId(null);
    navigate("/", { replace: true });
  };

  const bookAppointment = (appointment) => {
    const id = Date.now();
    const newAppt = { ...appointment, id, isNew: true };
    setAppointments((prev) => {
      const next = [...prev, newAppt];
      persistAppointments(next);
      return next;
    });
    setNewlyBookedId(id);
    navigate("/appointments");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-root">
      <Routes>
        <Route path="/doctor/login" element={<DoctorLoginPage />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboardRoute />} />

        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthenticatedPatient
              currentUser={currentUser}
              userName={currentUser?.name}
              navigateTo={navigateTo}
              onLogout={handleLogout}
            >
              <Dashboard
                user={currentUser}
                appointments={appointments}
                navigateTo={navigateTo}
              />
            </AuthenticatedPatient>
          }
        />

        <Route
          path="/doctors"
          element={
            <AuthenticatedPatient
              currentUser={currentUser}
              userName={currentUser?.name}
              navigateTo={navigateTo}
              onLogout={handleLogout}
            >
              <DoctorsPage navigateTo={navigateTo} />
            </AuthenticatedPatient>
          }
        />

        <Route
          path="/doctors/:doctorId"
          element={
            <AuthenticatedPatient
              currentUser={currentUser}
              userName={currentUser?.name}
              navigateTo={navigateTo}
              onLogout={handleLogout}
            >
              <DoctorProfileRoute
                currentUser={currentUser}
                appointments={appointments}
                onBook={bookAppointment}
                navigateTo={navigateTo}
                patientName={currentUser?.name}
              />
            </AuthenticatedPatient>
          }
        />

        <Route
          path="/appointments"
          element={
            <AuthenticatedPatient
              currentUser={currentUser}
              userName={currentUser?.name}
              navigateTo={navigateTo}
              onLogout={handleLogout}
            >
              <AppointmentsPage
                appointments={appointments}
                newlyBookedId={newlyBookedId}
                navigateTo={navigateTo}
              />
            </AuthenticatedPatient>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
