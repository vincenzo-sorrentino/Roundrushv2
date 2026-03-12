/* ──────────────────────────────────────────────────────────
   Login page — full-screen split layout
   Matches Figma node 262:28037 (Desktop - 37)
   ────────────────────────────────────────────────────────── */

// Animated gradient background — 5-blob radial gradient with goo filter + mouse pointer
// Ported from the aceternity/21st.dev BackgroundGradientAnimation React component
export const ABSTRACT_BG_SVG = `
  <div class="rr-grad-bg">
    <svg class="rr-grad-filter-svg" aria-hidden="true">
      <defs>
        <filter id="rr-blur-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"/>
          <feBlend in="SourceGraphic" in2="goo"/>
        </filter>
      </defs>
    </svg>
    <div class="rr-grad-container">
      <div class="rr-grad-blob rr-grad-blob--1"></div>
      <div class="rr-grad-blob rr-grad-blob--2"></div>
      <div class="rr-grad-blob rr-grad-blob--3"></div>
      <div class="rr-grad-blob rr-grad-blob--4"></div>
      <div class="rr-grad-blob rr-grad-blob--5"></div>
      <div class="rr-grad-blob rr-grad-blob--pointer"></div>
    </div>
  </div>`

/* ── Interactive gradient pointer (call from each auth mount fn) ─ */
export function mountGradientPointer(root) {
  const photo   = root?.querySelector(".rr-auth-photo")
  const pointer = root?.querySelector(".rr-grad-blob--pointer")
  const cont    = root?.querySelector(".rr-grad-container")
  if (!photo || !pointer) return

  // Safari does not support SVG filter references via url() — use plain blur
  if (cont && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    cont.classList.add("is-safari")
  }

  let curX = 0, curY = 0, tgX = 0, tgY = 0

  function tick() {
    curX += (tgX - curX) / 20
    curY += (tgY - curY) / 20
    pointer.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)

  photo.addEventListener("mousemove", e => {
    const rect = photo.getBoundingClientRect()
    tgX = e.clientX - rect.left
    tgY = e.clientY - rect.top
  })
}

