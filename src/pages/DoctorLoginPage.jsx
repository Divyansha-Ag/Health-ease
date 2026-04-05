import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doctorsData } from "../data/mockData";

export default function DoctorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const match = doctorsData.find(
      (d) =>
        d.credentials?.email?.toLowerCase() === normalizedEmail &&
        d.credentials?.password === password
    );

    if (match) {
      localStorage.setItem(
        "doctorSession",
        JSON.stringify({ doctorId: match.id, doctorName: match.name.replace(/^Dr\.\s*/i, "") })
      );
      navigate("/doctor/dashboard", { replace: true });
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2D6A5F" />
            <path d="M2 17L12 22L22 17" stroke="#2D6A5F" strokeWidth="2" />
            <path d="M2 12L12 17L22 12" stroke="#2D6A5F" strokeWidth="2" />
          </svg>
          HealthEase
        </div>

        <h2>Doctor Portal</h2>
        <p className="login-subtitle">Login to manage your schedule</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="doctor-email">Email</label>
            <input
              type="email"
              id="doctor-email"
              placeholder="doctor@healthease.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctor-password">Password</label>
            <input
              type="password"
              id="doctor-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn">
            Login as Doctor
          </button>
        </form>

        <div className="login-hint">
          <strong>Demo:</strong> e.g. <code>dr.ananya@healthease.com</code> /{" "}
          <code>doctor123</code>
        </div>

        <p className="signup-text" style={{ marginTop: 20 }}>
          <Link to="/">Are you a patient? Login here</Link>
        </p>
      </div>
    </div>
  );
}
