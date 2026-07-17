import { Plus } from "lucide-react"
import { useState } from "react"
import Topbar from "../components/Topbar"
import DataTable from "../components/DataTable"
import { wardens as initialWardens } from "../data/mockData"
import { createPortalAccount, removePortalAccount } from "../utils/portalData"

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "block", label: "Assigned Block" },
  { key: "phone", label: "Phone" },
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

export default function Wardens() {
  const [rows, setRows] = useState(initialWardens)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", role: "Warden", block: "Block A", phone: "" })

  const toggleStatus = (id) => {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row

        const nextStatus = row.status === "active" ? "on leave" : "active"

        if (nextStatus === "active") {
          const portalAccount = createPortalAccount("warden", { id: row.id, name: row.name, status: "active" })
          return { ...row, status: nextStatus, portalId: portalAccount.portalId }
        }

        removePortalAccount("warden", row.id)
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
      role: form.role,
      block: form.block,
      phone: form.phone || "—",
      status: "active",
    }

    setRows((current) => [newRow, ...current])
    setForm({ name: "", role: "Warden", block: "Block A", phone: "" })
    setShowForm(false)
  }

  return (
    <div>
      <Topbar title="Wardens" subtitle="Manage warden accounts and block assignments" />
      <div className="px-8 pb-10 space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm((value) => !value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Warden
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-800 bg-ink-900 p-4 grid gap-3 md:grid-cols-4">
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Warden name"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
              required
            />
            <input
              value={form.block}
              onChange={(event) => setForm((current) => ({ ...current, block: event.target.value }))}
              placeholder="Block"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <input
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              placeholder="Phone"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <button type="submit" className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-ink-950">
              Save Warden
            </button>
          </form>
        )}

        <DataTable columns={columns} rows={rows} rowActions={(row) => renderRowActions(row, toggleStatus)} />
      </div>
    </div>
  )
}
