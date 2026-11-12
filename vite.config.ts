import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  const base = "/Aditya-Sharma-Portfolio/";

  return {
    base,
    server: {
      port: 5173,
    },
    plugins: [
      tailwindcss(),
      react(),
      {
        name: "copy-404-html",
        closeBundle() {
          const distDir = path.resolve(process.cwd(), "dist");
          const indexPath = path.join(distDir, "index.html");
          const notFoundPath = path.join(distDir, "404.html");
          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, notFoundPath);
          }
        },
      },
      VitePWA({
        registerType: "prompt",
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        workbox: {
          navigateFallbackDenylist: [/^\/api\//],
        },
        manifest: {
          name: "Aditya Sharma - 3D Portfolio",
          short_name: "Aditya Sharma",
          description: "3D Interactive Portfolio of Aditya Sharma - Aspiring Full-Stack Web Developer",
          icons: [
            {
              src: `${base}android-chrome-192x192.png`,
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: `${base}android-chrome-512x512.png`,
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: `${base}apple-touch-icon.png`,
              sizes: "180x180",
              type: "image/png",
              purpose: "apple touch icon",
            },
            {
              src: `${base}maskable_icon.png`,
              sizes: "120x120",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          theme_color: "#8796ff",
          background_color: "#ffffff",
          display: "standalone",
          scope: base,
          start_url: base,
          orientation: "portrait",
        },
      }),
    ],
    assetsInclude: ["**/*.glb"],
  };
});
