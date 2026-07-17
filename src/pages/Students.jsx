import { Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"
import Topbar from "../components/Topbar"
import DataTable from "../components/DataTable"
import { students as initialStudents } from "../data/mockData"
import { createPortalAccount, removePortalAccount } from "../utils/portalData"

const columns = [
  { key: "name", label: "Name" },
  { key: "room", label: "Room" },
  { key: "block", label: "Block" },
  { key: "course", label: "Course" },
  { key: "status", label: "Status" },
]

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const buildAttendanceMap = (totalDays, presentDays) => {
  const map = {}
  for (let day = 1; day <= totalDays; day += 1) {
    map[day] = day <= presentDays ? "present" : "absent"
  }
  return map
}

const monthlyAttendanceData = {
  July: [
    { id: 1, name: "Student 1", attendanceByDay: buildAttendanceMap(31, 24) },
    { id: 2, name: "Student 2", attendanceByDay: buildAttendanceMap(31, 23) },
    { id: 3, name: "Student 3", attendanceByDay: buildAttendanceMap(31, 22) },
    { id: 4, name: "Student 4", attendanceByDay: buildAttendanceMap(31, 20) },
    { id: 5, name: "Student 5", attendanceByDay: buildAttendanceMap(31, 21) },
  ],
  June: [
    { id: 6, name: "Student 1", attendanceByDay: buildAttendanceMap(30, 22) },
    { id: 7, name: "Student 2", attendanceByDay: buildAttendanceMap(30, 21) },
    { id: 8, name: "Student 3", attendanceByDay: buildAttendanceMap(30, 20) },
    { id: 9, name: "Student 4", attendanceByDay: buildAttendanceMap(30, 19) },
    { id: 10, name: "Student 5", attendanceByDay: buildAttendanceMap(30, 18) },
  ],
}

const renderRowActions = (row, toggleStatus) => (
  <button
    onClick={() => toggleStatus(row.id)}
    className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5 text-xs font-medium text-amber-300"
  >
    {row.status === "present" ? "Set absent" : "Set present"}
  </button>
)

export default function Students() {
  const [rows, setRows] = useState(initialStudents)
  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [attendanceData, setAttendanceData] = useState(monthlyAttendanceData)
  const [form, setForm] = useState({ name: "", room: "A-101", block: "Block A", course: "BCA" })

  const toggleStatus = (id) => {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row

        const nextStatus = row.status === "present" ? "absent" : "present"

        if (nextStatus === "present") {
          const portalAccount = createPortalAccount("student", { id: row.id, name: row.name, status: "present" })
          return { ...row, status: nextStatus, portalId: portalAccount.portalId }
        }

        removePortalAccount("student", row.id)
        return { ...row, status: nextStatus, portalId: "" }
      })
    )
  }

  const filtered = rows.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  const attendanceRows = useMemo(() => {
    const selectedName = selectedStudent?.name
    if (!selectedName) return []
    const monthData = attendanceData["July"] || []
    return monthData.filter((student) => student.name === selectedName)
  }, [attendanceData, selectedStudent])

  const calendarCells = useMemo(() => {
    const cells = []
    const firstDay = new Date(2026, 6, 1).getDay()
    const daysInMonth = 31

    for (let index = 0; index < firstDay; index += 1) {
      cells.push(null)
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(day)
    }

    while (cells.length % 7 !== 0) {
      cells.push(null)
    }

    return cells
  }, [])

  const toggleAttendance = (day) => {
    if (!selectedStudent) return

    setAttendanceData((current) => ({
      ...current,
      July: current.July.map((student) => {
        if (student.name !== selectedStudent.name) return student
        return {
          ...student,
          attendanceByDay: {
            ...student.attendanceByDay,
            [day]: student.attendanceByDay[day] === "present" ? "absent" : "present",
          },
        }
      }),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const newRow = {
      id: Date.now(),
      name: form.name.trim(),
      room: form.room,
      block: form.block,
      course: form.course,
      status: "present",
    }

    setRows((current) => [newRow, ...current])
    setForm({ name: "", room: "A-101", block: "Block A", course: "BCA" })
    setShowForm(false)
  }

  return (
    <div>
      <Topbar title="Students" subtitle="All residents across blocks" />
      <div className="px-8 pb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students..."
              className="w-full rounded-lg bg-ink-900 border border-ink-700 pl-9 pr-3 py-2 text-sm text-white outline-none"
            />
          </div>
          <button
            onClick={() => setShowForm((value) => !value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Student
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-800 bg-ink-900 p-4 grid gap-3 md:grid-cols-4">
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Student name"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
              required
            />
            <input
              value={form.room}
              onChange={(event) => setForm((current) => ({ ...current, room: event.target.value }))}
              placeholder="Room"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <input
              value={form.block}
              onChange={(event) => setForm((current) => ({ ...current, block: event.target.value }))}
              placeholder="Block"
              className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
            />
            <button type="submit" className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-ink-950">
              Save Student
            </button>
          </form>
        )}

        <div className="rounded-2xl border border-ink-800 bg-ink-900 p-4">
          <DataTable
            columns={columns}
            rows={filtered}
            rowActions={(row) => renderRowActions(row, toggleStatus)}
            renderCell={(row, col) => {
              if (col.key === "name") {
                return (
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(row)}
                    className="text-left font-medium text-amber-300 hover:text-amber-200"
                  >
                    {row.name}
                  </button>
                )
              }

              if (col.key === "status") {
                return <span className="capitalize">{row.status}</span>
              }

              return row[col.key]
            }}
          />
        </div>

        {selectedStudent && (
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-4">
            <div className="mb-3">
              <p className="text-white font-medium">{selectedStudent.name}</p>
              <p className="text-sm text-ink-400">{selectedStudent.room} · {selectedStudent.block} · {selectedStudent.course}</p>
            </div>

            <div className="grid grid-cols-7 gap-1 text-[10px] text-ink-500">
              {dayNames.map((day) => (
                <div key={day} className="text-center font-medium uppercase py-0.5">
                  {day}
                </div>
              ))}
              {calendarCells.map((cell, index) => {
                if (!cell) {
                  return <div key={`blank-${index}`} className="h-6 rounded-sm bg-transparent" />
                }

                const attendance = attendanceRows[0]?.attendanceByDay[cell] || "absent"
                return (
                  <button
                    key={`${selectedStudent.id}-${cell}`}
                    type="button"
                    onClick={() => toggleAttendance(cell)}
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                      attendance === "present"
                        ? "bg-success text-ink-950 shadow-[0_0_0_2px_rgba(255,255,255,0.2)]"
                        : "bg-danger/20 text-danger"
                    }`}
                  >
                    {cell}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
