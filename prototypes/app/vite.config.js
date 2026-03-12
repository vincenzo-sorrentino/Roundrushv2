import { defineConfig } from "vite"
import path from "node:path"
import fs from "node:fs"

/**
 * Returns a MIME type string for a given file path.
 */
function mimeType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8"
  if (filePath.endsWith(".css"))  return "text/css; charset=utf-8"
  if (filePath.endsWith(".js"))   return "application/javascript; charset=utf-8"
  if (filePath.endsWith(".svg"))  return "image/svg+xml"
  if (filePath.endsWith(".png"))  return "image/png"
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg"
  if (filePath.endsWith(".ico"))  return "image/x-icon"
  if (filePath.endsWith(".json")) return "application/json"
  return "application/octet-stream"
}

export default defineConfig({
  server: {
    fs: {
      // Allow serving files from prototypes/ (one level up from prototypes/app/)
      allow: [path.resolve(__dirname, "..")]
    }
  },

  plugins: [
    {
      name: "serve-website-static",
      /**
       * Intercept all /website/* requests and serve the actual files from
       * prototypes/website/ — before Vite's SPA fallback can catch them.
       * This keeps the marketing website completely independent of the RR app shell.
       */
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith("/website/")) return next()

          // Strip query string before resolving the path
          const urlPath = req.url.split("?")[0]
          const filePath = path.resolve(__dirname, "..", urlPath.slice(1))

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader("Content-Type", mimeType(filePath))
            res.setHeader("Cache-Control", "no-cache")
            fs.createReadStream(filePath).pipe(res)
            return
          }

          next()
        })
      }
    }
  ]
})
