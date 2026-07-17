# HostelConnect — Admin Portal

React + Vite + react-router-dom admin console in a black/charcoal + amber theme.

## Run it

```
npm install
npm run dev
```

Open the URL shown (usually http://localhost:5173).

## Login

Any email/password works (demo auth). Tap **Admin** on the login page to auto-fill demo credentials, then hit Sign In.

## Structure

- `src/pages/Login.jsx` — login screen (hero panel + form)
- `src/pages/Dashboard.jsx`, `Wardens.jsx`, `Students.jsx`, `Security.jsx`, `Workers.jsx`, `Meetings.jsx`, `StaffAttendance.jsx`, `Notices.jsx`, `RoomsBlocks.jsx`, `Reports.jsx` — one page per sidebar item
- `src/components/Sidebar.jsx`, `Topbar.jsx`, `StatCard.jsx`, `DataTable.jsx`, `StatusBadge.jsx` — shared UI
- `src/context/AuthContext.jsx` — demo auth (sessionStorage), swap for real API later
- `src/data/mockData.js` — all sample data lives here — replace with API calls when backend is ready

## Theme tokens

Colors are defined in `src/index.css` under `@theme` (Tailwind v4): `ink-*` for charcoal/black, `amber-*` for the yellow accent.

## Next steps

- Wire AuthContext to your real login API
- Replace mockData.js with fetches to your backend (MongoDB per your setup)
- Add forms/modals for "Add Warden", "Add Student" etc. (currently just buttons)
