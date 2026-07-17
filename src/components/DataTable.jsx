import StatusBadge from "./StatusBadge"

export default function DataTable({ columns, rows, rowActions, renderCell }) {
  return (
    <div className="bg-ink-900 border border-ink-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-800">
              {columns.map((col) => (
                <th key={col.key} className="text-left text-ink-500 font-medium px-5 py-3 text-xs tracking-wide uppercase">
                  {col.label}
                </th>
              ))}
              {rowActions && (
                <th className="text-left text-ink-500 font-medium px-5 py-3 text-xs tracking-wide uppercase">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id ?? i} className="border-b border-ink-800 last:border-0 hover:bg-ink-800/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-ink-200">
                    {renderCell ? (
                      renderCell(row, col)
                    ) : col.key === "status" ? (
                      <StatusBadge status={row[col.key]} />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
                {rowActions && <td className="px-5 py-3.5">{rowActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <p className="text-center text-ink-500 text-sm py-10">No records yet.</p>
      )}
    </div>
  )
}
