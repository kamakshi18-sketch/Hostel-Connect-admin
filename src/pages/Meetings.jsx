import { useState } from "react"
import { Plus, CalendarClock } from "lucide-react"
import Topbar from "../components/Topbar"
import { meetings as initialMeetings } from "../data/mockData"

export default function Meetings() {
  const [showForm, setShowForm] = useState(false)
  const [meetings, setMeetings] = useState(initialMeetings)
  const [form, setForm] = useState({ title: "", date: "", attendees: "" })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    setMeetings((current) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        date: form.date.trim() || "Scheduled soon",
        attendees: form.attendees.trim() || "All staff",
      },
      ...current,
    ])

    setForm({ title: "", date: "", attendees: "" })
    setShowForm(false)
  }

  return (
    <div>
      <Topbar title="Meetings" subtitle="Scheduled syncs and briefings" />
      <div className="px-8 pb-10 space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm((value) => !value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Schedule Meeting
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-800 bg-ink-900 p-4 space-y-3">
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Meeting title"
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
              required
            />
            <input
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
              placeholder="Date and time"
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <input
              value={form.attendees}
              onChange={(event) => setForm((current) => ({ ...current, attendees: event.target.value }))}
              placeholder="Attendees"
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <button type="submit" className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-ink-950">
              Save Meeting
            </button>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {meetings.map((m) => (
            <div key={m.id} className="bg-ink-900 border border-ink-800 rounded-2xl p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <CalendarClock size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{m.title}</p>
                <p className="text-ink-400 text-xs mt-1">{m.date}</p>
                <p className="text-ink-500 text-xs mt-0.5">{m.attendees}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
