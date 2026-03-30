import { useState } from "react";
import { doctorsData } from "../data/mockData";

export default function DoctorProfile({ doctorId, onBook, navigateTo, existingAppointments }) {
  const doctor = doctorsData.find((d) => d.id === doctorId);

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [booked, setBooked] = useState(false);

  if (!doctor) {
    return (
      <div className="doctor-profile-page">
        <div className="container">
          <p>Doctor not found.</p>
          <button className="back-btn" onClick={() => navigateTo("doctors")}>← Back to Doctors</button>
        </div>
      </div>
    );
  }

  // Find slots already booked for this doctor + date by the patient
  const bookedSlots = existingAppointments
    .filter((a) => a.doctorId === doctor.id && a.date === selectedDate)
    .map((a) => a.slot);

  const availableSlots = selectedDate ? (doctor.availability[selectedDate] || []) : [];

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) return;

    onBook({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate,
      slot: selectedSlot,
      status: "confirmed",
    });

    setBooked(true);
  };

  if (booked) {
    return (
      <div className="doctor-profile-page">
        <div className="container" style={{ textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: "4rem", marginBottom: 16 }}>✅</div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Appointment Confirmed!</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
            Your appointment with <strong>{doctor.name}</strong> is booked for
          </p>
          <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: "1.1rem" }}>
            {selectedDate} at {selectedSlot}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
            <button className="btn btn-primary" onClick={() => navigateTo("appointments")}>
              View Appointments
            </button>
            <button className="btn btn-outline" onClick={() => navigateTo("doctors")}>
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="doctor-profile-page">
      <div className="container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigateTo("doctors")}>
          ← Back to Doctors
        </button>

        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="profile-img"
            onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=1"; }}
          />
          <div className="profile-info">
            <h1>{doctor.name}</h1>
            <p className="profile-specialty">{doctor.specialty}</p>
            <p className="profile-experience">{doctor.experience}</p>
            <p className="profile-bio">{doctor.bio}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h2>Book an Appointment</h2>

          {/* Date Picker */}
          <label className="date-picker-label" htmlFor="apptDate">Select Date</label>
          <input
            type="date"
            id="apptDate"
            className="date-picker"
            min={today}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot("");
            }}
          />

          {/* Time Slots */}
          {selectedDate && (
            <>
              <p className="slots-label">
                {availableSlots.length > 0
                  ? "Available Time Slots"
                  : "No slots available for this date."}
              </p>

              {availableSlots.length > 0 && (
                <div className="slots-grid">
                  {availableSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        className={`slot-btn${isSelected ? " selected" : ""}${isBooked ? " booked" : ""}`}
                        onClick={() => !isBooked && setSelectedSlot(slot)}
                        disabled={isBooked}
                        title={isBooked ? "Already booked" : ""}
                      >
                        {slot}
                        {isBooked && " ✗"}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {!selectedDate && (
            <p className="no-slots" style={{ color: "var(--text-secondary)" }}>
              Please select a date to see available time slots.
            </p>
          )}

          {/* Confirm Button */}
          <button
            className="confirm-btn"
            onClick={handleBook}
            disabled={!selectedDate || !selectedSlot}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
