import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorsData } from "../data/mockData";

const APPOINTMENTS_KEY = "appointments";
const AVAILABILITY_KEY = "doctorAvailability";

function readDoctorSession() {
  try {
    const raw = localStorage.getItem("doctorSession");
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s?.doctorId ? s : null;
  } catch {
    return null;
  }
}

function readAppointments() {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function readAvailabilityOverrides() {
  try {
    const raw = localStorage.getItem(AVAILABILITY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistDoctorAvailabilityMap(doctorId, dateToSlots) {
  const all = readAvailabilityOverrides();
  all[String(doctorId)] = dateToSlots;
  localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(all));
}

function buildInitialSlotsForDoctor(doctor) {
  const overrides = readAvailabilityOverrides()[String(doctor.id)] || {};
  const state = {};
  Object.keys(doctor.availability).forEach((date) => {
    const base = doctor.availability[date] || [];
    state[date] =
      overrides[date] !== undefined ? [...overrides[date]] : [...base];
  });
  return state;
}

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const session = useMemo(() => readDoctorSession(), []);
  const doctor = useMemo(
    () => doctorsData.find((d) => d.id === session?.doctorId),
    [session?.doctorId]
  );

  useEffect(() => {
    if (session?.doctorId && !doctor) {
      localStorage.removeItem("doctorSession");
      navigate("/doctor/login", { replace: true });
    }
  }, [session?.doctorId, doctor, navigate, session]);

  const [appointments, setAppointments] = useState(readAppointments);
  const [slotState, setSlotState] = useState(() =>
    doctor ? buildInitialSlotsForDoctor(doctor) : {}
  );

  const refreshAppointments = useCallback(() => {
    setAppointments(readAppointments());
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === APPOINTMENTS_KEY || e.key === null) refreshAppointments();
    };
    window.addEventListener("storage", onStorage);
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshAppointments();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshAppointments]);

  const handleLogout = () => {
    localStorage.removeItem("doctorSession");
    navigate("/doctor/login", { replace: true });
  };

  const toggleSlot = (date, slot) => {
    if (!doctor) return;
    setSlotState((prev) => {
      const baseOrder = doctor.availability[date] || [];
      let next = [...(prev[date] || [])];
      if (next.includes(slot)) {
        next = next.filter((s) => s !== slot);
      } else {
        next = baseOrder.filter((s) => s === slot || next.includes(s));
      }
      const merged = { ...prev, [date]: next };
      persistDoctorAvailabilityMap(doctor.id, merged);
      return merged;
    });
  };

  if (!session || !doctor) {
    return null;
  }

  const displayName = session.doctorName || doctor.name.replace(/^Dr\.\s*/i, "");
  const mine = appointments.filter((a) => a.doctorId === doctor.id);
  const sortedDates = Object.keys(doctor.availability).sort();

  return (
    <div className="doctor-dashboard-page">
      <header className="doctor-dashboard-header">
        <div className="container doctor-dashboard-header-inner">
          <div>
            <h1 className="doctor-dashboard-title">Welcome, Dr. {displayName}</h1>
            <p className="doctor-dashboard-subtitle">{doctor.specialty}</p>
          </div>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="container doctor-dashboard-body">
        <section className="doctor-dashboard-section">
          <h2 className="doctor-section-title">Appointments</h2>
          <p className="doctor-appointments-count">
            Total Appointments: <strong>{mine.length}</strong>
          </p>

          {mine.length === 0 ? (
            <div className="upcoming-empty" style={{ marginTop: 16 }}>
              <p>No appointments booked yet.</p>
            </div>
          ) : (
            <div className="appointments-table-wrapper" style={{ marginTop: 16 }}>
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mine.map((a) => (
                    <tr key={a.id}>
                      <td>{a.patientName || "Patient"}</td>
                      <td>{a.date}</td>
                      <td>{a.slot}</td>
                      <td>
                        <span
                          className={`status-badge status-${String(
                            a.status || "Confirmed"
                          ).toLowerCase()}`}
                        >
                          {String(a.status || "Confirmed")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="doctor-dashboard-section doctor-availability-section">
          <h2 className="doctor-section-title">Availability</h2>
          <p className="doctor-availability-hint">
            Toggle slots on or off. Off blocks the slot for patients in this browser.
          </p>

          {sortedDates.map((date) => {
            const baseSlots = doctor.availability[date] || [];
            const availableSet = new Set(slotState[date] || []);
            return (
              <div key={date} className="availability-date-card">
                <h3 className="availability-date-label">{date}</h3>
                <div className="availability-slot-toggles">
                  {baseSlots.map((slot) => {
                    const on = availableSet.has(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`availability-toggle${on ? " is-on" : " is-off"}`}
                        onClick={() => toggleSlot(date, slot)}
                        aria-pressed={on}
                      >
                        <span className="availability-toggle-slot">{slot}</span>
                        <span className="availability-toggle-state">
                          {on ? "Available" : "Blocked"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
