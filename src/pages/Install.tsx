import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share, Plus, Check, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/doggy-oasis-logo.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect iOS
    const ua = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    // Detect standalone mode (already installed)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      || ("standalone" in navigator && (navigator as any).standalone === true);
    setIsInstalled(isStandalone);

    // If already installed or iOS, no need to wait
    if (isStandalone || isIOSDevice) {
      setLoading(false);
      return;
    }

    // Check global variable from main.tsx
    if (window.__deferredInstallPrompt) {
      setDeferredPrompt(window.__deferredInstallPrompt as BeforeInstallPromptEvent);
      setLoading(false);
      return;
    }

    // Listen for the event in case it hasn't fired yet
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setLoading(false);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Wait up to 3 seconds then stop loading
    const timeout = setTimeout(() => {
      // Check one more time
      if (window.__deferredInstallPrompt) {
        setDeferredPrompt(window.__deferredInstallPrompt as BeforeInstallPromptEvent);
      }
      setLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(142,50%,95%)] to-[hsl(142,50%,88%)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl bg-white/90 backdrop-blur">
        <CardContent className="flex flex-col items-center text-center p-8 gap-6">
          {/* Logo */}
          <img
            src={logo}
            alt="Doggy Oasis"
            className="w-28 h-28 rounded-2xl shadow-md"
          />

          <h1 className="text-2xl font-bold text-[hsl(142,50%,25%)] font-['Quicksand']">
            Doggy Oasis
          </h1>

          {loading ? (
            /* Loading spinner */
            <>
              <Loader2 className="w-8 h-8 animate-spin text-[hsl(142,50%,35%)]" />
              <p className="text-muted-foreground">Préparation de l'installation...</p>
            </>
          ) : isInstalled ? (
            /* Already installed */
            <>
              <div className="flex items-center gap-2 text-[hsl(142,50%,35%)]">
                <Check className="w-6 h-6" />
                <p className="text-lg font-semibold">Application déjà installée !</p>
              </div>
              <p className="text-muted-foreground text-sm">
                Vous pouvez ouvrir Doggy Oasis depuis votre écran d'accueil.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-[hsl(142,50%,35%)] hover:bg-[hsl(142,50%,30%)] text-white gap-2">
                  Ouvrir l'application <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </>
          ) : isIOS ? (
            /* iOS instructions */
            <>
              <p className="text-muted-foreground">
                Installez Doggy Oasis sur votre iPhone en 3 étapes :
              </p>

              <div className="w-full space-y-4 text-left">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-[hsl(142,50%,95%)]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(142,50%,35%)] text-white flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-sm">Appuyez sur le bouton Partager</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Share className="w-4 h-4" /> en bas de Safari
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg bg-[hsl(142,50%,95%)]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(142,50%,35%)] text-white flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-sm">Choisissez "Sur l'écran d'accueil"</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Plus className="w-4 h-4" /> dans le menu qui apparaît
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg bg-[hsl(142,50%,95%)]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(142,50%,35%)] text-white flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-sm">Confirmez en appuyant sur "Ajouter"</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      L'icône Doggy Oasis apparaîtra sur votre écran d'accueil
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : deferredPrompt ? (
            /* Android with install prompt available */
            <>
              <p className="text-muted-foreground">
                Installez l'application sur votre téléphone pour y accéder facilement !
              </p>
              <Button
                size="lg"
                onClick={handleInstall}
                disabled={installing}
                className="bg-[hsl(142,50%,35%)] hover:bg-[hsl(142,50%,30%)] text-white gap-2 w-full"
              >
                <Download className="w-5 h-5" />
                {installing ? "Installation..." : "Installer l'application"}
              </Button>
            </>
          ) : (
            /* Fallback: no prompt available */
            <>
              <p className="text-muted-foreground">
                Pour installer l'application, ouvrez le menu de votre navigateur puis sélectionnez <strong>"Installer l'application"</strong> ou <strong>"Ajouter à l'écran d'accueil"</strong>.
              </p>
            </>
          )}

          {/* Link to app */}
          {!isInstalled && (
            <Link to="/" className="mt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
                Accéder sans installer <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;
