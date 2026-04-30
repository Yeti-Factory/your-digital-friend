# Invitation automatique à installer Doggy Help

## Objectif
Proposer spontanément l'installation de l'app dès l'ouverture, sans forcer l'utilisateur à trouver la page `/install`.

## Comportement
- **Affichage** : bandeau flottant en bas de l'écran d'accueil, apparaît 2 secondes après le chargement.
- **Conditions d'affichage** :
  - Uniquement sur mobile (iOS ou Android)
  - Uniquement si l'app n'est pas déjà installée (pas en mode standalone)
  - Pas si l'utilisateur l'a fermé dans les 7 derniers jours
- **Action du bouton "Installer"** :
  - Android Chrome → déclenche le prompt natif via `beforeinstallprompt`
  - iOS Safari / autres navigateurs → redirige vers `/install` (instructions visuelles existantes)
- **Bouton ✕** pour fermer → mémorisé 7 jours via `localStorage`
- Disparaît définitivement une fois l'app installée

## Design
- Bandeau bas, fond blanc avec ombre, coins arrondis
- Icône logo + texte court : « Installez Doggy Help sur votre téléphone »
- Bouton vert primaire « Installer » + bouton ✕ discret
- Charte respectée : vert #2d8a4e, police Quicksand

## Fichiers

**Nouveau** : `src/components/InstallPrompt.tsx`
- Détection plateforme (iOS, Android, standalone, desktop)
- Lecture de `window.__deferredInstallPrompt` (déjà capté dans `main.tsx`)
- Gestion localStorage (`doggy-help-install-dismissed-at`)
- Délai d'apparition 2s + animation fade-in

**Modifié** : `src/components/WelcomeScreen.tsx`
- Import et rendu de `<InstallPrompt />` à la fin du composant

## Hors périmètre
- Page `/install` inchangée (reste le fallback détaillé)
- Aucune nouvelle dépendance
- Aucun changement backend
