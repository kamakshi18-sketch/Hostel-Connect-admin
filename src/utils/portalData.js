const STORAGE_KEYS = {
  wardens: "hc_wardens",
  students: "hc_students",
  security: "hc_security",
  workers: "hc_workers",
  portalAccounts: "hc_portal_accounts",
}

function readFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeToStorage(key, value) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function loadList(key, fallback) {
  return readFromStorage(key, fallback)
}

export function saveList(key, value) {
  writeToStorage(key, value)
}

export function getPortalAccounts() {
  return readFromStorage(STORAGE_KEYS.portalAccounts, [])
}

export function savePortalAccounts(accounts) {
  writeToStorage(STORAGE_KEYS.portalAccounts, accounts)
}

export function getPortalAccountsForRole(role) {
  return getPortalAccounts().filter((entry) => entry.role === role)
}

export function createPortalAccount(role, person) {
  const normalizedRole = role.toLowerCase()
  const accounts = getPortalAccounts()
  const existing = accounts.find(
    (entry) => entry.referenceId === person.id && entry.role === normalizedRole
  )

  const prefixMap = {
    warden: "WDN",
    student: "STU",
    security: "SEC",
    worker: "WRK",
  }

  const prefix = prefixMap[normalizedRole] ?? "ACC"
  const nextId = `${prefix}-${String(accounts.filter((entry) => entry.role === normalizedRole).length + 1).padStart(3, "0")}`

  const nextEntry = {
    id: existing?.id ?? Date.now(),
    role: normalizedRole,
    referenceId: person.id,
    name: person.name,
    email: person.email ?? `${person.name.toLowerCase().replace(/\s+/g, ".")}@geetauniversity.edu`,
    status: person.status ?? "active",
    portalId: existing?.portalId ?? nextId,
  }

  const updated = existing
    ? accounts.map((entry) => (entry.id === existing.id ? nextEntry : entry))
    : [...accounts, nextEntry]

  savePortalAccounts(updated)
  return nextEntry
}

export function removePortalAccount(role, referenceId) {
  const accounts = getPortalAccounts().filter(
    (entry) => !(entry.role === role && entry.referenceId === referenceId)
  )
  savePortalAccounts(accounts)
  return accounts
}

export function createRoleEntry(role, payload) {
  const baseId = Date.now()

  switch (role) {
    case "warden":
      return {
        id: baseId,
        name: payload.name,
        role: "Warden",
        block: payload.block || "Block A",
        phone: payload.phone || "—",
        status: "active",
      }
    case "student":
      return {
        id: baseId,
        name: payload.name,
        room: payload.room || "A-101",
        block: payload.block || "Block A",
        course: payload.course || "BCA",
        status: "active",
      }
    case "security":
      return {
        id: baseId,
        name: payload.name,
        post: payload.post || "Main Gate",
        shift: payload.shift || "Day",
        status: "active",
      }
    case "worker":
      return {
        id: baseId,
        name: payload.name,
        role: payload.workRole || "Housekeeping",
        block: payload.block || "Block A",
        status: "active",
      }
    default:
      return payload
  }
}

export function saveRoleEntry(role, entry) {
  const keyMap = {
    warden: STORAGE_KEYS.wardens,
    student: STORAGE_KEYS.students,
    security: STORAGE_KEYS.security,
    worker: STORAGE_KEYS.workers,
  }

  const key = keyMap[role]
  if (!key) return

  const rows = loadList(key, [])
  saveList(key, [...rows, entry])
}
