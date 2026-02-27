export function renderLoginForm() {
  return `
    <section class="rr-flow-shell">
      <rr-card>
        <span slot="header">Welcome back</span>

        <div class="rr-stack">
          <rr-alert variant="info">Use your Roundrush account to continue.</rr-alert>
          <rr-input label="Email" placeholder="name@company.com"></rr-input>
          <rr-password-input label="Password" placeholder="Enter password"></rr-password-input>
          <rr-checkbox>Remember this device</rr-checkbox>
        </div>

        <div slot="actions" class="rr-actions">
          <rr-button variant="secondary">Forgot password</rr-button>
          <rr-button>Continue</rr-button>
        </div>
      </rr-card>
    </section>
  `
}
