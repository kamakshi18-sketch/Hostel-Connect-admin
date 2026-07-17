export default function StatCard({ icon: Icon, value, label, note, tone = "amber" }) {
  const tones = {
    amber: "bg-amber-400/10 text-amber-400",
    danger: "bg-danger/10 text-danger",
    success: "bg-success/10 text-success",
    neutral: "bg-ink-700 text-ink-200",
  }

  return (
    <div className="bg-ink-900 border border-ink-800 rounded-2xl p-5 flex items-start gap-4">
      {Icon && (
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
          <Icon size={18} />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-sm text-ink-200 mt-1.5">{label}</p>
        {note && <p className="text-xs text-ink-500 mt-0.5">{note}</p>}
      </div>
    </div>
  )
}
