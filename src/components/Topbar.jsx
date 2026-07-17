export default function Topbar({ title, subtitle }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })

  return (
    <div className="flex flex-col gap-3 px-4 pt-6 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pt-8 sm:pb-6">
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-400">{subtitle}</p>}
      </div>
      <span className="text-sm text-ink-400">{today}</span>
    </div>
  )
}
