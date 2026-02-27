import "@roundrush/tokens/tokens.css"
import "@roundrush/themes/light.css"
import "@roundrush/themes/dark.css"
import "@roundrush/components"

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme mode",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" }
      ],
      dynamicTitle: true
    }
  }
}

export const decorators = [
  (story, context) => {
    const theme = context.globals.theme ?? "light"
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)

    const output = story()
    if (typeof output === "string") {
      return `<div data-theme="${theme}" style="min-height: 100vh;">${output}</div>`
    }
    return output
  }
]

export const parameters = {
  backgrounds: {
    default: "surface",
    values: [
      { name: "surface", value: "var(--rr-sem-surface)" }
    ]
  }
}
