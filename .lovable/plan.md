

# Corriger le bouton d'installation Android

## Le probleme
L'evenement `beforeinstallprompt` (qui permet d'afficher le bouton "Installer") se declenche souvent **avant** que la page `/install` ne soit chargee. Du coup, l'evenement est perdu et l'utilisateur voit le message de fallback complique au lieu du bouton simple.

## La solution
Capturer l'evenement `beforeinstallprompt` **des le demarrage de l'application** (dans `main.tsx`) et le stocker dans une variable globale. La page Install viendra ensuite lire cette variable.

En plus, on ajoutera un **delai d'attente** avec un spinner pour laisser le temps a l'evenement d'arriver, au lieu d'afficher immediatement le fallback.

## Ce que l'utilisateur verra
1. Il scanne le QR code
2. La page s'ouvre avec un petit chargement (1-2 secondes)
3. Un gros bouton vert **"Installer l'application"** apparait
4. Il clique dessus, et l'installation se lance automatiquement

## Details techniques

### Fichier modifie : `src/main.tsx`
- Ajouter un listener global pour `beforeinstallprompt` qui stocke l'evenement dans `window.__deferredInstallPrompt`
- L'evenement est capture immediatement au chargement, avant meme que React ne demarre

### Fichier modifie : `src/pages/Install.tsx`
- Lire la variable globale `window.__deferredInstallPrompt` au montage du composant
- Ajouter un etat "chargement" avec un delai de 3 secondes pour attendre que l'evenement arrive
- Pendant le chargement, afficher un spinner avec "Preparation de l'installation..."
- Si apres 3 secondes l'evenement n'est toujours pas arrive, alors seulement afficher les instructions manuelles (fallback)

### Resultat
- Sur Android : le bouton d'installation apparait quasi-systematiquement
- Sur iOS : les instructions etape par etape s'affichent (pas de changement)
- Si deja installe : message de confirmation (pas de changement)

