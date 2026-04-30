import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      // Custom filename so changing the version segment invalidates the
      // navigator's manifest cache. Bump APP_VERSION below when the app
      // name (or any installed-PWA-pinned field) changes.
      manifestFilename: "manifest.v2.webmanifest",
      devOptions: {
        enabled: false,
      },
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: { cacheName: "html", networkTimeoutSeconds: 3 },
          },
          {
            // Always go to network for the manifest itself so a renamed
            // app is picked up immediately on next visit.
            urlPattern: ({ url }) => url.pathname.endsWith(".webmanifest"),
            handler: "NetworkOnly",
          },
        ],
      },
      manifest: {
        // Bumping `id` makes Chrome/Android treat this as a new PWA,
        // which is necessary when the displayed name changes.
        id: "/?v=2",
        lang: "fr",
        name: "Doggy Help",
        short_name: "Doggy Help",
        description: "Posez vos questions sur l'éducation, les soins et le comportement de votre chien adopté chez Doggy Oasis.",
        theme_color: "#2d8a4e",
        background_color: "#f5f0e8",
        display: "standalone",
        orientation: "portrait",
        start_url: "/?v=2",
        scope: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
