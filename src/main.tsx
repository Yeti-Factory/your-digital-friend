import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import LegacyRedirect from "./components/LegacyRedirect.tsx";
import { isLegacyLovableHost } from "./lib/legacy-host.ts";
import "./index.css";

// Capture beforeinstallprompt globally before React mounts
window.__deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.__deferredInstallPrompt = e as BeforeInstallPromptEvent;
});

const root = createRoot(document.getElementById("root")!);

if (isLegacyLovableHost(window.location.hostname)) {
  root.render(<LegacyRedirect />);
} else {
  registerSW({
    immediate: true,
    onRegistered(registration) {
      if (!registration) return;
      registration.update().catch(() => {});
      setInterval(() => registration.update().catch(() => {}), 60 * 60 * 1000);
    },
  });

  root.render(<App />);
}
