Constat : le manifeste publié indique déjà `name` et `short_name` à `Doggy Help`, mais le HTML publié contient deux liens vers le manifeste :

```text
<link rel="manifest" href="/manifest.webmanifest?v=doggy-help-1" />
...
<link rel="manifest" href="/manifest.webmanifest">
```

Ce second lien est injecté par la génération PWA et peut faire que le téléphone relit l’ancien manifeste ou ignore le lien versionné. De plus, sur iOS, le libellé de l’icône peut aussi venir du meta tag `apple-mobile-web-app-title`, qui n’est pas présent actuellement.

Plan proposé :

1. Fixer explicitement le nom iOS
   - Ajouter dans `index.html` :
     - `apple-mobile-web-app-title` avec le nom voulu.
   - Harmoniser le titre et les métadonnées autour du même libellé.

2. Éviter le double manifeste
   - Supprimer le `<link rel="manifest">` manuel de `index.html` ou le laisser être géré uniquement par `vite-plugin-pwa`, afin que le HTML final ne contienne qu’un seul manifeste.
   - Définir la même valeur de nom dans la config PWA pour `name` et `short_name`.

3. Forcer un vrai changement détectable par Android/iOS
   - Ajouter un champ `id` stable au manifeste.
   - Mettre `lang: "fr"`.
   - Si nécessaire, faire évoluer `short_name` vers le libellé exact souhaité pour l’icône.
   - Garder en tête que certains téléphones gardent le nom d’une ancienne installation tant que le raccourci ou l’entrée PWA n’a pas été totalement supprimé côté navigateur.

4. Fiabiliser la PWA en environnement Lovable
   - Garder l’installabilité en production.
   - Empêcher l’enregistrement du service worker dans l’éditeur/preview Lovable et dans les iframes, pour limiter les caches persistants qui peuvent masquer les changements.
   - Conserver le comportement publié pour les utilisateurs réels.

5. Ajouter les améliorations de détection déjà demandées
   - Créer une logique centralisée de détection plateforme/standalone.
   - Réduire les faux positifs iOS/Android : iPhone, iPad, iPod, Android mobile/tablette, desktop iPadOS, navigateurs iOS tiers.
   - Vérifier le mode standalone via `display-mode`, `navigator.standalone`, `appinstalled`, et cas Android/TWA.
   - Adapter le bandeau d’installation et la page `/install` selon Safari iOS vs Chrome/Firefox/Edge iOS.

Question nécessaire avant implémentation : quel texte exact voulez-vous sous l’icône ?

Par défaut, je mettrai `Doggy Help` partout. Si vous voulez plutôt `Doggy Oasis`, `Doggy Oasis International`, ou un autre libellé court, dites-moi lequel avant validation.