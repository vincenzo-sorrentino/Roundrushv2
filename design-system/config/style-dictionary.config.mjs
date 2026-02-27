export default {
  source: ["design-system/source/figma/tokens.raw.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "design-system/packages/tokens/dist/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables"
        }
      ]
    },
    js: {
      transformGroup: "js",
      buildPath: "design-system/packages/tokens/dist/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6"
        }
      ]
    }
  }
}
