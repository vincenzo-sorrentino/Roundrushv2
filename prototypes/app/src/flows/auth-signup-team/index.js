import { ABSTRACT_BG_SVG, mountGradientPointer, RR_FULL_LOGO } from "../auth-login/screens/login-form.js"

/* ──────────────────────────────────────────────────────────
   Signup — Team Member  (AUT-M002)
   Route: /auth/signup/team
   Role:  team — a person joining the product team
   ────────────────────────────────────────────────────────── */

const INVITE = {
  email:    "newteam@roundrush.com",
  teamName: "Give Payments",
  role:     "team",
}

const CHECK_ICON = `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true">
  <polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const TEAM_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="2"/>
  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M21 21v-2a4 4 0 0 0-3-3.85" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`

// ── Password strength requirements ────────────────────────
const PW_RULES = [
  { id: "pw-len",   label: "At least 8 characters",  test: v => v.length >= 8 },
  { id: "pw-num",   label: "At least one number",     test: v => /[0-9]/.test(v) },
  { id: "pw-upper", label: "At least one uppercase",  test: v => /[A-Z]/.test(v) },
]

function renderPasswordStrength() {
  return `
    <div class="rr-auth-pw-strength" id="rr-signup-pw-strength" hidden>
      ${PW_RULES.map(r => `
        <div class="rr-auth-pw-requirement" id="${r.id}">
          <span class="rr-auth-pw-dot"></span>
          <span>${r.label}</span>
        </div>
      `).join("")}
    </div>
  `
}

// ── Render ─────────────────────────────────────────────────
export function renderAuthSignupTeamFlow() {
  return `
    <div class="rr-auth" data-flow="auth-signup-team">

      <!-- ── Left: abstract IT background ── -->
      <div class="rr-auth-photo" aria-hidden="true">
        ${ABSTRACT_BG_SVG}
      </div>

      <!-- ── Right: content panel ── -->
      <div class="rr-auth-right">

        <div class="rr-auth-wordmark" aria-label="Roundrush">
          ${RR_FULL_LOGO}
        </div>

        <!-- ════════════════════════════════
             SCREEN: Registration form
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-register">
          <form class="rr-auth-form" id="rr-signup-form" novalidate>

            <!-- Invite header -->
            <div class="rr-auth-invite-header">
              <div class="rr-auth-role-chip rr-auth-role-chip--team">${TEAM_ICON} Team member</div>
              <p class="rr-auth-form-title">Join ${INVITE.teamName}</p>
              <p class="rr-auth-form-sub">You've been invited to join the team. Complete your account to get started.</p>
            </div>

            <!-- Error banner -->
            <div class="rr-auth-error" id="rr-signup-error" hidden></div>

            <!-- Email (pre-filled, read-only) -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-signup-email">Email</label>
              <input
                class="rr-auth-input"
                type="email"
                id="rr-signup-email"
                name="email"
                value="${INVITE.email}"
                readonly
                autocomplete="email"
              />
            </div>

            <!-- Full name -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-signup-name">Full name</label>
              <input
                class="rr-auth-input"
                type="text"
                id="rr-signup-name"
                name="name"
                placeholder="Your full name"
                autocomplete="name"
              />
            </div>

            <!-- Password + live strength indicator -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-signup-password">Password</label>
              <input
                class="rr-auth-input"
                type="password"
                id="rr-signup-password"
                name="password"
                placeholder="Create a password"
                autocomplete="new-password"
              />
              ${renderPasswordStrength()}
            </div>

            <button type="submit" class="rr-auth-btn" id="rr-signup-btn">Create account</button>

            <p class="rr-auth-form-sub" style="text-align:center">
              Wrong email? <a href="mailto:admin@roundrush.com?subject=Invitation%20Issue" class="rr-auth-link">Contact an admin</a>
            </p>

          </form>
        </div><!-- /rr-screen-register -->

        <!-- ════════════════════════════════
             SCREEN: Joining…
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-joining" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-joining-spinner" aria-label="Loading"></div>
            <p class="rr-auth-form-title">Setting up your workspace…</p>
            <p class="rr-auth-form-sub">Adding you to <strong>${INVITE.teamName}</strong>. This will only take a moment.</p>
          </div>
        </div><!-- /rr-screen-joining -->

        <!-- ════════════════════════════════
             SCREEN: Welcome
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-welcome" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-status-icon rr-auth-status-icon--success">${CHECK_ICON}</div>
            <p class="rr-auth-form-title">Welcome to ${INVITE.teamName}!</p>
            <p class="rr-auth-form-sub">You're now part of the team. Your workspace is ready.</p>
          </div>
        </div><!-- /rr-screen-welcome -->

        <!-- ════════════════════════════════
             SCREEN: Invite expired / error
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-invite-expired" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-status-icon rr-auth-status-icon--warn">
              <svg width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true">
                <path d="M128 32L240 224H16L128 32Z" stroke="currentColor" stroke-width="20" stroke-linejoin="round"/>
                <line x1="128" y1="104" x2="128" y2="152" stroke="currentColor" stroke-width="22" stroke-linecap="round"/>
                <circle cx="128" cy="184" r="10" fill="currentColor"/>
              </svg>
            </div>
            <p class="rr-auth-form-title">Invitation expired</p>
            <p class="rr-auth-form-sub">This invitation link is no longer valid. It may have expired or the team has been deleted.</p>
            <a href="mailto:admin@roundrush.com?subject=New%20Invitation%20Request" class="rr-auth-btn rr-auth-btn--secondary">Request a new invitation</a>
          </div>
        </div><!-- /rr-screen-invite-expired -->

      </div><!-- /rr-auth-right -->

      <!-- ── Flow finished overlay ── -->
      <div class="rr-auth-finished" id="rr-auth-finished-overlay" hidden aria-modal="true" role="dialog" aria-label="Flow complete">
        <div class="rr-auth-finished-card">
          <div class="rr-auth-finished-icon">${CHECK_ICON}</div>
          <p class="rr-auth-finished-title">Flow complete</p>
          <p class="rr-auth-finished-sub">This prototype interaction has ended.</p>
          <a href="/prototypes" class="rr-auth-btn rr-auth-btn--link rr-auth-finished-cta">Back to prototype index</a>
        </div>
      </div>

    </div><!-- /rr-auth -->
  `
}

