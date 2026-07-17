import { NavLink } from "react-router-dom"
import {
  Home,
  LayoutGrid,
  Users,
  GraduationCap,
  ShieldCheck,
  HardHat,
  CalendarClock,
  ClipboardCheck,
  Bell,
  DoorOpen,
  FileBarChart,
  Utensils,
  LogOut,
  X,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/wardens", label: "Wardens", icon: Users },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/security", label: "Security", icon: ShieldCheck },
  { to: "/workers", label: "Workers", icon: HardHat },
  { to: "/meetings", label: "Meetings", icon: CalendarClock },
  { to: "/attendance", label: "Staff Attendance", icon: ClipboardCheck },
  { to: "/notices", label: "Notices", icon: Bell },
  { to: "/rooms-blocks", label: "Rooms & Blocks", icon: DoorOpen },
  { to: "/mess", label: "Mess", icon: Utensils },
  { to: "/reports", label: "Reports", icon: FileBarChart },
]

export default function Sidebar({ isOpen = false, onClose }) {
  const { user, logout } = useAuth()

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 max-w-[85vw] shrink-0 flex-col border-r border-ink-800 bg-ink-900 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-64 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-ink-800 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
            <Home size={18} className="text-ink-950" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-white font-semibold text-sm">HostelConnect</p>
            <p className="text-ink-400 text-[11px]">Admin Console</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-300 hover:bg-ink-800 hover:text-white md:hidden"
          aria-label="Close navigation menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] tracking-widest text-ink-500 font-semibold">
          ADMIN PORTAL
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-amber-400/10 text-amber-400 font-medium"
                  : "text-ink-300 hover:bg-ink-800 hover:text-white"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-ink-800">
        <div className="flex items-center gap-3 px-1 mb-3">
          <div className="h-9 w-9 rounded-full bg-amber-400 flex items-center justify-center text-ink-950 font-semibold text-sm shrink-0">
            {user?.name?.[0] ?? "A"}
          </div>
          <div className="leading-tight overflow-hidden">
            <p className="text-white text-sm font-medium truncate">{user?.name}</p>
            <p className="text-ink-400 text-[11px] truncate">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => {
            logout()
            onClose?.()
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-300 hover:bg-ink-800 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          Switch Portal
        </button>
      </div>
    </aside>
  )
}
