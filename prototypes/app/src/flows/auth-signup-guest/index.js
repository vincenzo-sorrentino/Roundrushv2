import { ABSTRACT_BG_SVG, mountGradientPointer, RR_FULL_LOGO } from "../auth-login/screens/login-form.js"

/* ──────────────────────────────────────────────────────────
   Signup — Guest / External Stakeholder  (AUT-M002)
   Route: /auth/signup/guest
   Role:  guest — customer or external reviewer
   ────────────────────────────────────────────────────────── */

const INVITE = {
  email:    "stakeholder@client.com",
  teamName: "Give Payments",
  role:     "guest",
}

const CHECK_ICON = `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true">
  <polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const GUEST_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
  <path d="M6 21v-1a6 6 0 0 1 12 0v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <circle cx="19" cy="4" r="2.5" stroke="currentColor" stroke-width="1.8"/>
  <line x1="19" y1="8" x2="19" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="17" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`

// ── Password strength requirements ────────────────────────
const PW_RULES = [
  { id: "gw-pw-len",   label: "At least 8 characters",  test: v => v.length >= 8 },
  { id: "gw-pw-num",   label: "At least one number",     test: v => /[0-9]/.test(v) },
  { id: "gw-pw-upper", label: "At least one uppercase",  test: v => /[A-Z]/.test(v) },
]

