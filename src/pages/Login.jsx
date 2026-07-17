import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Home, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import hostelImage from "../assets/Hostel.jpeg"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState("")

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Invalid email or password.")
    } finally {
      setSubmitting(false)
    }
  }

  const fillDemo = () => {
    setEmail("admin@geetauniversity.edu.in")
    setPassword("demo1234")
  }

  return (
    <div className="min-h-screen w-full flex bg-ink-950">
      {/* Left hero panel — matches HostelConnect brand hero */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between overflow-hidden">
        <img
          src={hostelImage}
          alt="Hostel view"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />

        <div className="relative z-10 p-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-400 flex items-center justify-center">
            <Home size={20} className="text-ink-950" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">HostelConnect</p>
            <p className="text-amber-400 text-[11px] tracking-widest font-medium leading-tight">
              GEETA UNIVERSITY
            </p>
          </div>
        </div>

        <div className="relative z-10 p-10 pb-16 max-w-md">
          <span className="inline-block text-amber-400 text-[11px] tracking-[0.2em] font-semibold border-t border-amber-400/60 pt-2 mb-4">
            A MODERN HOSTEL EXPERIENCE
          </span>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Live, Learn, <span className="text-amber-400">Belong.</span>
          </h1>
          <p className="text-ink-300 text-sm leading-relaxed">
            One portal for complaints, leave, visitor passes, mess and
            notices — built for the residents of Geeta University.
          </p>
        </div>

        <div className="relative z-10 px-10 pb-6 text-ink-400 text-xs">
          © 2026 Geeta University — HostelConnect
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-lg bg-amber-400 flex items-center justify-center">
              <Home size={18} className="text-ink-950" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-semibold leading-tight">HostelConnect</p>
              <p className="text-amber-400 text-[10px] tracking-widest font-medium">
                GEETA UNIVERSITY
              </p>
            </div>
          </div>

          <span className="text-amber-400 text-[11px] tracking-[0.2em] font-semibold border-t border-amber-400/60 inline-block pt-2">
            WELCOME BACK
          </span>
          <h2 className="text-2xl font-bold text-white mt-3">
            Sign in to Admin Console
          </h2>
          <p className="text-ink-300 text-sm mt-2 mb-8">
            Enter your credentials to access the admin portal.
          </p>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-ink-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@geetauniversity.edu"
                className="w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs text-ink-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5 pr-10 text-sm text-ink-100 outline-none transition-colors focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 font-semibold text-sm py-2.5 transition-colors disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>

            <div className="flex items-center justify-between text-xs">
              <Link to="/forgot-password" className="text-ink-400 hover:text-ink-200">Forgot password?</Link>
              <Link to="/create-account" className="text-ink-400 hover:text-ink-200">Create an account</Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-ink-800">
            <p className="text-[11px] tracking-widest text-ink-500 mb-3">
              DEMO ACCOUNT — TAP TO FILL
            </p>
            <button
              onClick={fillDemo}
              className="w-full rounded-lg bg-ink-900 border border-ink-700 hover:border-amber-400/60 text-sm text-ink-200 py-2.5 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
