import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from "../apiClient"
import { useAuth } from "./AuthContext"

const NoticeContext = createContext(null)

export function NoticeProvider({ children }) {
  const { token } = useAuth()
  const [notices, setNotices] = useState([])

  const refresh = useCallback(() => {
    if (!token) return
    api
      .getNotices(token)
      .then((data) =>
        setNotices(
          data.map((n) => ({
            id: n.id,
            title: n.title,
            meta: `${n.postedByName || n.postedByRole} · ${n.date}`,
            urgent: n.important,
          }))
        )
      )
      .catch((err) => console.warn("Could not load notices:", err.message))
  }, [token])

  useEffect(() => { refresh() }, [refresh])

  const addNotice = async (notice) => {
    await api.postNotice(
      { title: notice.title.trim(), description: notice.meta?.trim() || "", important: notice.urgent, audience: ["all"] },
      token
    )
    refresh() // so it shows here too, and every other portal picks it up on their next load
  }

  return (
    <NoticeContext.Provider value={{ notices, addNotice }}>
      {children}
    </NoticeContext.Provider>
  )
}

export function useNotices() {
  const ctx = useContext(NoticeContext)
  if (!ctx) throw new Error("useNotices must be used within NoticeProvider")
  return ctx
}
