import { Stethoscope, CalendarDays, Zap, ClipboardList } from "lucide-react";
export default function AppointmentsPage({ appointments, newlyBookedId, navigateTo }) {
  return (
    <section className="appointments-page">
      <div className="container">
        <h1 className="page-title">My Appointments</h1>

        {appointments.length === 0 ? (
          <div className="empty-appointments">
            <div style={{ fontSize: "3rem", marginBottom: 12 }}><CalendarDays size={36} color="#2D6A5F" /></div>
            <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>No appointments yet</p>
            <p>Book an appointment with one of our specialists to get started.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 24 }}
              onClick={() => navigateTo("doctors")}
            >
              Browse Doctors
            </button>
          </div>
        ) : (
          <div className="appointments-table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => {
                  const isNew = appt.id === newlyBookedId;
                  return (
                    <tr
                      key={appt.id}
                      className={isNew ? "row-new" : ""}
                    >
                      <td>
                        <strong>{appt.doctorName}</strong>
                        {isNew && (
                          <span className="badge-new" style={{ marginLeft: 8 }}>New</span>
                        )}
                      </td>
                      <td>{appt.specialty}</td>
                      <td>{appt.date}</td>
                      <td>{appt.slot}</td>
                      <td>
                        <span
                          className={`status-badge status-${String(
                            appt.status || "confirmed"
                          ).toLowerCase()}`}
                        >
                          {String(appt.status || "Confirmed")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
