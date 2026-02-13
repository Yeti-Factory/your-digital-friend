

# Creer une page d'installation dediee pour le QR code

## Le probleme
Actuellement, le QR code pointe vers l'application, mais l'utilisateur arrive directement sur le chatbot sans aucune indication pour installer l'application sur son telephone.

## La solution
Creer une page `/install` dediee que le QR code ouvrira. Cette page affichera :
- Le logo Doggy Oasis
- Un message d'accueil invitant a installer l'app
- Un **bouton "Installer l'application"** qui declenchera automatiquement l'installation sur Android
- Des **instructions visuelles etape par etape** pour iPhone (car iOS ne permet pas l'installation automatique)
- Un lien pour acceder directement a l'application sans installer

## Le QR code pointera vers
`https://your-digital-friend.yeti-factory.com/install`

## Fonctionnement

- **Sur Android** : Un bouton "Installer l'application" apparait. En cliquant dessus, le navigateur propose l'installation automatique (via l'API `beforeinstallprompt`).
- **Sur iPhone (Safari)** : Le bouton d'installation automatique n'est pas disponible sur iOS. A la place, des instructions claires et illustrees s'affichent :
  1. Appuyer sur le bouton "Partager" (icone en bas de Safari)
  2. Choisir "Sur l'ecran d'accueil"
  3. Confirmer en appuyant sur "Ajouter"
- **Si deja installe** : Un message indique que l'application est deja installee, avec un lien pour l'ouvrir.

## Details techniques

### Fichiers crees
- **`src/pages/Install.tsx`** : La page d'installation avec :
  - Detection de la plateforme (Android/iOS) pour adapter les instructions
  - Capture de l'evenement `beforeinstallprompt` pour le bouton d'installation Android
  - Detection si l'app est deja en mode standalone (deja installee)
  - Logo, texte explicatif et bouton d'action

### Fichiers modifies
- **`src/App.tsx`** : Ajout de la route `/install` pointant vers la nouvelle page

