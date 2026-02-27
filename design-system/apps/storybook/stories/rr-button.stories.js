import "@roundrush/components"

export default {
  title: "Primitives/Button",
  render: ({ label, variant }) => `<rr-button variant="${variant}">${label}</rr-button>`,
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary"] }
  }
}

export const Primary = {
  args: {
    label: "Continue",
    variant: "primary"
  }
}

export const Secondary = {
  args: {
    label: "Cancel",
    variant: "secondary"
  }
}
