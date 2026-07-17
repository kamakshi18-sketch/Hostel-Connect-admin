const map = {
  active: "bg-success/10 text-success",
  present: "bg-success/10 text-success",
  "on leave": "bg-amber-400/10 text-amber-400",
  pending: "bg-amber-400/10 text-amber-400",
  "pending KYC": "bg-amber-400/10 text-amber-400",
  open: "bg-danger/10 text-danger",
  urgent: "bg-danger/10 text-danger",
  closed: "bg-ink-700 text-ink-300",
}

export default function StatusBadge({ status }) {
  const cls = map[status] || "bg-ink-700 text-ink-300"
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize ${cls}`}>
      {status}
    </span>
  )
}