function renderPasswordStrength() {
  return `
    <div class="rr-auth-pw-strength" id="rr-guest-pw-strength" hidden>
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
export function renderAuthSignupGuestFlow() {
  return `
    <div class="rr-auth" data-flow="auth-signup-guest">

      <!-- ── Left: abstract IT background ── -->
      <div class="rr-auth-photo" aria-hidden="true">
        ${ABSTRACT_BG_SVG}
      </div>

      <!-- ── Right: content panel ── -->
      <div class="rr-auth-right">

        <div class="rr-auth-wordmark">
          ${RR_FULL_LOGO}
        </div>

        <!-- ════════════════════════════════
             SCREEN: Registration form
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-guest-register">
          <form class="rr-auth-form" id="rr-guest-form" novalidate>

            <!-- Invite header -->
            <div class="rr-auth-invite-header">
              <div class="rr-auth-role-chip rr-auth-role-chip--guest">${GUEST_ICON} Guest</div>
              <p class="rr-auth-form-title">You're invited to ${INVITE.teamName}</p>
              <p class="rr-auth-form-sub">You've been invited as an external stakeholder. Create an account to review and provide feedback.</p>
            </div>

            <!-- Error banner -->
            <div class="rr-auth-error" id="rr-guest-error" hidden></div>

            <!-- Email (pre-filled, read-only) -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-guest-email">Email</label>
              <input
                class="rr-auth-input"
                type="email"
                id="rr-guest-email"
                name="email"
                value="${INVITE.email}"
                readonly
                autocomplete="email"
              />
            </div>

            <!-- Full name -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-guest-name">Full name</label>
              <input
                class="rr-auth-input"
                type="text"
                id="rr-guest-name"
                name="name"
                placeholder="Your full name"
                autocomplete="name"
              />
            </div>

            <!-- Company (optional) -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-guest-company">
                Company <span class="rr-auth-label-optional">(optional)</span>
              </label>
              <input
                class="rr-auth-input"
                type="text"
                id="rr-guest-company"
                name="company"
                placeholder="Your organisation"
                autocomplete="organization"
              />
            </div>

            <!-- Password + live strength indicator -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-guest-password">Password</label>
              <input
                class="rr-auth-input"
                type="password"
                id="rr-guest-password"
                name="password"
                placeholder="Create a password"
                autocomplete="new-password"
              />
              ${renderPasswordStrength()}
            </div>

            <!-- Guest access notice -->
            <div class="rr-auth-notice rr-auth-notice--subtle">
              As a guest, you can view content and leave comments. You won't be able to edit or manage the project.
            </div>

            <button type="submit" class="rr-auth-btn" id="rr-guest-btn">Create guest account</button>

            <p class="rr-auth-form-sub" style="text-align:center">
              Wrong email? <a href="mailto:admin@roundrush.com?subject=Invitation%20Issue" class="rr-auth-link">Contact an admin</a>
            </p>

          </form>
        </div><!-- /rr-screen-guest-register -->

        <!-- ════════════════════════════════
             SCREEN: Joining…
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-guest-joining" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-joining-spinner" aria-label="Loading"></div>
            <p class="rr-auth-form-title">Setting up your access…</p>
            <p class="rr-auth-form-sub">Granting guest access to <strong>${INVITE.teamName}</strong>. This will only take a moment.</p>
          </div>
        </div><!-- /rr-screen-guest-joining -->

        <!-- ════════════════════════════════
             SCREEN: Welcome (guest)
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-guest-welcome" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-status-icon rr-auth-status-icon--success">${CHECK_ICON}</div>
            <p class="rr-auth-form-title">Access granted!</p>
            <p class="rr-auth-form-sub">You now have guest access to <strong>${INVITE.teamName}</strong>. You can view content and leave comments.</p>
          </div>
        </div><!-- /rr-screen-guest-welcome -->

        <!-- ════════════════════════════════
             SCREEN: Invite expired / error
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-guest-expired" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-status-icon rr-auth-status-icon--warn">
              <svg width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true">
                <path d="M128 32L240 224H16L128 32Z" stroke="currentColor" stroke-width="20" stroke-linejoin="round"/>
                <line x1="128" y1="104" x2="128" y2="152" stroke="currentColor" stroke-width="22" stroke-linecap="round"/>
                <circle cx="128" cy="184" r="10" fill="currentColor"/>
              </svg>
            </div>
            <p class="rr-auth-form-title">Invitation expired</p>
            <p class="rr-auth-form-sub">This guest invitation is no longer valid. Please ask the project owner to send a new one.</p>
            <a href="mailto:admin@roundrush.com?subject=New%20Guest%20Invitation%20Request" class="rr-auth-btn rr-auth-btn--secondary">Request a new invitation</a>
          </div>
        </div><!-- /rr-screen-guest-expired -->

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
export function mountAuthSignupGuestFlow() {
  const root = document.querySelector("[data-flow='auth-signup-guest']")
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
  root.querySelector("#rr-guest-password")?.addEventListener("input", e => {
    const val = e.target.value
    const strengthEl = root.querySelector("#rr-guest-pw-strength")
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

  // ── Guest form submit ─────────────────────────────────
  root.querySelector("#rr-guest-form")?.addEventListener("submit", e => {
    e.preventDefault()

    const errorEl  = root.querySelector("#rr-guest-error")
    const nameVal  = root.querySelector("#rr-guest-name")?.value.trim() ?? ""
    const passVal  = root.querySelector("#rr-guest-password")?.value ?? ""

    // Clear previous error
    if (errorEl) { errorEl.hidden = true; errorEl.textContent = "" }
    root.querySelector("#rr-guest-name")?.classList.remove("is-error")
    root.querySelector("#rr-guest-password")?.classList.remove("is-error")

    // Validate name
    if (!nameVal) {
      errorEl.textContent = "Please enter your full name."
      errorEl.hidden = false
      root.querySelector("#rr-guest-name")?.classList.add("is-error")
      root.querySelector("#rr-guest-name")?.focus()
      return
    }

    // Validate password rules
    const failedRule = PW_RULES.find(r => !r.test(passVal))
    if (failedRule) {
      errorEl.textContent = `Password issue: ${failedRule.label.toLowerCase()}.`
      errorEl.hidden = false
      root.querySelector("#rr-guest-pw-strength").hidden = false
      root.querySelector("#rr-guest-password")?.classList.add("is-error")
      root.querySelector("#rr-guest-password")?.focus()
      return
    }

    // Show "joining" screen briefly, then welcome
    showScreen("rr-screen-guest-joining")
    setTimeout(() => {
      showScreen("rr-screen-guest-welcome")
      setTimeout(() => showFinishedOverlay(), 1500)
    }, 1800)
  })
}
