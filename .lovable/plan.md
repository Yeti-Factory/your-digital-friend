

# Ajout d'un Dockerfile pour le deploiement sur Coolify

## Objectif
Creer un fichier `Dockerfile` a la racine du projet pour que Coolify puisse builder et servir correctement l'application React/Vite.

## Ce qui sera fait

Un seul fichier sera cree : **`Dockerfile`** (a la racine du projet, au meme niveau que `package.json`).

Le Dockerfile utilisera un **build multi-stage** :

1. **Etape 1 - Build** : Utilise `node:20-alpine` pour installer les dependances (`npm install`) et compiler l'application (`npm run build`), ce qui genere le dossier `dist/`.

2. **Etape 2 - Serveur** : Utilise `nginx:alpine` (serveur web leger) pour servir les fichiers statiques du dossier `dist/`. Inclut une configuration nginx adaptee aux applications React (Single Page App) avec redirection vers `index.html`.

## Configuration Coolify apres ajout

Dans Coolify, il faudra :
- Changer le **Build Pack** de "Nixpacks" a **"Dockerfile"**
- Le port expose sera **80** (nginx)
- Sauvegarder et redeployer

## Details techniques

Le Dockerfile contiendra :
- Une image Node 20 Alpine pour le build
- Une copie du `package.json` et `package-lock.json` en premier (pour optimiser le cache Docker)
- Le `npm run build` qui genere le dossier `dist`
- Une configuration nginx personnalisee pour gerer le routage SPA (`try_files $uri /index.html`)
- L'image finale nginx Alpine qui ne contient que les fichiers statiques (image legere)

