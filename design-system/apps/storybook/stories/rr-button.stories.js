import "@roundrush/components"

function boolAttr(name, enabled) {
  return enabled ? ` ${name}` : ""
}

function renderButton(args) {
  const variant = args.variant ?? "primary"
  const size = args.size ?? "md"
  const state = args.state ?? "default"
  const label = args.label ?? "Button CTA"

  return `
    <rr-button
      variant="${variant}"
      size="${size}"
      state="${state}"
      ${args.disabled ? "disabled" : ""}
      ${boolAttr("icon-right", args.iconRight)}
      ${boolAttr("icon-left", args.iconLeft)}
      ${boolAttr("dot", args.dot)}
    >
      ${label}
    </rr-button>
  `
}

export default {
  title: "Primitives/Button",
  render: (args) => renderButton(args),
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary", "neutral", "border", "text", "destructive"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "xxl"] },
    state: { control: "select", options: ["default", "hover", "focused", "disabled"] },
    disabled: { control: "boolean" },
    iconLeft: { control: "boolean" },
    iconRight: { control: "boolean" },
    dot: { control: "boolean" }
  }
}

export const Playground = {
  args: {
    label: "Button CTA",
    variant: "primary",
    size: "md",
    state: "default",
    disabled: false,
    iconLeft: false,
    iconRight: true,
    dot: false
  }
}

export const TypeStateMatrix = {
  render: () => {
    const variants = ["primary", "secondary", "neutral", "border", "text", "destructive"]
    const states = ["default", "hover", "focused", "disabled"]

    return `
      <div style="padding:24px; display:grid; gap:20px; background:var(--rr-sem-surface); color:var(--rr-sem-textPrimary);">
        <h3 style="margin:0;">MD Matrix</h3>
        ${variants
          .map(
            (variant) => `
          <div style="display:grid; grid-template-columns: 120px repeat(${states.length}, max-content); gap:12px; align-items:center;">
            <strong style="text-transform:capitalize;">${variant}</strong>
            ${states
              .map(
                (state) => `
              <rr-button variant="${variant}" size="md" state="${state}" icon-right>
                Button CTA
              </rr-button>
            `
              )
              .join("")}
          </div>
        `
          )
          .join("")}
      </div>
    `
  }
}

export const SizeScale = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"]
    return `
      <div style="padding:24px; display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end; background:var(--rr-sem-surface);">
        ${sizes
          .map(
            (size) => `
          <rr-button variant="primary" size="${size}" icon-right>
            ${size.toUpperCase()}
          </rr-button>
        `
          )
          .join("")}
      </div>
    `
  }
}
