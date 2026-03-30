import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const lowerEmail = email.toLowerCase();

    if (lowerEmail.includes("patient") || lowerEmail.includes("@")) {
      // Extract a friendly name from email
      const namePart = email.split("@")[0];
      const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      onLogin({ email, name });
    } else {
      setError("Please use a valid patient email to log in.");
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

        <h2>Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="login-hint">
          <strong>Demo credentials:</strong><br />
          Email: <code>patient@healthease.com</code><br />
          Password: any value
        </div>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
