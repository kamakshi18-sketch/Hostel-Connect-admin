import { useState } from "react"
import { DoorOpen, Plus, UserCheck } from "lucide-react"
import Topbar from "../components/Topbar"
import { blocks as initialBlocks, students as initialStudents } from "../data/mockData"

const createInitialRooms = () => {
  const seededStudents = initialStudents.slice(0, 8)
  return [
    { id: 1, block: "Block A", roomNumber: "A-101", occupants: [seededStudents[0].name, seededStudents[1].name] },
    { id: 2, block: "Block A", roomNumber: "A-102", occupants: [seededStudents[2].name] },
    { id: 3, block: "Block B", roomNumber: "B-201", occupants: [seededStudents[3].name, seededStudents[4].name] },
    { id: 4, block: "Block B", roomNumber: "B-202", occupants: [] },
    { id: 5, block: "Block C", roomNumber: "C-301", occupants: [seededStudents[5].name] },
    { id: 6, block: "Block C", roomNumber: "C-302", occupants: [] },
  ]
}

export default function RoomsBlocks() {
  const [rooms, setRooms] = useState(createInitialRooms())
  const [form, setForm] = useState({ block: "Block A", roomNumber: "A-101", studentName: "" })
  const [selectedRoomId, setSelectedRoomId] = useState(1)
  const [selectedResidentName, setSelectedResidentName] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.studentName.trim()) return

    setRooms((current) =>
      current.map((room) =>
        room.block === form.block && room.roomNumber === form.roomNumber
          ? { ...room, occupants: [...room.occupants, form.studentName.trim()] }
          : room
      )
    )

    setForm((current) => ({ ...current, studentName: "" }))
  }

  return (
    <div>
      <Topbar title="Rooms & Blocks" subtitle="Occupancy across hostel blocks" />
      <div className="px-8 pb-10 space-y-5">
        <div className="grid md:grid-cols-3 gap-4">
          {initialBlocks.map((block) => {
            const blockRooms = rooms.filter((room) => room.block === block.name)
            const occupiedRooms = blockRooms.filter((room) => room.occupants.length > 0).length
            const pct = Math.round((occupiedRooms / blockRooms.length) * 100)

            return (
              <div key={block.id} className="bg-ink-900 border border-ink-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <DoorOpen size={16} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{block.name}</p>
                    <p className="text-ink-500 text-xs">Warden: {block.warden}</p>
                  </div>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-white text-lg font-bold">{occupiedRooms}/{blockRooms.length}</span>
                  <span className="text-ink-400 text-xs">{pct}% occupied</span>
                </div>
                <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>

                <div className="mt-4 space-y-2">
                  {blockRooms.map((room) => {
                    const isSelected = selectedRoomId === room.id
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => {
                          setSelectedRoomId(room.id)
                          setSelectedResidentName(room.occupants[0] || "")
                        }}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isSelected ? "border-amber-400 bg-amber-400/10" : "border-ink-800 bg-ink-950/70"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white">{room.roomNumber}</p>
                          <span className="text-[11px] text-amber-400">{room.occupants.length} resident{room.occupants.length === 1 ? "" : "s"}</span>
                        </div>
                        {room.occupants.length > 0 ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {room.occupants.map((name) => (
                              <button
                                key={name}
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  setSelectedResidentName(name)
                                }}
                                className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] text-amber-300"
                              >
                                {name}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 text-xs text-ink-500">No resident assigned yet.</p>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl border border-ink-800 bg-ink-900 p-5">
          {(() => {
            const selectedRoom = rooms.find((room) => room.id === selectedRoomId)
            if (!selectedRoom) return null

            const selectedStudent = initialStudents.find((student) => student.name === selectedResidentName)

            return (
              <div className="mb-4 rounded-xl border border-ink-800 bg-ink-950/70 p-4">
                <p className="text-sm font-medium text-white">Selected room: {selectedRoom.roomNumber}</p>
                <p className="mt-1 text-sm text-ink-400">
                  {selectedRoom.occupants.length > 0
                    ? `Current resident${selectedRoom.occupants.length > 1 ? "s" : ""}: ${selectedRoom.occupants.join(", ")}`
                    : "No resident assigned yet."}
                </p>

                {selectedStudent ? (
                  <div className="mt-3 rounded-lg border border-ink-800 bg-ink-900/70 p-3">
                    <p className="text-sm font-medium text-white">{selectedStudent.name}</p>
                    <div className="mt-2 grid gap-1 text-sm text-ink-400 sm:grid-cols-2">
                      <p><span className="text-ink-500">Course:</span> {selectedStudent.course}</p>
                      <p><span className="text-ink-500">Block:</span> {selectedStudent.block}</p>
                      <p><span className="text-ink-500">Room:</span> {selectedStudent.room}</p>
                      <p><span className="text-ink-500">Status:</span> {selectedStudent.status}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-ink-500">Tap a student name to view their details.</p>
                )}
              </div>
            )
          })()}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <UserCheck size={16} />
            </div>
            <div>
              <p className="text-white font-medium">Add a student to a room</p>
              <p className="text-sm text-ink-400">Assign residents and inspect who currently lives in each room.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
            <select name="block" value={form.block} onChange={handleChange} className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2.5 text-sm text-white outline-none">
              {initialBlocks.map((block) => (
                <option key={block.id} value={block.name}>{block.name}</option>
              ))}
            </select>

            <select name="roomNumber" value={form.roomNumber} onChange={handleChange} className="rounded-lg bg-ink-950 border border-ink-700 px-3 py-2.5 text-sm text-white outline-none">
              {rooms.filter((room) => room.block === form.block).map((room) => (
                <option key={room.id} value={room.roomNumber}>{room.roomNumber}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                placeholder="Student name"
                className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-ink-90 placeholder:text-ink-500 outline-none"
              />
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-amber-400 px-3.5 py-2.5 text-sm font-medium text-ink-950">
                <Plus size={16} /> Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
