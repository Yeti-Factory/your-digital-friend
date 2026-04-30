# Renommer l'application en "Doggy Help"

## Ce qui change

Le nom affiché sous l'icône de l'application installée passe de **"Doggy Oasis"** à **"Doggy Help"**.

## Comportement de mise à jour sur les apps déjà installées

La PWA est en mode `autoUpdate` :
- **Android (Chrome)** : le nouveau nom sera repris automatiquement à la prochaine ouverture, sans action de l'utilisateur.
- **iOS (Safari)** : iOS ne met pas à jour le nom d'une PWA déjà ajoutée. Les utilisateurs iOS verront le nouveau nom uniquement après réinstallation.

(Aucune bannière d'avertissement iOS ne sera ajoutée, comme demandé.)

## Fichiers modifiés

1. **`vite.config.ts`** — manifeste PWA :
   - `name` → `"Doggy Help"`
   - `short_name` → `"Doggy Help"` (texte affiché sous l'icône)

2. **`index.html`** :
   - `<title>` → `"Doggy Help"`
   - `og:title` → `"Doggy Help"`
   - `meta author` → `"Doggy Help"`

3. **`capacitor.config.json`** :
   - `appName` → `"Doggy Help"`

## Ce qui ne change pas

- L'**image** de l'icône reste identique (tu n'as pas fourni de nouvelle image — uniquement le texte change).
- Le contenu de l'app, les couleurs et le branding interne restent identiques.

## Étape finale

Après les modifications, il faudra **publier l'application** pour que le nouveau manifeste soit servi en production.
