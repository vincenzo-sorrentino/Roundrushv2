import "@roundrush/components"

export default {
  title: "Library/Overview",
  render: () => `
    <div style="padding: 24px; display: grid; gap: 24px; max-width: 960px; color: var(--rr-sem-textPrimary); background: var(--rr-sem-surface)">
      <section style="display:grid; gap:12px;">
        <h2 style="margin:0; font-size: 20px;">Primitives</h2>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <rr-button variant="primary">Primary button</rr-button>
          <rr-button variant="secondary">Secondary button</rr-button>
          <rr-spinner size="18"></rr-spinner>
        </div>
        <rr-alert variant="info">Info alert example</rr-alert>
        <rr-alert variant="success">Success alert example</rr-alert>
      </section>

      <section style="display:grid; gap:12px;">
        <h2 style="margin:0; font-size: 20px;">Form controls</h2>
        <rr-input label="Email" placeholder="name@company.com"></rr-input>
        <rr-password-input label="Password" placeholder="Enter password"></rr-password-input>
        <rr-select
          label="Role"
          options='[{"label":"Owner","value":"owner"},{"label":"Admin","value":"admin"},{"label":"Member","value":"member"}]'
          value="member">
        </rr-select>
        <rr-checkbox>Remember this device</rr-checkbox>
      </section>

      <section style="display:grid; gap:12px;">
        <h2 style="margin:0; font-size: 20px;">Containers</h2>
        <rr-card>
          <span slot="header">Card header</span>
          Card content
          <div slot="actions">
            <rr-button variant="secondary">Cancel</rr-button>
            <rr-button variant="primary">Continue</rr-button>
          </div>
        </rr-card>
      </section>

      <section style="display:grid; gap:12px;">
        <h2 style="margin:0; font-size: 20px;">Tables</h2>
        <div style="border: 1px solid var(--rr-sem-borderDefault); max-width: 480px;">
          <rr-table-header-cell label="Company" text="true" checkbox="true" color="white" arrow="down" state="default"></rr-table-header-cell>
          <rr-table-header-cell label="Status" text="true" checkbox="false" color="gray" arrow="none" state="default"></rr-table-header-cell>
        </div>
      </section>

      <section style="display:grid; gap:12px;">
        <h2 style="margin:0; font-size: 20px;">Modal</h2>
        <rr-modal open title="Confirm action">
          This is a modal preview state.
          <div slot="actions">
            <rr-button variant="secondary">Cancel</rr-button>
            <rr-button variant="primary">Confirm</rr-button>
          </div>
        </rr-modal>
      </section>
    </div>
  `
}

export const AllComponents = {}
