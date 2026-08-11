import vinext from "vinext";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Vercel needs Nitro's server output to serve Vinext routes at runtime.
export default defineConfig({
  plugins: [vinext(), nitro()],
});
