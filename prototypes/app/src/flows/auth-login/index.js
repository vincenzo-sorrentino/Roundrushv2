import { renderLoginPage, mountGradientPointer } from "./screens/login-form.js"

/* ── Prototype credential store ────────────────────────────────
   Maps email → password. Simulates known accounts.
   All comparisons are case-insensitive on the email side.
   ──────────────────────────────────────────────────────────── */
const KNOWN_ACCOUNTS = {
  "demo@roundrush.com":  "demo123",
  "admin@roundrush.com": "admin123",
}

// Emails that should trigger the "account locked" state
const LOCKED_EMAILS = new Set(["locked@roundrush.com"])

/* ── Helpers ───────────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll(".rr-auth-screen").forEach(el => {
    el.hidden = el.id !== id
  })
}

export function showFinishedOverlay() {
  const overlay = document.getElementById("rr-auth-finished-overlay")
  if (!overlay) return
  overlay.hidden = false
  overlay.querySelector("a")?.focus()
}

function setError(msg) {
  const el = document.getElementById("rr-login-error")
  if (!el) return
  el.textContent = msg
  el.hidden = false
}

function clearFeedback() {
  const err    = document.getElementById("rr-login-error")
  const notice = document.getElementById("rr-login-notice")
  if (err)    { err.hidden = true;    err.textContent = "" }
  if (notice) { notice.hidden = true }
  document.getElementById("rr-email")?.classList.remove("is-error")
  document.getElementById("rr-password")?.classList.remove("is-error")
}

/* ── Render ─────────────────────────────────────────────────── */
export function renderAuthLoginFlow() {
  return renderLoginPage()
}

/* ── Mount ──────────────────────────────────────────────────── */
export function mountAuthLoginFlow() {
  const root = document.querySelector("[data-flow='auth-login']")
  if (!root) return

  mountGradientPointer(root)

  /* ── Login form submit ──────────────────────────────────── */
  root.querySelector("#rr-login-form")?.addEventListener("submit", e => {
    e.preventDefault()
    clearFeedback()

    const emailInput    = document.getElementById("rr-email")
    const passwordInput = document.getElementById("rr-password")
    const email         = emailInput?.value.trim().toLowerCase() ?? ""
    const password      = passwordInput?.value ?? ""

    // Basic presence validation
    if (!email || !password) {
      setError("Please enter both your email and password.")
      return
    }

    // AUT-M001-F001: account temporarily locked (brute-force guard)
    if (LOCKED_EMAILS.has(email)) {
      setError("Too many failed attempts. Your account is temporarily locked. Please try again in 15 minutes or contact support.")
      emailInput?.classList.add("is-error")
      return
    }

    // AUT-M001-F001: email not found → invitation link
    if (!(email in KNOWN_ACCOUNTS)) {
      document.getElementById("rr-login-notice").hidden = false
      return
    }

    // AUT-M001-F001: wrong password — neutral error (no field disclosure)
    if (KNOWN_ACCOUNTS[email] !== password) {
      setError("Email or password is incorrect. Please try again.")
      passwordInput?.classList.add("is-error")
      return
    }

    // ── Success ──────────────────────────────────────────────
    showScreen("rr-screen-success")
    setTimeout(() => showFinishedOverlay(), 1200)
  })

  /* ── "Forgot password?" button ──────────────────────────── */
  root.querySelector("#rr-forgot-btn")?.addEventListener("click", () => {
    clearFeedback()
    showScreen("rr-screen-forgot")
    document.getElementById("rr-forgot-email")?.focus()
  })

  /* ── Forgot password form submit ────────────────────────── */
  root.querySelector("#rr-forgot-form")?.addEventListener("submit", e => {
    e.preventDefault()
    const email = document.getElementById("rr-forgot-email")?.value.trim()
    if (!email) return

    // AUT-M001-F002: show confirmation with the submitted email address
    const sentText = document.getElementById("rr-reset-sent-text")
    if (sentText) {
      sentText.textContent =
        `A password reset link has been sent to ${email}. ` +
        `It expires in 30 minutes. If you don't see it, check your spam folder.`
    }
    showScreen("rr-screen-reset-sent")
  })

  /* ── "Back to login" from forgot form ───────────────────── */
  root.querySelector("#rr-back-login")?.addEventListener("click", () => {
    showScreen("rr-screen-login")
  })

  /* ── "Back to login" from reset-sent screen ─────────────── */
  root.querySelector("#rr-back-login-2")?.addEventListener("click", () => {
    document.getElementById("rr-forgot-email").value = ""
    showScreen("rr-screen-login")
  })
}
