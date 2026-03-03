import { defineConfig } from "vite"
import path from "node:path"

export default defineConfig({
  server: {
    fs: {
      // Allow serving files from prototypes/ (one level up from prototypes/app/)
      allow: [path.resolve(__dirname, "..")]
    }
  }
})