// ── Mount ──────────────────────────────────────────────────
export function mountAuthSignupTeamFlow() {
  const root = document.querySelector("[data-flow='auth-signup-team']")
  if (!root) return

  mountGradientPointer(root)

  function showScreen(id) {
    root.querySelectorAll(".rr-auth-screen").forEach(el => {
      el.hidden = el.id !== id
    })
  }

  function showFinishedOverlay() {
    const overlay = root.querySelector("#rr-auth-finished-overlay")
    if (!overlay) return
    overlay.hidden = false
    overlay.querySelector("a")?.focus()
  }

  // ── Password strength live feedback ───────────────────
  root.querySelector("#rr-signup-password")?.addEventListener("input", e => {
    const val = e.target.value
    const strengthEl = root.querySelector("#rr-signup-pw-strength")
    if (!strengthEl) return
    strengthEl.hidden = val.length === 0

    PW_RULES.forEach(rule => {
      const el = root.querySelector(`#${rule.id}`)
      if (!el) return
      if (rule.test(val)) {
        el.classList.add("is-met")
      } else {
        el.classList.remove("is-met")
      }
    })
  })

  // ── Signup form submit ────────────────────────────────
  root.querySelector("#rr-signup-form")?.addEventListener("submit", e => {
    e.preventDefault()

    const errorEl  = root.querySelector("#rr-signup-error")
    const nameVal  = root.querySelector("#rr-signup-name")?.value.trim() ?? ""
    const passVal  = root.querySelector("#rr-signup-password")?.value ?? ""

    // Clear previous error
    if (errorEl) { errorEl.hidden = true; errorEl.textContent = "" }
    root.querySelector("#rr-signup-name")?.classList.remove("is-error")
    root.querySelector("#rr-signup-password")?.classList.remove("is-error")

    // Validate name
    if (!nameVal) {
      errorEl.textContent = "Please enter your full name."
      errorEl.hidden = false
      root.querySelector("#rr-signup-name")?.classList.add("is-error")
      root.querySelector("#rr-signup-name")?.focus()
      return
    }

    // Validate password rules
    const failedRule = PW_RULES.find(r => !r.test(passVal))
    if (failedRule) {
      errorEl.textContent = `Password issue: ${failedRule.label.toLowerCase()}.`
      errorEl.hidden = false
      root.querySelector("#rr-signup-pw-strength").hidden = false
      root.querySelector("#rr-signup-password")?.classList.add("is-error")
      root.querySelector("#rr-signup-password")?.focus()
      return
    }

    // Show "joining" screen briefly, then welcome
    showScreen("rr-screen-joining")
    setTimeout(() => {
      showScreen("rr-screen-welcome")
      setTimeout(() => showFinishedOverlay(), 1500)
    }, 1800)
  })
}
