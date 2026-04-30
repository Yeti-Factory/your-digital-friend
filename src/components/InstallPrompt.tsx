import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/doggy-oasis-logo.png";
import { detectPlatform, useStandalone } from "@/lib/platform";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "doggy-help-install-dismissed-at";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

const InstallPrompt = () => {
  const navigate = useNavigate();
  const standalone = useStandalone();
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const platform = detectPlatform();
  const { isIOS, isAndroidMobile, isIOSSafari, iosBrowser } = platform;

  useEffect(() => {
    if (standalone) return;

    // Mobile uniquement (téléphones, pas tablettes/desktop)
    const isMobileTarget = platform.isIPhone || isAndroidMobile;
    if (!isMobileTarget) return;

    // Vérifier la fermeture récente
    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (dismissedAt && Date.now() - Number(dismissedAt) < DISMISS_DURATION_MS) {
        return;
      }
    } catch {
      // localStorage indisponible : on continue
    }

    if ((window as any).__deferredInstallPrompt) {
      setDeferredPrompt((window as any).__deferredInstallPrompt as BeforeInstallPromptEvent);
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const timer = setTimeout(() => setVisible(true), 2000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standalone]);

  // Masquer automatiquement si l'app vient d'être installée
  useEffect(() => {
    if (standalone) setVisible(false);
  }, [standalone]);

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      navigate("/install");
    }
  };

  if (!visible) return null;

  const subtitle = isIOS
    ? isIOSSafari
      ? "Ajoutez l'app à votre écran d'accueil"
      : `Ouvrez ce site dans Safari pour l'installer${iosBrowser ? "" : ""}`
    : "Sur votre téléphone en un clic";

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg">
        <img src={logo} alt="Doggy Help" className="h-12 w-12 rounded-xl shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground font-['Quicksand'] leading-tight">
            Installez Doggy Help
          </p>
          <p className="text-xs text-muted-foreground leading-tight mt-0.5">
            {subtitle}
          </p>
        </div>
        <Button
          onClick={handleInstall}
          size="sm"
          className="rounded-full gap-1 shrink-0 px-3"
        >
          <Download className="h-4 w-4" />
          {isIOS && !isIOSSafari ? "Aide" : "Installer"}
        </Button>
        <button
          onClick={handleDismiss}
          aria-label="Fermer"
          className="shrink-0 p-1 rounded-full text-muted-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
