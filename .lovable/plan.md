
# Rendre l'application installable sur smartphone (PWA)

## Ce que cela va permettre
Vos adoptants pourront installer l'application directement depuis leur navigateur sur leur telephone (iPhone ou Android), avec une icone Doggy Oasis sur leur ecran d'accueil, comme une vraie application mobile.

## Etapes prevues

### 1. Creer les icones de l'application
A partir du logo Doggy Oasis existant, creer plusieurs tailles d'icones dans le dossier `public/` :
- `pwa-192x192.png` (icone standard)
- `pwa-512x512.png` (icone haute resolution)
- `apple-touch-icon-180x180.png` (specifique iPhone)

Le logo sera recadre en carre pour s'adapter au format d'icone mobile.

### 2. Installer et configurer le plugin PWA
- Installer `vite-plugin-pwa`
- Configurer dans `vite.config.ts` avec :
  - Le manifeste de l'application (nom, couleurs, icones)
  - Le service worker pour le mode hors-ligne
  - L'exclusion de la route `/~oauth` du cache

### 3. Mettre a jour les balises HTML
Dans `index.html`, ajouter :
- Le lien vers l'icone Apple Touch
- La couleur du theme pour la barre de navigation mobile

### 4. Registrer le service worker
Dans `src/main.tsx`, ajouter l'enregistrement du service worker PWA.

## Detail technique

**Fichiers modifies :**
- `vite.config.ts` : ajout du plugin `VitePWA` avec configuration du manifeste (nom: "Doggy Oasis", couleur de theme, icones, mode standalone)
- `index.html` : ajout de la balise `<link rel="apple-touch-icon">`
- `src/main.tsx` : enregistrement du service worker via `registerSW`

**Fichiers crees :**
- `public/pwa-192x192.png`, `public/pwa-512x512.png`, `public/apple-touch-icon-180x180.png` : icones generees a partir du logo Doggy Oasis

**Dependance ajoutee :**
- `vite-plugin-pwa`

## Comment les utilisateurs installeront l'app
- **iPhone** : Ouvrir le site dans Safari > Partager > "Sur l'ecran d'accueil"
- **Android** : Le navigateur proposera automatiquement l'installation, ou via le menu > "Installer l'application"
