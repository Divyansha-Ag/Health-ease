import { useState } from "react";
import { doctorsData, departments } from "../data/mockData";

export default function DoctorsPage({ navigateTo }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const filtered = doctorsData.filter((doc) => {
    const q = search.toLowerCase();
    const matchSearch =
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q);
    const matchDept = !department || doc.department === department;
    return matchSearch && matchDept;
  });

  return (
    <section className="doctors-page">
      <div className="container">
        <h1 className="page-title">Our Doctors</h1>

        {/* Search + Filter */}
        <div className="search-filter-section">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#6B7280" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search doctors by name or specialty"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="department-filter"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filtered.length === 0 ? (
            <div className="no-doctors">
              <p style={{ fontSize: "1.1rem" }}>No doctors found matching your criteria.</p>
              <p style={{ marginTop: 8, fontSize: 14, color: "#9ca3af" }}>Try adjusting your search or filter.</p>
            </div>
          ) : (
            filtered.map((doc) => (
              <div
                className="doctor-card"
                key={doc.id}
                onClick={() => navigateTo("doctor-profile", doc.id)}
              >
                <div className="doctor-image-wrapper">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="doctor-image"
                    onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=1"; }}
                  />
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <p className="doctor-specialty">{doc.specialty}</p>
                  <p className="doctor-experience">{doc.experience}</p>
                  <button
                    className="doctor-book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo("doctor-profile", doc.id);
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
