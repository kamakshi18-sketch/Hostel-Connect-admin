export const staffOverview = [
  { id: 1, name: "Dr. Seema Arora", role: "Chief Warden", status: "active" },
  { id: 2, name: "Prof. Rajesh Khanna", role: "Warden - Block B", status: "active" },
  { id: 3, name: "Ramesh Singh", role: "Head Security Guard", status: "active" },
  { id: 4, name: "Mohan Das", role: "Security Guard", status: "active" },
  { id: 5, name: "Imran Khan", role: "Security Guard", status: "on leave" },
]

export const recentNotices = [
  { id: 1, title: "Water Supply Interruption", meta: "Warden · Block A · 1 Jul", urgent: true },
  { id: 2, title: "End Semester Exam Schedule", meta: "Chief Warden · 30 Jun", urgent: true },
  { id: 3, title: "Hostel Annual Day Celebration", meta: "Hostel Committee · 28 Jun", urgent: false },
  { id: 4, title: "New Mess Menu Update", meta: "Warden · Mess Committee · 27 Jun", urgent: false },
]

export const wardens = [
  { id: 1, name: "Dr. Seema Arora", block: "All Blocks", role: "Chief Warden", phone: "+91 98765 43210", status: "active" },
  { id: 2, name: "Prof. Rajesh Khanna", block: "Block B", role: "Warden", phone: "+91 98765 43211", status: "active" },
]

export const students = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  room: `${["A", "B", "C"][i % 3]}-${100 + i}`,
  block: ["Block A", "Block B", "Block C"][i % 3],
  course: "BCA",
  status: i % 5 === 0 ? "pending KYC" : "active",
}))

export const securityStaff = [
  { id: 1, name: "Ramesh Singh", post: "Main Gate", shift: "Day", status: "active" },
  { id: 2, name: "Mohan Das", post: "Block A Gate", shift: "Night", status: "active" },
  { id: 3, name: "Imran Khan", post: "Block B Gate", shift: "Day", status: "on leave" },
]

export const workers = [
  { id: 1, name: "Suresh Yadav", role: "Housekeeping", block: "Block A", status: "active" },
  { id: 2, name: "Geeta Devi", role: "Housekeeping", block: "Block B", status: "active" },
  { id: 3, name: "Vikram Rathi", role: "Maintenance", block: "All Blocks", status: "active" },
  { id: 4, name: "Anita Kumari", role: "Mess Staff", block: "Mess Hall", status: "active" },
]

export const meetings = [
  { id: 1, title: "Monthly Warden Sync", date: "18 Jul, 4:00 PM", attendees: "All Wardens" },
  { id: 2, title: "Security Briefing", date: "20 Jul, 10:00 AM", attendees: "Security Team" },
]

export const attendance = [
  { id: 1, name: "Dr. Seema Arora", role: "Chief Warden", checkIn: "9:02 AM", status: "present" },
  { id: 2, name: "Ramesh Singh", role: "Head Security", checkIn: "8:55 AM", status: "present" },
  { id: 3, name: "Imran Khan", role: "Security Guard", checkIn: "—", status: "on leave" },
]

export const blocks = [
  { id: 1, name: "Block A", rooms: 40, occupied: 34, warden: "Prof. Rajesh Khanna" },
  { id: 2, name: "Block B", rooms: 35, occupied: 30, warden: "Prof. Rajesh Khanna" },
  { id: 3, name: "Block C", rooms: 28, occupied: 21, warden: "Dr. Seema Arora" },
]

export const complaints = [
  { id: 1, title: "Leaking tap in Room A-104", block: "Block A", status: "open" },
  { id: 2, title: "Wi-Fi down in Block C", block: "Block C", status: "open" },
  { id: 3, title: "Broken chair in mess hall", block: "Mess Hall", status: "open" },
  { id: 4, title: "Noisy corridor lights", block: "Block B", status: "open" },
]

export const stats = {
  totalStaff: 10,
  totalStaffNote: "9 active · 1 on leave",
  students: 12,
  studentsNote: "9 rooms occupied",
  openComplaints: 4,
  openComplaintsNote: "Across all blocks",
  pendingLeaves: 2,
  pendingLeavesNote: "Awaiting warden action",
}
