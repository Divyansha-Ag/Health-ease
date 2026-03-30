export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-container">
        <div className="footer-links">
          <a href="#contact" className="footer-link">Contact Us</a>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
        </div>

        <div className="social-links">
          {/* Twitter */}
          <a href="#" className="social-link" aria-label="Twitter">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {/* Facebook */}
          <a href="#" className="social-link" aria-label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M15.5 8.5H14c-.5 0-1 .5-1 1v2h2.5l-.5 2.5H13V20h-3v-6H8v-2.5h2v-2c0-2 1.5-3.5 3.5-3.5h2V8.5z" fill="currentColor"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="social-link" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
            </svg>
          </a>
        </div>

        <p className="copyright">©2026 HealthEase. All rights reserved.</p>
      </div>
    </footer>
  );
}
