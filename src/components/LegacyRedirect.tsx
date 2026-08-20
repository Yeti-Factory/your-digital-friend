import { useEffect, useMemo } from "react";
import doggyOasisLogo from "@/assets/doggy-oasis-logo.png";
import { buildNewAppUrl } from "@/lib/legacy-host";

const REDIRECT_DELAY_MS = 6_000;

export default function LegacyRedirect() {
  const destination = useMemo(() => buildNewAppUrl(window.location), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.location.replace(destination);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [destination]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
        <img
          src={doggyOasisLogo}
          alt="Doggy Oasis International"
          className="mx-auto mb-6 h-24 w-24 rounded-full object-contain"
        />
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Changement d’adresse
        </p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Doggy Friend a déménagé
        </h1>
        <p className="mx-auto mb-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Retrouvez dès maintenant votre compagnon Doggy Oasis à sa nouvelle
          adresse. Vous allez être redirigé automatiquement dans quelques
          secondes.
        </p>
        <a
          href={destination}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Continuer vers Doggy Friend
        </a>
        <p className="mt-6 break-all text-sm text-muted-foreground">
          doggy-friend.yeti-lab.fr
        </p>
      </section>
    </main>
  );
}
