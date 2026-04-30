import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

// Capture beforeinstallprompt globally before React mounts
(window as any).__deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  (window as any).__deferredInstallPrompt = e;
});

registerSW({
  immediate: true,
  onRegistered(registration) {
    if (!registration) return;
    // Force a SW update check on every load so Chrome picks up the new
    // manifest (and refreshed app name) as soon as possible on installed PWAs.
    registration.update().catch(() => {});
    // And again every 60 minutes if the app stays open.
    setInterval(() => registration.update().catch(() => {}), 60 * 60 * 1000);
  },
});

createRoot(document.getElementById("root")!).render(<App />);
