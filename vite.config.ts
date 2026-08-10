import vinext from "vinext";
import { defineConfig } from "vite";

// Keep the portfolio build portable for GitHub/Vercel. The workspace-only
// Sites and Cloudflare binding plugins are not needed by this public portfolio.
export default defineConfig(() => ({
  plugins: [vinext()],
}));
