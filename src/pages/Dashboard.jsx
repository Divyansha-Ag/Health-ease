import Footer from "../components/Footer";
import { Stethoscope, CalendarDays, Zap, ClipboardList } from "lucide-react";
const services = [
  {
    title: "General Checkup",
    description: "Comprehensive health assessments for all ages.",
    emoji: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#2D6A5F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
    bg: "#e8f2f0",
  },
  {
    title: "Cardiology",
    description: "Specialized care for heart conditions and treatments.",
    emoji: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#2D6A5F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12c0 5-8 9-8 9s-8-4-8-9a5 5 0 0 1 8-3 5 5 0 0 1 8 3z"/>
      </svg>
    ),
    bg: "#fce8e8",
  },
  {
    title: "Pediatrics",
    description: "Compassionate medical care for infants, children, and adolescents.",
    emoji: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#2D6A5F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M5 21c1.5-4 12.5-4 14 0"/>
      </svg>
    ),
    bg: "#e8f0fc",
  },
  {
    title: "Emergency Care",
    description: "Immediate medical attention for critical situations.",
    emoji: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#2D6A5F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
      </svg>
    ),
    bg: "#fef3e8",
  },
];

const specialists = [
  { name: "Dr. Amelia Harper", specialty: "Cardiology", img: "https://imgs.search.brave.com/e_vldVmvkcxdt0lx3erv9klZicDsoVxbrr-PEYyHwBs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmlh/bnNodW13YXkuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzA5L0RvY3RvcnMt/SGVhZHNob3QtUGhv/dG9ncmFwaGVyLURh/bGxhcy1IZWFsdGhj/YXJlLWFuZC1NZWRp/Y2FsLVJlc2lkZW5j/eS1IZWFkc2hvdHMu/anBn" },
  { name: "Dr. Ethan Carter",  specialty: "Pediatrics", img: "https://imgs.search.brave.com/eL5LF32acSi6_Ud-vVIIKLNR30aSQYSZZSWquwSClac/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ4/LzE1L2E3NDgxNThm/NTNhNGZlNGRmODYx/M2VmZjgzMzZmMjlh/LmpwZw" },
  { name: "Dr. Olivia Bennett",specialty: "General Practice", img: "https://imgs.search.brave.com/eoyuSAZru_7hZhVNuMFMFxRS9yBSU_M-8s9MxHPoP3A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ViLzY1/LzE3L2ViNjUxN2Fh/MzMxMDExZDEzNzMx/OTNkMGMyZGQ3OWFl/LmpwZw" },
  { name: "Dr. Noah Thompson", specialty: "Emergency Medicine", img: "https://imgs.search.brave.com/XRaPMt8uHgecvnHzt1OOa4gJIUp1VS5ov3_C07SqGFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzYz/MWJhOGVlZDIxOTZh/Njc5NTY5ODY2NS9j/OTFkNzQ2ZS1kZGZl/LTRmMmEtYjFhMC0w/YTE1OGNkN2FkOTAv/MjAyMi0wOS0wNi1L/UC1UcmV2aWFzLUJl/bmphbWluLTA1Njgu/anBn" },
];

export default function Dashboard({ user, appointments, navigateTo }) {
  const upcoming = appointments.slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div
  className="hero-image"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1584515933487-779824d29309')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    inset: 0,
  }}
/>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1 className="hero-title">Caring for Life, Every Day</h1>
          <p className="hero-subtitle">
            At HealthEase, we're dedicated to providing exceptional healthcare services
            tailored to your needs. Our team of expert professionals is committed to
            ensuring your well-being and comfort.
          </p>
          <button
            className="btn btn-primary btn-hero"
            onClick={() => navigateTo("doctors")}
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* ── QUICK NAV CARDS ── */}
      <section className="dashboard-page">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>Welcome back, {user?.name || "Patient"} </h1>
            <p>Manage your health journey from your personal dashboard.</p>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card" onClick={() => navigateTo("doctors")}>
              <div className="dashboard-card-icon"> <Stethoscope size={36} color="#2D6A5F" /></div>
              <h3>Find a Doctor</h3>
              <p>Browse specialists and book appointments</p>
            </div>
            <div className="dashboard-card" onClick={() => navigateTo("appointments")}>
              <div className="dashboard-card-icon"><CalendarDays size={36} color="#2D6A5F" /></div>
              <h3>My Appointments</h3>
              <p>View and manage your bookings</p>
            </div>
            <div className="dashboard-card" onClick={() => navigateTo("doctors")}>
              <div className="dashboard-card-icon"><Zap size={36} color="#2D6A5F" /></div>
              <h3>Quick Book</h3>
              <p>Fast booking for returning patients</p>
            </div>
            <div className="dashboard-card" onClick={() => {}}>
              <div className="dashboard-card-icon"><ClipboardList size={36} color="#2D6A5F" /></div>
              <h3>Health Records</h3>
              <p>Access your medical history</p>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="upcoming-section">
            <h2>Upcoming Appointments</h2>
            {upcoming.length === 0 ? (
              <div className="upcoming-empty">
                <p>No upcoming appointments yet.</p>
                <p style={{ marginTop: 8, fontSize: 14 }}>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 16 }}
                    onClick={() => navigateTo("doctors")}
                  >
                    Book your first appointment
                  </button>
                </p>
              </div>
            ) : (
              <div className="upcoming-list">
                {upcoming.map((appt) => (
                  <div
                    key={appt.id}
                    className={`upcoming-card${appt.isNew ? " is-new" : ""}`}
                  >
                    <div className="upcoming-card-info">
                      <h4>{appt.doctorName}</h4>
                      <p>{appt.specialty} · {appt.date} at {appt.slot}</p>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {appt.isNew && <span className="badge-new">New</span>}
                      <span className="status-badge status-confirmed">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-image" style={{ background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>
                  {s.emoji}
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-description">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALISTS ── */}
      <section className="specialists-section">
        <div className="container">
          <h2 className="section-title">Our Specialists</h2>
          <div className="specialists-grid">
            {specialists.map((s) => (
              <div className="specialist-card" key={s.name}>
                <div className="specialist-image">
                  <img src={s.img} alt={s.name} />
                </div>
                <h3 className="specialist-name">{s.name}</h3>
                <p className="specialist-specialty">{s.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <h3 className="priority-title">
            Your Health, Our <span className="text-accent">Priority.</span>
          </h3>
          <p className="priority-description">
            At HealthEase, we prioritize your health and well-being. Our commitment
            to excellence is reflected in our comprehensive services and patient-centered approach.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#2D6A5F" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#2D6A5F" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4 className="feature-title">24/7 Support</h4>
              <p className="feature-description">
                We're here for you around the clock, providing continuous care and support whenever you need it.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2D6A5F" strokeWidth="2"/>
                  <path d="M9 3V6M15 3V6M3 9H21" stroke="#2D6A5F" strokeWidth="2"/>
                </svg>
              </div>
              <h4 className="feature-title">Modern Facilities</h4>
              <p className="feature-description">
                Our state-of-the-art facilities are equipped with the latest technology to ensure the highest quality of care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
