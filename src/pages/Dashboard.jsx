import { Users, GraduationCap, AlertCircle, Clock, Users2, ShieldCheck, HardHat, Bell } from "lucide-react"
import { Link } from "react-router-dom"
import Topbar from "../components/Topbar"
import StatCard from "../components/StatCard"
import StatusBadge from "../components/StatusBadge"
import { useAuth } from "../context/AuthContext"
import { useNotices } from "../context/NoticeContext"
import { staffOverview, stats } from "../data/mockData"

export default function Dashboard() {
  const { user } = useAuth()
  const { notices: recentNotices } = useNotices()

  const opsSnapshot = [
    { label: "Active Staff", value: 9, icon: Users2, tone: "success" },
    { label: "On Leave", value: 1, icon: Clock, tone: "amber" },
    { label: "Open Complaints", value: 4, icon: AlertCircle, tone: "danger" },
    { label: "Pending Tasks", value: 3, icon: HardHat, tone: "amber" },
    { label: "Urgent Notices", value: 2, icon: Bell, tone: "danger" },
    { label: "Blocks", value: 3, icon: ShieldCheck, tone: "neutral" },
  ]

  return (
    <div>
      <Topbar title="Dashboard" subtitle="Geeta University · Admin Portal" />

      <div className="px-8 pb-10 space-y-6">
        {/* Welcome banner */}
        <div className="rounded-2xl bg-gradient from-ink-900 to-ink-850 border border-ink-800 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-ink-400 text-sm">Welcome back,</p>
            <h2 className="text-2xl font-bold text-white mt-0.5">{user?.name}</h2>
            <p className="text-ink-400 text-sm mt-0.5">
              {user?.role} · {user?.org}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/notices" className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 text-sm font-medium transition-colors">
              Upload Notices
            </Link>
            <Link to="/attendance" className="px-4 py-2 rounded-lg bg-ink-800 hover:bg-ink-700 text-white text-sm font-medium transition-colors border border-ink-700">
              Manage Staff
            </Link>
            <Link to="/reports" className="px-4 py-2 rounded-lg bg-ink-800 hover:bg-ink-700 text-white text-sm font-medium transition-colors border border-ink-700">
              View Reports
            </Link>
          </div>
        </div>

        {/* Primary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} value={stats.totalStaff} label="Total Staff" note={stats.totalStaffNote} />
          <StatCard icon={GraduationCap} value={stats.students} label="Students" note={stats.studentsNote} />
          <StatCard icon={AlertCircle} value={stats.openComplaints} label="Open Complaints" note={stats.openComplaintsNote} tone="danger" />
          <StatCard icon={Clock} value={stats.pendingLeaves} label="Pending Leaves" note={stats.pendingLeavesNote} />
        </div>

        {/* Staff overview + Recent notices */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-ink-900 border border-ink-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm flex items-center gap-2">
                <Users2 size={16} className="text-amber-400" /> Staff Overview
              </h3>
              <Link to="/attendance" className="text-xs text-amber-400 hover:text-amber-300">Manage</Link>
            </div>
            <div className="space-y-1">
              {staffOverview.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-ink-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-ink-800 flex items-center justify-center text-xs font-semibold text-amber-400">
                      {s.name[0]}
                    </div>
                    <div>
                      <p className="text-sm text-white">{s.name}</p>
                      <p className="text-xs text-ink-500">{s.role}</p>
                    </div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ink-900 border border-ink-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium text-sm flex items-center gap-2">
                <Bell size={16} className="text-amber-400" /> Recent Notices
              </h3>
              <Link to="/notices" className="text-xs text-amber-400 hover:text-amber-300">View all</Link>
            </div>
            <div className="space-y-2">
              {recentNotices.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                    n.urgent ? "bg-danger/5 border border-danger/20" : "hover:bg-ink-800"
                  }`}
                >
                  <div>
                    <p className="text-sm text-white">{n.title}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{n.meta}</p>
                  </div>
                  {n.urgent && <StatusBadge status="urgent" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operations snapshot */}
        <div className="bg-ink-900 border border-ink-800 rounded-2xl p-5">
          <h3 className="text-white font-medium text-sm mb-4">Operations Snapshot</h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {opsSnapshot.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="text-center">
                <div
                  className={`h-10 w-10 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                    tone === "success"
                      ? "bg-success/10 text-success"
                      : tone === "danger"
                      ? "bg-danger/10 text-danger"
                      : tone === "amber"
                      ? "bg-amber-400/10 text-amber-400"
                      : "bg-ink-700 text-ink-300"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-[11px] text-ink-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