// Official Roundrush full wordmark logo (RR_Logo.svg)
export const RR_FULL_LOGO = `<svg class="rr-auth-logo-svg" width="213" height="32" viewBox="0 0 213 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Roundrush" role="img">
<g clip-path="url(#clip0_262_28041)">
<path d="M29.0964 21.5625C30.5728 20.1065 33.0611 20.6627 33.7578 22.5769C34.1891 23.7875 34.9024 24.9327 35.8978 25.8979C36.13 26.127 36.3623 26.3396 36.6111 26.536C38.3695 27.9429 40.526 28.5973 42.666 28.5155C43.3296 28.4828 43.6779 29.2844 43.2134 29.7425C42.948 30.0043 42.6162 30.2006 42.2513 30.2987C38.4359 31.3785 34.1394 30.4296 31.1368 27.4685C30.0419 26.3887 29.2125 25.1454 28.6651 23.8039C28.3167 23.0513 28.4992 22.1679 29.0964 21.5625Z" fill="#0079FF"/>
<path d="M47.5103 21.1045C46.0339 22.5606 43.5455 22.0043 42.8488 20.0902C42.4175 18.8796 41.7042 17.7344 40.7089 16.7692C40.4766 16.5401 40.2444 16.3274 39.9955 16.1311C38.2537 14.7242 36.0972 14.0698 33.9572 14.1516C33.2937 14.1843 32.9453 13.3827 33.4098 12.9246C33.6752 12.6628 34.007 12.4665 34.3719 12.3684C38.1874 11.2886 42.4839 12.2375 45.4864 15.1986C46.5813 16.2784 47.4107 17.5217 47.9582 18.8632C48.2899 19.6322 48.1075 20.5156 47.5103 21.1045Z" fill="#F43B51"/>
<path d="M167.198 10.6831V31.6565H162.321V28.9244H162.254C161.425 29.9224 160.43 30.6749 159.302 31.1984C158.174 31.722 156.963 31.9837 155.702 31.9837C154.491 31.9837 153.413 31.8201 152.484 31.5093C151.538 31.1984 150.709 30.7076 149.995 30.0532C149.282 29.3988 148.735 28.5154 148.353 27.4029C147.972 26.2905 147.772 24.9653 147.772 23.4438V10.6831H152.65V22.1514C152.65 23.1984 152.733 24.0819 152.898 24.769C153.064 25.4725 153.313 26.0287 153.678 26.4541C154.026 26.8794 154.458 27.1739 154.972 27.3539C155.486 27.5338 156.117 27.6156 156.863 27.6156C157.593 27.6156 158.273 27.4684 158.92 27.1575C159.567 26.8631 160.148 26.4213 160.662 25.8651C161.176 25.3089 161.574 24.5727 161.873 23.6892C162.172 22.8058 162.321 21.8078 162.321 20.7117V10.6831H167.198Z" fill="#29235C"/>
<path d="M72.9069 10.6831V31.6565H68.0298V28.9244H67.9635C67.134 29.9224 66.1387 30.6749 65.0107 31.1984C63.8826 31.722 62.6716 31.9837 61.4109 31.9837C60.1999 31.9837 59.1216 31.8201 58.1927 31.5093C57.2471 31.1984 56.4177 30.7076 55.7043 30.0532C54.991 29.3988 54.4436 28.5154 54.0621 27.4029C53.6805 26.2905 53.4814 24.9653 53.4814 23.4438V10.6831H58.3585V22.1514C58.3585 23.1984 58.4415 24.0819 58.6074 24.769C58.7733 25.4725 59.0221 26.0287 59.3871 26.4541C59.7354 26.8794 60.1667 27.1739 60.681 27.3539C61.1952 27.5338 61.8256 27.6156 62.5721 27.6156C63.302 27.6156 63.9822 27.4684 64.6291 27.1575C65.2761 26.8631 65.8567 26.4213 66.3709 25.8651C66.8852 25.3089 67.2833 24.5727 67.5819 23.6892C67.8805 22.8058 68.0298 21.8078 68.0298 20.7117V10.6831H72.9069Z" fill="#29235C"/>
<path d="M96.8613 12.5643C98.2382 14.0203 98.9349 16.278 98.9349 19.3209V31.689H94.0578V20.5643C94.0578 19.4682 93.9582 18.552 93.7592 17.7995C93.5601 17.0469 93.2615 16.4416 92.8468 15.9999C92.4321 15.5582 91.951 15.2473 91.4036 15.051C90.8561 14.8547 90.2092 14.7565 89.4295 14.7565C88.6001 14.7565 87.8536 14.9038 87.1734 15.1819C86.4933 15.46 85.9127 15.869 85.4316 16.3925C84.9505 16.9324 84.569 17.6032 84.3202 18.4048C84.0547 19.2228 83.922 20.1226 83.922 21.1369V31.6727H79.0449V10.6829H83.922V13.5623H83.9884C84.8842 12.5316 85.9459 11.7299 87.1734 11.1901C88.401 10.6502 89.7281 10.3721 91.105 10.3721C93.5601 10.3721 95.4678 11.1083 96.8613 12.5643Z" fill="#29235C"/>
<path d="M171.561 28.9245L174.032 25.3089C174.895 26.1596 175.824 26.7813 176.786 27.1903C177.765 27.5829 178.876 27.7956 180.154 27.7956C181.083 27.7956 181.796 27.5993 182.343 27.223C182.874 26.8468 183.14 26.356 183.14 25.7343C183.14 25.2271 182.841 24.8181 182.227 24.4909C181.63 24.1637 180.519 23.722 178.909 23.1821C178.262 22.9695 177.698 22.7568 177.201 22.5441C176.703 22.3314 176.189 22.086 175.675 21.7915C175.16 21.4971 174.712 21.1862 174.347 20.8427C173.983 20.4991 173.634 20.0901 173.336 19.6484C173.037 19.2067 172.805 18.6995 172.639 18.1433C172.49 17.587 172.407 16.9654 172.407 16.2946C172.407 14.5932 173.12 13.1699 174.53 12.041C175.94 10.9122 177.732 10.356 179.905 10.356C182.708 10.356 185.23 11.223 187.436 12.9735L184.981 16.7527C184.433 16.2455 183.836 15.8202 183.206 15.4766C182.576 15.1331 181.962 14.8877 181.381 14.7241C180.801 14.5768 180.22 14.495 179.639 14.495C179.075 14.495 178.544 14.6423 178.047 14.9531C177.549 15.2639 177.317 15.7056 177.317 16.2946C177.317 16.6218 177.466 16.949 177.765 17.2435C178.063 17.538 178.445 17.8161 178.893 18.0451C179.341 18.2905 179.955 18.5523 180.701 18.8468C182.957 19.7302 184.367 20.3028 184.915 20.5973C186.325 21.3335 187.237 22.2496 187.685 23.313C187.934 23.9674 188.066 24.7363 188.066 25.6034C188.066 26.5032 187.901 27.3212 187.569 28.0901C187.237 28.859 186.756 29.5298 186.126 30.1024C185.495 30.6913 184.649 31.1331 183.637 31.4603C182.625 31.7874 181.447 31.951 180.12 31.951C176.786 32.0001 173.916 30.9695 171.561 28.9245Z" fill="#29235C"/>
<path d="M144.107 10.3887V15.7384C143.559 15.6893 143.062 15.6729 142.63 15.6729C141.419 15.6729 140.374 15.9347 139.495 16.4746C138.616 16.9981 137.936 17.7179 137.488 18.6341C137.04 19.5339 136.824 20.5645 136.824 21.7097V31.6566H131.947V10.6832H136.824V13.8243H136.891C137.72 12.7118 138.715 11.8447 139.86 11.2558C141.005 10.6668 142.216 10.356 143.51 10.356C143.792 10.3723 143.991 10.3723 144.107 10.3887Z" fill="#29235C"/>
<path d="M16.821 31.6568L9.43902 20.7611H5.25865V31.6568H0V1.11279H11.4297C12.8563 1.11279 14.1668 1.27639 15.328 1.58723C16.5058 1.91443 17.5012 2.35615 18.314 2.9451C19.1435 3.53406 19.8236 4.23754 20.371 5.07189C20.9185 5.90625 21.3332 6.80604 21.5986 7.804C21.864 8.80195 21.9967 9.86535 21.9967 11.0105C21.9967 13.4645 21.3995 15.4604 20.2217 16.9983C19.0439 18.5525 17.3685 19.6159 15.2119 20.2048V20.2866L23.1248 31.6404H16.821V31.6568ZM5.25865 16.0985H10.285C12.3421 16.0985 13.9014 15.624 14.9631 14.6915C16.0248 13.759 16.5556 12.4993 16.5556 10.9124C16.5556 9.30911 16.0414 8.0494 15.0129 7.13324C13.9843 6.21709 12.5245 5.77537 10.6334 5.77537H5.25865V16.0985Z" fill="#29235C"/>
<path d="M208.289 10.863C209.234 11.1902 210.064 11.6973 210.777 12.3845C211.491 13.0716 212.038 13.9714 212.42 15.1166C212.801 16.2454 213 17.5869 213 19.1084V31.6892H208.123V20.3517C208.123 18.3395 207.741 16.8998 206.962 16.0327C206.182 15.1656 205.038 14.7403 203.495 14.7403C201.703 14.7403 200.31 15.2802 199.298 16.3436C198.286 17.407 197.772 18.9611 197.772 20.9898V31.6564H192.895V0H197.772V13.317H197.855C198.734 12.3517 199.795 11.6155 201.04 11.1247C202.284 10.6339 203.611 10.3722 205.054 10.3722C206.265 10.3722 207.343 10.5358 208.289 10.863Z" fill="#29235C"/>
<path d="M125.61 0V31.6564H120.949V28.8425H120.866C119.24 30.9366 116.934 31.9836 113.948 31.9836C112.787 31.9836 111.675 31.82 110.614 31.5092C109.552 31.182 108.607 30.7076 107.761 30.0859C106.914 29.4642 106.185 28.7117 105.571 27.8446C104.957 26.9775 104.476 25.9959 104.144 24.8671C103.812 23.7382 103.646 22.544 103.646 21.2679C103.646 19.7137 103.912 18.2577 104.426 16.8998C104.957 15.5419 105.67 14.3804 106.583 13.4315C107.495 12.4826 108.573 11.7301 109.834 11.1902C111.095 10.6503 112.455 10.3722 113.898 10.3722C116.768 10.3722 119.008 11.3211 120.617 13.2025H120.716V0H125.61ZM119.14 25.865C120.335 24.6871 120.932 23.1656 120.932 21.2843C120.932 19.4029 120.351 17.8487 119.19 16.6053C118.029 15.362 116.553 14.7403 114.728 14.7403C113.882 14.7403 113.086 14.8875 112.339 15.1984C111.593 15.5092 110.946 15.9346 110.398 16.4908C109.851 17.047 109.403 17.7342 109.088 18.5685C108.772 19.4029 108.607 20.3027 108.607 21.2843C108.607 23.1493 109.171 24.6708 110.315 25.8487C111.443 27.0266 112.92 27.6155 114.728 27.6155C116.47 27.6319 117.946 27.0429 119.14 25.865Z" fill="#29235C"/>
</g>
<defs>
<clipPath id="clip0_262_28041"><rect width="213" height="32" fill="white"/></clipPath>
</defs>
</svg>`

