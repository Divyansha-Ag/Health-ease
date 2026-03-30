import { useState, useEffect } from "react";

export default function Navbar({ currentPage, navigateTo, onLogout, userName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "dashboard", label: "Home" },
    { id: "doctors", label: "Doctors" },
    { id: "appointments", label: "Appointments" },
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2D6A5F" />
          <path d="M2 17L12 22L22 17" stroke="#2D6A5F" strokeWidth="2" />
          <path d="M2 12L12 17L22 12" stroke="#2D6A5F" strokeWidth="2" />
        </svg>
        HealthEase
      </div>

      {/* Nav Links */}
      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        {links.map((link) => (
          <li key={link.id}>
            <button
              className={`nav-link${currentPage === link.id ? " active" : ""}`}
              onClick={() => { navigateTo(link.id); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="nav-right">
        <span className="nav-user">👤 {userName}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
