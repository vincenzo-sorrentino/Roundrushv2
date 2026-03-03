export default {
  source: ["prototypes/design-system/source/figma/tokens.raw.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "prototypes/design-system/packages/tokens/dist/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables"
        }
      ]
    },
    js: {
      transformGroup: "js",
      buildPath: "prototypes/design-system/packages/tokens/dist/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6"
        }
      ]
    }
  }
}
