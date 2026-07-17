import { useState } from "react"
import { FileBarChart, Download, Upload } from "lucide-react"
import Topbar from "../components/Topbar"

const downloadReport = (title) => {
  const content = `HostelConnect Report\nTitle: ${title}\nGenerated: ${new Date().toLocaleString()}`
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

const initialReports = [
  { id: 1, title: "Monthly Occupancy Report", period: "June 2026", image: "" },
  { id: 2, title: "Complaint Resolution Summary", period: "June 2026", image: "" },
  { id: 3, title: "Staff Attendance Report", period: "June 2026", image: "" },
  { id: 4, title: "Mess Expense Report", period: "June 2026", image: "" },
]

export default function Reports() {
  const [reports, setReports] = useState(initialReports)
  const [form, setForm] = useState({ title: "", image: "" })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    setReports((current) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        period: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        image: form.image,
      },
      ...current,
    ])

    setForm({ title: "", image: "" })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm((current) => ({ ...current, image: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Topbar title="Reports" subtitle="Generated summaries for hostel operations" />
      <div className="px-8 pb-10 space-y-4">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-800 bg-ink-900 p-5 space-y-3">
          <div>
            <p className="text-white font-medium">Upload new report</p>
            <p className="text-sm text-ink-400">Add a report title and optionally attach an image.</p>
          </div>

          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Report title"
            className="w-full rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-white outline-none"
          />

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-ink-700 px-3.5 py-2.5 text-sm text-ink-400">
            <Upload size={16} className="text-amber-400" />
            <span>{form.image ? "Image attached" : "Upload report image"}</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <button type="submit" className="rounded-lg bg-amber-400 px-3.5 py-2.5 text-sm font-semibold text-ink-950">
            Save report
          </button>
        </form>

        <div className="bg-ink-900 border border-ink-800 rounded-2xl overflow-hidden">
          {reports.map((r) => (
            <div key={r.id} className="flex flex-col gap-3 border-b border-ink-800 px-5 py-4 last:border-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <FileBarChart size={16} />
                  </div>
                  <div>
                    <p className="text-white text-sm">{r.title}</p>
                    <p className="text-ink-500 text-xs">{r.period}</p>
                  </div>
                </div>
                <button
                  onClick={() => downloadReport(r.title)}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-medium"
                >
                  <Download size={14} /> Export
                </button>
              </div>
              {r.image && (
                <img src={r.image} alt={r.title} className="h-40 w-full rounded-xl object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
