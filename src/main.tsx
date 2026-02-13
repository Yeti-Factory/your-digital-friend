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

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(<App />);
