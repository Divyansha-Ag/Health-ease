# HealthEase — React Frontend

A fully converted React SPA from the original HTML/CSS/JS project.

---

## 📁 Folder Structure

```
healthease/
├── index.html                  # App entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Router shell + state management
    │
    ├── styles/
    │   └── global.css          # All CSS (merged from styles.css, patient.css, login.css, doctor.css)
    │
    ├── data/
    │   └── mockData.js         # Doctors + availability (replaces script.js data)
    │
    ├── components/
    │   ├── Navbar.jsx          # Top navigation bar
    │   └── Footer.jsx          # Site footer
    │
    └── pages/
        ├── LoginPage.jsx       # Login form → redirects to dashboard
        ├── Dashboard.jsx       # Home: hero + quick cards + upcoming appointments
        ├── DoctorsPage.jsx     # Doctor listing with search + filter
        ├── DoctorProfile.jsx   # Doctor details + slot booking
        └── AppointmentsPage.jsx # Booked appointments table with highlight
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🔐 Login Credentials (Demo)

- **Email:** `patient@healthease.com` (any email with `@` works)
- **Password:** any value

---

## ✅ Features Implemented

| Feature | Status |
|---|---|
| Login page with form validation | ✅ |
| Dashboard with welcome + quick nav cards | ✅ |
| Upcoming appointments on dashboard | ✅ |
| Doctors listing page | ✅ |
| Search doctors by name / specialty | ✅ |
| Filter by department | ✅ |
| Doctor profile with bio | ✅ |
| Date-based slot availability (mock data) | ✅ |
| Slot booking (prevents double booking) | ✅ |
| Appointments page with table | ✅ |
| New appointment highlight animation | ✅ |
| Responsive / mobile-friendly | ✅ |
| Admin panel removed | ✅ |
| No backend / API calls | ✅ |

---

## 🎨 Design Notes

- Original color scheme preserved: `#2D6A5F` primary green
- Card-based layouts throughout
- CSS class names preserved from original HTML files
- All CSS merged into `src/styles/global.css`
- Doctor availability stored in `src/data/mockData.js`
- Dates available: `2026-04-07` through `2026-04-11`
