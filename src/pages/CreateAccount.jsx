import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, UserPlus } from "lucide-react"
import { createPortalAccount, createRoleEntry, saveRoleEntry } from "../utils/portalData"

export default function CreateAccount() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "warden",
    block: "Block A",
    room: "A-101",
    course: "BCA",
    post: "Main Gate",
    shift: "Day",
    workRole: "Housekeeping",
  })
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const entry = createRoleEntry(form.role, form)
    saveRoleEntry(form.role, entry)

    const portalAccount = createPortalAccount(form.role, {
      id: entry.id,
      name: entry.name,
      email: form.email,
      status: entry.status,
    })

    setMessage(`${entry.name} has been added as a ${form.role} with portal ID ${portalAccount.portalId}.`)
    setForm((prev) => ({ ...prev, name: "", email: "", password: "" }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-ink-800 bg-ink-900 p-6 shadow-2xl shadow-black/20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-white mb-5">
          <ArrowLeft size={16} /> Back to sign in
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <UserPlus size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Create account</h2>
            <p className="text-sm text-ink-400">Add a new warden, student, security, or worker account and enable portal access.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-xs text-ink-300 mb-1.5">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-ink-300 mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
              placeholder="you@geetauniversity.edu"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-ink-300 mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
              placeholder="Set password"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-ink-300 mb-1.5">User type</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3 py-2.5 text-sm text-white outline-none"
            >
              <option value="warden">Warden</option>
              <option value="student">Student</option>
              <option value="security">Security</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-ink-300 mb-1.5">Assigned area</label>
            <input
              name="block"
              value={form.block}
              onChange={handleChange}
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
              placeholder="Block A"
            />
          </div>

          {form.role === "student" && (
            <div>
              <label className="block text-xs text-ink-300 mb-1.5">Room</label>
              <input
                name="room"
                value={form.room}
                onChange={handleChange}
                className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
                placeholder="A-101"
              />
            </div>
          )}

          {form.role === "student" && (
            <div>
              <label className="block text-xs text-ink-300 mb-1.5">Course</label>
              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
                placeholder="BCA"
              />
            </div>
          )}

          {form.role === "security" && (
            <div>
              <label className="block text-xs text-ink-300 mb-1.5">Shift</label>
              <input
                name="shift"
                value={form.shift}
                onChange={handleChange}
                className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
                placeholder="Day"
              />
            </div>
          )}

          {form.role === "worker" && (
            <div>
              <label className="block text-xs text-ink-300 mb-1.5">Work role</label>
              <input
                name="workRole"
                value={form.workRole}
                onChange={handleChange}
                className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white outline-none"
                placeholder="Housekeeping"
              />
            </div>  
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 font-semibold text-sm py-2.5 transition-colors"
            >
              Create account
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-3 text-sm text-emerald-300">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
