import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Check, RefreshCw } from "lucide-react";
import logo from "@/assets/doggy-oasis-logo.png";

/**
 * Page de secours pour forcer un reset complet du cache PWA.
 *
 * Utile quand un utilisateur, après désinstallation/réinstallation, voit
 * encore l'ancien nom sous l'icône : son navigateur (Chrome/Safari) sert
 * un manifeste mis en cache. On désenregistre tous les service workers,
 * on vide tous les Cache Storage, puis on redirige vers / avec un
 * bust de cache.
 */
const ResetPwa = () => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
        }
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
        try {
          localStorage.removeItem("doggy-help-install-dismissed-at");
        } catch {
          // ignore
        }
        setDone(true);
      } catch (e) {
        setError((e as Error).message || "Erreur inconnue");
      }
    };
    run();
  }, []);

  const reload = () => {
    const url = new URL(window.location.origin + "/");
    url.searchParams.set("pwa-reset", String(Date.now()));
    window.location.replace(url.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(142,50%,95%)] to-[hsl(142,50%,88%)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl bg-white/90 backdrop-blur">
        <CardContent className="flex flex-col items-center text-center p-8 gap-6">
          <img src={logo} alt="Doggy Help" className="w-24 h-24 rounded-2xl shadow-md" />
          <h1 className="text-xl font-bold text-[hsl(142,50%,25%)] font-['Quicksand']">
            Réinitialisation de l'application
          </h1>

          {!done && !error && (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-[hsl(142,50%,35%)]" />
              <p className="text-sm text-muted-foreground">
                Nettoyage du cache en cours…
              </p>
            </>
          )}

          {done && (
            <>
              <div className="flex items-center gap-2 text-[hsl(142,50%,35%)]">
                <Check className="w-6 h-6" />
                <p className="font-semibold">Cache vidé !</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Désinstallez maintenant l'icône de votre écran d'accueil
                (s'il y en a une), puis recharger pour réinstaller la nouvelle version.
              </p>
              <Button
                onClick={reload}
                size="lg"
                className="bg-[hsl(142,50%,35%)] hover:bg-[hsl(142,50%,30%)] text-white gap-2 w-full"
              >
                <RefreshCw className="w-5 h-5" />
                Recharger l'application
              </Button>
            </>
          )}

          {error && (
            <>
              <p className="text-sm text-destructive">Erreur : {error}</p>
              <Button onClick={reload} variant="outline">
                Recharger malgré tout
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPwa;
