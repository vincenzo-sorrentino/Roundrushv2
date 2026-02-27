import { renderLoginForm } from "./screens/login-form.js"

export async function renderAuthLoginFlow() {
  return `
    <main class="rr-main">
      <header class="rr-page-header">
        <h1>Authentication: Login Flow</h1>
        <p>Route-driven interactive prototype aligned to spec <code>auth-login</code>.</p>
      </header>
      ${renderLoginForm()}
    </main>
  `
}
