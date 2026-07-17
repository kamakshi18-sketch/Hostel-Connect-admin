import { useState } from "react"
import { Menu } from "lucide-react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Sidebar from "./Sidebar"

export default function Layout() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen bg-ink-950">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/95 text-ink-100 shadow-lg md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      <div
        className={`fixed inset-0 z-40 transition md:hidden ${
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className={`absolute inset-0 bg-black/60 transition ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
