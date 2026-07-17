import { useMemo, useState } from "react"
import Topbar from "../components/Topbar"

function buildAttendanceMap(totalDays, presentDays) {
  const map = {}
  for (let day = 1; day <= totalDays; day += 1) {
    map[day] = day <= presentDays ? "present" : "absent"
  }
  return map
}

const initialMonthlyAttendanceData = {
  "July 2026": [
    { id: 1, name: "Dr. Seema Arora", role: "Warden", attendanceByDay: buildAttendanceMap(31, 24) },
    { id: 2, name: "Prof. Rajesh Khanna", role: "Warden", attendanceByDay: buildAttendanceMap(31, 23) },
    { id: 3, name: "Ramesh Singh", role: "Security", attendanceByDay: buildAttendanceMap(31, 22) },
    { id: 4, name: "Mohan Das", role: "Security", attendanceByDay: buildAttendanceMap(31, 24) },
    { id: 5, name: "Suresh Yadav", role: "Worker", attendanceByDay: buildAttendanceMap(31, 21) },
    { id: 6, name: "Geeta Devi", role: "Worker", attendanceByDay: buildAttendanceMap(31, 25) },
  ],
  "June 2026": [
    { id: 7, name: "Dr. Seema Arora", role: "Warden", attendanceByDay: buildAttendanceMap(30, 22) },
    { id: 8, name: "Prof. Rajesh Khanna", role: "Warden", attendanceByDay: buildAttendanceMap(30, 21) },
    { id: 9, name: "Ramesh Singh", role: "Security", attendanceByDay: buildAttendanceMap(30, 20) },
    { id: 10, name: "Mohan Das", role: "Security", attendanceByDay: buildAttendanceMap(30, 22) },
    { id: 11, name: "Suresh Yadav", role: "Worker", attendanceByDay: buildAttendanceMap(30, 19) },
    { id: 12, name: "Geeta Devi", role: "Worker", attendanceByDay: buildAttendanceMap(30, 23) },
  ],
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getMonthDetails(monthLabel) {
  const [monthName, yearString] = monthLabel.split(" ")
  const date = new Date(`${monthName} 1, ${yearString}`)
  const year = date.getFullYear()
  const month = date.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  return { year, month, daysInMonth, firstDay }
}

export default function StaffAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("July 2026")
  const [attendanceData, setAttendanceData] = useState(initialMonthlyAttendanceData)
  const [selectedDate, setSelectedDate] = useState(null)

  const rows = attendanceData[selectedMonth] || attendanceData["July 2026"]
  const monthDetails = useMemo(() => getMonthDetails(selectedMonth), [selectedMonth])

  const calendarCells = useMemo(() => {
    const { firstDay, daysInMonth } = monthDetails
    const cells = []

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
  }, [monthDetails])

  const openDateEditor = (row, day) => {
    setSelectedDate({ rowId: row.id, day, month: selectedMonth })
  }

  const updateAttendance = (status) => {
    if (!selectedDate) return

    setAttendanceData((current) => ({
      ...current,
      [selectedMonth]: current[selectedMonth].map((row) =>
        row.id === selectedDate.rowId
          ? {
              ...row,
              attendanceByDay: {
                ...row.attendanceByDay,
                [selectedDate.day]: status,
              },
            }
          : row
      ),
    }))
  }

  const selectedPerson = rows.find((row) => row.id === selectedDate?.rowId) || null

  return (
    <div>
      <Topbar title="Staff Attendance" subtitle="Monthly attendance for wardens, security staff, and workers" />
      <div className="px-8 pb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-800 bg-ink-900 p-4">
          <div>
            <p className="text-white font-medium">Monthly attendance calendar</p>
            <p className="text-sm text-ink-400">Green dates mean present and red dates mean absent.</p>
          </div>
          <select
            value={selectedMonth}
            onChange={(event) => {
              setSelectedMonth(event.target.value)
              setSelectedDate(null)
            }}
            className="rounded-lg border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-white outline-none"
          >
            {Object.keys(attendanceData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-success" /> Present
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-danger" /> Absent
          </span>
        </div>

        <div className="space-y-3">
          {rows.map((row) => {
            const presentDays = Object.values(row.attendanceByDay).filter((status) => status === "present").length
            const absentDays = Object.values(row.attendanceByDay).filter((status) => status === "absent").length
            const attendance = `${Math.round((presentDays / Object.keys(row.attendanceByDay).length) * 100)}%`

            return (
              <div key={row.id} className="w-full max-w-[33%] rounded-2xl border border-ink-800 bg-ink-900 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-white font-medium">{row.name}</p>
                    <p className="text-sm text-ink-400">{row.role}</p>
                  </div>
                  <div className="text-right text-sm text-ink-400">
                    <p>{presentDays} present</p>
                    <p>{absentDays} absent</p>
                  </div>
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

                    const status = row.attendanceByDay[cell] || "absent"
                    return (
                      <button
                        key={`${row.id}-${cell}`}
                        type="button"
                        onClick={() => openDateEditor(row, cell)}
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                          status === "present"
                            ? "bg-success/20 text-success"
                            : "bg-danger/20 text-danger"
                        }`}
                      >
                        {cell}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {selectedDate && selectedPerson && (
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-4">
            <p className="text-white font-medium">{selectedPerson.name}</p>
            <p className="text-sm text-ink-400">{selectedMonth} · Day {selectedDate.day}</p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateAttendance("present")}
                className="rounded-lg bg-success/20 px-3 py-2 text-sm font-medium text-success"
              >
                Present
              </button>
              <button
                type="button"
                onClick={() => updateAttendance("absent")}
                className="rounded-lg bg-danger/20 px-3 py-2 text-sm font-medium text-danger"
              >
                Absent
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