const CHECK_ICON = `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" aria-hidden="true">
  <polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export function renderLoginPage() {
  return `
    <div class="rr-auth" data-flow="auth-login">

      <!-- ── Left: abstract IT background panel ── -->
      <div class="rr-auth-photo" aria-hidden="true">
        ${ABSTRACT_BG_SVG}
      </div>

      <!-- ── Right: content panel ── -->
      <div class="rr-auth-right">

        <!-- Official Roundrush full wordmark -->
        <a href="/prototypes" class="rr-auth-wordmark" aria-label="Roundrush home">
          ${RR_FULL_LOGO}
        </a>

        <!-- ════════════════════════════════
             SCREEN: Login
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-login">
          <form class="rr-auth-form" id="rr-login-form" novalidate>

            <!-- Error: wrong credentials / locked -->
            <div class="rr-auth-error" id="rr-login-error" hidden></div>

            <!-- Notice: email not found → invitation link -->
            <div class="rr-auth-notice" id="rr-login-notice" hidden>
              No account found with this email.
              <a href="mailto:admin@roundrush.com?subject=Invitation%20Request" class="rr-auth-link">Request an invitation →</a>
            </div>

            <!-- Email -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-email">Email</label>
              <input
                class="rr-auth-input"
                type="email"
                id="rr-email"
                name="email"
                placeholder="Placeholder"
                autocomplete="email"
              />
            </div>

            <!-- Password -->
            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-password">Password</label>
              <input
                class="rr-auth-input"
                type="password"
                id="rr-password"
                name="password"
                placeholder="Placeholder"
                autocomplete="current-password"
              />
            </div>

            <!-- Remember me + Forgot password -->
            <div class="rr-auth-options-row">
              <label class="rr-auth-checkbox-label" for="rr-remember">
                <input type="checkbox" class="rr-auth-checkbox" id="rr-remember" name="remember" />
                <span>Remember me</span>
              </label>
              <button type="button" class="rr-auth-link" id="rr-forgot-btn">Forgot password?</button>
            </div>

            <!-- Submit -->
            <button type="submit" class="rr-auth-btn" id="rr-login-btn">Login</button>

          </form>
        </div><!-- /rr-screen-login -->

        <!-- ════════════════════════════════
             SCREEN: Forgot password
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-forgot" hidden>
          <form class="rr-auth-form" id="rr-forgot-form" novalidate>

            <div class="rr-auth-form-header">
              <p class="rr-auth-form-title">Reset your password</p>
              <p class="rr-auth-form-sub">Enter your email address and we'll send you a link to set a new password. The link expires in 30&nbsp;minutes.</p>
            </div>

            <div class="rr-auth-field">
              <label class="rr-auth-label" for="rr-forgot-email">Email</label>
              <input
                class="rr-auth-input"
                type="email"
                id="rr-forgot-email"
                name="forgot-email"
                placeholder="Placeholder"
                autocomplete="email"
              />
            </div>

            <div class="rr-auth-options-row">
              <button type="button" class="rr-auth-link rr-auth-link--muted" id="rr-back-login">
                ← Back to login
              </button>
            </div>

            <button type="submit" class="rr-auth-btn">Send reset link</button>

          </form>
        </div><!-- /rr-screen-forgot -->

        <!-- ════════════════════════════════
             SCREEN: Reset link sent
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-reset-sent" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-status-icon rr-auth-status-icon--success">${CHECK_ICON}</div>
            <p class="rr-auth-form-title">Check your inbox</p>
            <p class="rr-auth-form-sub" id="rr-reset-sent-text">
              A password reset link has been sent to your email address. It expires in 30 minutes.
              If you don't see it, check your spam folder.
            </p>
            <button type="button" class="rr-auth-btn rr-auth-btn--secondary" id="rr-back-login-2">
              Back to login
            </button>
          </div>
        </div><!-- /rr-screen-reset-sent -->

        <!-- ════════════════════════════════
             SCREEN: Login success
             ════════════════════════════════ -->
        <div class="rr-auth-screen" id="rr-screen-success" hidden>
          <div class="rr-auth-status">
            <div class="rr-auth-status-icon rr-auth-status-icon--primary">${CHECK_ICON}</div>
            <p class="rr-auth-form-title">Authenticated</p>
            <p class="rr-auth-form-sub">Credentials verified successfully.</p>
          </div>
        </div><!-- /rr-screen-success -->

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
