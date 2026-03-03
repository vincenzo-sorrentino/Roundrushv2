import "@roundrush/components"

export default {
  title: "Composites/Table Header Cell",
  render: ({ label, checkbox, color, arrow, state }) => `
    <div style="width: 320px; border: 1px solid var(--rr-sem-borderDefault)">
      <rr-table-header-cell
        label="${label}"
        checkbox="${checkbox}"
        color="${color}"
        arrow="${arrow}"
        state="${state}">
      </rr-table-header-cell>
    </div>
  `,
  argTypes: {
    label: { control: "text" },
    checkbox: { control: "select", options: ["true", "false"] },
    color: { control: "select", options: ["white", "gray"] },
    arrow: { control: "select", options: ["none", "down", "up"] },
    state: { control: "select", options: ["default", "hover", "disabled"] }
  }
}

export const TextCheckboxWhite = {
  args: {
    label: "Company",
    checkbox: "true",
    color: "white",
    arrow: "down",
    state: "default"
  }
}

export const TextNoCheckboxGray = {
  args: {
    label: "Company",
    checkbox: "false",
    color: "gray",
    arrow: "none",
    state: "default"
  }
}
