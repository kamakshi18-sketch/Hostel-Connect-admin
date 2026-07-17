import { useState } from "react"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar"
import StatusBadge from "../components/StatusBadge"
import { useNotices } from "../context/NoticeContext"

export default function Notices() {
  const { notices, addNotice } = useNotices()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", meta: "", urgent: false })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    addNotice(form)

    setForm({ title: "", meta: "", urgent: false })
    setShowForm(false)
  }

  return (
    <div>
      <Topbar title="Notices" subtitle="Announcements sent to students and staff" />
      <div className="px-8 pb-10 space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm((value) => !value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Post Notice
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-800 bg-ink-900 p-4 space-y-3">
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Notice title"
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
              required
            />
            <input
              value={form.meta}
              onChange={(event) => setForm((current) => ({ ...current, meta: event.target.value }))}
              placeholder="Details / sender"
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <label className="flex items-center gap-2 text-sm text-ink-300">
              <input
                type="checkbox"
                checked={form.urgent}
                onChange={(event) => setForm((current) => ({ ...current, urgent: event.target.checked }))}
                className="h-4 w-4 rounded border-ink-700 bg-ink-950"
              />
              Mark as urgent
            </label>
            <button type="submit" className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-ink-950">
              Save Notice
            </button>
          </form>
        )}

        <div className="bg-ink-900 border border-ink-800 rounded-2xl">
          {notices.map((n) => (
            <div key={n.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-white text-sm">{n.title}</p>
                <p className="text-ink-500 text-xs mt-0.5">{n.meta}</p>
              </div>
              {n.urgent && <StatusBadge status="urgent" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
