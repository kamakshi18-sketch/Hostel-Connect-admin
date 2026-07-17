import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-ink-800 bg-ink-900 p-6 shadow-2xl shadow-black/20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-white mb-5">
          <ArrowLeft size={16} /> Back to sign in
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <Mail size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Reset your password</h2>
            <p className="text-sm text-ink-400">We’ll send a secure reset link to your email.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-ink-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg bg-ink-950 border border-ink-700 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-500 outline-none focus:border-amber-400"
              placeholder="you@geetauniversity.edu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-400 hover:bg-amber-300 text-ink-950 font-semibold text-sm py-2.5 transition-colors"
          >
            Send reset link
          </button>
        </form>

        {submitted && (
          <div className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-3 text-sm text-emerald-300">
            If this email is registered, a reset link has been sent to {email || "your inbox"}.
          </div>
        )}
      </div>
    </div>
  )
}
