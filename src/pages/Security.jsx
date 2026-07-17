import { Plus } from "lucide-react"
import { useState } from "react"
import Topbar from "../components/Topbar"
import DataTable from "../components/DataTable"
import { securityStaff as initialSecurityStaff } from "../data/mockData"
import { createPortalAccount, removePortalAccount } from "../utils/portalData"

const columns = [
  { key: "name", label: "Name" },
  { key: "post", label: "Post" },
  { key: "shift", label: "Shift" },
  { key: "status", label: "Status" },
]

const renderRowActions = (row, toggleStatus) => (
  <button
    onClick={() => toggleStatus(row.id)}
    className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5 text-xs font-medium text-amber-300"
  >
    {row.status === "active" ? "Set on leave" : "Set active"}
  </button>
)

export default function Security() {
  const [rows, setRows] = useState(initialSecurityStaff)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", post: "Main Gate", shift: "Day" })

  const toggleStatus = (id) => {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row

        const nextStatus = row.status === "active" ? "on leave" : "active"

        if (nextStatus === "active") {
          const portalAccount = createPortalAccount("security", { id: row.id, name: row.name, status: "active" })
          return { ...row, status: nextStatus, portalId: portalAccount.portalId }
        }

        removePortalAccount("security", row.id)
        return { ...row, status: nextStatus, portalId: "" }
      })
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const newRow = {
      id: Date.now(),
      name: form.name.trim(),
      post: form.post,
      shift: form.shift,
      status: "active",
    }

    setRows((current) => [newRow, ...current])
    setForm({ name: "", post: "Main Gate", shift: "Day" })
    setShowForm(false)
  }

  return (
    <div>
      <Topbar title="Security" subtitle="Guards, posts and shift coverage" />
      <div className="px-8 pb-10 space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm((value) => !value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Guard
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-800 bg-ink-900 p-4 grid gap-3 md:grid-cols-3">
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Guard name"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
              required
            />
            <input
              value={form.post}
              onChange={(event) => setForm((current) => ({ ...current, post: event.target.value }))}
              placeholder="Post"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <button type="submit" className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-ink-950">
              Save Guard
            </button>
          </form>
        )}

        <DataTable columns={columns} rows={rows} rowActions={(row) => renderRowActions(row, toggleStatus)} />
      </div>
    </div>
  )
}
